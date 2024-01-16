<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <div class="wrapper">
      <nav>
        <p>B.E.E</p>
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/destination">Destination</RouterLink></li>
          <li><RouterLink to="/visited">Visited</RouterLink></li>
        </ul>
      </nav>
    </div>
  <RouterView />
</template>
