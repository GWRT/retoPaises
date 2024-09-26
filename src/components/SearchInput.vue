<script setup>
import { ref, computed, defineEmits } from 'vue';
import '../assets/continentsFilter.css';
import Filter from '../components/ContinentsFilterDiv.vue';
import { useQuery } from '@vue/apollo-composable';
import { GET_COUNTRIES } from '@/components/requestPeticions/countries.js';

const emit = defineEmits();
const searchQuery = ref('');
const isMenuVisible = ref(false);
const selectedContinents = ref([]);
const { result, loading, error } = useQuery(GET_COUNTRIES);

const showMenu = () => {
  isMenuVisible.value = true;
};

const hideMenu = (event) => {
  if (!event.relatedTarget || !event.relatedTarget.closest('.continentsFilter')) {
    isMenuVisible.value = false;
  }
};

const filteredCountries = computed(() => {
  if (loading.value || error.value || !result.value) return [];
  return result.value.countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesContinent = selectedContinents.value.length > 0 
      ? selectedContinents.value.includes(country.continent.name) 
      : true;
    return matchesSearch && matchesContinent;
  });
});

const handleSearch = () => {
  emit('countries-filtered', filteredCountries.value);
};

const handleContinentsSelection = (continents) => {
  selectedContinents.value = continents;
  handleSearch();
};
</script>

<template>
  <div class="inputContainer flex items-center justify-between w-2/3 h-20 border-2 rounded-full shadow-lg px-7 bg-white">
    <div class="flex flex-col w-3/5">
      <h1 class="font-semibold">País</h1>
      <input 
        type="text" 
        id="search-input" 
        placeholder="Escribe el país que deseas ver" 
        class="outline-none border-b-2 border-transparent focus:border-blue-500 shadow-none text-[#676767]"
        v-model="searchQuery"
        @input="handleSearch"
        @focus="showMenu"
        @focusout="hideMenu"
      />
      <Filter v-if="isMenuVisible" :selectedContinents="selectedContinents" @continents-selected="handleContinentsSelection" />
    </div>
    <button class="bg-[#009cff] flex gap-x-2 py-2 px-2 md:px-4 rounded-full text-white justify-center items-center text-lg">
      <img src="@/components/icons/lupe.svg" alt="icon" class="w-7" />
      <span class="hidden lg:flex">Buscar</span>
    </button>
  </div>
</template>
