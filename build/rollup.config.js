import buble from 'rollup-plugin-buble';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/vue-history.js',
        format: 'umd',
        name: 'VueHistory',
        exports: 'named',
    },
    plugins: [
        buble(),
    ],
};
