/**
 * @jest-environment jsdom
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueHistory from '../src/index';

Vue.use(VueHistory);

VueHistory.install(Vue);

const router = new VueRouter();

describe('unit test', () => {
    test('initial', () => {
        expect(Vue.prototype.$history.appLocation).toBe(1);
    });

    test('$router.push', () => {
        router.push('/');
        expect(Vue.prototype.$history.appLocation).toBe(2);
    });
})
