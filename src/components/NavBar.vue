<script setup>
import "../assets/navbar.css";
</script>

<template>
  <div class="flex flex-col bg-[#676767] w-1/5 h-auto md:p-10 gap-y-2">
    <div class="hidden md:block w-full p-5 bg-white rounded-lg h-min">
      <h1 class="text-center font-bold text-[#676767]">LOGO</h1>
    </div>

    <div class="">
      <router-link
        to="/"
        class="opt-nav h-min w-full md:px-8 rounded-xl hover:bg-white"
      >
        <h1 class="text-nav text-white font-semibold">Home</h1>
      </router-link>

      <router-link
        to="/vista1"
        class="opt-nav h-min w-full md:px-8 rounded-xl hover:bg-white"
      >
        <h1 class="text-nav text-white font-semibold">Vista 1</h1>
      </router-link>

      <router-link
        to="/vista2"
        class="opt-nav h-min w-full md:px-8 rounded-xl hover:bg-white"
      >
        <h1 class="text-nav text-white font-semibold">Vista 2</h1>
      </router-link>
    </div>
  </div>
</template>
