// 바디텍쳐 웹사이트용 타입 정의

// Sanity Rich Text 블록 타입 정의
export interface SanityRichTextSpan {
  _type: 'span';
  _key: string;
  text: string;
  marks: string[];
}

export interface SanityRichTextBlock {
  _type: 'block';
  _key: string;
  style: string;
  markDefs: any[];
  children: SanityRichTextSpan[];
}

// Strapi rich text content 타입 정의 (기존 호환성을 위해 유지)
export interface RichTextChild {
  type: string;
  text?: string;
}

export interface RichTextBlock {
  type: string;
  children?: RichTextChild[];
}

export interface TrainerImage {
  asset: {
    _ref: string;
  };
  alt?: string;
  caption?: string;
}

export interface Trainer {
  id: string;
  name: string;
  slug: string;
  images?: TrainerImage[]; // 이미지 갤러리
  description?: string;
  experience?: RichTextBlock[]; // 경력 정보 (Rich Text)
  awards?: RichTextBlock[]; // 수상 경력 및 성과 (Rich Text)
  certifications?: RichTextBlock[]; // 자격증 (Rich Text)
  socialMedia?: {
    instagram?: string;
    naverBlog?: string;
  };
  bookingUrl?: string; // OT 예약 페이지 링크
}

export interface Review {
  id: string;
  author: string;
  reviewContent: SanityRichTextBlock[]; // Sanity Rich Text 배열로 변경
  rating: number;
  date: string;
  source?: string;
  trainer?: { // 🎯 트레이너 정보 추가 (PT 리뷰인 경우)
    _id: string;
    name: string;
    slug: string;
  };
  attributes?: {
    author: string;
    reviewContent: SanityRichTextBlock[];
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
  pricePerMonth?: number; // 월당 가격 (3개월, 6개월 등에서 참고 정보로 표시)
  description?: string;
}

export interface PTPlan {
  id: string;
  name: string;
  sessions: number;
  price: number;
  pricePerSession?: number; // 회당 가격 (참고 정보로 표시)
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
