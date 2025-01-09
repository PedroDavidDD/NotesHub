export interface ScheduleBox {
  id: string;
  date: string;
  title: string;
  time: string;
  description?: string;
  backgroundColor: string;
  image?: string;
  tags?: string[];

  borderColor?: string;
  textAlign: string;
  
  order: number;
  particleColor: string;
  accentColor: string;
}