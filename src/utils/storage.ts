import { listNotes } from '../Scripts/listNotes';
import type { backgroundNotes, ScheduleBox } from '../types/schedule';

const STORAGE_KEY = 'stream-schedule';
const STORAGE_BG_KEY = 'stream-background';

export const storage = {
  save: (boxes: ScheduleBox[], bgData?: backgroundNotes) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boxes));
    localStorage.setItem(STORAGE_BG_KEY, JSON.stringify(bgData));
  },

  load: (): ScheduleBox[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : listNotes;
  },

  loadBackground: (): backgroundNotes => {
    const data = localStorage.getItem(STORAGE_BG_KEY);
    return data ? JSON.parse(data) : { color: "#000000", image: "", size: "contain"} ;
  },

  exportToFile: (boxes: ScheduleBox[]) => {
    const data = JSON.stringify(boxes, null, 2);
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'stream-schedule.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  importFromFile: (file: File): Promise<ScheduleBox[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content);
          resolve(data);
        } catch (error) {
          reject(new Error('Invalid file format'));
        }
      };
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsText(file);
    });
  }
};