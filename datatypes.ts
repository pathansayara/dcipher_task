export interface job {
  id: number;
  company: string;
  logo: string;
  position: string;
  role: string;
  experience: string;
  contract: string;
  ctc: number;
  location: string;
  technology: string[];
  website: string;
  about: string;
  title: string;
  [key: string]: string | number | string[];
}


