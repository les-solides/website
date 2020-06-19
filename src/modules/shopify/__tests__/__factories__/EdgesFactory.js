import faker from 'faker';

export default class EdgesFactory {

    static build(array) {
        let edges = [];
        if ( ! Array.isArray(array)) {
            throw new TypeError(
                '[EdgesFactory] Given data in build method must be an array'
            );
        }
        array.forEach(i => edges.push({
            cursor: faker.random.uuid,
            node: i
        }));
        return { edges }
    }

}
