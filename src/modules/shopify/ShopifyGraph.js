export default class ShopifyGraph {
	
	constructor(graph = {}) {
		this._graph = graph
	}
	
	get graphTags() {
		return this._graph.tags || [];
	}
	
	getTag(match, split) {
		const tag = Array.isArray(this.graphTags) ?
			   this.graphTags.find(tag => match.test(tag)) : "";
		return split && tag ? tag.replace(split, '') : tag;
	}
	
}