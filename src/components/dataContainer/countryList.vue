<template>
  <div
    class="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-1 p-5 justify-items-center items-center"
  >
    <div
      v-for="country in countries"
      :key="country.code"
      class="bg-white w-2/3 shadow-lg rounded-2xl"
      @click="selectCountry(country)"
    >
      <img
        :src="getFlagUrl(country.code)"
        alt="Bandera"
        v-if="getFlagUrl(country.code)"
        class="w-full max-h-28 rounded-t-2xl"
      />
      <p class="text-center text-[#009aff] font-bold">{{ country.name }}</p>
      <p class="text-center text-[#676767]">{{ country.continent.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    countries: {
      type: Array,
      required: true,
    },
    getFlagUrl: {
      type: Function,
      required: true,
    },
  },
  setup(_, { emit }) {
    const selectCountry = (country) => {
      emit("country-selected", country); // Emitir evento al seleccionar un país
    };

    return {
      selectCountry,
    };
  },
};
</script>
