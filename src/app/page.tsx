// 센터 선택 페이지 - 다중 센터 지원을 위한 메인 랜딩 페이지
// 사용자가 3개 센터(왕십리, 대치, 청담) 중 하나를 선택할 수 있는 인터페이스 제공

import CenterSelection from '@/components/CenterSelection';
import { generatePageMetadata } from '@/lib/metadata';

// 센터 선택 페이지 메타데이터 설정
export const metadata = generatePageMetadata({
  title: '센터 선택',
  description: '바디텍쳐와 최원준GYM의 지점을 선택하세요. 왕십리, 대치, 청담점에서 전문 트레이닝 서비스를 제공합니다.',
  path: '/',
  keywords: ['바디텍쳐', '최원준GYM', '헬스장', '피트니스센터', '왕십리', '대치', '청담', '센터선택'],
});

export default function Home() {
  return <CenterSelection />;
}
