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
		console.log({ split, tag })
		return split ? tag.replace(split, '') : tag;
	}
	
}