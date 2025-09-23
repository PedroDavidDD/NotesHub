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
  
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
      hour12: true,
    };

    const longFormattedDate = new Intl.DateTimeFormat('es-PE', options).format(parsedDate);
  
    return {
      isoFormattedDate: parsedDate.toISOString().split("T")[0], 
      longFormattedDate
    };
  };