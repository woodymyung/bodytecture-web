// 목 데이터 - 실제로는 Strapi에서 가져올 예정

import { Trainer, Review, MembershipPlan, PTPlan, BlogPost, Facility } from '@/types';

export const trainers: Trainer[] = [
  {
    id: '1',
    name: '김권',
    image: '/trainers/kim-kwon.jpg',
    description: '전문 트레이너',
    experience: [
      'NSCA-CSCS 자격증 보유',
      '5년 이상 트레이닝 경력',
      '개인 PT 전문'
    ],
    socialMedia: {
      instagram: 'https://instagram.com/boditex_trainer_kim',
      naverBlog: 'https://blog.naver.com/boditex_kimkwon'
    }
  },
  {
    id: '2',
    name: '김예은',
    image: '/trainers/kim-ye-eun.jpg',
    description: '전문 트레이너',
    experience: [
      'NASM-PES 자격증 보유',
      '3년 이상 트레이닝 경력',
      '다이어트 전문 트레이너'
    ],
    socialMedia: {
      instagram: 'https://instagram.com/boditex_trainer_kimye',
      naverBlog: 'https://blog.naver.com/boditex_kimye'
    }
  },
  {
    id: '3',
    name: '전영주',
    image: '/trainers/jeon-young-ju.jpg',
    description: '전문 트레이너',
    experience: [
      'ACSM 자격증 보유',
      '4년 이상 트레이닝 경력',
      '체형 교정 전문'
    ],
    socialMedia: {
      instagram: 'https://instagram.com/boditex_trainer_jeonyj',
      naverBlog: 'https://blog.naver.com/boditex_jeonyj'
    }
  },
  {
    id: '4',
    name: '전채운',
    image: '/trainers/jeon-chae-un.jpg',
    description: '전문 트레이너',
    experience: [
      'KATI 자격증 보유',
      '6년 이상 트레이닝 경력',
      '근력 트레이닝 전문'
    ],
    socialMedia: {
      instagram: 'https://instagram.com/boditex_trainer_jeoncu',
      naverBlog: 'https://blog.naver.com/boditex_jeoncu'
    }
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    author: '김*수',
    content: '정원제 운영 덕분에 쾌적하게 운동할 수 있어요. 트레이너님들도 친절하시고 시설도 깔끔합니다.',
    rating: 5,
    date: '2024-01-15',
    source: '네이버'
  },
  {
    id: '2',
    author: '이*영',
    content: '1:1 PT로 체계적인 운동 계획을 세워주셔서 만족합니다. 목표 체중에 가까워지고 있어요!',
    rating: 5,
    date: '2024-01-10',
    source: '직접 방문'
  },
  {
    id: '3',
    author: '박*진',
    content: '시설이 정말 쾌적하고 운동 기구도 최신식이에요. 왕십리 청계점으로 이전했는데 만족도가 높아요.',
    rating: 5,
    date: '2024-01-08',
    source: '구글'
  }
];

export const membershipPlans: MembershipPlan[] = [
  { id: '1', name: '1개월', duration: '1개월', price: 150000 },
  { id: '2', name: '3개월', duration: '3개월', price: 400000 },
  { id: '3', name: '6개월', duration: '6개월', price: 700000 },
  { id: '4', name: '12개월', duration: '12개월', price: 1200000 }
];

export const ptPlans: PTPlan[] = [
  { id: '1', name: '체험 수업(OT)', sessions: 1, price: 30000 },
  { id: '2', name: '10회', sessions: 10, price: 500000 },
  { id: '3', name: '20회', sessions: 20, price: 900000 },
  { id: '4', name: '30회', sessions: 30, price: 1200000 },
  { id: '5', name: '50회', sessions: 50, price: 1800000 }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '겨울철 운동 루틴 가이드',
    excerpt: '겨울철 건강을 유지하기 위한 효과적인 운동 루틴을 소개합니다.',
    date: '2024-01-20',
    image: '/blog/winter-workout.jpg',
    slug: 'winter-workout-guide'
  },
  {
    id: '2',
    title: '올바른 자세로 하는 스쿼트',
    excerpt: '스쿼트를 올바르게 하는 방법과 주의사항을 알아보세요.',
    date: '2024-01-18',
    image: '/blog/squat-guide.jpg',
    slug: 'proper-squat-form'
  },
  {
    id: '3',
    title: '단백질 섭취의 중요성',
    excerpt: '운동 후 단백질 섭취가 왜 중요한지 자세히 설명합니다.',
    date: '2024-01-16',
    image: '/blog/protein-importance.jpg',
    slug: 'protein-intake-importance'
  }
];

export const facilities: Facility[] = [
  {
    id: '1',
    name: '헬스장 메인존',
    description: '최신식 운동 기구와 넓은 공간으로 쾌적한 운동 환경을 제공합니다.',
    image: '/facilities/main-gym.jpg'
  },
  {
    id: '2',
    name: 'PT 전용룸',
    description: '개인 PT를 위한 프라이빗한 공간으로 1:1 맞춤 트레이닝이 가능합니다.',
    image: '/facilities/pt-room.jpg'
  },
  {
    id: '3',
    name: '락커룸',
    description: '깨끗하고 편안한 락커룸으로 운동 전후 편안한 환경을 제공합니다.',
    image: '/facilities/locker-room.jpg'
  }
];
