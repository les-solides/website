import PageInfoField from "./PageInfoField";
import EdgesField from "./EdgesField";

export default class ImagesField {
    static addTo(field, args) {
        field.add('images', {args: args}, images => {
            EdgesField.addTo(images, node => {
                node.add('id');
                node.add('altText');
                node.add('originalSrc');
                node.add('transformedSrc');
            });
            PageInfoField.addTo(images);
        })
    }
}
