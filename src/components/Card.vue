<script setup lang="ts">
import { ref, onMounted } from "vue";

defineProps<{
  nameCharacter: string;
  information?: string;
  image: string;
}>();

const isIntersecting = ref(false);
const root = ref<HTMLDivElement>({} as HTMLDivElement);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    isIntersecting.value = entries[0].isIntersecting;
  });

  observer.observe(root.value);
});
</script>

<template>
  <div
    ref="root"
    :id="nameCharacter"
    :style="{
      backgroundImage: `url(${image})`,
    }"
    class="card"
    v-bind:class="{
      'not-visible': !isIntersecting,
    }"
  >
    <div class="nameCharacter">{{ nameCharacter }}</div>
    <div class="information">{{ information }}</div>
  </div>
</template>

<style scoped>
.card {
  min-width: 30rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  opacity: 1;
  transition: opacity 1s ease-out;
  border-radius: 0.8rem;
}

.card:hover {
  transition: scale 0.2s ease-in;
  scale: 1.2;
  cursor: pointer;
  z-index: 56;
}

.not-visible {
  background-color: grey;
  opacity: 0;
}

.information {
  color: #fbf976;
  background-color: rgba(68, 180, 236, 0.9);
}

.nameCharacter {
  font-size: 1.6rem;
  font-weight: bold;
  color: rgb(255, 253, 130);
  padding: 0.8rem;
  background-color: rgba(68, 180, 236, 0.9);
}
</style>
