     
    const uploadForm = document.querySelector('.formulario');
    
    uploadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(uploadForm);
      const photoFile = formData.get('photo'); // Obtener el archivo
  
      // Verificar si se obtiene correctamente el archivo
      if(!photoFile){
        console.log('No has seleccionado ningún archivo');
        return;
      }

      const res = await fetch('/api/imagenes/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json();
      console.log(data);
    });

   
  