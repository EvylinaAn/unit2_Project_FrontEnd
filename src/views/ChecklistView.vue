<script setup>
import { ref, onMounted, inject } from "vue";
import { useRoute } from "vue-router";
import NewTodoInChecklist from '@/components/NewTodoInChecklist.vue'

const isLoggedIn = inject('isLoggedIn')
const checkSession = inject('checkSession')

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

onMounted(() => {
  checkSession()
  fetchData()
})

</script>

<template>
  <header>
    <br>
    <h1>Checklist</h1>
    <br>
  </header>
  <br>
  <div class="main">
  <br>
    <!-- <h4>P.S thank us later</h4> -->
    
    <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <div class="accordion-header-fixed">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            TO-DO</button>
          </h2>
        </div>
        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div class="accordion-body" v-for="checklist in checklistBe" :key="checklist._id">
            <input  class="form-check-input" type="checkbox" value="" id="checkbox_{{ checklist._id }}" v-if="isLoggedIn" style="border-color: rgba(152, 164, 106, 0.986);">
            <label class="form-check-label" :for="'checkbox_' + checklist._id" >
            {{ checklist.todo }} &nbsp;</label>
            <button v-if="isLoggedIn" @click="deleteTodo(checklist._id)" class="btn btn-outline-secondary btn-sm">-</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <NewTodoInChecklist :fetchData="fetchData" v-if="isLoggedIn"/>
</template> 

<style>
.main {
  text-align: center;
}

.accordion {
  max-width: 40vmin;
  padding-bottom: 1vmin;
  margin: 5vmin auto auto;
  display: flex;
  flex-direction: column;
  max-height: 50vmin;
  overflow-y: auto;
  border-bottom: 1px solid rgba(152, 164, 106, 0.2);
  font-family: "Salsa", cursive;
  font-weight: 400;
  font-style: normal;
  /* background-color: white; */
}

#collapseOne {
  border-color: rgba(152, 164, 106, 9);
}

.accordion-header-fixed{
  position: -webkit-sticky !important;
  position: sticky !important;
  top: 0;
  z-index: 1;
}

.accordion-collapse {
  padding-bottom: 1vmin;
}

.accordion-body {
  display: flex;
  padding-bottom: 0;
}

.accordion-body .form-check-label {
  margin-left: 1vmin;
}

.accordion-body .btn {
  margin-left: auto;
  align-items: flex-end;
  max-height: 2vmin;
  line-height: 1vmin;
}

.accordion-button:not(.collapsed) {
  /* background-color: rgba(152, 164, 106, 0.986); */
  background-color: rgb(230, 224, 234);
  z-index: 1;
}


.accordion-button:focus {
  border-color: rgb(88, 102, 31);
  box-shadow: none;
}

.form-check-input:checked {
  background-color: rgba(152, 164, 106, 0.986);
}

</style>