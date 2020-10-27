export default {
	materialIsSelected(material) {
		return !! this.selectedVariant.options.find(option =>
			option.name === "material" && option.value === material
		);
	}
}