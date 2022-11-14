document.addEventListener("DOMContentLoaded", function () {

  //Creamos un objeto con los 3 campos vacíos, para que cuando lo llenemos hagamos aparecer el botón de enviar
  const email = {
    email: "",
    asunto: "",
    mensaje: ""
  }

  // Seleccionar los elementos de la interface
  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const inputSubmit = document.querySelector("#formulario button[type='submit']");
  const inputReset = document.querySelector("#formulario button[type='reset']");
  const spinner = document.querySelector("#spinner");
  
  // Asignar eventos
  inputEmail.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);

  formulario.addEventListener("submit", enviarEmail);

  inputReset.addEventListener("click", function(e) {
    e.preventDefault();

    // Reiniciar el objeto
    resetFormulario();
  })

  function enviarEmail(e) {
    e.preventDefault()

    spinner.classList.add("flex");
    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.add("hidden");
      spinner.classList.remove("remove");

      // Reiniciar el objeto
      resetFormulario();

      // Crear un alerta
      const alertaExito = document.createElement("P");
      alertaExito.classList.add("bg-green-500", "text-white", "p-2", "text-center", "rounded-lg", "mt-10", "font-bold", "text-sm", "uppercase");
      alertaExito.textContent = "Mensaje enviado correctamente";
      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove()
      }, 2000)


    }, 2000)
  }

  function validar(e) {
    //.trim() quita los espacios en blaco al principio y al final
    if(e.target.value.trim() === "") {
      // Hacemos el mensaje dinámico con e.target.id
      mostrarAlerta(`El ${e.target.id} es obligatorio`, e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail(); 
      return; 
    } 

    if(e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta("El email no es válido", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return
    }

    limpiarAlerta(e.target.parentElement);

    // Asignar los valores al objeto
    // Esta sintaxis permite llenar el objeto email gracias al name en HTML
    email[e.target.name] = e.target.value.trim().toLowerCase();
    
    // Comprobar el objeto de email
    comprobarEmail();

  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia)

    // Generar una alerta en HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center", "rounded-lg")
    
    // Inyectar el error al formulario
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    // Comprobar si ya existe una alerta
    const alerta = referencia.querySelector(".bg-red-600");
    if(alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    // Expresión regular para validar el email
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    const resultado = regex.test(email)
    return resultado; 
  }

  function comprobarEmail() {
    if(Object.values(email).includes("")) {
      inputSubmit.classList.add("opacity-50");
      inputSubmit.disabled = true;
      return;
    } 
    
      inputSubmit.classList.remove("opacity-50");
      inputSubmit.disabled = false;
  }

  function resetFormulario () {
    // Reiniciar el objeto
    email.email = ""
    email.asunto = ""
    email.mensaje = ""
    formulario.reset();
    comprobarEmail();
  }
  
});
