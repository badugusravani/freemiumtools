export interface Tool { id: string; title: string; description: string; } export interface Category { id: string; title: string; description: string; tools: Tool[]; }
