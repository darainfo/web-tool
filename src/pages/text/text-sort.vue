<script>
export default {
  data() {
    return {
      recipeName: "Here you will see the name of the recipe",
      instructions: "And here you can read about how to do it",
      imgSource: null,
      link: null,
      ingredients: null,
    };
  },
  methods: {
    async fetchRecipe() {
      await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((response) => response.json())
        .then((result) => {
          this.recipeName = result.meals[0].strMeal;
          this.instructions = result.meals[0].strInstructions;
          this.imgSource = result.meals[0].strMealThumb;
          this.link = result.meals[0].strYoutube;
          this.ingredients = [];
          for (const [key, value] of Object.entries(result.meals[0])) {
            if (key.startsWith("strIngredient")) {
              this.ingredients.push(value);
            }
          }
        });
    },
  },
};
</script>

<style>
.imageandingredients {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
</style>

<template>
  <h1>33333333333333Get a random recipe</h1>
  <button type="button" @click="fetchRecipe()">Random Recipe</button>
  <h2>{{ recipeName }}</h2>
  <div class="imageandingredients">
    <img :src="imgSource" alt="" v-if="imgSource" />
    <p v-else>Here you will see a picture</p>
    <div>
      <h3 v-if="ingredients">Ingredients</h3>
      <ul>
        <template v-for="ingredient of ingredients" :key="ingredient.index">
          <li v-if="ingredient">{{ ingredient }}</li>
        </template>
      </ul>
    </div>
  </div>
  <p>{{ instructions }}</p>
  <a v-if="link" :href="link">Watch a Youtube-video</a>
</template>
