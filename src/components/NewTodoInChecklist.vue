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

  fetch(
    `${import.meta.env.VITE_API_URL}/destination/${
      route.params.id
    }/checklist/add`,
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
    <!-- <div class="paddedLeft"> -->
    <h4>Add new To-do</h4>
    <form target="_self" @submit.prevent="addTodo">
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
    </form>
  <!-- </div> -->
</template>
