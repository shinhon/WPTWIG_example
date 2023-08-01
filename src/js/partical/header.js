import {
  ref, computed, createApp,
} from 'vue';
import { useStore } from 'vuex';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

// import scroll from '../modules/scroll';

// eslint-disable-next-line no-undef
createApp({
  name: 'HeaderPart',
  compilerOptions: {
    delimiters: ['${', '}'],
  },
  setup() {
    const store = useStore();

    // Header
    const headerIsShow = ref(false);
    const headerColorState = computed(() => store.state.header.startColor);
    const headerHasColor = computed(() => store.state.header.headerHasColor);
    const menu = ref(null);

    // set header's color on show hide
    const headerSetColor = () => {
      if (headerIsShow.value && headerHasColor) {
        store.commit('header/set_headerHasColor', false);
      } else if (!headerIsShow.value && headerColorState.value) {
        store.commit('header/set_headerHasColor', true);
      }
    };

    const headerIsShowTrigger = () => {
      headerIsShow.value = !headerIsShow.value;
      if (headerIsShow.value) {
        disableBodyScroll(menu.value);
      } else {
        enableBodyScroll(menu.value);
      }
      headerSetColor();
    };

    // scroll interaction
    /* const iconIsSmall = ref(false);
    const { scrollPosY } = scroll();

    watch(scrollPosY, (pos, _prevPos) => {
      if (pos > 10) {
        iconIsSmall.value = true;
      } else {
        iconIsSmall.value = false;
      }
    }); */

    return {
      headerIsShow,
      headerColorState,
      headerHasColor,
      menu,
      headerIsShowTrigger,
      // iconIsSmall,
      // scrollPosY,
    };
  },
}).use(window.store).mount('#Header');
