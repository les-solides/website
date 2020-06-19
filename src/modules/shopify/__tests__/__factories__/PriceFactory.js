import faker from 'faker';
export default class PriceFactory {
    static create(data) {
        return {
            amount: faker.random.number(),
            currencyCode: faker.finance.currencyCode(),
            ...data
        }
    }
}
