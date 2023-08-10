document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.querySelector('.formulario');
    
    uploadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(uploadForm);
      const photoFile = formData.get('photo'); // Obtener el archivo
  
      // Verificar si se obtiene correctamente el archivo
      if (photoFile) {
        console.log('Nombre del archivo:', photoFile.name);
        console.log('Tipo de archivo:', photoFile.type);
        console.log('Tamaño del archivo:', photoFile.size, 'bytes');
      } else {
        console.log('No se seleccionó ningún archivo.');
      }
  
      // Resto de tu código para enviar el formulario a Cloudinary
    });
  });
  