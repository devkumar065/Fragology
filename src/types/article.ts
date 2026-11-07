export type ArticleCategory =
  | "Fragrance Notes"
  | "Scent Guides"
  | "Ingredients & Inspiration"
  | "Lifestyle"
  | "Fragrance Education";

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ArticleCategory;
  publishedDate: string;
  readTime: string;
  author: string;
  excerpt: string;
  featured?: boolean;
  content: {
    leadParagraph: string;
    sections: Array<{
      heading?: string;
      body: string[];
      quote?: string;
    }>;
  };
}
