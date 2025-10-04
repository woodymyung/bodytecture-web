// 센터 선택 페이지 - 다중 센터 지원을 위한 메인 랜딩 페이지
// 사용자가 3개 센터(왕십리, 대치, 청담) 중 하나를 선택할 수 있는 인터페이스 제공

import CenterSelection from '@/components/CenterSelection';

// 메타데이터는 layout.tsx의 generateMetadata에서 처리됨 (루트 페이지와 동일)

export default function Home() {
  return <CenterSelection />;
}
