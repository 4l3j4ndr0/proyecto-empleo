<template>
  <q-header
    bordered
    class="bg-primary text-white cursor-pointer"
    @click="$router.push('/')"
  >
    <q-toolbar class="ft">
      <q-toolbar-title>
        <q-avatar>
          <img src="/Moncada.png" />
        </q-avatar>
        Crea tu hoja de vida
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
});
</script>
