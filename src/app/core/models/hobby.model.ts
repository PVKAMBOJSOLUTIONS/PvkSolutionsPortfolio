export interface Hobby {
  id: number;
  title: string;
  description: string;
  icon: string;
  activities?: { name: string; description: string }[];
}