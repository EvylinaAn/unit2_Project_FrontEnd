<script setup>
import { ref } from 'vue'

const { fetchData } = defineProps(["fetchData"])

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
    if ( destination.value.location === '' ) {
        return
    }
    destination.value.location = capitalizeFirstLetter(destination.value.location);

    fetch(`${import.meta.env.VITE_API_URL}/destination/add`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
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
    <h2>Add new Destination</h2>
    <h3>What! Got a holiday planned? Let's get the planning started!</h3>
    <form target="_self" @submit.prevent="addDestination">
        <label for="destination"></label>
        <input type="text" name="destination" placeholder="destination" style="text-align: center;" v-model="destination.location" required>
        <button type="submit">Add</button>
    </form>
</template>