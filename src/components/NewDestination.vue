<script setup>
import { ref, inject } from 'vue'

const { fetchData } = defineProps(["fetchData"])
const userEmail = inject('userEmail')
const checkSession = inject('checkSession')

const destination = ref({
    location: ''
})

function clearForm() {
    destination.value = {
        location: ""
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function addDestination() {
    checkSession()
    if ( destination.value.location === '' ) {
        return
    }
    destination.value.location = capitalizeFirstLetter(destination.value.location);

    fetch(`${import.meta.env.VITE_API_URL}/destination/add`, {
        method: 'POST',
        headers: {
        "user-email": userEmail.value,
        "Content-Type": "application/json"
        },
        body: JSON.stringify(destination.value)
    })
    .then(() => {
        fetchData()
        clearForm()
    })
    .catch(err => console.error(err))
}

</script>

<template>
    <h4>Add new Destination</h4>
    <form target="_self" @submit.prevent="addDestination" class="newDestinationForm">
        <label for="destination"></label>
        <input type="text" name="destination" placeholder="destination" class="form-control" v-model="destination.location" required>
        <button type="submit" class="btn btn-outline-secondary"><img src="/favicon.ico" alt="bee logo"></button>
    </form>
</template>

<style>
.newDestinationForm .btn-outline-secondary {
    max-height: 4vmin;
    margin-bottom: 0.5vmin;
}

button img {
    height: 24px;
    padding-bottom: 5px;
}

.form-control {
    padding-left: 4vmin;
    text-align: center;
    display: inline;
    width: 70%;
}
</style>