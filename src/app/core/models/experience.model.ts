export interface Experience {
  id: number;
  icon: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  tags: string[];
  position: 'left' | 'right';
}