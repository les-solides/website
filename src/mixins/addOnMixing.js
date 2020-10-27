import store from './../store/index';

export default {
	// --- main methods
	getAddOns() {
		return this.isAddOn() ?
			   store.getters['shopify/product/allProductsByAddOn'](this) :
			   store.getters['shopify/product/allAddOnsByProduct'](this);
	},
	getAddOnMainImages(addOn, product) {
		if ( ! addOn?.images || ! product?.images) {
			return [];
		}
		if (addOn.isAddOn()) {
			return addOn.images.filter(i => i.alt.includes("add-on-main"));
		}
		return product.images.filter(i => i.alt.includes("add-on-main"));
	},
	getAddOnImages(addOn, product) {
		if ( ! addOn?.images || ! product?.images) {
			return [];
		}
		if (addOn.isAddOn()) {
			return addOn.images.filter(image =>
				image.alt.includes(`add-on:${ product.handle }`)
			);
		}
		return product.images.filter(image =>
			image.alt.includes(`add-on:${ addOn.handle }`)
		);
	},
	getAddOnImageShown() {
		/*return this.materialIsSelected('gold') ?
			   this.images*/
	},
	
	// --- helper methods
	isAddOn() {
		if ( ! Array.isArray(this.images)) {
			return false;
		}
		return !! this.images.filter(image =>
			/.*add-on:*/.test(image.alt)
		).length;
	},
};