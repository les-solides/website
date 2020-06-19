export default class PageInfoField {
    static addTo(field) {
        field.add('pageInfo', info => {
            info.add('hasNextPage');
            info.add('hasPreviousPage');
        });
    }
}
