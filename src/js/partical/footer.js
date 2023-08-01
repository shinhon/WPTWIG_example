import { createApp } from 'vue';
import toTop from '../modules/toTop';

// import { useStore } from 'vuex';

createApp({
  name: 'FooterPart',
  compilerOptions: {
    delimiters: ['${', '}'],
  },
  setup() {
    const { toTopClick } = toTop();

    return {
      toTopClick,
    };
  },
}).use(window.store).mount('#Footer');
