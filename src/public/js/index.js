const uploadForm = document.querySelector(".formulario");
const showImages = document.querySelector(".showImages");
const imagesContainer = document.querySelector(".images");
const spinner = document.querySelector(".spinner-upload");
const resetBtn = document.querySelector(".reset");
const previewContainer = document.querySelector(".preview-container");

// Eventos

//Carga las imagenes en el DOM
document.addEventListener("DOMContentLoaded", async () => {
  showAllImages();
});

//Boton para mostrar todas las imagenes
showImages.addEventListener("click", async (e) => {
  e.preventDefault();
  showAllImages();
});

//Subir imagen
uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const formData = new FormData(uploadForm);
  const photoFile = formData.get("photo"); // Obtener el archivo

  
  // Verificar si se obtiene correctamente el archivo
  if (photoFile.name === "") {
    Swal.fire({
      title: 'Error!',
      text: 'No se proporcionó ningún archivo',
      icon: 'error',
      confirmButtonText: 'Volver a intentar'
    });

    return;
  }
  
  try {
    mostrarSpinner();

    const res = await fetch("/api/imagenes/upload", {
      method: "POST",
      body: formData,
    });

    if(res.status === 201){
      Swal.fire({
        title: 'Exito!',
        text: 'La imagen se subió correctamente!',
        icon: 'success',
        confirmButtonText: 'Subir otra imagen'
      });
      previewContainer.innerHTML = "";
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'La imagen ya existe!',
        icon: 'error',
        confirmButtonText: 'Volver a intentar'
      });
      previewContainer.innerHTML = "";
    }
  } catch (error) {
   Swal.fire({
     title: 'Error!',
     text: 'Error en el servidor!',
     icon: 'error',
     confirmButtonText: 'Volver a intentar'
   })
  }
  ocultarSpinner();
  showAllImages();

  //Limpiar el formulario

  uploadForm.reset();
});

//Reset
resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  uploadForm.reset();
  previewContainer.innerHTML = "";
});

//Pre-carga la imagen.
uploadForm.addEventListener("change", (e) => {
  e.preventDefault();
  const file = e.target.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewImage = document.createElement("img");
      previewImage.classList.add("preview-image");
      previewImage.src = e.target.result;
      previewContainer.innerHTML = "";
      previewContainer.appendChild(previewImage);
    };
    reader.readAsDataURL(file);

  }
});


//Funciones

const showAllImages = async () => {
  //Limpiar el div
  imagesContainer.innerHTML = "";
  const images = await fetch("/api/imagenes/getAll");
  const data = await images.json();
  if (!data) {
    return;
  }
  data.images.map((image) => {
    const imageElement = document.createElement("img");
    imageElement.src = image.url;
    imageElement.classList.add("imagenItem", "m-3");
    imagesContainer.appendChild(imageElement);
  });
};

const mostrarSpinner = () => {
  
  spinner.classList.add("on");
  spinner.classList.remove("off");

}

const ocultarSpinner = () => {
  spinner.classList.add("off");
  spinner.classList.remove("on");

}
