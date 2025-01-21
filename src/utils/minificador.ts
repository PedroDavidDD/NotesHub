export const validateImage = async (url: string): Promise<boolean> => {
    try {
      const img = new Image();
      img.src = url;
  
      // Espera a que la imagen cargue para verificar tamaño
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
  
      // Verifica las dimensiones y tamaño [MB <- Kilobyte (KB) <- Byte]
      const maxFileSize = 2 * 1024 * 1024; // 2MB
      const response = await fetch(url);
      const blob = await response.blob();
  
      if (blob.size > maxFileSize) {
        alert("La imagen supera el tamaño máximo permitido (2MB).");
        return false;
      }
  
      const maxWidth = 1920; // Máxima anchura permitida
      const maxHeight = 1380; // Máxima altura permitida
  
      if (img.width > maxWidth || img.height > maxHeight) {
        alert("Las dimensiones de la imagen son demasiado grandes.");
        return false;
      }
  
      return true;
    } catch (error) {
      alert("URL no válida o error al cargar la imagen.");
      return false;
    }
  };
  