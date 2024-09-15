export interface Session {
  token: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export type FounderCardProps = { 
  name: string;
  role: string;
  linkedinUrl: string;
  githubUrl: string;
};

export type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};