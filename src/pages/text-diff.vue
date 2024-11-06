<script>
export default {
  data() {
    return {
      recipe: null,
      recipeName: "",
      instructions: null,
      imgSource: null,
      link: null,
    };
  },
  methods: {
    async fetchRecipes() {
      await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + this.recipe)
        .then((response) => response.json())
        .then((result) => {
          this.recipeName = result.meals[0].strMeal;
          this.instructions = result.meals[0].strInstructions;
          this.imgSource = result.meals[0].strMealThumb;
          this.link = result.meals[0].strYoutube;
        });
    },
  },
};
</script>

<template>
  <h1>{{ $t("index.title") }}</h1>
  <h2>Write the name of the dish</h2>
  <input type="text" v-model="recipe" />
  <button type="button" @click="fetchRecipes()">Get</button>
  <h2>{{ recipeName }}</h2>
  <img :src="imgSource" alt="" />
  <p>{{ instructions }}</p>
  <a v-if="link" :href="link">Watch on Youtube-video</a>
</template>
