export default class ShopifyGraph {
	
	constructor(graph = {}) {
		this._graph = graph
	}
	
	get tags() {
		return this._graph.tags || [];
	}
	
	getTag(match, split) {
		const tag = Array.isArray(this.tags) ?
			   this.tags.find(tag => match.test(tag)) : "";
		return split && tag ? tag.replace(split, '') : tag;
	}
	
}