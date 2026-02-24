/* ========================================
   FIREBASE CONFIG — GAME HUB
   Jeden plik konfiguracyjny dla całego projektu
   ======================================== */

const firebaseConfig = {
    apiKey: "AIzaSyAtUUti2TLO6D58IAZMGDTxP7Mdl9RJwYw",
    authDomain: "gamehub-ed04d.firebaseapp.com",
    databaseURL: "https://gamehub-ed04d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gamehub-ed04d",
    storageBucket: "gamehub-ed04d.firebasestorage.app",
    messagingSenderId: "726966082915",
    appId: "1:726966082915:web:646a575b1fde3d86e00756",
    measurementId: "G-V8BPKCQX3K"
};

// Inicjalizacja Firebase (compat mode — bez bundlera)
if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    window.db = firebase.database();
    console.log('🔥 Firebase initialized for Game Hub');
} else {
    console.error('Firebase SDK not loaded! Dodaj skrypty CDN przed tym plikiem.');
}
