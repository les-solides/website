import CategoryField from "../../../modules/shopify/blog/fields/CategoryField";
import TagsField from "../../../modules/shopify/blog/fields/TagsField";
import Article from "../../../modules/shopify/blog/Article";
import BlogField from "../../../modules/shopify/blog/fields/BlogField";
import ImageField from "../../../modules/shopify/fields/ImageField";

export default {
	namespaced: true,
	state: {
		articles: [],
		categories: [],
		pages: []
	},
	actions: {
		async fetchArticlesByBlog({commit, rootState}, blog) {
			const query = rootState.storefront.graphQLClient.query(root => {
				root.addConnection(
					"articles",
					{args: {first: 250, query: `blog_title:'${ blog }'`} },
					(article) => {
						BlogField.addTo(article);
						article.add('handle');
						article.add('id');
						ImageField.addTo(article);
						article.add('title');
						article.add('contentHtml');
						article.add('content');
						TagsField.addTo(article, true);
					}
				);
			});
			return rootState
				.storefront
				.graphQLClient
				.send(query)
				.then(async ({data}) => {
					const articles = data
						.articles
						.edges
						.map(e => new Article(e.node));
					if ( ! articles.length) {
						return null;
					}
					await commit('addManyToArticles', articles);
					return articles;
				});
		},
		async fetchFirstArticleByBlog({commit, dispatch, rootState}, blog) {
			let articles = await dispatch('fetchArticlesByBlog', blog);
			return Array.isArray(articles) ? articles[0] : null;
		},
		fetchFirstArticleByTags({commit, rootState}, tags) {
			const query = rootState.storefront.graphQLClient.query(root => {
				root.addConnection(
					"articles",
					{args: {first: 1, query: `tag:'${ tags }'`} },
					(article) => {
						BlogField.addTo(article);
						article.add('id');
						article.add('title');
						article.add('contentHtml');
						article.add('content');
						TagsField.addTo(article, true);
					}
				);
			});
			return rootState
				.storefront
				.graphQLClient
				.send(query)
				.then(async ({data}) => {
					const pages = data
						.articles
						.edges
						.map(e => e.node);
					if ( ! pages.length) {
						return null;
					}
					await commit('addOneToPages', pages[0]);
					return pages[0];
				});
		},
		fetchCategories({commit, rootState}, first = 250) {
			const query = rootState.storefront.graphQLClient.query(root => {
				root.addConnection("articles", {args: {first}}, (article) => {
					CategoryField.addTo(article, true);
				});
			});
			return rootState
				.storefront
				.graphQLClient
				.send(query)
				.then(async ({data}) => {
					const categories = data
						.articles
						.edges
						.map(e =>
							e.node.tags.find(t => t.includes('category:'))
						)
						.filter(c => c)
						.map(c => c.split(':')[1]);
					await commit('addManyToCategories', categories);
					return categories;
				});
		}
	},
	getters: {
		articles(state) {
			return state.articles;
		},
		categories(state) {
			return state.categories;
		}
	},
	mutations: {
		/**
		 * Adds many blog articles to the articles state.
		 *
		 * @param {Object} state
		 * @param {Array<Article>} articles
		 */
		addManyToArticles(state, articles) {
			articles.forEach(article => {
				const exists = state.articles
									.find(c => c.id === article.id);
				if ( ! (article instanceof Article)) {
					throw new TypeError("[addManyToArticles] article must be of type Article.js");
				}
				
				if ( ! exists) {
					state.articles.push(article);
				}
			});
		},
		addManyToCategories(state, categories) {
			categories.forEach(category => {
				const exists = state.categories
									.find(c => c === category);
				
				if ( ! exists) {
					state.categories.push(category);
				}
			});
		},
		addOneToPages(state, page) {
			const exists = state.pages
								.find(c => c === page);
			
			if ( ! exists) {
				state.pages.push(page);
			}
		}
	}
};
