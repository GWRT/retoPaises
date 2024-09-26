<template>
  <div class="w-full mt-5">
    <p v-if="loading">Cargando...</p>
    <p v-if="error">Error al cargar los datos: {{ error.message }}</p>

    <CountryList
      v-if="!loading && !error"
      :countries="paginatedCountries"
      :getFlagUrl="getFlagUrl"
      @country-selected="selectCountry"
    />

    <Pagination
      v-if="!loading && !error && totalPages > 1"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @next="nextPage"
      @previous="previousPage"
    />
  </div>
</template>

<script>
import { useQuery } from "@vue/apollo-composable";
import { GET_COUNTRIES } from "@/components/requestPeticions/countries.js";
import { ref, computed, watch } from "vue";
import CountryList from "./countryList.vue";
import Pagination from "./Pagination.vue";
import useCountries from "../requestPeticions/useCountries.js";
import SearchInput from "../SearchInput.vue";

export default {
  props: {
    filteredCountries: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    CountryList,
    Pagination,
    SearchInput,
  },
  setup(props, { emit }) {
    const { result, loading, error } = useQuery(GET_COUNTRIES);
    const { fetchFlags, getFlagUrl } = useCountries();

    const countries = computed(() => result.value?.countries || []);
    const currentPage = ref(1);
    const itemsPerPage = 9;

    const paginatedCountries = computed(() => {
      const sourceCountries =
        props.filteredCountries.length > 0
          ? props.filteredCountries
          : countries.value;
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return sourceCountries.slice(start, end);
    });

    const totalPages = computed(() => {
      const sourceCountries =
        props.filteredCountries.length > 0
          ? props.filteredCountries
          : countries.value;
      return Math.ceil(sourceCountries.length / itemsPerPage);
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    watch(countries, (newCountries) => {
      if (newCountries.length) {
        fetchFlags(newCountries);
      }
    });

    watch(
      () => props.filteredCountries,
      (newFilteredCountries) => {
        if (newFilteredCountries.length > 0) {
          currentPage.value = 1;
        }
      }
    );

    const updateFilteredCountries = (countries) => {
      filteredCountries.value = countries;
    };

    const selectCountry = (country) => {
      emit("country-selected", country);
    };

    return {
      countries,
      loading,
      error,
      getFlagUrl,
      paginatedCountries,
      currentPage,
      totalPages,
      nextPage,
      previousPage,
      updateFilteredCountries,
      selectCountry,
    };
  },
};
</script>
