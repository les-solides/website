import ImageField from "./ImageField";

export default class CollectionField {
    static addTo(field) {
        // todo modularize fields
        field.add('description');
        field.add('descriptionHtml');
        field.add('handle');// Add fields to be returned
        field.add('id');
        ImageField.addTo(field);
        field.add('title');
    }
}
