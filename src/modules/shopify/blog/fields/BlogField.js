export default class Blog {
	static addTo(field) {
		field.add('blog', image => {
			image.add('id');
			image.add('title');
		})
	}
}