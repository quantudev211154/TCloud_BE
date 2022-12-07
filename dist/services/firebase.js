"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const firebase_config_1 = require("../config/firebase.config");
class MyFirebase {
    constructor() {
        this.getFirebaseStorage = () => this.storage;
        this.firebaseApp = (0, app_1.initializeApp)(firebase_config_1.firebaseConfig);
        this.storage = (0, storage_1.getStorage)(this.firebaseApp);
        console.log('NOTI: Firebase service has already');
    }
}
exports.default = MyFirebase;
