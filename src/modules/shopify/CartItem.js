import Product from "../models/Product";
export default class CartItem {

    // @todo: implement get variantString ()
    // @todo: store selected variant product
    // @todo: make sure selected variant doesn't get updated when product gets updated
    // @todo: define a state when synchronised product is too different to keep in cart
    // @todo: adapt item price to Environment.isWholesale
    // @todo: adapt item price to sold_out flag
    // @todo: adapt item price to separate variant product price

    constructor(product, quantity = 1) {
        this._props = {
            id: _.uniqueId(),
            product: Product.morph(product),
            quantity: Math.abs(quantity)
        };
    }

    get hasVariantProductImages () { return this.selectedVariantProduct && this.product.imagesOfSelectedVariantProduct }
    get id () { return this.product.id }
    get description ()  { return this.variantValueString }
    get name () { return this.product.name }
    get price () { return this.product.price }
    get priceOriginal () { return this.product.priceOriginal }
    get product () { return this._props.product }
    get quantity () { return this._props.quantity }
    get selectedVariantProduct () { return this.product.selectedVariantProduct }
    get thumbnail () { return this.hasVariantProductImages ?
        this.product.imagesOfSelectedVariantProduct[0] || this.product.imagePrimary :
        this.product.imagePrimary
    }
    get variantValueString () {
        if (!this.selectedVariantProduct) return "";
        let values = this.selectedVariantProduct.variant_values
            .map(v => `${v.variant[Environment.language]}: ${v[Environment.language]}`)
            .reduce((a, b) => a += `, ${b}`);
        return `{ ${values} }`;
    }
    get wsMinOrderAmount () { return this.product.wsMinOrderAmount }

    set product (product) { return this._props.product = Product.morph(product) }
    set quantity (quantity) { this._props.quantity = Math.abs(quantity) }

    static isCartItem (object) { return object instanceof CartItem }

    static morph (object) { return this.isCartItem(object) ? object : new CartItem(object) }

    decrease (amount = 1) { this.quantity < amount ? this.quantity -= Math.abs(amount) : this.quantity = 0 }

    equal (item) { return (this.id === item.id) && this.hasSameVariantProduct(item) }

    hasSameVariantProduct (item) {
        let variantProduct = item.selectedVariantProduct || {};
        if (!this.selectedVariantProduct) return true;
        return (variantProduct.id === this.selectedVariantProduct.id);
    }

    increment (amount = 1) { this.quantity += Number(amount) }

}
