export type HeroStat = {
  label: string;
  value: string;
};

export type SkillCategory = {
  id: string;
  name: string;
  items: string[];
};

export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  github: string;
  live: string;
  image: string;
  category: string;
  status: string;
  featured: boolean;
  date: string;
  order: number;
};

export type EducationItem = {
  id: string;
  institute: string;
  degree: string;
  location: string;
  startYear: string;
  endYear: string;
  score: string;
  description: string;
};

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  technologies: string;
};

export type ThemeSettings = {
  accentColor: string;
};

export type PortfolioData = {
  name: string;
  role: string;
  intro: string;
  about: string;
  location: string;
  availability: string;
  github: string;
  linkedin: string;
  email: string;
  profileImage: string;
  resume: string;
  heroStats: HeroStat[];
  skills: SkillCategory[];
  projects: Project[];
  education: EducationItem[];
  experience: ExperienceItem[];
  theme: ThemeSettings;
};