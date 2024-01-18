<script setup>
import { useCookies } from 'vue3-cookies'
import { decodeCredential, googleLogout } from 'vue3-google-login'
import { ref, onMounted } from 'vue'

const { cookies } = useCookies()

let isLoggedIn = ref(false)
const userName = ref('')

const callback = (response) => {
    isLoggedIn.value = true
    const userData = decodeCredential(response.credential)
    console.log(userData)
    userName.value = userData.given_name
    cookies.set('user_session', response.credential)
    fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: 'POST',
        headers: {
            "user-email": userData.email,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userEmail: userData.email
        })
    })
    .then(() => {
        console.log("Session saved")
    })
    .catch( err => console.error(err))
} 

const checkSession = () => {
    if( cookies.isKey('user_session') ) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName.value = userData.given_name
    }
}

const handleLogout = () => {
    googleLogout()
    cookies.remove('user_session')
    isLoggedIn.value = false
}

onMounted(checkSession)

</script>

<template>
    <h2>Login</h2>
    <div v-if="isLoggedIn">
        <h2>hello {{ userName }}</h2>        
        <div class="paddedLeft">
          <button @click="handleLogout">Log Out</button>
        </div>
    </div>
    <div v-else class="paddedLeft">
        <GoogleLogin :callback="callback" />
    </div>
</template>


