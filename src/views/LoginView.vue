<script setup>
import { useCookies } from 'vue3-cookies'
import { decodeCredential, googleLogout } from 'vue3-google-login'
import { onMounted, inject } from 'vue'
import { RouterLink } from "vue-router";

const { cookies } = useCookies()

const isLoggedIn = inject('isLoggedIn')
const userName = inject('userName')
const checkSession = inject('checkSession')

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


const handleLogout = () => {
    googleLogout()
    cookies.remove('user_session')
    isLoggedIn.value = false
}

onMounted(checkSession)

</script>

<template>
    <!-- <h3>Welcome to B.E.E</h3> -->
    <div class="loginBody">
        <div class="login">
        <h2 v-if="isLoggedIn">Logout</h2>
        <h2 v-else>
            <RouterLink to="/">Login</RouterLink>
        </h2>
        <!-- <h2>Hello {{ userName.toUpperCase() }}</h2>         -->
        <img src="/favicon.ico" alt="bee logo">
            <div v-if="isLoggedIn">
                <div >
                <button @click="handleLogout" class="btn btn-outline-secondary">Log Out</button>
                </div>
            </div>
            <div class="loginGoogle" v-else>
                <GoogleLogin :callback="callback" />
                 <!-- <RouterLink  to="/" /> -->
            </div>
        </div>
    </div>
</template>


<style>
nav{
    background-color: beige;
}

.loginBody {
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 30vmin;
    margin: 30vmin auto;
    height: 25vmin;
    border: 1px solid rgba(255, 255, 255, 0.67);
    border: 1px solid rgba(255, 100, 225, 0.2);
    /* border: 1px solid rgba(88, 102, 31, 0.6); */
    padding: 20px 20px 25px;
    text-align: center;
}

.loginBody img {
    height: 6vmin;
    margin-top: 1.6vmin;
}

.login button, .loginGoogle{
    margin-top: 2.2vmin;
}

h3 {
    margin: auto;
}

</style>