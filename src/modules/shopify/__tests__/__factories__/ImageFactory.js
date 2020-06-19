import faker from 'faker';
export default class ImageFactory {

    static create(data) {
        return {
            altText: faker.random.word(),
            id: faker.random.uuid(),
            originalSrc: faker.random.image(),
            transformedSrc: faker.random.image(),
            ...data
        };
    }

}
