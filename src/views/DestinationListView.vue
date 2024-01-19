<script setup>
import { ref, onMounted, inject } from 'vue'
import {  RouterLink } from "vue-router";
import NewDestination from '@/components/NewDestination.vue'

const isLoggedIn = inject('isLoggedIn')
const userEmail = inject('userEmail')
const checkSession = inject('checkSession')

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
    const response = await fetch(`${import.meta.env.VITE_API_URL}/destination`,{
      headers: {
        "user-email": userEmail.value,
        "Content-Type": "application/json"
      }
    });
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
  <div class="article">
    <p>
    "In the realm of relaxed travel, the world opens its arms to those seeking serenity and unhurried exploration. 
    Imagine meandering through charming streets, where time seems to slow down, allowing you to savor each moment. 
    Whether it's the sun-kissed beaches, quaint villages, or lush landscapes,
    relaxed travel beckons you to embrace the local rhythm. Wander at your own pace, savoring local flavors, 
    engaging with friendly locals, and immersing yourself in the beauty of diverse cultures. 
    This style of travel is about finding tranquility in every corner of the globe, 
    allowing the journey itself to become a destination, and creating memories that linger like a gentle breeze."
   </p>
  </div>
  <div class="listDestination" v-if="isLoggedIn">
    <NewDestination :fetchData="fetchData" v-if="isLoggedIn"/>
    <br>
    <div>
      <!-- <h5>Pending Destinations</h5> -->
      <h3 v-for="destination in destinationBe" :key="destination.id">
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
      </h3>
    </div>
  </div>
  <div v-else>
    <h5><RouterLink to="/login">Login </RouterLink>to start creating your checklist!</h5>
  </div>
</template>

<style>
.article p{
  max-width: 90vmin;
  margin: auto;
  text-align: center;
  padding-bottom: 2vmin;
  font-size: 1.7vmin;
  background-color: rgba(88, 102, 31, 0.1);
  border-radius: 10px;
  padding: 2vmin;
}

.listDestination {
  margin: 3vmin auto;
  padding: 3vmin 3vmin 4vmin;
  background-color:  rgba(226, 205, 242, 0.2);
  width: 50vmin;
  text-align: center;
  font-family: "Salsa", cursive;
  font-weight: 400;
  font-style: normal;
}

.listDestination h3{
  padding-left: 0;
}

h5 {
  text-align: center;
  margin: 2vmin auto;
  font-size: 2vmin;
}

.buttons-container {
  padding-right: 10px;
}

.buttons-container button {
  line-height: 1;
}
</style>