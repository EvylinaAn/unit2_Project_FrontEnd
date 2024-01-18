<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import NewTodoInChecklist from '@/components/NewTodoInChecklist.vue'
import { useCookies } from 'vue3-cookies'
import { decodeCredential } from 'vue3-google-login'


const { cookies } = useCookies()

const checklistBe = ref([]);
const route = useRoute()
const isLoggedIn = ref(false)
const userName = ref('')

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

const checkSession = () => {
    if( cookies.isKey('user_session') ) {
        isLoggedIn.value = true
        const userData = decodeCredential(cookies.get('user_session'))
        userName.value = userData.given_name
    }
}

onMounted(() => {
  fetchData()
  checkSession()
})

</script>

<template>
  <header>
    <br>
    <h1>Checklist</h1>
</header>
<br>
<div class="main">
<br>
<h4>Packing <span style="font-size: 1.5vmin;">(P.S thank us later)</span></h4>
<br>
 <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Clothing
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body" v-for="checklist in checklistBe" :key="checklist._id">
        <input  class="form-check-input" type="checkbox" value="" id="checkbox_{{ checklist._id }}" v-if="isLoggedIn">
        <label class="form-check-label" :for="'checkbox_' + checklist._id" >
        {{ checklist.todo }} &nbsp;</label>
        <button v-if="isLoggedIn" @click="deleteTodo(checklist._id)" class="btn btn-outline-secondary btn-sm">-</button>
      </div>
      <NewTodoInChecklist :fetchData="fetchData" v-if="isLoggedIn"/>
    </div>
  </div>
 </div>
</div>
</template> 

<style>
.main {
  text-align: center;
}

</style>



<!-- static code below -->
      <!-- <div class="accordion-body" id="tops">
        <input  class="form-check-input" type="checkbox" value="" id="tops" v-if="isLoggedIn">
        <label class="form-check-label" for="tops">Tops &nbsp;</label>
        <button v-if="isLoggedIn" @click="(event) => remove(event.target)" class="btn btn-outline-secondary btn-sm">-</button>
      </div>
      <div class="accordion-body">
        <input  class="form-check-input" type="checkbox" value="" id="Shorts/Skirts" v-if="isLoggedIn">
        <label class="form-check-label" for="Shorts/Skirts">Shorts/Skirt &nbsp;</label>
        <button v-if="isLoggedIn" @click="(event) => remove(event.target)" class="btn btn-outline-secondary btn-sm">-</button>
      </div>
      <div class="accordion-body">
        <input  class="form-check-input" type="checkbox" value="" id="homeClothes" v-if="isLoggedIn">
        <label class="form-check-label" for="homeClothes">Home Clothes &nbsp;</label>
        <button v-if="isLoggedIn" @click="(event) => remove(event.target)" class="btn btn-outline-secondary btn-sm">-</button>
      </div>
      <div class="accordion-body">
        <input  class="form-check-input" type="checkbox" value="" id="underwear" v-if="isLoggedIn">
        <label class="form-check-label" for="underwear">Underwear &nbsp;</label>
        <button v-if="isLoggedIn" @click="(event) => remove(event.target)" class="btn btn-outline-secondary btn-sm">-</button>
      </div>
      <div class="accordion-body">
        <input  class="form-check-input" type="checkbox" value="" id="footwear" v-if="isLoggedIn">
        <label class="form-check-label" for="footwear">Footwear &nbsp;</label>
        <button v-if="isLoggedIn" @click="(event) => remove(event.target)" class="btn btn-outline-secondary btn-sm">-</button>
      </div>
      <div class="accordion-body">
        <input  class="form-check-input" type="checkbox" value="" id="swimwear" v-if="isLoggedIn">
        <label class="form-check-label" for="swimwear">Swimwear &nbsp;</label>
        <button v-if="isLoggedIn" @click="(event) => remove(event.target)" class="btn btn-outline-secondary btn-sm">-</button>
      </div>
      <div class="accordion-body">
        <input  class="form-check-input" type="checkbox" value="" id="coats" v-if="isLoggedIn">
        <label class="form-check-label" for="coats">Coats &nbsp;</label>
        <button v-if="isLoggedIn" @click="(event) => remove(event.target)" class="btn btn-outline-secondary btn-sm">-</button>
      </div>
      <div class="accordion-body">
        <input  class="form-check-input" type="checkbox" value="" id="socks" v-if="isLoggedIn">
        <label class="form-check-label" for="socks">Socks &nbsp;</label>
        <button v-if="isLoggedIn" @click="(event) => remove(event.target)" class="btn btn-outline-secondary btn-sm">-</button>
      </div>
      <div class="accordion-body">
        <input  class="form-check-input" type="checkbox" value="" id="hat" v-if="isLoggedIn">
        <label class="form-check-label" for="hat" >Hat/Cap &nbsp;</label>
        <button v-if="isLoggedIn" @click="(event) => remove(event.target)" class="btn btn-outline-secondary btn-sm">-</button>
      </div>
      <div class="accordion-body">
        <input  class="form-check-input" type="checkbox" value="" id="sunglasses" v-if="isLoggedIn">
        <label class="form-check-label" for="sunglasses" >Sunglasses &nbsp;</label>
        <button v-if="isLoggedIn" @click="(event) => remove(event.target)" class="btn btn-outline-secondary btn-sm">-</button>
      </div> -->


      <!-- unusable edit button code  -->
      <!-- <div class="form-check" v-for="checklist in checklistBe" :key="checklist._id">
  <input  class="form-check-input" type="checkbox" value="" id="checkbox_{{ checklist._id }}" v-if="isLoggedIn">
  <label class="form-check-label" :for="'checkbox_' + checklist._id" >
    {{ checklist.todo }} &nbsp;
</label>
<button v-if="isLoggedIn" @click="deleteTodo(checklist._id)" class="btn btn-outline-secondary btn-sm">-</button>
</div>
<NewTodoInChecklist :fetchData="fetchData" v-if="isLoggedIn"/> -->

<!-- <template>
  <header>
    <br>
    <h1>Checklist</h1>
</header>
<br>
<div class="form-check" v-for="checklist in checklistBe" :key="checklist._id">
  <input  class="form-check-input" type="checkbox" value="" id="checkbox_{{ checklist._id }}" v-if="isLoggedIn">
  <label class="form-check-label" :for="'checkbox_' + checklist._id" >
    {{ checklist.todo }} &nbsp;
</label>
<button v-if="isLoggedIn" @click="deleteTodo(checklist._id)" class="btn btn-outline-secondary btn-sm">-</button>
</div>
<NewTodoInChecklist :fetchData="fetchData" v-if="isLoggedIn"/>
</template>


<! <script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import NewTodoInChecklist from '@/components/NewTodoInChecklist.vue'

const checklistBe = ref([]);
const route = useRoute()
const editModeTodoId = ref(null);

function enterEditMode(todoId) {
  editModeTodoId.value = todoId;
}

function exitEditMode() {
  editModeTodoId.value = null;
}

function isEditMode(todoId) {
  return editModeTodoId.value === todoId;
}

async function updateChecklist(todoId, updatedTodo) {
  console.log(todoId)
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/destination/${route.params.id}/checklist/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ todo: updatedTodo })
    });
    console.log(updatedTodo)
    exitEditMode();
    await fetchData();
  } catch (err) {
    console.error(err);
  }
}

function deleteTodo(todoId) {
    fetch(`${import.meta.env.VITE_API_URL}/destination/${route.params.id}/checklist/${todoId}`, {
      method: "DELETE"
    })
    .then(() => {
      fetchData()
    })
    .catch(err => console.error(err))
  }


async function fetchData() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/destination/${route.params.id}/checklist`);
    const result = await response.json();
    checklistBe.value = result;
  } catch (err) {
    console.error(err);
  }
}

function handleButtonClick(todoId, todo) {
  if (isEditMode(todoId)) {
    updateChecklist(todoId, todo);
  } else {
    enterEditMode(todoId);
  }
//   fetchData()
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
    <span v-if="!isEditMode(checklist._id)">{{ checklist.todo }}</span>
      <input v-else v-model="checklist.todo" @blur="exitEditMode"/>
</label>
<div class="buttons-container">
<button @click="deleteTodo(checklist._id)" class="btn btn-outline-secondary btn-sm">-</button>
      <button @click="handleButtonClick(checklist._id, checklist.todo)" class="btn btn-outline-secondary btn-sm">
          {{ isEditMode(checklist._id) ? '&#10003;' : '&#x270E;' }}
        </button>
    </div>
</div>
<NewTodoInChecklist :fetchData="fetchData" />
</template> -->