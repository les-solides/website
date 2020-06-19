import EdgesField from "./EdgesField";
import CollectionField from "./CollectionField";
import PageInfoField from "./PageInfoField";

export default class CollectionsField {
    static addTo(field, first = 250) {
        field.add('collections', { args: { first } }, collections => {
            EdgesField.addTo(collections, node => {
                CollectionField.addTo(node);
            });
            PageInfoField.addTo(collections);
        });
    }
}
