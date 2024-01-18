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
    <div class="wrapper">
      <nav>
        <p>B.E.E</p>
        <img src="../src/assets/" alt="">
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/destination">Destination</RouterLink></li>
          <!-- <li><RouterLink to="/visited">Visited</RouterLink></li> -->
          <li><RouterLink v-if="isLoggedIn" to="/login">Logout</RouterLink> <RouterLink v-else to="/login">Login</RouterLink></li>
          <!-- <li><RouterLink v-if="authStore.isLoggedIn" to="/login" @click="authStore.logout">Logout</RouterLink> <RouterLink v-else to="/login">Login</RouterLink></li> -->

          <!-- <li></li> -->
        </ul>
      </nav>
    </div>
  <RouterView />
</template>
