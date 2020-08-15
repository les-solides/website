import DomParser from "../DomParser";
import ShopifyGraph from "../ShopifyGraph";

export default class Article extends ShopifyGraph {
	
	constructor(props = {}) {
		super(props);
		this.blog = props.blog || "";
		this.content = props.content || "";
		this.contentHtml = props.contentHtml || "";
		this.handle = props.handle || "";
		this.id = props.id || "";
		this.featuredImage = props.image;
		this.products = [];
		this.tags = props.tags;
		this.title = props.title || "";
	}
	
	get blogTitle() {
		if ( ! this.blog) {
			return ""
		}
		return this.blog.title || "";
	}
	
	get contentNodes() {
		const root = document.createElement('div');
		root.innerHTML = this.contentHtml || "";
		return root;
	}
	
	get images() {
		return DomParser.fetchAllImages(this.contentHtml) || [];
	}
	
	get order() {
		return Number(this.filterTags(
			/^order:*/,
			"order:"
		));
	}
	
	get template() {
		return this.filterTags(
			/^template:*/,
			"template:"
		);
	}
	
	filterTags(match, split) {
		if (
			! Array.isArray(this.tags) ||
			! this.tags.length
		) {
			return null;
		}
		const templateTag = this.tags.find(t => t.match(match))
		if (typeof templateTag !== "string") {
			return null;
		}
		return templateTag
			.split(split)
			.reduce((a,b) => a ? a : b);
	}
	
	hasTag(tag) {
		return !! this.tags.find(t => t.match(tag));
	}
	
	selectElement(selector) {
		return DomParser.fetchFirstBySelector(
			this.contentHtml,
			selector
		) || document.createElement('div');
	}
	
	selectElements(selector) {
		return DomParser.fetchAllBySelector(
			this.contentHtml,
			selector
		) || [];
	}
	
}