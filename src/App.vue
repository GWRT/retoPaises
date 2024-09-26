<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import NavBar from "./components/NavBar.vue";
import SearchInput from "./components/SearchInput.vue";
import DataContainer from "./components/dataContainer/DataContainer.vue";
import CountryDetails from "./components/dataContainer/countryDetails.vue";
import useCountries from "./components/requestPeticions/useCountries.js";

const filteredCountries = ref([]);
const selectedCountry = ref(null);
const { fetchFlags, getFlagUrl } = useCountries();

const handleCountriesFiltered = (countries) => {
  filteredCountries.value = countries;
  fetchFlags(countries);
};

const handleCountrySelected = (country) => {
  fetchFlags([country]);
  selectedCountry.value = country;
};

const handleCloseDetails = () => {
  selectedCountry.value = null;
};

const route = useRoute();
const isHomeRoute = computed(() => route.path === "/");

</script>

<template>
  <div class="flex max-w-full">
    <NavBar />
    <main class="flex flex-col w-full items-center py-5 md:p-10 bg-[#e3f4ff]">
      <div v-if="isHomeRoute" class="flex flex-col w-full h-full items-center ">
        <SearchInput @countries-filtered="handleCountriesFiltered" />
        <div class="flex w-full">
          <DataContainer
            :filteredCountries="filteredCountries"
            @country-selected="handleCountrySelected"
          />
          <CountryDetails
            v-if="selectedCountry"
            :country="selectedCountry"
            :getFlagUrl="getFlagUrl"
            @close="handleCloseDetails"
            class="fixed inset-0 bg-white z-50 overflow-auto md:relative md:top-0 md:left-0 left-auto right-auto top-auto bottom-auto md:w-1/3 w-3/4 md:h-4/5 h-3/4"
          />
        </div>
      </div>
      <router-view v-else />
    </main>
  </div>
</template>
