// public/js/users.js

document.addEventListener("DOMContentLoaded", () => {
    fetchUsers();
  
    const formAddUser = document.getElementById("formAddUser");
    formAddUser.addEventListener("submit", (e) => {
      e.preventDefault();
      addUser();
    });
  });
  
  // Obtiene la lista de usuarios desde tu API
  function fetchUsers() {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        renderUsers(data);
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
      });
  }
  
  // Muestra la lista de usuarios en la tabla
  function renderUsers(users) {
    const tbody = document.getElementById("usersTableBody");
    tbody.innerHTML = "";
  
    users.forEach((user) => {
      const row = document.createElement("tr");
  
      // Nombre
      const tdNombre = document.createElement("td");
      tdNombre.textContent = user.nombre;
      row.appendChild(tdNombre);
  
      // Correo
      const tdCorreo = document.createElement("td");
      tdCorreo.textContent = user.correo;
      row.appendChild(tdCorreo);
  
      // Acciones
      const tdAcciones = document.createElement("td");
  
      // Botón Editar
      const btnEdit = document.createElement("button");
      btnEdit.textContent = "Editar";
      btnEdit.addEventListener("click", () => editUser(user.id));
      tdAcciones.appendChild(btnEdit);
  
      // Botón Eliminar
      const btnDelete = document.createElement("button");
      btnDelete.textContent = "Eliminar";
      btnDelete.addEventListener("click", () => deleteUser(user.id));
      tdAcciones.appendChild(btnDelete);
  
      row.appendChild(tdAcciones);
  
      tbody.appendChild(row);
    });
  }
  
  // Agregar un usuario nuevo
  function addUser() {
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
  
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Limpiamos el formulario y recargamos la lista
        document.getElementById("formAddUser").reset();
        fetchUsers();
      })
      .catch((error) => console.error("Error al agregar usuario:", error));
  }
  
  // Editar un usuario (prompt sencillo para ejemplo)
  function editUser(id) {
    const nuevoNombre = prompt("Nuevo nombre:");
    const nuevoCorreo = prompt("Nuevo correo:");
    if (!nuevoNombre || !nuevoCorreo) return;
  
    fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nuevoNombre, correo: nuevoCorreo }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchUsers();
      })
      .catch((error) => console.error("Error al editar usuario:", error));
  }
  
  // Eliminar un usuario
  function deleteUser(id) {
    if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;
  
    fetch(`/api/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        fetchUsers();
      })
      .catch((error) => console.error("Error al eliminar usuario:", error));
  }
  