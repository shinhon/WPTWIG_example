import { onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function vgsap() {
  onMounted(() => {
    if (document.querySelector('.vgsap-fadeup')) {
      gsap.utils.toArray('.vgsap-fadeup').forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 50%',
            // toggleClass: "-appear",
            scrub: 1,
            once: true,
            // markers: true,
          },
          ease: 'Expo.easeOut',
          y: 50,
          opacity: 0,
        });
      });
    }
  });
}

export default vgsap;
