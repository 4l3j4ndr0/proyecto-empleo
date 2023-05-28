<template>
  <q-page>
    <q-file name="imagen" v-show="false" v-model="imagen" />
    <q-form ref="formulario" class="q-gutter-md" @submit="onSubmit()">
      <div class="q-pa-md">
        <!-- DATOS PERSONALES -->
        <fieldset>
          <legend><div class="text-subtitle1 ft">Datos personales</div></legend>
          <div
            class="q-py-sm"
            :style="$q.screen.width > 1000 ? '' : 'text-align:center'"
          >
            <q-avatar
              v-if="url_imagen"
              rounded
              size="100px"
              font-size="82px"
              color="grey"
              text-color="white"
              class="cursor-pointer"
              @click="openSelectFile()"
            >
              <img :src="url_imagen" />
            </q-avatar>
            <q-avatar
              v-else
              rounded
              size="100px"
              font-size="82px"
              color="grey"
              text-color="white"
              class="cursor-pointer"
              icon="add_a_photo"
              @click="openSelectFile()"
            ></q-avatar>
            <!-- <q-uploader
              v-else
              label="Adjuntar imágen"
              auto-upload
              :factory="uploadImage"
              style="max-width: 300px"
              max-files="1"
            /> -->
          </div>
          <div :class="$q.screen.width > 1000 ? 'row q-gutter-sm' : 'col'">
            <q-input
              label="Nombre*"
              outlined
              v-model="nombre"
              dense
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
            />
            <q-input
              label="Apellidos*"
              outlined
              v-model="apellidos"
              dense
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
            />
            <q-input
              label="Email*"
              outlined
              v-model="email"
              type="email"
              dense
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
            />
            <q-input
              label="Número de celular*"
              outlined
              v-model="numeroCelular"
              type="tel"
              dense
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
            />
            <q-input
              label="Ciudad de residencia*"
              outlined
              v-model="ciudadResidencia"
              placeholder="Caldas - Antioquia"
              dense
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Campo requerido']"
            />

            <q-input
              label="Lugar de nacimiento"
              outlined
              v-model="lugarNacimiento"
              placeholder="Itagui - Antioquia"
              dense
              lazy-rules
            />
            <br />
            <q-input
              outlined
              v-model="fechaNacimiento"
              label="Fecha de nacimiento"
              mask="date"
              :rules="['date']"
              dense
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      :locale="locale"
                      v-model="fechaNacimiento"
                      :title="fechaNacimiento"
                      subtitle="Fecha de nacimiento"
                      :navigation-max-year-month="maxYearAndMonth"
                      :default-year-month="maxYearAndMonth"
                      default-view="Years"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Cerrar"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </fieldset>

        <!-- PERFIL PROFESIONAL -->
        <fieldset>
          <legend>
            <div class="text-subtitle1 ft">Perfíl profesional</div>
          </legend>
          <div class="col q-gutter-md q-pb-md" style="text-align: center">
            <q-btn
              @click="
                setPerfil(
                  `Soy un trabajador altamente capacitado y motivado, con una trayectoria de éxito en diversas áreas y con habilidades demostradas en la resolución de problemas complejos. Mi enfoque riguroso y analítico me permite abordar problemas complejos con creatividad y eficacia, mientras que mi capacidad para adaptarme rápidamente a entornos cambiantes me permite desempeñarme con éxito en cualquier situación. Estoy comprometido con la excelencia en todo lo que hago, y estoy convencido de que mi experiencia, habilidades y ética de trabajo serán un valioso aporte para cualquier organización que busque alcanzar sus metas y objetivos.`
                )
              "
              no-caps
              push
              color="primary"
              label="Colocar perfíl sugerido"
            />
          </div>
          <q-editor
            v-model="perfil"
            :fonts="{
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana',
            }"
          />
        </fieldset>

        <!-- EXPERIENCIA LABORAL -->
        <fieldset>
          <legend>
            <div class="text-subtitle1 ft">Experiencia laboral</div>
          </legend>
          <div>
            <div :class="`row q-pa-sm`" v-for="(cargo, k) in cargos" :key="k">
              <div style="width: 100%">
                <div class="q-pa-sm flex-center" style="display: flex">
                  <q-btn
                    push
                    size="sm"
                    round
                    color="red"
                    icon="delete"
                    @click="removerCargo(k)"
                  />
                </div>
                <q-list bordered class="rounded-borders row">
                  <q-expansion-item
                    class="full-width"
                    expand-separator
                    default-opened
                    :caption="`${cargo.fechaInicio} - ${cargo.fechaFin}`"
                    :label="`${cargo.cargo} - ${cargo.empleador}`"
                  >
                    <div
                      :class="`${
                        $q.screen.width > 1000 ? 'row q-gutter-sm' : 'col'
                      } q-pa-sm`"
                    >
                      <q-input
                        label="Cargo laboral"
                        v-model="cargo.cargo"
                        outlined
                        dense
                        lazy-rules
                        :rules="[
                          (val) => (val && val.length > 0) || 'Campo requerido',
                        ]"
                      />
                      <q-input
                        label="Nombre de la empresa"
                        v-model="cargo.empleador"
                        outlined
                        dense
                        lazy-rules
                        :rules="[
                          (val) => (val && val.length > 0) || 'Campo requerido',
                        ]"
                      />
                      <q-input
                        label="Nombre del jefe inmediato"
                        v-model="cargo.jefe"
                        outlined
                        dense
                        lazy-rules
                        :rules="[
                          (val) => (val && val.length > 0) || 'Campo requerido',
                        ]"
                      />
                      <q-input
                        outlined
                        v-model="cargo.fechaInicio"
                        label="Fecha inicio"
                        mask="date"
                        :rules="['date']"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                :locale="locale"
                                v-model="cargo.fechaInicio"
                                default-view="Years"
                                :title="cargo.fechaInicio"
                                subtitle="Fecha inicio"
                              >
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Cerrar"
                                    color="primary"
                                    flat
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                      <q-input
                        outlined
                        v-model="cargo.fechaFin"
                        label="Fecha fin"
                        mask="date"
                        :rules="['date']"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                :locale="locale"
                                v-model="cargo.fechaFin"
                                default-view="Years"
                                :title="cargo.fechaFin"
                                subtitle="Fecha fin"
                              >
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Cerrar"
                                    color="primary"
                                    flat
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                      <q-input
                        label="Ciudad"
                        v-model="cargo.ciudad"
                        outlined
                        dense
                        lazy-rules
                        :rules="[
                          (val) => (val && val.length > 0) || 'Campo requerido',
                        ]"
                      />
                      <q-input
                        label="Número contácto"
                        type="tel"
                        v-model="cargo.contacto"
                        outlined
                        dense
                        lazy-rules
                        :rules="[
                          (val) => (val && val.length > 0) || 'Campo requerido',
                        ]"
                      />
                    </div>
                  </q-expansion-item>
                </q-list>
              </div>
            </div>
            <div class="q-py-md">
              <q-btn
                @click="addCargo()"
                no-caps
                push
                class="bg-primary"
                icon="add"
                text-color="white"
                label="Agregar empleo"
                style="width: 100%"
              />
            </div>
          </div>
        </fieldset>

        <!-- FORMACIÓN -->
        <fieldset>
          <legend>
            <div class="text-subtitle1 ft">Formación</div>
          </legend>
          <div>
            <div
              :class="`text-align: center; ${
                $q.screen.width > 1000 ? 'row q-gutter-sm' : 'row q-gutter-sm'
              } q-pa-sm`"
              v-for="(formacion, k) in formaciones"
              :key="k"
            >
              <div style="width: 100%">
                <div class="q-pa-sm flex-center" style="display: flex">
                  <q-btn
                    push
                    size="sm"
                    round
                    color="red"
                    icon="delete"
                    @click="removerFormacion(k)"
                  />
                </div>
                <q-list bordered class="rounded-borders row">
                  <q-expansion-item
                    class="full-width"
                    expand-separator
                    default-opened
                    :caption="`${formacion.fechaInicio} - ${formacion.fechaFin}`"
                    :label="`${formacion.institucion} - ${formacion.titulo}`"
                  >
                    <div
                      :class="`${
                        $q.screen.width > 1000 ? 'row q-gutter-sm' : 'col'
                      } q-pa-sm`"
                    >
                      <q-input
                        label="Institución"
                        v-model="formacion.institucion"
                        outlined
                        dense
                        lazy-rules
                        :rules="[
                          (val) => (val && val.length > 0) || 'Campo requerido',
                        ]"
                      />
                      <q-input
                        label="Título"
                        v-model="formacion.titulo"
                        outlined
                        dense
                        lazy-rules
                        :rules="[
                          (val) => (val && val.length > 0) || 'Campo requerido',
                        ]"
                      />
                      <q-input
                        outlined
                        v-model="formacion.fechaInicio"
                        label="Fecha inicio"
                        mask="date"
                        :rules="['date']"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              ref="formacionInicio"
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                :locale="locale"
                                v-model="formacion.fechaInicio"
                                default-view="Years"
                                :title="formacion.fechaInicio"
                                subtitle="Fecha de inicio"
                              >
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Cerrar"
                                    color="primary"
                                    flat
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                      <q-input
                        outlined
                        v-model="formacion.fechaFin"
                        label="Fecha fin"
                        mask="date"
                        :rules="['date']"
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                :locale="locale"
                                v-model="formacion.fechaFin"
                                default-view="Years"
                                :title="formacion.fechaFin"
                                subtitle="Fecha fin"
                              >
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Close"
                                    color="primary"
                                    flat
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                      <q-input
                        label="Ciudad"
                        v-model="formacion.ciudad"
                        outlined
                        dense
                        lazy-rules
                        :rules="[
                          (val) => (val && val.length > 0) || 'Campo requerido',
                        ]"
                      />
                    </div>
                  </q-expansion-item>
                </q-list>
              </div>
            </div>
            <div class="q-py-md">
              <q-btn
                @click="addFormacion()"
                no-caps
                push
                icon="add"
                text-color="white"
                class="bg-primary"
                label="Agregar formación"
                style="width: 100%"
              />
            </div>
          </div>
        </fieldset>

        <!-- REFERENCIAS PERSONALES-->
        <fieldset>
          <legend>
            <div class="text-subtitle1 ft">Referencias personales</div>
          </legend>
          <div>
            <div
              :class="`text-align: center; ${
                $q.screen.width > 1000 ? 'row q-gutter-sm' : 'row q-gutter-sm'
              } q-pa-sm`"
              v-for="(referencia, k) in referenciasPersonales"
              :key="k"
            >
              <div style="width: 100%">
                <div class="q-pa-sm flex-center" style="display: flex">
                  <q-btn
                    push
                    size="sm"
                    round
                    color="red"
                    icon="delete"
                    @click="removerReferenciaPersonal(k)"
                  />
                </div>
                <q-list bordered class="rounded-borders row">
                  <q-expansion-item
                    class="full-width"
                    expand-separator
                    default-opened
                    :caption="`${referencia.telefono}`"
                    :label="`${referencia.nombre}`"
                  >
                    <div
                      :class="`${
                        $q.screen.width > 1000 ? 'row q-gutter-sm' : 'col'
                      } q-pa-sm`"
                    >
                      <q-input
                        label="Nombre completo de la persona"
                        v-model="referencia.nombre"
                        outlined
                        dense
                        lazy-rules
                        :rules="[
                          (val) => (val && val.length > 0) || 'Campo requerido',
                        ]"
                      />
                      <q-input
                        type="tel"
                        outlined
                        v-model="referencia.telefono"
                        label="Teléfono o celular"
                        dense
                        lazy-rules
                        :rules="[
                          (val) => (val && val.length > 0) || 'Campo requerido',
                        ]"
                      />
                    </div>
                  </q-expansion-item>
                </q-list>
              </div>
            </div>
            <div class="q-py-md">
              <q-btn
                @click="addReferenciaPersonal()"
                no-caps
                push
                icon="add"
                text-color="white"
                class="bg-primary"
                label="Agregar referencia laboral"
                style="width: 100%"
              />
            </div>
          </div>
        </fieldset>

        <!-- REFERENCIAS FAMILIARES-->
        <fieldset>
          <legend>
            <div class="text-subtitle1 ft">Referencias familiares</div>
          </legend>
          <div>
            <div
              :class="`text-align: center; ${
                $q.screen.width > 1000 ? 'row q-gutter-sm' : 'row q-gutter-sm'
              } q-pa-sm`"
              v-for="(referencia, k) in referenciasFamiliares"
              :key="k"
            >
              <div style="width: 100%">
                <div class="q-pa-sm flex-center" style="display: flex">
                  <q-btn
                    push
                    size="sm"
                    round
                    color="red"
                    icon="delete"
                    @click="removerReferenciaFamiliar(k)"
                  />
                </div>
                <q-list bordered class="rounded-borders row">
                  <q-expansion-item
                    class="full-width"
                    expand-separator
                    default-opened
                    :caption="`${referencia.telefono}`"
                    :label="`${referencia.nombre} - ${referencia.parentezco}`"
                  >
                    <div
                      :class="`${
                        $q.screen.width > 1000 ? 'row q-gutter-sm' : 'col'
                      } q-pa-sm`"
                    >
                      <q-input
                        label="Nombre completo de la persona"
                        v-model="referencia.nombre"
                        outlined
                        dense
                        lazy-rules
                        :rules="[
                          (val) => (val && val.length > 0) || 'Campo requerido',
                        ]"
                      />
                      <q-input
                        label="Parentezco"
                        v-model="referencia.parentezco"
                        outlined
                        dense
                        lazy-rules
                        :rules="[
                          (val) => (val && val.length > 0) || 'Campo requerido',
                        ]"
                      />
                      <q-input
                        type="tel"
                        outlined
                        v-model="referencia.telefono"
                        label="Teléfono o celular"
                        dense
                        lazy-rules
                        :rules="[
                          (val) => (val && val.length > 0) || 'Campo requerido',
                        ]"
                      />
                    </div>
                  </q-expansion-item>
                </q-list>
              </div>
            </div>
            <div class="q-py-md">
              <q-btn
                @click="addReferenciaFamiliar()"
                no-caps
                push
                icon="add"
                text-color="white"
                class="bg-primary"
                label="Agregar referencia familiar"
                style="width: 100%"
              />
            </div>
          </div>
        </fieldset>
        <div class="full-width q-py-md" style="text-align: center">
          <q-btn
            type="submit"
            color="primary"
            push
            label="Generar hoja de vida"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { Noty, Loading, firebase, AmazonS3 } from "../mixins/index";
import Docxtemplater from "docxtemplater";
import ImageModule from "docxtemplater-image-module-free/build/imagemodule";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
const loadFile = (url, callback) => {
  PizZipUtils.getBinaryContent(url, callback);
};
import axios from "axios";
export default defineComponent({
  name: "Formulario",
  mixins: [Loading, Noty, firebase, AmazonS3],
  data() {
    return {
      locale: {
        days: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
        daysShort: "Dom_Lun_Mar_Mié_Jue_Vie_Sáb".split("_"),
        months:
          "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
            "_"
          ),
        monthsShort: "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split(
          "_"
        ),
        firstDayOfWeek: 1,
      },
      maxYearAndMonth: `${
        new Date().getFullYear() - 15
      }/${new Date().getMonth()}`,
      imagen: null,
      url_imagen: null,
      nombre: null,
      apellidos: null,
      cedula: null,
      email: null,
      numeroCelular: null,
      ciudadResidencia: null,
      lugarNacimiento: null,
      fechaNacimiento: null,
      perfil: null,
      cargos: [],
      formaciones: [],
      referenciasPersonales: [],
      referenciasFamiliares: [],
    };
  },
  watch: {
    imagen() {
      if (this.imagen) {
        this.uploadImage([this.imagen]);
      }
    },
  },
  created() {
    if (this.$router.currentRoute.value.params.cedula) {
      this.cedula = this.$router.currentRoute.value.params.cedula;
      this.showLoading("Cargando datos...");
      this.getInfoPerson(this.cedula)
        .then((response) => {
          this.hideLoading();
          this.nombre = response.nombre;
          this.apellidos = response.apellidos;
          this.email = response.email;
          this.perfil = response.perfil;
          this.numeroCelular = response.numeroCelular;
          this.ciudadResidencia = response.ciudadResidencia;
          this.lugarNacimiento = response.lugarNacimiento;
          this.fechaNacimiento = response.fechaNacimiento;
          this.url_imagen = response.url_imagen;
          this.imagen = response.imagen;
          this.cargos = response.cargos;
          this.formaciones = response.formaciones;
          this.referenciasPersonales = response.referenciasPersonales
            ? response.referenciasPersonales
            : [];
          this.referenciasFamiliares = response.referenciasFamiliares
            ? response.referenciasFamiliares
            : [];
          this.Noty("success", "Información obtenida con éxito.");
        })
        .catch((e) => {
          this.Noty(
            "warning",
            "No encontramos ninguna hoja de vida con el número de cédula ingresado, por favor diligencia el formulario."
          );
          this.hideLoading();
        });
    }
  },
  methods: {
    setPerfil(p) {
      this.perfil = p;
    },
    addCargo() {
      this.cargos.push({
        cargo: "",
        empleador: "",
        jefe: "",
        fechaInicio: "",
        fechaFin: "",
        ciudad: "",
        contacto: "",
        actual: false,
      });
    },
    removerCargo(pos) {
      this.cargos.splice(pos, 1);
    },
    addFormacion() {
      this.formaciones.push({
        titulo: "",
        institucion: "",
        titulo: "",
        fechaInicio: "",
        fechaFin: "",
        ciudad: "",
      });
    },
    removerFormacion(pos) {
      this.formaciones.splice(pos, 1);
    },
    addReferenciaPersonal() {
      this.referenciasPersonales.push({
        nombre: "",
        telefono: "",
      });
    },
    removerReferenciaPersonal(pos) {
      this.referenciasPersonales.splice(pos, 1);
    },
    addReferenciaFamiliar() {
      this.referenciasFamiliares.push({
        nombre: "",
        parentezco: "",
        telefono: "",
      });
    },
    removerReferenciaFamiliar(pos) {
      this.referenciasFamiliares.splice(pos, 1);
    },
    uploadImage(files) {
      const file = files[0];
      this.showLoading("Cargando imágen...");
      this.uploadFileS3(file, file.name)
        .then((url) => {
          this.url_imagen = url;
          this.hideLoading();
        })
        .catch((e) => {
          console.log("ERROR:::::", e.message);
          this.hideLoading();
          this.Noty("error", "Ocurrió un error al intentar cargar la imágen.");
        });
    },
    openSelectFile() {
      const element = document.getElementsByName("imagen");
      element[0].click();
    },
    onSubmit() {
      this.$refs.formulario.validate().then((success) => {
        if (success) {
          if (!this.cedula) {
            this.$q
              .dialog({
                title: "Guardar información",
                message:
                  "Quieres que guardemos tus datos para una próxima oportunidad?",
                cancel: true,
                persistent: true,
              })
              .onOk(() => {
                this.$q
                  .dialog({
                    title: "Número de identificación",
                    message:
                      "Ingresa por favor tu número de identificación, sin puntos ni comas.",
                    prompt: {
                      model: null,
                      type: "tel",
                    },
                    cancel: true,
                    persistent: true,
                  })
                  .onOk((data) => {
                    this.cedula = data;
                    this.showLoading("Geenerando documento...");
                    this.renderDoc();
                  });
              })
              .onCancel(() => {
                this.showLoading("Geenerando documento...");
                this.renderDoc();
              });
          } else {
            this.showLoading("Geenerando documento...");
            this.renderDoc();
          }
        }
      });
    },
    renderDoc() {
      let data = {
        image: this.url_imagen
          ? this.url_imagen
          : "https://proyectoempleo.s3.us-east-2.amazonaws.com/logo.jpg",
        nombre: this.nombre,
        apellidos: this.apellidos,
        email: this.email,
        numeroCelular: this.numeroCelular,
        ciudadResidencia: this.ciudadResidencia,
        lugarNacimiento: this.lugarNacimiento,
        fechaNacimiento: this.fechaNacimiento,
        perfil: this.perfil,
        cargos: this.cargos,
        formaciones: this.formaciones,
        referenciasPersonales: this.referenciasPersonales,
        referenciasFamiliares: this.referenciasFamiliares,
        cedula: this.cedula,
      };
      const hide = () => {
        this.hideLoading();
        this.Noty("success", "Documento generado correctamente.");
      };
      if (this.cedula) {
        this.saveIntoFirebase(data);
      }
      loadFile("/word_template.docx", function (error, content) {
        if (error) {
          this.Noty(
            "error",
            "Ocurrió un error al intentar crear el documento."
          );
          throw error;
        }
        try {
          const zip = new PizZip(content);
          const imageOpts = {
            getImage(url) {
              return new Promise((resolve, reject) => {
                const imgArray = url.split("/");
                axios
                  .get(
                    `https://qba6qcvyqjzuju5mn37jusewme0hmcvi.lambda-url.us-east-1.on.aws?image=${
                      imgArray[imgArray.length - 1]
                    }`
                  )
                  .then((response) => {
                    const dataURL = response.data.base64Data;
                    const stringBase64 = dataURL;
                    let binaryString;
                    if (typeof window !== "undefined") {
                      binaryString = window.atob(stringBase64);
                    } else {
                      binaryString = new Buffer(
                        stringBase64,
                        "base64"
                      ).toString("binary");
                    }
                    const len = binaryString.length;
                    const bytes = new Uint8Array(len);
                    for (let i = 0; i < len; i++) {
                      const ascii = binaryString.charCodeAt(i);
                      bytes[i] = ascii;
                    }
                    resolve(bytes.buffer);
                  })
                  .catch((error) => {
                    console.error("Error retrieving image:", error);
                    reject(error);
                  });
              });
            },
            getSize() {
              return [100, 100];
            },
          };
          var imageModule = new ImageModule(imageOpts);
          const doc = new Docxtemplater()
            .attachModule(imageModule)
            .loadZip(zip)
            .compile();

          doc
            .resolveData(data)
            .then(function () {
              doc.render();
              const out = doc.getZip().generate({
                type: "blob",
                mimeType:
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              });
              // Output the document using Data-URI
              hide();
              saveAs(out, `${data.nombre} ${data.apellidos}.docx`);
            })
            .catch((e) => {
              console.log("ERROR:::::", e);
              hide();
            });
        } catch (error) {
          console.log("ERROR:::::", error);
          hide();
        }
      });
    },
    saveIntoFirebase(data) {
      this.saveData(data);
    },
  },
});
</script>
