import VariantOption from "./VariantOption";
import PriceV2 from "./PriceV2";

/* todo:i variant onSale */

export default class Variant {
    constructor(graph = {}, defaultCurrency = "CHF") {
        this._data = defaultCurrency;
        this._graph = graph;
    }

    get available() {
        if ( ! Object.prototype.hasOwnProperty.call(this._graph, "available")) {
            return this._graph.availableForSale;
        }
        return this._graph.available;
    }

    /**
     * Return the PriceV2 of this Variant.
     *
     * @return PriceV2
     */
    get compareAtPrice() {
        if ( ! this._graph.compareAtPriceV2) {
            return new PriceV2;
        }
        return new PriceV2(this._graph.compareAtPriceV2);
    }

    get id() {
        return this._graph.id;
    }

    get image() {
        return this._graph.image;
    }

    get onSale() {
        return !! this.compareAtPrice.amount;
    }

    get options() {
        return this._graph.selectedOptions
            .map(o => new VariantOption(o.name, o.value));
    }

    get price() {
        if ( ! this._graph.priceV2) {
            return new PriceV2;
        }
        return new PriceV2(this._graph.priceV2);
    }

    get sku() {
        return this._graph.sku;
    }

    get soldOut() {
        return ! this.available;
    }

    get title() {
        return this._graph.title;
    }
}
