<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from "vue-router";
import NewDestination from '@/components/NewDestination.vue'

const destinationBe = ref([])

function fetchData() {
  fetch(`${import.meta.env.VITE_API_URL}/destination`)
  .then( response => response.json() )
  .then( result => {
    destinationBe.value = result
  })
}

function deleteDestination(destinationId, location) {
  const shouldDelete = window.confirm(`Are you sure you want to delete ${location.toUpperCase()}`)

  if (shouldDelete){ 
    fetch(`${import.meta.env.VITE_API_URL}/destination/${destinationId}`, {
      method: "DELETE"
    })
    .then(() => {
      fetchData()
    })
    .catch(err => console.error(err))
  }
}
onMounted(fetchData)

</script>

<template>
  <header>
    <h1>Upcoming Destination</h1>
    <h3>"Where exciting times await"</h3>
  </header>
  <br>
  <h2 v-for="destination in destinationBe" :key="destination.id">
    <RouterLink :to="'/destination/' + destination._id">{{ destination.location }}</RouterLink> &nbsp;
    <button @click="deleteDestination(destination._id, destination.location)" class="btn btn-outline-secondary btn-sm">-</button> &nbsp;
    <RouterLink :to="'/destination/update/' + destination._id">&#x270E;</RouterLink>
  </h2>
  <br>
  
  <NewDestination :fetchData="fetchData" />
</template>
