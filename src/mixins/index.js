import Compressor from "compressorjs";
import S3 from "aws-s3";
export const firebase = {
  data() {
    return {};
  },
  methods: {
    comprimirArchivo(file) {
      return new Promise((resolve, reject) => {
        new Compressor(file, {
          quality: 0.6,
          maxWidth: 1920,
          maxHeight: 1280,
          minWidth: 350,
          minHeight: 350,
          convertSize: 2000000,
          success(result) {
            resolve(result);
          },
          error(err) {
            console.log("ERROR COMPRIMIR:::::", err.message);
            reject(err);
          },
        });
      });
    },
    saveData(data) {
      return new Promise(async (resolve, reject) => {
        const ref = this.$doc(
          this.$fireStore,
          "personas",
          data.cedula.trim().replace(" ", "")
        );
        await this.$setDoc(ref, data, { merge: true });
        resolve(true);
      });
    },
    getInfoPerson(cedula) {
      return new Promise(async (resolve, reject) => {
        const ref = this.$doc(
          this.$fireStore,
          "personas",
          cedula.trim().replace(" ", "")
        );
        const docSnap = await this.$getDoc(ref);
        if (docSnap.exists()) {
          resolve(docSnap.data());
        } else {
          reject("No existe el documento");
        }
      });
    },
    getDataFirebaseConfig(clave) {
      const val = this.$getValue(this.$remoteConfig, clave);
      return val._value;
    },
  },
};
export const Loading = {
  methods: {
    showLoading(message) {
      this.$q.loading.show({
        message: message,
      });
    },
    hideLoading() {
      this.$q.loading.hide();
    },
  },
};
export const Noty = {
  methods: {
    Noty(type, message, timeout = 5000) {
      switch (type) {
        case "success":
          this.$q.notify({
            type: "positive",
            color: "green",
            icon: "check",
            message,
            timeout,
            actions: [
              {
                color: "white",
                icon: "close",
              },
            ],
          });
          break;
        case "warning":
          this.$q.notify({
            type: "warning",
            color: "orange",
            icon: "feedback",
            message,
            timeout,
            actions: [
              {
                color: "white",
                icon: "close",
              },
            ],
          });
          break;
        case "error":
          this.$q.notify({
            type: "negative",
            color: "red",
            icon: "feedback",
            message,
            timeout,
            actions: [
              {
                color: "white",
                icon: "close",
              },
            ],
          });
          break;
        case "info":
          this.$q.notify({
            type: "info",
            color: "blue",
            icon: "info",
            message,
            timeout,
            actions: [
              {
                color: "white",
                icon: "close",
              },
            ],
          });
          break;
      }
    },
  },
};

export const Filters = {
  filters: {
    currency(value) {
      if (value) {
        if (value !== undefined) {
          return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        }
      }
      return "0";
    },
  },
};

export const AmazonS3 = {
  data() {
    return {
      config: {
        bucketName: process.env.VUE_APP_BUCKET_NAME,
        dirName: "people-pictures",
        region: process.env.VUE_APP_REGION,
        accessKeyId: process.env.VUE_APP_ACCESS_KEY_ID,
        secretAccessKey: process.env.VUE_APP_SECRET_ACCESS_KEY,
        s3Url: process.env.VUE_APP_S3_URL,
      },
    };
  },
  methods: {
    uploadFileS3(file, fileName) {
      return new Promise((resolve, reject) => {
        this.comprimirArchivo(file)
          .then((result) => {
            const S3Client = new S3(this.config);
            const now = new Date();
            const newFileName = fileName + now.getTime().toString();
            S3Client.uploadFile(result, newFileName)
              .then((data) => {
                resolve(data.location);
              })
              .catch((err) => {
                console.log("EL ERROR:::::", err);
                reject(err);
              });
          })
          .catch((e) => {
            console.log("EL ERROR:::::", e);
            reject(e);
          });
      });
    },
    uploadFileArchivo(file, fileName, dir) {
      return new Promise((resolve, reject) => {
        this.config.dirName = this.isTesting()
          ? "Pruebas/" + dir
          : "Produccion/" + dir;
        const S3Client = new S3(this.config);
        const newFileName = fileName;
        S3Client.uploadFile(file, newFileName)
          .then((data) => {
            resolve(data.location);
          })
          .catch((err) => reject(err));
      });
    },
    isTesting() {
      if (window.location.hostname === "negocios.ikiero.com") {
        return false;
      } else {
        return true;
      }
    },
    comprimirArchivo(file) {
      return new Promise((resolve, reject) => {
        new Compressor(file, {
          quality: 0.6,
          maxWidth: 1920,
          maxHeight: 1280,
          minWidth: 350,
          minHeight: 350,
          convertSize: 2000000,
          success(result) {
            resolve(result);
          },
          error(err) {
            reject(err);
          },
        });
      });
    },
  },
};
