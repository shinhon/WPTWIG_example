import { ref, onUnmounted } from 'vue';

function scroll() {
  const scrollPosY = ref(0);
  const scrollPosPrev = ref(0);
  const scrollDistence = ref(0);

  const scrollEvent = () => {
    scrollPosY.value = window.pageYOffset;
    scrollDistence.value = scrollPosY.value - scrollPosPrev.value;
    scrollPosPrev.value = scrollPosY.value;
  };

  window.addEventListener('scroll', scrollEvent);

  onUnmounted(() => {
    window.removeEventListener('scroll', scrollEvent);
  });

  return {
    scrollPosY,
    scrollPosPrev,
    scrollDistence,
    scrollEvent,
  };
}

export default scroll;
