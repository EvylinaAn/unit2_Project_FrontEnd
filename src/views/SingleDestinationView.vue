<script setup>
import { ref, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";

const destination = ref({});

function fetchData() {
  const route = useRoute();

  fetch(`${import.meta.env.VITE_API_URL}/destination/${route.params.id}`)
    .then((response) => response.json())
    .then((result) => {
      destination.value = result;
    })
    .catch((err) => console.error(err));
}

onMounted(fetchData);
</script>

<template>
  <header>
    <br>
    <h1>Welcome to {{ destination.location }}</h1>
    <br>
  </header>
  <div class="singleDestination">
    <p>
      We understand that packing and preparing for your trip can get a bit
      overwhelming, hence we're here to help with your worries. We've got a few
      recommendations of what we think you may need before you start your
      journey, however, feel free to add and edit the checklist as you please.
    </p>
    <h5>
      <RouterLink :to="'/destination/' + destination._id + '/checklist'">
        <button class="btn btn-outline-secondary">CHECKLIST</button>
      </RouterLink>
    </h5>
  </div>
</template>

<style>
.singleDestination {
 max-width: 60vmin;
 margin: 2vmin auto;
 text-align: center;
}

.singleDestination p {
  font-size: 2vmin;
}
</style>
