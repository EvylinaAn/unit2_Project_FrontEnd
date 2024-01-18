<script setup>
import { ref, onMounted } from 'vue'
import {  RouterLink } from "vue-router";
import NewDestination from '@/components/NewDestination.vue'
import { useCookies } from 'vue3-cookies'
import { decodeCredential } from 'vue3-google-login'

const { cookies } = useCookies()

const destinationBe = ref([])
const editModeDestinationId = ref(null);
const isLoggedIn = ref(false)
const userName = ref('')
const userEmail = ref()

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
    const response = await fetch(`${import.meta.env.VITE_API_URL}/destination`,{
      headers: {
        "user-email": userEmail.value,
        "Content-Type": "application/json"
      }
    });
    const result = await response.json();
    destinationBe.value = result;
    // console.log("destinationBe", result)
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

const checkSession = () => {
    if( cookies.isKey('user_session') ) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName.value = userData.given_name
        userEmail.value = userData.email
    }
}

onMounted(() => {
  checkSession()
  fetchData()
})

</script>

<template>
  <header>
    <br>
    <h1>Upcoming Destination</h1>
    <h3>"Where exciting times await"</h3>
    <br>
  </header>
  <br>
  <h3 v-for="destination in destinationBe" :key="destination.id">
    <!-- <div class="locationAlign"> -->
      <RouterLink :to="'/destination/' + destination._id">
        <span v-if="!isEditMode(destination._id)">{{ destination.location }}</span>
        <input v-else v-model="destination.location" type="text" @blur="exitEditMode" @click.prevent/>
      </RouterLink> &nbsp;
      <div class="buttons-container" v-if="isLoggedIn">
      <button @click="deleteDestination(destination._id, destination.location)" class="btn btn-outline-secondary btn-sm">x</button> 
      <button @click="handleButtonClick(destination._id, destination.location)" class="btn btn-outline-secondary btn-sm">
          {{ isEditMode(destination._id) ? '&#10003;' : '&#x270E;' }}
        </button>
    </div>
  <!-- </div> -->
  </h3>
  <br>
      <NewDestination :fetchData="fetchData" v-if="isLoggedIn"/>
</template>





<!-- <style scoped>
.buttons-container {
  display: flex;
  flex-direction: row;
}
</style> -->