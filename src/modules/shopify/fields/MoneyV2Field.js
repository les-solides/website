export default class MoneyV2Field {
    static addTo(field) {
        field.add('amount');
        field.add('currencyCode');
    }
}
