<script setup lang="ts">
import { Characters, CharactersAPI } from "@/models/interfaces";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";

let props = reactive({
  id: "",
});

let result = ref<Characters>({
  id: "",
  name: "",
  image: "",
  status: "",
  species: "",
  type: "",
  gender: "",
  episode: [],
});

const { onResult } = useQuery(
  gql`
    query ($id: ID!) {
      character(id: $id) {
        name
        image
        status
        species
        type
        gender
        episode {
          name
          episode
        }
      }
    }
  `,
  props
);

onResult((params: CharactersAPI) => {
  if (!params.loading) {
    const character = params.data.character;

    result.value = character;
  }
});

onMounted(() => {
  const route = useRoute();
  props.id = route.params.characterId as string;
});
</script>

<template>
  <div class="container">
    <div>
      <div class="name">
        {{ result.name }}
      </div>
      <div class="episodes-appers">Episodes where it appears:</div>
      <div class="episodes">
        <div class="episode-card" v-for="episodeDetails in result.episode">
          <div>{{ episodeDetails.episode }}</div>
          <div class="name-episode">{{ episodeDetails.name }}</div>
        </div>
      </div>
    </div>
    <div class="information">
      <img :src="result.image" />
      <div v-if="result.gender">Generous: {{ result.gender }}</div>
      <div v-if="result.species">Species: {{ result.species }}</div>
      <div v-if="result.type">Type: {{ result.type }}</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  padding: 1.6rem;
  grid-template-columns: 1fr 0.5fr;
}

.name {
  font-size: 3.6rem;
  font-weight: bold;
  font-family: Get Schwifty, sans-serif;
}

.information {
  font-size: 2.4rem;
}

.information > img {
  border-radius: 50rem;
  border: 0.2rem solid #a9d3e9;
}

.episodes {
  display: flex;
  flex-wrap: wrap;
}

.episode-card {
  border-radius: 0.8rem;
  border: 0.2rem solid white;
  padding: 0.8rem;
  width: 15rem;
  margin: 0.8rem;
  margin-left: 0;
}

.episodes-appers {
  font-size: 2.4rem;
}
</style>
