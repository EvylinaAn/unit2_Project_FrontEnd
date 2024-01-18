<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useCookies } from 'vue3-cookies'
import { decodeCredential } from 'vue3-google-login'
import { ref, onMounted } from 'vue'
// import  { useAuthStore } from './store/authStore.js';

const { cookies } = useCookies()
const isLoggedIn = ref(false)
const userName = ref('')
// const authStore = useAuthStore();

// const loggedState = () => {
//   authStore.isLoggedIn.value = cookies.isKey('user_session');
//   if (authStore.isLoggedIn) {
//      const userData = decodeCredential(cookies.get('user_session'));
//      authStore.userName = userData.given_name;
//   }
// }

const checkSession = () => {
    if( cookies.isKey('user_session') ) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName.value = userData.given_name
    }
}

onMounted(() => {
  checkSession()
  // loggedState()
})

</script>

<template>
  <body>    
    <div class="navNRouter">
    <div class="wrapper">
      <nav>
        <div class="logoDiv">
          <img src="/favicon.ico" alt="bee logo">
          <!-- <p>B.E.E</p> -->
          <p v-if="isLoggedIn"> &nbsp;Hello, {{ userName }}</p>
          <p v-else>B.E.E</p>
        </div>
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/destination">Destination</RouterLink></li>
          <li><RouterLink v-if="isLoggedIn" to="/login">Logout</RouterLink> <RouterLink v-else to="/login">Login</RouterLink></li>
          <!-- <li><RouterLink v-if="authStore.isLoggedIn" to="/login" @click="authStore.logout">Logout</RouterLink> <RouterLink v-else to="/login">Login</RouterLink></li> -->
        </ul>
      </nav>
    </div>
  <RouterView />
</div>
    <footer>
      <div>
      <img src="/favicon.ico" alt="bee logo">
      <p>B.E.E</p>
    </div>
  </footer>
</body>
</template>


<style>
.logoDiv {
  display: flex;
}

footer div{
  display: flex;
  max-height: 2vmin;
  justify-content: center;
  /* text-align: center; */
}

footer img, .logoDiv img{
  padding-top: 0.5vmin;
  height: 20px;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 8px 0 15px;
  background-color:  rgba(235, 218, 249, 0.6);
}

.navNRouter {
  padding-bottom: 5vmin;
}

</style>