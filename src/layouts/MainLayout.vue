<template>
  <q-layout view="hHh lpR fFf">
    <Header />
    <q-page-container>
      <router-view />
    </q-page-container>
    <div class="q-pt-lg">
      <Footer />
    </div>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "src/components/Main/Header.vue";
import Footer from "src/components/Main/Footer.vue";
export default defineComponent({
  name: "MainLayout",
  components: {
    Header,
    Footer,
  },
  setup() {
    return {};
  },
});
</script>
