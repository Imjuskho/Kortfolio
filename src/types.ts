export type ProjectCategory = 
  | 'All'
  | 'Health AI & Surveillance'
  | 'Edge Computing & CV'
  | 'Cultural Tech & Gaming'
  | 'FinTech & Governance'
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

export interface ResearchTopic {
  title: string;
  institution: string;
  period: string;
  summary: string;
  methodology: string;
  relevance: string;
}
