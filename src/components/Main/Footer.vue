<template>
  <footer class="site-footer bg-primary">
    <div class="container flex-center">
      <div class="cursor-pointer q-pa-lg" @click="openLinkedin()">
        &copy; {{ getYear() }} Alejandro Castañeda Full Stack Developer, DevOps
        Engineer.
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
  methods: {
    openLinkedin() {
      window.open("https://alejandro.awslearn.cloud/", "_blank");
    },
    getYear() {
      return new Date().getFullYear();
    },
  },
});
</script>
