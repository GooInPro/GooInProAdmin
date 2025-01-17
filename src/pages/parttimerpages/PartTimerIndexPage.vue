<script setup>
import SideBar from "../../layout/SideBar.vue";
</script>

<template>
  <div class="flex h-screen">
    <SideBar class="w-64 bg-gray-200"/>
    <div class="flex-1 p-5">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
</style>
