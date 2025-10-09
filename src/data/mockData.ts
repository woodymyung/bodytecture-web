// 목 데이터 - 실제로는 Sanity에서 가져올 예정

import { MembershipPlan, PTPlan, BlogPost } from '@/types';

// trainers는 실제로 Sanity에서 가져오므로 제거

// reviews도 실제로는 Sanity에서 가져오므로 제거
// export const reviews: Review[] = [];

export const membershipPlans: MembershipPlan[] = [
  { id: '1', name: '1개월', duration: '1개월', price: 110000 }, // 기본 1개월 요금
  { id: '2', name: '3개월', duration: '3개월', price: 297000, pricePerMonth: 99000 }, // 3개월 패키지 (월 99,000원)
  { id: '3', name: '6개월', duration: '6개월', price: 420000, pricePerMonth: 70000 }, // 6개월 패키지 (월 70,000원)
  { id: '4', name: '일일권', duration: '1일', price: 15000 } // 일일 이용권
];

export const ptPlans: PTPlan[] = [
  { id: '1', name: 'OT/체험', sessions: 1, price: 44000 }, // 체험 수업 (OT)
  { id: '2', name: '10회', sessions: 10, price: 770000, pricePerSession: 77000 }, // 10회 패키지 (회당 77,000원)
  { id: '3', name: '20회', sessions: 20, price: 1430000, pricePerSession: 71500 }, // 20회 패키지 (회당 71,500원)
  { id: '4', name: '30회', sessions: 30, price: 1980000, pricePerSession: 66000 }, // 30회 패키지 (회당 66,000원)
  { id: '5', name: '50회', sessions: 50, price: 2750000, pricePerSession: 55000 } // 50회 패키지 (회당 55,000원)
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

// facilities 데이터는 이제 Sanity CMS에서 관리하며, 
// Facilities 컴포넌트에서 fallback 데이터를 제공하므로 mock data 불필요
