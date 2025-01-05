export interface ScheduleBox {
  id: string;
  date: string;
  title: string;
  time: string;
  color: string;
  image?: string;
  description?: string;
  tags?: string[];
  icon?: string;
  borderStyle?: string;
  textAlign?: string;
  order: number;
}