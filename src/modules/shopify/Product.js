import Image from "./Image";
import Variant from "./Variant";
import Collection from "./Collection";
import PriceV2 from "./PriceV2";
import DomParser from "./DomParser";
import ShopifyGraph from "./ShopifyGraph";
import Option from "./Option";
import addOnMixing from "../../mixins/addOnMixing";
import variantSelectionMixin from "../../mixins/variantSelectionMixin";

export default class Product extends ShopifyGraph {

    static colorRegex = "#[a-f,A-F,0-9]{6,6}";

    constructor(graph, defaultCurrency) {
        super(graph);
        this._data = {};
        this._data.defaultCurrency = defaultCurrency || 'CHF';
        this._graph = graph;
        this._selectedVariant =
            this.variantsAvailable[Math.floor(Math.random() * this.variantsAvailable.length)] ||
            this.variants[Math.floor(Math.random() * this.variants.length)];
        Object.assign(this, addOnMixing);
        Object.assign(this, variantSelectionMixin);
    }

    get availableForSale() {
        return this._graph.availableForSale;
    }

    get compareAtPrice() {
        return this.selectedVariant.compareAtPrice;
    }

    get collections() {
        if ( ! this._graph.collections) {
            return [];
        }
        if ( ! Array.isArray(this._graph.collections.edges)) {
            return [];
        }
        let collections = this._graph.collections.edges;
        return collections.map(c => new Collection(c.node));
    }

    get colorOptions() {
        return this.options.filter(o => {
            if (
                ! o.values ||
                ! o.values[0] ||
                ! o.values[0].value
            ) {
                return false;
            }
            return o.values
                .find(v => String(v.value)
                    .match(new RegExp(Product.colorRegex)));
        });
    }

    get colorVariants() {
        if ( ! this.variants.length) {
            return [];
        }
        return this.variants.filter(v => {
            if ( ! v.options) {
                return;
            }
            return v.options.find(o => o.value.match(new RegExp(Product.colorRegex)));
        });
    }

    get defaultCurrency () {
        return this._data.defaultCurrency;
    }

    get descriptionHtml() {
        return this._graph.descriptionHtml;
    }
    
    get descriptionRest() {
        if (this.hasGoldSilverDescription) {
            return Array.from(this.descriptionOptions)
                        .filter(description =>
                            ! description.dataset.tag && description.dataset.tag !== ""
                        );
        }
        const root = document.createElement('div');
        const tags = this.descriptionNodes
                         .querySelectorAll(':scope > :not([data-tag])');
        [].forEach.call(tags, node => root.appendChild(node));
        return root;
    }
    
    get descriptionTags() {
        return this.descriptionNodes
                   .querySelectorAll(':scope > [data-tag]');
    }
    
    get descriptionNodes() {
        const root = document.createElement('div');
        root.innerHTML = this.descriptionHtml || "";
        return root;
    }
    
    get descriptionOptions() {
        return this.descriptionNodes
            .querySelectorAll(':scope > [data-option]');
    }

    get firstImage() {
        if ( ! this.images.length) {
            return null;
        }
        return this.images[0];
    }
    
    get hasDescriptionTag() {
        return !! this.descriptionTags.length;
    }
    
    get hasGoldSilverDescription() {
        return !! Array.from(this.descriptionNodes.querySelectorAll(':scope > div'))
            .filter(div => !
                div.dataset.tag &&
                div.dataset.tag !== "" &&
                div.dataset.option
            ).length;
    }
    
    get hasGoldSilverTag() {
        return !! this.getDescriptionTagByDataOption('material:gold');
    }

    get id() {
        return this._graph.id;
    }

    get handle() {
        return this._graph.handle;
    }

    get images() {
        if ( ! this._graph.images) {
            return [];
        }
        if (this._graph.images.length) {
            return this._graph.images.map(i => new Image(i));
        }
        if ( ! this._graph.images.edges) {
            return [];
        }
        return this._graph.images.edges.map(e => new Image(e.node));
    }

    get metafields() {
        if (
            ! this._graph.metafields ||
            ! this._graph.metafields.edges ||
            ! this._graph.metafields.edges.length
        ) {
            return [];
        }
        return this._graph.metafields.edges;
    }

    /**
     * It is the lowest Price of all Variants.
     * The minVariantPrice is used as the original Price
     * of the Product, whenever the Variants are not selected
     * or whenever the Product is shown without the Variants.
     *
     * @return PriceV2
     **/
    get minVariantPrice() {
        if ( ! this.variants) {
            return new PriceV2;
        }
        return this.variantPrices.reduce(
            (min, p) => p.amount < min.amount ? p : min,
            this.variantPrices[0]
        );
    }

    get nonColorOptions() {
        return this.options.filter(o => {
            if (
                ! o.values ||
                ! o.values[0] ||
                ! o.values[0].value
            ) {
                return false;
            }
            return o.values
                .find(v => ! String(v.value)
                    .match(new RegExp(Product.colorRegex)));
        });
    }

    get onSale() {
        if ( ! this.selectedVariant) {
            return false;
        }
        return !! this.selectedVariant.compareAtPrice.amount;
    }

    get options() {
        return Array.isArray(this._graph.options) ?
               this._graph.options.map(o => new Option(o)) : [];
    }

    get price() {
        if ( ! this.variants.length) {
            return new PriceV2;
        }
        if ( ! this.selectedVariant) {
            return this.variants[0].price;
        }
        return this.selectedVariant.price;
    }
    
    get productType() {
        return this._graph?.productType || "";
    }

    get secondImage() {
        if ( ! this.images.length) {
            return null;
        }
        return this.images[1] || this.images[0];
    }

    /**
     * Returns the currently selected Variant.
     *
     * @return Variant
     */
    get selectedVariant() {
        if (this._selectedVariant) {
            return this._selectedVariant;
        }
        if (
            this.variantWithLowestPrice &&
            this.variantWithLowestPrice.available
        ) {
            return this.variantWithLowestPrice;
        }
        if (this.variantsAvailable.length) {
            return this.variantsAvailable[0];
        }
        return this.variants[0];
    }
    
    set selectedVariant(variant) {
        variant instanceof Variant && (this._selectedVariant = variant);
    }

    /**
     * Reverse Flag of availableForSale.
     * Used because it is more expressive than availableForSale.
     *
     * @return boolean
     */
    get soldOut() {
        if ( ! this.selectedVariant) {
            return ! this._graph.availableForSale;
        }
        return ! this.selectedVariant.available;
    }
    
    get tags() {
        return this._graph.tags;
    }

    /**
     * Returns the title property from the Graph Data.
     *
     * @return string
     */
    get title() {
        return this._graph.title;
    }

    /**
     * Maps the priceV2 Object of each Variant.
     * The compareAtPriceV2 is deliberately omitted,
     * since the variantPrices Array is used to determine
     * the lowest available Price.
     *
     * @return Array
     * */
    get variantPrices() {
        return this.variants.map(
            v => new PriceV2(v.price)
        ) || [];
    }

    /**
     * Maps the variants from the _graph Data to Variant instances.
     *
     * @return Array
     */
    get variants() {
        if ( ! this._graph.variants) return [];
        if (this._graph.variants.edges) {
            return this._graph.variants.edges.map(v => new Variant(v.node || v));
        }
        if ( ! this._graph.variants.length) return [];
        return this._graph.variants.map(v => new Variant(v.node || v));
    }

    get variantsAvailable() {
        return this.variants.filter(v => v.available);
    }

    /**
     * Returns the Variant with the lowest PriceV2.amount value.
     *
     * @return Variant
     **/
    get variantWithLowestPrice() {
        return this.variants.find(
            v => v.price.amount === this.minVariantPrice.amount
        );
    }

    /**
     * Determines if this Product has a Collection
     * in its Collections Property (Array) that holds
     * the same <handle> Property.
     *
     * @param {string} handle
     * @return boolean
     */
    belongsToCollection(handle) {
        if ( ! handle) {
            return true;
        }
        return !! this.collections
            .find(c => (c.handle === handle || c.parentHandle === handle));
    }
    
    getDescriptionTagByDataOption(option) {
        return Array.from(this.descriptionTags)
                    .find(node => node.dataset.option === option);
    }
    
    selectElement(selector) {
        return DomParser.fetchFirstBySelector(
            this.descriptionHtml,
            selector
        ) || document.createElement('div');
    }
    
    selectElements(selector) {
        return DomParser.fetchAllBySelector(
            this.descriptionHtml,
            selector
        ) || [];
    }

    /**
     * Sets the _selectedVariant Property to the given Variant.
     *
     * @param {Variant} variant
     * @return Variant
     */
    selectVariant(variant) {
        return this._selectedVariant = variant;
    }
    
    
}
