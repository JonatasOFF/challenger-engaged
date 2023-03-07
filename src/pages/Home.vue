<script setup lang="ts">
import { removeDuplicates } from "@/common/utils/removeDuplicates";
import Card from "@/components/Card.vue";
import { Characters, EventWithScroll } from "@/models/interfaces";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { onMounted, reactive, ref } from "vue";

const props = reactive({
  page: 1,
  name: "",
});
const search = ref("");
const list = ref<HTMLDivElement>({} as HTMLDivElement);
const loading = ref(false);
let characters = ref<Characters[]>([]);

const { onResult, refetch } = useQuery(
  gql`
    query ($page: Int!, $name: String!) {
      characters(page: $page, filter: { name: $name }) {
        info {
          count
        }
        results {
          id
          name
          image
        }
      }
    }
  `,
  props
);

function getNextPage() {
  props.page += 1;
  props.name = search.value;
  refetch(props);
}

function onWheel($event: EventWithScroll) {
  list.value.scrollBy({
    left: $event.deltaY < 0 ? -60 : 60,
  });
  onScroll($event);
}

function onRemoveSearch() {
  search.value = "";
  props.name = "";
  props.page = 0;
  characters.value = [];
  list.value.scrollLeft = 0;
  getNextPage();
}

function onScroll($event: Event) {
  if (
    (list.value.scrollWidth - list.value.clientWidth) * 0.8 <=
      list.value.scrollLeft &&
    !loading.value
  ) {
    getNextPage();
  }
}

function onSearch() {
  props.page = 0;
  list.value.scrollLeft = 0;
  characters.value = [];
  if (!search.value) {
    onRemoveSearch();
    return;
  }

  getNextPage();
}

onMounted(() => {
  props.page = 0;
  list.value.scrollLeft = 0;

  getNextPage();
});

onResult((params) => {
  loading.value = params.loading;
  if (!params.loading) {
    characters.value = removeDuplicates([
      ...characters.value,
      ...params.data.characters.results,
    ]);
  }
});
</script>

<template>
  <div class="container">
    <img class="logo" src="@/common/assets/imgs/rick-and-morty-logo.png" />
    <div class="header">CHARACTERS</div>
    <div class="header-search">
      <input v-model="search" type="text" />
      <div>
        <button @click="onSearch">Search</button>
        <button @click="onRemoveSearch">Remove Search</button>
      </div>
    </div>
    <div ref="list" @scroll="onScroll" @wheel="onWheel" class="list">
      <RouterLink
        v-for="(character, index) in characters"
        :to="'/character/' + character.id"
      >
        <Card
          :key="character.name"
          :nameCharacter="character.name"
          :image="character.image"
        />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: block;
}

.logo {
  width: 60rem;
  height: 26rem;
  display: flex;
  margin: auto;
}

.header-search {
  margin: auto;
  display: flex;
  flex-direction: column;
  width: max-content;
}

.header-search > div {
  margin-top: 0.8rem;
}

.header-search > div > button {
  margin-right: 0.8rem;
}

.header {
  position: relative;
  color: #b8e627;
  margin: auto;
  margin-top: -10rem;
  border-radius: 100rem;
  width: fit-content;
  padding: 2.4rem;
  font-size: 6.4rem;
  text-align: center;
  font-family: Get Schwifty, sans-serif;
}

.list {
  position: relative;
  display: flex;
  gap: 1.6rem;
  max-width: 100%;
  flex-direction: row;
  margin-top: auto;
  margin-bottom: auto;
  padding: 2.8rem 2.4rem;
  overflow-y: hidden;
  overflow-x: scroll;
}
</style>
