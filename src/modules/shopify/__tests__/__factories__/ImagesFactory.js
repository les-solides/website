import EdgesFactory from "./EdgesFactory";
import ImageFactory from "./ImageFactory";

export default class ImagesFactory {
    static create(array) {
        let base = [
            ImageFactory.create(),
            ImageFactory.create(),
        ];
        return EdgesFactory.build(array || base);
    }
}
