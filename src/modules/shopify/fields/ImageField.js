export default class ImageField {
    static addTo(field) {
        field.add('image', image => {
            image.add('altText');
            image.add('id');
            image.add('originalSrc');
            image.add('transformedSrc');
        })
    }
}
