// 바디텍쳐 웹사이트용 타입 정의

// Strapi rich text content 타입 정의
export interface RichTextChild {
  type: string;
  text?: string;
}

export interface RichTextBlock {
  type: string;
  children?: RichTextChild[];
}

export interface Trainer {
  id: string;
  name: string;
  image: string;
  description?: string;
  experience?: string[]; // 경력 정보 (최대 3줄)
  socialMedia?: {
    instagram?: string;
    naverBlog?: string;
  };
}

export interface Review {
  id: string;
  author: string;
  content: string;
  rating: number;
  date: string;
  source?: string;
  attributes?: {
    author: string;
    content: string;
    rating: number;
    date: string;
    source?: string;
    createdAt?: string;
  };
}

export interface MembershipPlan {
  id: string;
  name: string;
  duration: string;
  price: number;
  description?: string;
}

export interface PTPlan {
  id: string;
  name: string;
  sessions: number;
  price: number;
  description?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  slug: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  coverImage?: string;
  content?: RichTextBlock[];
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  image: string;
}
