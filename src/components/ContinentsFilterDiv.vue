<script setup>
import '../assets/continentsFilter.css';
import { ref, defineEmits, defineProps } from 'vue';

const emit = defineEmits();
const props = defineProps({
  selectedContinents: {
    type: Array,
    required: true,
  },
});

const continents = ['Africa', 'North America', 'South America', 'Antarctica', 'Asia', 'Oceania', 'Europe'];

const logSelection = (continent) => {
  if (props.selectedContinents.includes(continent)) {
    const index = props.selectedContinents.indexOf(continent);
    if (index !== -1) {
      props.selectedContinents.splice(index, 1);
    }
  } else {
    props.selectedContinents.push(continent);
  }
  
  emit('continents-selected', [...props.selectedContinents]);
};

const clearSelection = () => {
  props.selectedContinents.length = 0;
  console.log('Continentes seleccionados:', props.selectedContinents);
  emit('continents-selected', []);
};

const maintainFocus = (e) => {
  e.preventDefault();
};
</script>

<template>
  <div class="continentsFilter w-full md:w-2/3 bg-white rounded-lg p-6" @mousedown="maintainFocus">
    <div class="flex justify-between px-5">
      <h1>Filtrar por continentes</h1> 
      <a href="#" class="text-[#009cff] font-semibold" @click.prevent="clearSelection">Limpiar</a>
    </div>
    <div class="grid w-full grid-cols-2 gap-4 p-5 md:grid-cols-3 justify-items-center items-center">
      <div v-for="continent in continents" :key="continent" class="continent-map-container flex flex-col text-wrap h-28 items-center">
        <input 
          type="checkbox" 
          :id="continent" 
          :checked="props.selectedContinents.includes(continent)" 
          class="hidden-checkbox" 
          @change="() => logSelection(continent)" 
        />
        <label :for="continent" class="label-contient flex flex-col items-center">
          <img :src="'/continents/' + continent + '.jpg'" alt="icon" class="continent-map-img w-20 h-20" />
          <h1 class="text-center">{{ continent }}</h1>
        </label>
      </div>
    </div>
  </div>
</template>
