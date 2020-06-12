import HelloWorld from "../HelloWorld";
import {mount} from "@vue/test-utils";

describe('HelloWorld.vue', () => {

    it('shows msg', () => {
        const vm = mount(HelloWorld, {
            propsData: {
                msg: "Hello World!"
            }
        });
        expect(vm.find('h1').text()).toBe("Hello World!");
    });

});