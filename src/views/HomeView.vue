<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

const destinationBe = ref([]);

function fetchData() {
  fetch(`${import.meta.env.VITE_API_URL}`)
    .then((response) => response.json())
    .then((result) => {
      destinationBe.value = result;
    });
}

// function autoAdvanceCarousel() {
//   setInterval(() => {
//     // Trigger the next slide
//     const carousel = document.getElementByI("carouselExample");
//     const nextButton = carousel.querySelector(".carousel-control-next");
//     nextButton.click();
//   }, 5000);
// }

onMounted(() => {
  fetchData()
  // autoAdvanceCarousel()
});
</script>

<template>
  <header>
    <br />
    <h1>Breezy Easy Escapade</h1>
    <h3 id="headerH3">"Your one stop spot for a carefree travel"</h3>
    <br />
  </header>
  <br />
<div class="main-carousel" >
<div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://picsum.photos/id/77/400/200" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="https://picsum.photos/id/57/400/200" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="https://picsum.photos/id/434/400/200" class="d-block w-100" alt="...">
    </div>
  </div>
</div>
<div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://picsum.photos/id/164/400/200" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="https://picsum.photos/id/392/400/200" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="https://picsum.photos/id/419/400/200" class="d-block w-100" alt="...">
    </div>
  </div>
</div>

</div>

<div class="paddedSides">
  <div class="body">
    <div class="intro">
      <p>
        Traveling is not just about discovering new places; it's a therapeutic
        experience that can positively impact your mental, emotional, and even
        physical well-being. In recent years, there has been a growing body of
        research highlighting the various ways in which travel contributes to
        overall therapeutic benefits.
      </p>
    </div>
    <button class="btn btn-outline-secondary">
      <RouterLink :to="'/destination'"> Your Destinations </RouterLink>
    </button>
  </div>

    <div class="reasonToTravel">
      <div class="pointsOnTravel">
        <h5>Stress Reduction:</h5>
        <p>Traveling allows individuals to escape from the routine stressors of daily life. The change in environment and the exposure to new cultures and landscapes can significantly reduce stress levels.</p>
      </div>
      <div class="pointsOnTravel">
        <h5>Mindfulness and Presence:</h5>
        <p>Immersing oneself in a new destination encourages mindfulness. Travelers often find themselves more present and engaged in the moment, appreciating the sights, sounds, and experiences around them.</p>
      </div>
      <div class="pointsOnTravel">
        <h5>Cultural Enrichment:</h5>
        <p>Experiencing different cultures fosters personal growth and a broader perspective. Exposure to diverse traditions and lifestyles can lead to increased empathy and a deeper understanding of the world.</p>
      </div>
      <div class="pointsOnTravel">
        <h5>Enhanced Creativity:</h5>
        <p>Traveling exposes individuals to novel experiences and environments, stimulating creativity. Whether it's exploring historical landmarks, interacting with locals, or trying new cuisines, these experiences can inspire creative thinking.</p>
      </div>
      <div class="pointsOnTravel">
        <h5>Connection and Social Well-Being:</h5>
        <p>Travel often involves meeting new people and forming connections. Positive social interactions and the formation of new friendships during travel contribute to an individual's sense of belonging and social well-being.</p>
      </div>
      <div class="pointsOnTravel">
        <h5>Self-Discovery and Reflection:</h5>
        <p>Stepping out of one's comfort zone allows for self-discovery. Travel provides individuals with an opportunity to reflect on their lives, goals, and aspirations, leading to personal growth and a better understanding of oneself.</p>
      </div>
      <div class="pointsOnTravel">
        <h5>Physical Health Benefits:</h5>
        <p>Traveling may involve physical activities such as hiking, walking, or exploring. Engaging in these activities not only promotes physical health but also boosts mood through the release of endorphins.</p>
      </div>
      <div class="pointsOnTravel">
        <h5>Reduced Burnout and Increased Productivity:</h5>
        <p>Taking a break from the demands of work and daily responsibilities during travel helps prevent burnout. Returning from a well-deserved vacation, individuals often find themselves recharged, leading to increased productivity upon their return.</p>
      </div>
    </div>
    <!-- <div class="body"> -->
    <div class="conclusion">
      <p>
        In conclusion, the therapeutic benefits of travel extend far beyond leisure. 
        From stress reduction and enhanced creativity to cultural enrichment and improved social well-being, 
        the act of traveling has the power to positively impact various facets of an individual's life. 
        As we continue to explore the connection between travel and well-being, 
        it becomes clear that planning a getaway might just be the prescription for a healthier, more fulfilling life.
        <br>
        With all that being said we want to make it as easy as possible for you when you do travel. From our experience the most 
        stressful part of traveling, is making sure you've got everything you need to commence your journey in peace.
        <br>
        <div class="steps">
            1) So lets start with adding your destination 
            <RouterLink :to="'/destination'">  here. </RouterLink>  Once you have created a destination, you will have a pre - populated checklist to work with.
            <br>
            2) Step 2 is your checklist, one of the most important part for a stress free travel - Stay organized.
            <span>(we've tried making it as simple as possible and given you a recommended checklist, however feel free todo
              modify and add more if you please)</span>
        </div>
      </p>
    </div>
  <!-- </div> -->
  </div>
</template>

<style>
.main-carousel {
  display: flex;
}

.carousel {
  width: 50% !important;
}

.carousel-control-prev, .carousel-control-next {
  display: none;
}

.body {
  margin-top: 2vmin;
  text-align: center;
}

.intro p {
  font-size: 2vmin;
  max-width: 80vmin;
  margin: auto auto 2vmin;
  background-color: rgba(88, 102, 31, 0.1);
  padding: 2vmin;
  border-radius: 10px;
}

.reasonToTravel {
    margin-top: 2vmin;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px; 
  }

  .pointsOnTravel {
    border: 1px solid purple; 
  /* background-color: rgba(88, 102, 31, 0.6); */

    padding: 10px; 
  }

  .paddedSides {
    padding: 0 2vmin;
  }

  .conclusion {
    text-align: center;
    margin: 2vmin auto ;
    font-size: 1.5vmin;
    max-width: 90vmin;
  }

  .steps {
    /* background-color: rgba(235, 218, 249, 0.4); */
    background-color: rgba(88, 102, 31, 0.1);
    text-align: left;
    padding: 1vmin;
    max-width: 70vmin;
    margin: 2vmin auto;
    border-radius: 10px;
  }

  .conclusion span {
    font-size: 1.5vmin;
  }
 </style> 