import { boot } from "quasar/wrappers";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  getRemoteConfig,
  getValue,
  fetchAndActivate,
} from "firebase/remote-config";

export default boot(({ app }) => {
  let firebaseConfig = {
    apiKey: "AIzaSyAYSIiZkqGPIdN5v3Ac4CrcQ4ZRaWVJJdk",
    authDomain: "hdevidaa.firebaseapp.com",
    projectId: "hdevidaa",
    storageBucket: "hdevidaa.appspot.com",
    messagingSenderId: "851359441841",
    appId: "1:851359441841:web:7e433f6e2c87272d699390",
    measurementId: "G-1YH6HFM39M",
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const storage = getStorage(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  const remoteConfig = getRemoteConfig(firebaseApp);

  app.config.globalProperties.$storage = storage;
  app.config.globalProperties.$getDownloadURL = getDownloadURL;
  app.config.globalProperties.$ref = ref;
  app.config.globalProperties.$uploadBytes = uploadBytes;
  app.config.globalProperties.$fireStore = firestore;
  app.config.globalProperties.$collection = collection;
  app.config.globalProperties.$addDoc = addDoc;
  app.config.globalProperties.$setDoc = setDoc;
  app.config.globalProperties.$doc = doc;
  app.config.globalProperties.$getDoc = getDoc;
  app.config.globalProperties.$remoteConfig = remoteConfig;
  app.config.globalProperties.$getValue = getValue;
  app.config.globalProperties.$fetchAndActivate = fetchAndActivate;
});
