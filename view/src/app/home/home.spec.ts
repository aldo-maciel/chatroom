import { mount } from '@vue/test-utils';

import i18n from '@/shared/i18n';
import Home from './home.vue';

describe('Home', () => {
    const wrapper = mount(Home, {
        i18n
    });

    it('should translate title', () => {
        expect(wrapper.find('h2').text()).toBe('Generate');
    });
});
