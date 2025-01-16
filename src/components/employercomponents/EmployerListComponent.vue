<script setup>
  import {onMounted, ref} from "vue";
  import {getEmployerList} from "../../api/employerapi/employerAPI.js";

  const init = {eno: 0, ename: '', egender: true}

  const employers = ref();

  console.log("aaaa");

  onMounted(() => {

    getEmployerList(1).then((data) => {

      employers.value = data;

      console.log(employers.value);
    })
  })
</script>

<template>
  <div>
    test
  </div>
</template>

<style scoped>

</style>