<script setup>
import { ref } from 'vue'
import { useCookies } from 'vue3-cookies'
import { decodeCredential } from 'vue3-google-login'

const { cookies } = useCookies()
const { fetchData } = defineProps(["fetchData"])

const destination = ref({
    location: ''
})
const userEmail = ref()
// let isLoggedIn = ref(false)

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

const checkSession = () => {
    if( cookies.isKey('user_session') ) {
        // isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userEmail.value = userData.email
    }
}

</script>

<template>
    <h3>Add new Destination</h3>
    <h4>What! Got a holiday planned? Let's get the planning started!</h4>
    <form target="_self" @submit.prevent="addDestination">
        <label for="destination"></label>
        <input type="text" name="destination" placeholder="destination" style="text-align: center;" v-model="destination.location" required>
        <button type="submit">Add</button>
    </form>
</template>