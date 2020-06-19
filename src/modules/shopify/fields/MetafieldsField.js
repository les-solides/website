import PageInfoField from "./PageInfoField";
import EdgesScheme from "./EdgesField";

export default class MetafieldsField {
    static addTo(field, args) {
        field.add('metafields', {args: args}, metafields => {
            EdgesScheme.addTo(metafields, node => {
                node.add('description');
                node.add('id');
                node.add('key');
                node.add('value');
            });
            PageInfoField.addTo(metafields);
        });
    }
}
