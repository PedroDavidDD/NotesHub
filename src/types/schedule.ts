export interface ScheduleBox {
  id: string;
  date: string;
  title: string;
  time: string;
  description?: string;
  color: string;
  image?: string;
  tags?: string[];
  icon?: string;
  borderStyle?: string;
  textAlign?: string;
  order: number;
}