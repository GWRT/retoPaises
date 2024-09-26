<script setup>
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_COUNTRY_DETAILS } from "@/components/requestPeticions/detailcountry.js";

const props = defineProps({
  country: {
    type: Object,
    required: true,
  },
  getFlagUrl: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(['close']);

const { result, loading, error } = useQuery(GET_COUNTRY_DETAILS, () => ({
  code: props.country.code,
}));

const countryDetails = computed(() => result.value?.country || null);

const closeDetails = () => {
  emit('close');
};
</script>

<template>
  <div class="flex flex-col w-1/3 mt-10 bg-white min-h-56 px-5 py-2 border-2 rounded-xl shadow-xl">
    <button @click="closeDetails" class="self-end text-red-500 mb-2">X</button>
    <div v-if="error">Error: {{ error.message }}</div>
    <div v-if="countryDetails" class="text-[#676767]">
      <img
        :src="getFlagUrl(country.code)"
        alt="img"
        v-if="getFlagUrl(country.code)"
        class="w-full max-h-28 rounded-2xl"
      />
      <h2 class="text-center text-[#009aff] font-bold">
        {{ countryDetails.name }}
      </h2>
      <p class="text-center">{{ country.continent.name }}</p>
      <p>
        <span class="font-bold text-[#009aff]">Capital:</span>
        {{ countryDetails.capital }}
      </p>
      <p>
        <span class="font-bold text-[#009aff]">Moneda:</span>
        {{ countryDetails.currency }}
      </p>
      <div>
        <h3 class="font-bold text-[#009aff]">Idiomas:</h3>
        <ul>
          <li v-for="language in countryDetails.languages" :key="language.name">
            {{ language.name }} ({{ language.native }})
          </li>
        </ul>
      </div>
      <div class="">
        <h3 class="font-bold text-[#009aff]">Estados:</h3>
        <ul class="flex flex-col h-36 overflow-auto">
          <li v-for="state in countryDetails.states" :key="state.name">
            {{ state.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>