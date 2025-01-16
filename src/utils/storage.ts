import { listNotes } from '../Scripts/listNotes';
import type { backgroundNotes, ScheduleBox } from '../types/schedule';

const STORAGE_KEY = 'stream-schedule';
const STORAGE_BG_KEY = 'stream-background';

export const storage = {
  save: (boxes: ScheduleBox[], bgData?: backgroundNotes) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boxes));
    localStorage.setItem(STORAGE_BG_KEY, JSON.stringify(bgData));
  },

  load: (): { listNotes: ScheduleBox[]; background: backgroundNotes } => {
    const notesData  = localStorage.getItem(STORAGE_KEY);
    const backgroundData  = localStorage.getItem(STORAGE_BG_KEY);

    return {
      listNotes: notesData ? JSON.parse(notesData) : listNotes,
      background: backgroundData
        ? JSON.parse(backgroundData)
        : { color: "#000000", image: "", size: "contain" },
    };
  },

  exportToFile: (boxes: ScheduleBox[], bgData?: backgroundNotes) => {
    const data = {
      boxes,
      background: bgData || { color: "#000000", image: "", size: "contain" },
    };
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'stream-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  importFromFile: (file: File): Promise<{ listNotes: ScheduleBox[]; background: backgroundNotes }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content);
          if (!data.boxes || !data.background) {
            throw new Error('Invalid file format');
          }
          resolve({ listNotes: data.boxes, background: data.background });
        } catch (error) {
          reject(new Error('Invalid file format'));
        }
      };
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsText(file);
    });
  },
};