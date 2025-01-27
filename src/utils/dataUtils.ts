  interface FormattedDate {
    isoFormattedDate: string; // Fecha en formato ISO (YYYY-MM-DD)
    longFormattedDate: string; // Fecha en formato largo (15 de enero de 2005)
  }
  
  export const formatDate = (date: string): FormattedDate => {
    const [day, month, year] = date.split('-'); 
    const isoDate = `${day}-${month}-${year}`;
    const parsedDate = new Date(isoDate);
  
    if (isNaN(parsedDate.getTime())) {
      return { isoFormattedDate: '', longFormattedDate: '' }; 
    }
  
    // Si quieres mostrar la fecha en formato largo
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    };
  
    const formattedDate = parsedDate.toLocaleDateString('es-ES', options); 
  
    return {
      isoFormattedDate: isoDate, 
      longFormattedDate: formattedDate 
    };
  };