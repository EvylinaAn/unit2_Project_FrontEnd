<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const { fetchData } = defineProps(["fetchData"]);
const route = useRoute();

const checklist = ref({
  todo: "",
});

function clearForm() {
  checklist.value = {
    todo: "",
  };
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function addTodo() {
  if (checklist.value.todo === "") {
    return;
  }
  checklist.value.todo = capitalizeFirstLetter(checklist.value.todo);

  fetch(`${import.meta.env.VITE_API_URL}/destination/${route.params.id}/checklist/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checklist.value),
    }
  )
    .then(() => {
      fetchData();
      clearForm();
    })
    .catch((err) => console.error(err));
}
</script>

<template>

    <br>


    <!-- <form target="_self" @submit.prevent="addTodo">
        <label for="todo"></label>
        <input
        type="text"
        name="todo"
        placeholder="To-Do"
        style="text-align: center"
        v-model="checklist.todo"
        required
        />
        <button type="submit">Add</button>
    </form> -->

<div class="dropdown">
  <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
    New Todo
  </button>
  <form class="dropdown-menu p-4" @submit.prevent="addTodo">
  <div class="mb-3">
    <label for="todo" class="form-label"></label>
    <input class="form-control" type="text" name="todo" placeholder="To-Do" style="text-align: center" v-model="checklist.todo" required/>
    <button type="submit" class="btn btn-outline-secondary">+</button>
  </div>    
  </form>
</div>
  <!-- </div> -->
</template>


<style>

.dropdown {
  display: flex;
  justify-content: center;
  max-width: 70vmin;
  margin: auto;
}

.mb-3 {
  display: flex;
  justify-content: row;
  margin-bottom: 0 !important;
}

</style>