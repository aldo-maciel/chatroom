// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    moduleFileExtensions: ['vue', 'ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
        // process `*.vue` files with `vue-jest`
        '.*\\.tsx?$': 'ts-jest',
        '.*\\.(vue)$': 'vue-jest'
    },
    moduleNameMapper: {
        '@/(.*)': ['<rootDir>/src/$1'],
        '^vue$': '<rootDir>/node_modules/vue/dist/vue.js',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
    }
};
