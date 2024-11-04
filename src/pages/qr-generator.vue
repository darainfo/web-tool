<script>
export default {
  created() {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((response) => response.json())
      .then((result) => {
        this.recipes = result.meals;
      });
  },
  data() {
    return {
      recipes: null,
      category: "",
      list: null,
      link: null,
    };
  },
  methods: {
    async fetchRecipes() {
      await fetch(
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + this.category
      )
        .then((response) => response.json())
        .then((result) => {
          this.list = result.meals;
        });
    },
  },
};
</script>

<template>
  <h1>Categories of Recipes</h1>
  <ol>
    <li v-for="value in recipes" :key="value.strCategory">
      {{ value.strCategory }}
    </li>
  </ol>
  <h2>
    If you want to see all the recipes in a category, type in the name of the
    category below and click the button
  </h2>
  <input type="text" v-model="category" />
  <button type="button" @click="fetchRecipes()">
    Get a list with all recipes in the category: {{ category }}
  </button>
  <ol v-if="list">
    <li v-for="value in list" :key="value.idMeal">
      {{ value.strMeal }}
    </li>
  </ol>
  <p v-else>Make sure to spell the category correct before clicking</p>
</template>
