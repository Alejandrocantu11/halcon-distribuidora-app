// public/js/login.js

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
  
    // Evento para Login
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const correo = document.getElementById("loginCorreo").value;
      const password = document.getElementById("loginPassword").value;
      loginUser(correo, password);
    });
  
    // Evento para Registro
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.getElementById("regNombre").value;
      const correo = document.getElementById("regCorreo").value;
      const password = document.getElementById("regPassword").value;
      registerUser(nombre, correo, password);
    });
  });
  
  function loginUser(correo, password) {
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Login exitoso");
          // Redirige a la página principal (o donde gustes)
          window.location.href = "index.html";
        } else {
          alert("Credenciales inválidas");
        }
      })
      .catch((error) => console.error("Error en login:", error));
  }
  
  function registerUser(nombre, correo, password) {
    fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Registro exitoso. Revisa tu correo.");
          window.location.href = "login.html";
        } else {
          alert("Error en registro: " + data.message);
        }
      })
      .catch((error) => console.error("Error en registro:", error));
  }
  