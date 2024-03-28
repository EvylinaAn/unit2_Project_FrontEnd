# BEE

## frontend
## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
### Description 
6 weeks down and 2 projects down in my GA course. For the second project my class was required to submit an application using Fullstack fundamentals and get it CRUDing. 

Travelling is a big part of my life. I enjoy every single thing there is about travelling to a new place. Meeting new people, tasting different cuisines, exploring new cultures, the many walks, love it all. However, I completely understand how the days just before you commence your journey can get quite stressful sometimes and you need to make sure you have everything before you leave or else in some cases it can go downhill very quickly. With that said, because of my passion for travelling and being in a position where I have forgotten to take some important things while I was travelling, for my topic I chose to create an application that is mostly aimed to help individuals before they start their journey. 

My application is called Breezy Easy Escapade aka B.E.E and uses Vue.js for my frontend and mongoDB to store my data in the backend. 

### Deployment Link 
https://zingy-panda-b32083.netlify.app
 
### Timeframe & Working Team 
This was a solo project to be completed within 5 days, with CRUD functionality working, a polished and consistent user interface and implementing User Authorization. 

### Technologies Used 
Vue.js 
MongoDB 
Mongoose 
Express 
Node 
Bootstrap 
HTML & CSS Brief 

### Brief 
The Basic requirements for our were as follows.
1) Have at least 2 data entities in addition to the ‘USER’ Model 
2) Use OAuth authentication 
- Implement basic authorization that restricts access to features that need a logged in user in order to work by “protecting” those routes from anonymous users using the ‘ensureLoggedIn’ middleware from the OAuth lesson. 
3) Have full CRUD data operations somewhere within the app’s features 4) Be styles such that the app looks and feels similar to apps we use on a daily basis. 5) Be deployed online 

### Build/Code Process 

I started with implementing the backend logic while designing my app. 

To keep it simple, I decided to work in one file - server.js, as I felt this would have been the best way to not over complicate it for myself. First I installed all my necessary dependencies in my backend folder, created another folder for my frontend and installed some other dependencies there too. 

In my server.js I started with importing all the necessary files. I also created my .evn environment to store any sensitive data. I then created my Schema’s, for my app I currently have 2 main Schema’s (destinationSchema and checklistSchema) excluding the user Schema. In order to only make my checklist accessible if the user has a destination I decided to link my destinationSchema in checklistSchema, similarly the creation of a new destination is only allowed if a user is logged in. For this I linked the user in my destinationSchema 

```
const destinationSchema = new mongoose.Schema({ 
    location: String, 
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
    }, 
}); 

const checkListSchema = new mongoose.Schema({ 
    todo: String, 
    destination: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Destination", 
    }, 
}); 

const userSchema = new mongoose.Schema({ 
    userEmail: { 
        type: String, 
        required: true, 
    }, 
    lastLogin: { 
        type: Date, 
        required: true,
    }, 
}); 

```
I then used mongoose.model to create my files in the Database

```
const userSchema = new mongoose.Schema({ 
    userEmail: { 
        type: String, 
        required: true, 
    }, 
    lastLogin: { 
        type: Date, 
        required: true,
    }, 
}); 
```

I then made my requests (GET, POST, PUT and DELETE) and made sure they were all working using Postman. 

In order for me to give my user a suggested checklist when they login and give them the ability to delete from the pre-existing checklist without actually deleting it from the database and hence deleting it for everyone else. I created an array in my post request for adding a new destination and used Promises to solve this issue. The idea was that when a user creates a new destination their checklist will have all the pre-existing data and they are able to add to that checklist, delete and check their todos when they are completed. 

Here’s my code to showcase that part of logic. 

```
app.post("/destination/add", async (req, res) => { 
    const userEmail = req.headers["user-email"]; 
    const user = await User.findOne({ userEmail: userEmail }); 
    console.log(user); 
    const destination = req.body; 
    const packingList = ['Home Clothes', 'Footwear', 'Swimwear', 'Accessories', 'Coat', 'Socks', 
        'Hat', 'Spare bag', 'Sunglasses', 'Toothbrush', 'Toothpaste', 'Face Wash', 'Personal Hygiene', 
        'Body Wash', 'Shampoo', 'Conditioner', 'Hairbrush', 'Medicine', 'Phone', 'Phone Charger', 
        'Laptop Charger', 'Camera', 'Camera Charger', 'Travel Adapter', 'Shaver/Straightener', 
        'Headphones/Earphones', 'Portable Charger', 'Wallet', 'Travel Money/Currency', 'Passport', 
        'Visa', 'License', 'Travel Insurance']; 
    const newDestination = new Destination({ 
        location: destination.location, 
        user: user._id, 
    });
    newDestination.save() 
    .then((destination) => { 
        return packingList.reduce((promiseChain, item) => { 
            return promiseChain.then(() => 
                new Checklist({ 
                    todo: item, 
                    destination: destination._id, 
                })
                .save() 
            ); 
        }, Promise.resolve()); 
    }) 
    .then(() => { 
        res.sendStatus(200); 
    }) 
    .catch((err) => console.error(err)); 
}); 
```

Once everything was working in postman I then started working on my frontend. I started with taking off all the pre-existing code and created my routes. 
I then created a few files in vies, namely 
1) HomeView.vue - hosts the homepage 
2) DestinationListView.vue - hosts a list of your destination and this is where you need to go, to be able to create a new destination. 
3) SingleDestinationView.vue - holds information of the destination a user enters including a button that will take the user to the checklist. 
4) ChecklistView.vue - hosts the actual checklist where a user can add their own items. 5) LoginView.vue - last but not the least the login/logout page. 
Overall all the pages are equipped to display the navbar and footer elements hence I used App.vue to incorporate them. 
The nav bar displays B.E.E with a bee logo on the top left and a link that displays the text ‘login’ on the top right if the user is not logged in. However, if the user is logged in it displays ‘Hello, (UserName)’ with the bee logo on the top left and logout on the top right. Here’s my HTML 

```
<template> 
    <body> 
        <div class="navNRouter"> 
            <div class="wrapper"> 
                <nav>
                    <RouterLink to="/"> 
                        <div class="logoDiv"> 
                            <img src="/favicon.ico" alt="bee logo"> 
                            <p v-if="isLoggedIn"> &nbsp;Hello, {{ userName }}</p> <p v-else>B.E.E</p> 
                        </div> 
                    </RouterLink> 
                    <ul> 
                        <li><RouterLink to="/">Home</RouterLink></li> 
                        <li><RouterLink 
                        to="/destination">Destination</RouterLink></li> 
                        <li><RouterLink v-if="isLoggedIn" 
                        to="/login">Logout</RouterLink> <RouterLink v-else 
                        to="/login">Login</RouterLink></li> 
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
```

And this is the JS code to handle the log in. 
```
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
    }) 
</script> 
```

I also used a globalProvider.js file in my stores to add the checkSession function and handle my main exports. 
```
import { ref } from 'vue' 
import { useCookies } from 'vue3-cookies' 
import { decodeCredential } from 'vue3-google-login' 
const { cookies } = useCookies() 
export const isLoggedIn = ref(false) 
export const userName = ref('') 
export const userSub = ref('') 
export const userEmail = ref('') 
export const checkSession = () => { 
    if (cookies.isKey('user_session')) { 
        isLoggedIn.value = true 
        const userData = decodeCredential(cookies.get('user_session')) userName.value = userData.given_name 
        userSub.value = userData.sub 
        userEmail.value = userData.email 
    } 
} 
```

Finally my CRUD operation can be seen in my DestinationListView.vue, where it lets a user Create a country, read it, update the name if any errors and delete the destination if they please. I achieved this using fetches for reading, creating (although done in my components (NewDestination.vue), deleting and editing(PUT) 

```
async function fetchData() { 
    try { 
        const response = await 
        fetch(`${import.meta.env.VITE_API_URL}/destination`,{ 
            headers: { 
                "user-email": userEmail.value, 
                "Content-Type": "application/json" 
            } 
        }); 
        const result = await response.json(); 
        destinationBe.value = result; 
    } catch (err) { 
        console.error(err); 
    } 
} 

function addDestination() { 
    checkSession() 
    if ( destination.value.location === '' ) { 
        return 
    } 
    destination.value.location = 
    capitalizeFirstLetter(destination.value.location); 
    fetch(`${import.meta.env.VITE_API_URL}/destination/add`, { method: 'POST', 
        headers: { 
            "user-email": userEmail.value, 
            "Content-Type": "application/json" 
        }, 
        body: JSON.stringify(destination.value) 
    }) 
    .then(() => { 
        fetchData() 
        clearForm() 
    }) 
    .catch(err => console.error(err)) 
} 

async function updateDestination(destinationId, updatedLocation) { console.log(destinationId) 
    try {
        await 
        fetch(`${import.meta.env.VITE_API_URL}/destination/${destinationId}`, { method: "PUT", 
            headers: { 
                "Content-Type": "application/json" 
            }, 
            body: JSON.stringify({ location: updatedLocation }) 
        }); 
        console.log(updatedLocation) 
        exitEditMode(); 
        await fetchData(); 
        } catch (err) { 
            console.error(err); 
        } 
} 

function deleteDestination(destinationId, location) { 
    const shouldDelete = window.confirm(`Are you sure you want to delete ${location.toUpperCase()}`) 
    if (shouldDelete){ 
        fetch(`${import.meta.env.VITE_API_URL}/destination/${destinationId}`, {
            method: "DELETE" 
        }) 
        .then(() => { 
            fetchData() 
        }) 
        .catch(err => console.error(err)) 
    } 
} 
```

I also had to implement functions that would handle the edit/save button in my code.
```
function enterEditMode(destinationId) { 
    editModeDestinationId.value = destinationId; 
} 

function exitEditMode() { 
    editModeDestinationId.value = null;
} 

function isEditMode(destinationId) { 
    return editModeDestinationId.value === destinationId; 
} 

function handleButtonClick(destinationId, location) { 
    if (isEditMode(destinationId)) { 
        updateDestination(destinationId, location); 
    } else { 
        enterEditMode(destinationId); 
    } 
} 
```

Here is how I handled my HTML for destination list view 
```
<template> 
    <header> 
        <br> 
        <h1>Upcoming Destination</h1> 
        <h3>"Where exciting times await"</h3> 
        <br> 
    </header> 
    <br> 
    <div class="article"> 
        <p> 
            …. 
        </p> 
    </div> 
    <div class="listDestination" v-if="isLoggedIn"> 
        <NewDestination :fetchData="fetchData" v-if="isLoggedIn"/> <br> 
        <div> 
            <h3 v-for="destination in destinationBe" :key="destination.id"> <RouterLink :to="'/destination/' + destination._id"> <span v-if="!isEditMode(destination._id)">{{ 
            destination.location }}</span> 
            <input v-else v-model="destination.location" type="text" @blur="exitEditMode" @click.prevent/> 
            </RouterLink> &nbsp; 
            <div class="buttons-container" v-if="isLoggedIn">
                <button @click="deleteDestination(destination._id, 
                    destination.location)" class="btn btn-outline-secondary btn-sm">x</button> 
                <button @click="handleButtonClick(destination._id, 
                    destination.location)" class="btn btn-outline-secondary btn-sm"> {{ isEditMode(destination._id) ? '&#10003;' : '&#x270E;' }} </button> 
            </div> 
            </h3> 
        </div> 
    </div> 
    <div v-else> 
        <h5><RouterLink to="/login">Login </RouterLink>to start creating your checklist!</h5> 
    </div> 
</template> 
```

I also had 2 components. 
1) NewDestination.vue - to implement adding a new destination. 
2) NewTodoInChecklist.vue - to implement being able to add a new todo to my checklist. 
I made it so that when the user inputs a new destination or todo, the first letter of the work or phrase is always capitalised. 
```
function capitalizeFirstLetter(string) { 
    return string.charAt(0).toUpperCase() + string.slice(1); 
}
```

### Challenges 
The biggest challenge I faced was having the login/logout state to change the minute a user logs in or logs out without having to refresh the page. 

I handled this by using a global file to export all my main functionality for the login/logout state and using provide and inject to supply that information to the rest of the files. 

Here’s my globalProvider.js 
```
import { ref } from 'vue' 
import { useCookies } from 'vue3-cookies' 
import { decodeCredential } from 'vue3-google-login' 

const { cookies } = useCookies() 

export const isLoggedIn = ref(false) 
export const userName = ref('')
export const userSub = ref('') 
export const userEmail = ref('') 
export const checkSession = () => { 
    if (cookies.isKey('user_session')) { 
        isLoggedIn.value = true 
        const userData = decodeCredential(cookies.get('user_session')) userName.value = userData.given_name 
        userSub.value = userData.sub 
        userEmail.value = userData.email 
    } 
}
```

Here’s an example of how I used it in my Destination List View. 
```
import { inject } from 'vue' 

const isLoggedIn = inject('isLoggedIn') 
const userEmail = inject('userEmail') 
const checkSession = inject('checkSession') 
```

### Wins 

I initially had a hard time understanding how to supply the user with a pre-filled (recommended) checklist that the user is able to delete from without actually deleting it from the database and hence for every other user. I researched a few solutions to achieve this but it all seemed a bit complicated with the level of skills I have at the moment. I finally figured out a very simple way to achieve this with probably only changing a few lines of my backend logic in my request for adding a new destination. 

All I did was make an array with my recommendation in my post request and then used promises to resolve this issue. 

I am also proud of how I handled my login/logout state as mentioned in the challenges section. 

A few other wins for me have to do with how I handled the styling on different pages and really happy how it turned out 

### Key Learnings/Takeaways
Overall, I think the project was a massive step into fullstack development. The knowledge I have gained from just diving hands on into making an app that resonates with myself is unexplainable. I’ve learned how to use Databases (precisely MongoDB) to store information on a server and now I feel confident enough to start building fully functional web applications and have it sent out to my friends and family so they can use and access it. 

I have learned how to use javascript libraries, specifically vue.js and ejs (although I haven’t used ejs for this  project). I also now understand express and am able to use bootstrap quite well. 

### Bugs 
I have noticed one bug in my code so far and it has to do with updating the name of my destination once a destination is added. I am able to update it, however the update (tick) button needs to be clicked twice. This is something I will look further into and figure out a way to sort this out. 

### Future Improvements 
I am not sure if you can tell, my application was actually supposed to have a lot more functionality than just having one single todo list unfortunately as I was moving homes during this project week I was unable to complete my project due to lack of time. 

My checklist page looks pretty empty and the update function doesn't currently work, the idea with my checklist page was that it would initially hold 4 different todo lists - namely (clothing, toiletries/meds , electronics, 
important documents) and apart from letting a user add to the pre existing recommendations I would also let them create a new list/edit and delete it if they please.

I also wanted to add more elements to my travel app rather than just being able to set a todo list, even though the checklist would be the major part of my web app. I wanted to add a page where the user can input their itinerary and a page for budgeting their travel. All this would be in the landing page for a single destination view. 

### Backend Git Repo
https://github.com/EvylinaAn/unit2_Project_Backend