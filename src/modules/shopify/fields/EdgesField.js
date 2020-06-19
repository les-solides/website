export default class EdgesField {
    static addTo(field, callback) {
        field.add('edges', edges => {
            edges.add('cursor');
            edges.add('node', node => callback(node));
        });
    }
}
