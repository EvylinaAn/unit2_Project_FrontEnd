<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted, provide } from 'vue'
import { isLoggedIn, userName, userEmail, userSub, checkSession } from '@/stores/globalProvider.js'


provide('isLoggedIn', isLoggedIn);
provide('userName', userName);
provide('userSub', userSub);
provide('userEmail', userEmail);
provide('checkSession', checkSession);

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
          <RouterLink to="/">
            <div class="logoDiv">
              <img src="/favicon.ico" alt="bee logo">
              <p v-if="isLoggedIn"> &nbsp;Hello, {{ userName }}</p>
              <p v-else>B.E.E</p>
            </div>
          </RouterLink>
           <ul>
              <li><RouterLink to="/">Home</RouterLink></li>
              <li><RouterLink to="/destination">Destination</RouterLink></li>
              <li><RouterLink v-if="isLoggedIn" to="/login">Logout</RouterLink> <RouterLink v-else to="/login">Login</RouterLink></li>
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
  font-family: "Salsa", cursive;
  font-weight: 400;
  font-style: normal;
}

footer div{
  display: flex;
  max-height: 2vmin;
  justify-content: center;
  margin-top: 0.5vmin;
  /* text-align: center; */
}

footer img{
  /* padding-top: 0.5vmin; */
  height: 22px;
}

.logoDiv img {
  height: 22px;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 8px 0 15px;
  /* background-color:  rgba(235, 218, 249, 0.6); */
  /* background-color: rgba(226, 205, 242, 0.6);} */
  background-color: rgba(88, 102, 31, 0.6);
  font-family: "Salsa", cursive;
  font-weight: 400;
  font-style: normal;
  
}

.navNRouter {
  padding-bottom: 5vmin;
}

</style>