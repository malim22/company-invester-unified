import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDQpLCStCdWAw6IB026M8oSwZxhGYtOWyQ",
  authDomain: "bridgeinvestorapp.firebaseapp.com",
  projectId: "bridgeinvestorapp",
  storageBucket: "bridgeinvestorapp.firebasestorage.app",
  messagingSenderId: "885907466541",
  appId: "1:885907466541:web:c96eb454254abf00110ba4",
  measurementId: "G-07T9Q3H8C5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("Firebase initialized");

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const role = document.getElementById("regRole").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    console.log("User created:", uid);

    await setDoc(doc(db, "users", uid), { email, role });

    console.log("User added to Firestore");

    alert("Registered successfully");
    showDashboard(role);
  } catch (error) {
    console.error("Error in registration:", error.message);
    alert("Registration failed: " + error.message);
  }
});

// 👇 Add this function so dashboard works
function showDashboard(role) {
  document.getElementById("register-section").style.display = "none";
  document.getElementById("login-section").style.display = "none";
  document.getElementById("dashboard-section").style.display = "block";
  document.getElementById("roleOutput").innerText = `You are logged in as: ${role}`;
}
