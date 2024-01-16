<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

const destinationBe = ref([])

function fetchData() {
  fetch(`${import.meta.env.VITE_API_URL}/destination`)
  .then( response => response.json() )
  .then( result => {
    destinationBe.value = result
  })
}
onMounted(fetchData)
</script>

<template>
  <header>
    <h1>Breezy Easy Escapade</h1>
    <h3 id="headerH3">"Your one stop spot for a carefree travel"</h3>
  </header>
  <br>
  <div class="paddedLeft">
    <button>
      <RouterLink :to="'/destination'">
      Your Destinations
    </RouterLink>
    </button>
  </div>
</template>
