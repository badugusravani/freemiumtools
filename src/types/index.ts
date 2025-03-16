export interface Tool {
  id: string;
  title: string;
  description: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  tools: Tool[];
}

export interface ImageToolProps {
  onBack?: () => void;
}

export interface MathToolProps {
  onBack?: () => void;
}

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface ToolHeaderProps {
  title: string;
  description: string;
  category: string;
  keywords: string[];
}

// Re-export all types
export type * from './index'; 