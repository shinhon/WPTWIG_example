import {
  createApp, ref, onMounted, nextTick, computed, watch,
} from 'vue';
import { useStore } from 'vuex';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import gsap from 'gsap';

createApp({
  name: 'LoadingPart',
  compilerOptions: {
    delimiters: ['${', '}'],
  },
  setup() {
    const store = useStore();

    // DATA
    const loadingIsShow = computed(() => store.state.loadingIsShow);
    const alreadyRepeat = ref(false);
    const isLoading = computed(() => store.state.isLoading);
    const cookieIsCheck = computed(() => store.state.cookieIsCheck);

    // DOM objects
    const loadingCanvas = ref(null);

    const frame = ref(null);
    const keio = ref(null);
    const sfc = ref(null);
    const kanji = ref(null);
    const lab = ref(null);

    // GSAP timeline
    let loopAnimation = {};

    const loadingUIHide = () => {
      store.commit('loadingIsShowSet', false);
      enableBodyScroll(loadingCanvas.value);
      setTimeout(() => {
        loopAnimation.pause();
      }, 700);
    };

    onMounted(() => {
      nextTick(() => {
        disableBodyScroll(loadingCanvas.value);

        loopAnimation = gsap.timeline({
          ease: 'power1.out',
          repeat: -1,
          onRepeat: () => {
            if (!alreadyRepeat.value) alreadyRepeat.value = true;
            if (!isLoading.value && alreadyRepeat.value) {
              loadingUIHide();
            }
          },
        });
        loopAnimation.to(frame.value, {
          rotate: -30,
          scale: 0,
          transformOrigin: 'left bottom',
          duration: 0.1,
        });
        loopAnimation.to(frame.value, {
          rotate: 0,
          scale: 1,
          opacity: 1,
          transformOrigin: 'left bottom',
          duration: 0.8,
        });
        loopAnimation.to([keio.value, sfc.value], {
          y: 10,
          duration: 0.1,
        }, '<0');
        loopAnimation.to(keio.value, {
          y: 0,
          opacity: 1,
          duration: 0.6,
        });
        loopAnimation.to(sfc.value, {
          y: 0,
          opacity: 1,
          duration: 0.6,
        }, '<0.3');
        loopAnimation.to([kanji.value, lab.value], {
          x: -10,
          duration: 0.1,
        }, '<0');
        loopAnimation.to(kanji.value, {
          x: 0,
          opacity: 1,
          duration: 0.6,
        }, '<0.15');
        loopAnimation.to(lab.value, {
          x: 0,
          opacity: 1,
          duration: 0.6,
        }, '<0.3');
        loopAnimation.to([frame.value, keio.value, sfc.value, kanji.value, lab.value], {
          opacity: 0,
          duration: 0.6,
        }, '>0.6');
      });
    });

    watch(isLoading, (val) => {
      if (cookieIsCheck.value) {
        if (!val) {
          loadingUIHide();
        }
      }
    });

    return {
      isLoading,
      loadingCanvas,
      frame,
      keio,
      sfc,
      kanji,
      lab,
      loadingIsShow,
      alreadyRepeat,
    };
  },
}).use(window.store).mount('#loading');
