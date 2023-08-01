import './main';
import {
  onMounted, createApp, nextTick, ref, reactive, watch, toRef,
} from 'vue';
import { useStore } from 'vuex';
import gsap from 'gsap';
import Swiper, { Navigation, Autoplay } from 'swiper';
import vgsap from './modules/vgsap';

import vScollText from './vue/vScrollText.vue';

Swiper.use([Navigation, Autoplay]);

// eslint-disable-next-line no-undef
createApp({
  name: 'HomePart',
  compilerOptions: {
    delimiters: ['${', '}'],
  },
  components: {
    'v-scroll-text': vScollText,
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      // setup header defalt color in homepage
      store.commit('header/set_headerHasColor', true);
      store.commit('header/set_startColor', true);
    });

    // banner swipe
    const homebannerSwiperText = reactive({});
    const homebannerSwiperImg = reactive({});
    const bannerSwipeText = ref(null);
    const bannerSwipeImg = ref(null);
    const homebannerActiveIndex = ref(0);
    const swipeTextFirst = ref(null);
    const swipeTextHeight = ref(0);
    const swipeTextHeightPx = ref('');

    // methods for custom navigation
    const updateBannerSwipes = (index) => {
      homebannerSwiperText.value.slideTo(index);
    };

    const updateHomebannerIndex = (index) => {
      if (index !== homebannerActiveIndex.value) {
        homebannerActiveIndex.value = index;
      }
    };

    const homebannerNaviIsActive = (dotIndex, activeIndex) => {
      if (dotIndex === activeIndex) {
        return true;
      }
      return false;
    };

    const checkActiveSwipes = (elInteract, elWaitForCheck) => {
      const indexInteract = elInteract.activeIndex;
      const indexWaitForCheck = elWaitForCheck.activeIndex;
      updateHomebannerIndex(indexInteract);
      if (indexInteract !== indexWaitForCheck) {
        elWaitForCheck.slideTo(indexInteract);
      }
    };

    // GSAP for Deco Square
    const loadingIsShow = toRef(store.state, 'loadingIsShow');
    const decoSquare = ref(null);

    watch(loadingIsShow, (val) => {
      if (!val.value) {
        setTimeout(() => {
          gsap.to(decoSquare.value, {
            rotation: 20,
            opacity: 1,
            x: 0,
            ease: 'power1.out',
            duration: 0.6,
          });
        }, 700);
      }
    });

    // GSAP for square transition
    const squareTimeline = gsap.timeline({
      ease: 'power1.out',
    });

    const squareTransition = () => {
      squareTimeline.to(decoSquare.value, {
        rotation: 0,
        opacity: 0,
        xPercent: -40,
        duration: 0.3,
      });
      squareTimeline.to(decoSquare.value, {
        rotation: 20,
        opacity: 1,
        xPercent: 0,
        duration: 0.5,
      });
    };

    onMounted(() => {
      nextTick(() => {
        // update textheight of first slide to make every slides has same height
        swipeTextHeight.value = swipeTextFirst.value.scrollHeight;
        swipeTextHeightPx.value = `${swipeTextHeight.value}px`;

        homebannerSwiperText.value = new Swiper(bannerSwipeText.value, {
          speed: 800,
          spaceBetween: 100,
          autoplay: {
            delay: 8000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
        });

        homebannerSwiperImg.value = new Swiper(bannerSwipeImg.value, {
          speed: 800,
          spaceBetween: 10,
        });

        // On swiper update
        homebannerSwiperText.value.on('slideChange', () => {
          squareTransition();
          checkActiveSwipes(homebannerSwiperText.value, homebannerSwiperImg.value);
        });
        homebannerSwiperImg.value.on('slideChange', () => {
          checkActiveSwipes(homebannerSwiperImg.value, homebannerSwiperText.value);
        });
      });
    });

    // Project swipe
    const projectSwipe = ref(null);
    const projectSwiperPrev = ref(null);
    const projectSwiperNext = ref(null);
    const projectSwiper = reactive({});

    onMounted(() => {
      nextTick(() => {
        projectSwiper.value = new Swiper(projectSwipe.value, {
          speed: 600,
          slidesPerView: 1,
          spaceBetween: 16,
          breakpoints: {
            768: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          },
          navigation: {
            nextEl: projectSwiperNext.value,
            prevEl: projectSwiperPrev.value,
            disabledClass: 'c-naviRoundBtn-disable',
          },
        });
      });
    });

    // VGSAP
    vgsap();

    return {
      loadingIsShow,
      bannerSwipeText,
      bannerSwipeImg,
      homebannerSwiperText,
      homebannerSwiperImg,
      homebannerActiveIndex,
      swipeTextFirst,
      swipeTextHeight,
      swipeTextHeightPx,
      decoSquare,
      checkActiveSwipes,
      updateBannerSwipes,
      updateHomebannerIndex,
      homebannerNaviIsActive,
      projectSwipe,
      projectSwiperPrev,
      projectSwiperNext,
      projectSwiper,
    };
  },
}).use(window.store).mount('#Home');
