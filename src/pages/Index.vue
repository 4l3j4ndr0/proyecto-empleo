<template>
  <q-layout>
    <q-page-container class="q-pa-md">
      <div class="col">
        <q-card-section class="text-center bg-transparent q-gutter-md">
          <div class="text-h6 q-mt-md ft">
            ¿Primera vez que vas a generar tu hoja de vida?
          </div>
          <div class="q-pa-md">
            <q-input
              label="Número de cédula"
              type="tel"
              v-model="cedula"
              outlined
              dense
            >
              <template v-slot:prepend>
                <q-icon name="badge" />
              </template>
            </q-input>
          </div>
          <div style="text-align: center">
            <q-btn
              push
              :disable="cedula.length < 4"
              :to="`/formulario/${cedula}`"
              color="primary"
              label="Generar hoja de vida"
            />
          </div>
        </q-card-section>
        <q-separator></q-separator>
        <!-- <q-card-section>
          <div class="text-body2 text-justify" style="text-align: center">
            Si ya tienes una hoja de vida creada en la plataforma,
            <b>ingresa tu # de cédula</b>
          </div>
          <div class="q-pa-md">
            <q-input
              label="Número de identificación"
              type="tel"
              v-model="cedula"
              outlined
              dense
            >
              <template v-slot:prepend>
                <q-icon name="badge" />
              </template>
            </q-input>
          </div>
          <div style="text-align: center" v-if="cedula && cedula !== ''">
            <q-btn
              push
              :to="`/formulario/${cedula}`"
              color="primary"
              label="Buscar hoja de vida"
            />
          </div>
        </q-card-section> -->
        <q-separator></q-separator>
        <q-card-section class="q-gutter-md">
          <div class="text-body2 text-justify" style="text-align: center">
            ¿Te gustaría recibir mas de <b>50</b> ofertas laborales al día?
          </div>

          <div style="text-align: center">
            <q-btn
              @click="
                () => {
                  openWahtssap();
                }
              "
              no-caps
              push
              color="green"
              label="👉🏻 Unete a Whatsapp"
            />
          </div>
        </q-card-section>
      </div>
      <div class="col">
        <q-card-section class="q-pa-none">
          <q-carousel animated v-model="slide" arrows navigation infinite>
            <q-carousel-slide
              v-for="(banner, index) in banners"
              :name="index + 1"
              :key="index"
              :img-src="banner"
            >
              <div class="absolute-bottom custom-caption">
                <!-- <div class="text-h4 ft text-white">Moncada</div> -->
              </div>
            </q-carousel-slide>
          </q-carousel>
        </q-card-section>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { firebase } from "../mixins/index";
export default defineComponent({
  name: "Index",
  mixins: [firebase],
  data() {
    return {
      slide: 1,
      cedula: "",
      banners: ["image1.jpeg", "image2.jpeg", "image3.jpeg", "image4.jpeg"],
    };
  },
  mounted() {
    // this.banners = this.getDataFirebaseConfig("banners");
    // console.log("AQUI:::::", this.banners);
    // if (this.banners) {
    //   this.banners = JSON.parse(this.banners);
    // }
    // console.log("AQUI:::::", this.banners);
  },
  methods: {
    openWahtssap() {
      window.open("https://wa.link/wt0t8y");
    },
  },
});
</script>
