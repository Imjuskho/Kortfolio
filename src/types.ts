export type ProjectCategory = 
  | 'All'
  | 'Cloud & Data Centre'
  | 'Edge Computing & CV'
  | 'FinTech & SaaS'
  | 'Cultural Tech & Gaming'
  | 'Systems & Infra';

export interface ProjectMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface ArchitectureLayer {
  name: string;
  components: string[];
  description: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  featured: boolean;
  role: string;
  period: string;
  impactMetrics: ProjectMetric[];
  techStack: string[];
  summary: string;
  problemStatement: string;
  solutionArchitecture: string;
  offlineConsiderations: string;
  architectureLayers?: ArchitectureLayer[];
  previewImages?: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  localPath: string;
  badges: string[];
  keyHighlights: string[];
}

export interface PhotoAsset {
  id: string;
  title: string;
  location: string;
  category: string;
  url: string;
  description: string;
  cameraInfo?: string;
}

export interface EngineeringThesis {
  title: string;
  domain: string;
  period: string;
  summary: string;
  architectureDetails: string;
  impact: string;
}

export interface CareerExperience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  focus: string;
  location: string;
}
