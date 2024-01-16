<script setup>
import { ref, onMounted } from 'vue'
import {  RouterLink } from "vue-router";
import NewDestination from '@/components/NewDestination.vue'

const destinationBe = ref([])
const editModeDestinationId = ref(null);

function enterEditMode(destinationId) {
  editModeDestinationId.value = destinationId;
}

function exitEditMode() {
  editModeDestinationId.value = null;
}

function isEditMode(destinationId) {
  return editModeDestinationId.value === destinationId;
}

async function updateDestination(destinationId, updatedLocation) {
  console.log(destinationId)
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/destination/${destinationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ location: updatedLocation })
    });
    console.log(updatedLocation)
    exitEditMode();
    await fetchData();
  } catch (err) {
    console.error(err);
  }
}

async function fetchData() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/destination`);
    const result = await response.json();
    destinationBe.value = result;
  } catch (err) {
    console.error(err);
  }
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

function handleButtonClick(destinationId, location) {
  if (isEditMode(destinationId)) {
    updateDestination(destinationId, location);
  } else {
    enterEditMode(destinationId);
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
    <div class="locationAlign">
    <RouterLink :to="'/destination/' + destination._id">
      <span v-if="!isEditMode(destination._id)">{{ destination.location }}</span>
      <input v-else v-model="destination.location" @blur="exitEditMode" @click.prevent/>
    </RouterLink> &nbsp;
    <div class="buttons-container">
    <button @click="deleteDestination(destination._id, destination.location)" class="btn btn-outline-secondary btn-sm">x</button> 
      <button @click="handleButtonClick(destination._id, destination.location)" class="btn btn-outline-secondary btn-sm">
          {{ isEditMode(destination._id) ? '&#10003;' : '&#x270E;' }}
        </button>
    </div>
  </div>
  </h2>
  <br>
  
  <NewDestination :fetchData="fetchData" />
</template>

