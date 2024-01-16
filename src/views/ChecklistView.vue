<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import NewTodoInChecklist from '@/components/NewTodoInChecklist.vue'

const checklistBe = ref([]);
const route = useRoute()

function deleteTodo(todoId) {
    fetch(`${import.meta.env.VITE_API_URL}/destination/${route.params.id}/checklist/${todoId}`, {
      method: "DELETE"
    })
    .then(() => {
      fetchData()
    })
    .catch(err => console.error(err))
  }

function fetchData() {
  fetch(`${import.meta.env.VITE_API_URL}/destination/${route.params.id}/checklist`)
    .then((response) => response.json())
    .then((result) => {
      checklistBe.value = result;
    })
    .catch((err) => console.error(err));
}

onMounted(fetchData)

</script>

<template>
  <header>
    <br>
    <h1>Checklist</h1>
</header>
<br>
<div class="form-check" v-for="checklist in checklistBe" :key="checklist._id">
  <input  class="form-check-input" type="checkbox" value="" id="checkbox_{{ checklist._id }}" >
  <label class="form-check-label" :for="'checkbox_' + checklist._id" >
    {{ checklist.todo }} &nbsp;
</label>
<button @click="deleteTodo(checklist._id)" class="btn btn-outline-secondary btn-sm">-</button>
</div>
<NewTodoInChecklist :fetchData="fetchData" />
</template>
