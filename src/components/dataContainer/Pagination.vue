<template>
  <div class="flex mt-10 justify-center text-[#676767]">
    <button @click="previous" :disabled="currentPage === 1" class="mr-5 hover:text-black hover:font-bold">〈</button>
    <span class="select-none">Pagina {{ currentPage }} de {{ totalPages }}</span>
    <button @click="next" :disabled="currentPage === totalPages" class="ml-5 hover:text-black hover:font-bold">〉</button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    next() {
      this.$emit('next');
    },
    previous() {
      this.$emit('previous');
    },
  },
};
</script>