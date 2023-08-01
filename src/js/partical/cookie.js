import { createApp, computed, onMounted } from 'vue';

import { useStore } from 'vuex';

createApp({
  name: 'CookiePart',
  compilerOptions: {
    delimiters: ['${', '}'],
  },
  setup() {
    const store = useStore();

    const cookieIsCheck = computed(() => store.state.cookieIsCheck);

    const cookieSet = (cname, cvalue, exdays) => {
      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      const expires = `expires=${d.toGMTString()}`;
      document.cookie = `${cname}=${cvalue};${expires};path=/`;
    };

    const cookieGet = (cname) => {
      const cookieCheck = `${cname}=`;
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i += 1) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(cookieCheck) === 0) {
          return c.substring(cookieCheck.length, c.length);
        }
      }
      return '';
    };

    const cookieCheckStart = () => {
      const isCheck = cookieGet('cookieCheck');
      if (isCheck === '1') {
        store.commit('cookieIsCheckSet', true);
      } else {
        store.commit('cookieIsCheckSet', false);
      }
    };

    const cookieClick = () => {
      cookieSet('cookieCheck', 1, 30);
      store.commit('cookieIsCheckSet', true);
    };

    onMounted(() => {
      cookieCheckStart();
    });

    return {
      cookieIsCheck,
      cookieClick,
    };
  },
}).use(window.store).mount('#cookie');
