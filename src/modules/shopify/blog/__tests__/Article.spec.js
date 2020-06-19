import Article from "../Article";

describe("shopify/blog/Article.js", () => {
	
	it('returns first template, if one or more template tags are given', () => {
		const article = new Article({
			tags: [
				'not-a-template:something-else',
				'template:first-one',
				'template:second-one'
			]
		});
		
		expect(article.template).toBe('first-one');
	});
	
	it('returns null, if no template tag is given', () => {
		const articleWithTags = new Article({
			tags: [
				'not-a-template:something-else'
			]
		});
		const articleWithEmptyTagsArray = new Article({
			tags: []
		});
		const articleWithoutTags = new Article();
		
		expect(articleWithTags.template).toBe(null);
		expect(articleWithoutTags.template).toBe(null);
		expect(articleWithEmptyTagsArray.template).toBe(null);
	})
});