import { createApp } from 'vue';

const app = createApp({
  delimiters: ['${', '}'],
  data() {
    return {
      testText: 'Hello Vue',
      hasColor: false,
    };
  },
});

app.mount('#Home');
