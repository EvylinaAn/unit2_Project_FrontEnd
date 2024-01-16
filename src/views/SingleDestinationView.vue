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
  </header>
  <div class="paddedLeft">
    <p>
      We understand packing and preparing for your trip can get a bit
      overwhelming, hence we are here to help with your worries. We've got a few
      recommendations of what we think you may need before you start your
      journey, however, feel free to add and edit the checklist as you please.
    </p>
  </div>
  <h3>
    <RouterLink :to="'/destination/' + destination._id + '/checklist'">
      Checklist
    </RouterLink>
  </h3>
</template>
