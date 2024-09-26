import { ref } from 'vue';
import axios from 'axios';

export default function useCountries() {
  const flagUrls = ref(new Map());

  const fetchFlags = async (countries) => {
    for (const country of countries) {
      const flagUrl = await getFlagImage(country.name);
      if (flagUrl) {
        flagUrls.value.set(country.code, flagUrl);
      }
    }
  };

  const getFlagImage = async (countryName) => {
    const apiKey = '46182033-ffd124341c75dd49daacc8c35';
    try {
      const response = await axios.get(`https://pixabay.com/api/?key=${apiKey}&q=${countryName}+flag&image_type=photo`);
      return response.data.hits[0]?.webformatURL;
    } catch (error) {
      console.error(`Error al obtener la bandera para ${countryName}:`, error);
      return null;
    }
  };

  const getFlagUrl = (countryCode) => {
    return flagUrls.value.get(countryCode) || '';
  };

  return {
    fetchFlags,
    getFlagUrl,
  };
}
