<template>
  <div ref="wrap" class="group">
    <div class="overflow-auto pb-10" :style="{ 'max-height': textHeightPx }">
      <slot></slot>
    </div>
    <div class="absolute w-full h-5 bottom-5 left-0 bg-gradient-to-t from-pri-300" style="-webkit-transform: translate3d(0,0,0);"></div>
    <div class="absolute w-full h-5 bottom-0 left-0 bg-pri-300" style="-webkit-transform: translate3d(0,0,0);"></div>
    <div v-if="hintIsShow" class="absolute w-full h-auto bottom-0 left-0 flex justify-center" style="-webkit-transform: translate3d(0,0,0);">
        <div class="w-5 h-5 bg-pri-700 rounded-full flex items-center justify-center flex-shrink-0 group-hover:opacity-0 duration-300 ease-IO">
            <i class="icon-arrow-down text-small leading-none text-white"></i>
        </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref, toRefs, watch,
} from 'vue';

const wrap = ref(null);

const hintIsShow = ref(false);

const props = defineProps({
  textHeight: {
    type: Number,
  },
  textHeightPx: {
    type: String,
  },
});

const { textHeight, textHeightPx } = toRefs(props);

watch(textHeight, (val, pval) => {
  if (val < wrap.value.scrollHeight) {
    hintIsShow.value = true;
  }
});
</script>
