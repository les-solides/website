export default class ShopifyGraph {
	
	constructor(graph = {}) {
		this.graph = graph
	}
	
	get tags() {
		return this.graph.tags || [];
	}
	
	static getTag(match) {
		return this.tags.match(match);
	}
	
}