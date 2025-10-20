import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Facilities from '@/components/Facilities';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { isValidCenterId, getCenterById, getAllCenters } from '@/constants/centers';
import { getCenterPageSEO, getFacilitiesByCenter } from '@/lib/sanityData';
import { urlFor } from '@/lib/sanity';
import { getCenterHexColor } from '@/constants/colors';

// 센터별 시설 페이지 props 타입 정의
interface FacilitiesPageProps {
  params: Promise<{ center: string }>;
}

// 정적 파라미터 생성 함수 - output: export 설정 시 필요
export function generateStaticParams() {
  const centers = getAllCenters();
  return centers.map((center) => ({
    center: center.id,
  }));
}

// 센터별 메타데이터 생성 함수
export async function generateMetadata({
  params,
}: {
  params: Promise<{ center: string }>;
}): Promise<Metadata> {
  const { center } = await params;
  
  // 센터 ID 유효성 검사
  if (!isValidCenterId(center)) {
    return {
      title: '페이지를 찾을 수 없습니다',
      description: '요청하신 시설 안내 페이지를 찾을 수 없습니다.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  
  // 센터 정보 가져오기
  const centerInfo = getCenterById(center);
  
  // Sanity SEO Settings에서 시설 안내 페이지 SEO 데이터 가져오기
  const facilitiesSEO = await getCenterPageSEO(center, 'facilitiesPage');
  const centerMainSEO = await getCenterPageSEO(center, 'mainPage');
  
  // Sanity 데이터가 있으면 사용, 없으면 fallback 데이터 사용
  const title = facilitiesSEO?.metaTitle || '시설 안내';
  const description = facilitiesSEO?.metaDescription || `${centerInfo.name}의 쾌적하고 최신식 시설을 만나보세요. 다양한 운동 기구와 편의시설을 이용하실 수 있습니다.`;
  
  // 키워드 합치기: 센터 메인 키워드 + 시설 페이지 키워드 (강화된 중복 제거)
  const centerKeywords = Array.isArray(centerMainSEO?.keywords) ? centerMainSEO.keywords : [];
  const facilitiesKeywords = Array.isArray(facilitiesSEO?.keywords) ? facilitiesSEO.keywords : ['헬스장시설', '운동시설', '피트니스시설', '헬스기구', '라커룸', '샤워실', '주차장'];
  
  // 문자열 정규화 후 중복 제거 (대소문자 통일, 공백 제거)
  const allKeywords = [...centerKeywords, ...facilitiesKeywords]
    .filter(keyword => keyword && typeof keyword === 'string') // null/undefined 제거
    .map(keyword => keyword.trim().toLowerCase()) // 공백 제거, 소문자 변환
    .filter(keyword => keyword.length > 0); // 빈 문자열 제거
  
  const keywords = [...new Set(allKeywords)];
  
  // 센터 메인 페이지의 OG 이미지 상속받기
  let ogImages = undefined;
  if (centerMainSEO?.ogImage?.asset) {
    try {
      const centerOGImageUrl = urlFor(centerMainSEO.ogImage)
        .width(1200)
        .height(630)
        .quality(90)
        .format('webp')
        .fit('crop')
        .url();
        
      ogImages = [{
        url: centerOGImageUrl,
        width: 1200,
        height: 630,
        alt: title
      }];
    } catch (error) {
      console.warn('센터 OG 이미지 변환 실패:', error);
    }
  }
  
  // 센터별 메타데이터 생성 (SEO Settings 그대로 사용, 센터명 자동 추가 없음)
  return generatePageMetadata({
    title,
    description,
    path: `/${center}/facilities`,
    keywords,
    images: ogImages,
  });
}

// 센터별 시설 안내 페이지 컴포넌트
export default async function FacilitiesPage({ params }: FacilitiesPageProps) {
  const { center } = await params;
  
  // 센터 ID 유효성 검사 - 잘못된 ID면 404 페이지로
  if (!isValidCenterId(center)) {
    notFound();
  }
  
  // 센터 정보 가져오기
  const centerInfo = getCenterById(center);
  
  // 🎯 Sanity에서 센터별 시설 데이터 가져오기 (이미 변환된 Facility 타입)
  try {
    const facilitiesData = await getFacilitiesByCenter(center);
    
    // 센터가 준비중인 경우 준비중 메시지
    if (centerInfo.status === 'preparing') {
      return (
        <div className="min-h-screen">
          
          <main className="pt-12 md:pt-16">
            {/* 준비중 안내 */}
            <section className="bg-gradient-to-br from-[var(--center-primary)] to-[var(--center-secondary)] text-white py-24 md:py-32">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  시설 안내
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  {centerInfo.name}의 시설 정보를 준비 중입니다
                </p>
                <p className="text-lg text-white/80">
                  곧 최신식 시설과 함께 만나뵙겠습니다
                </p>
              </div>
            </section>
          </main>
          
        </div>
      );
    }

    return (
      <div className="min-h-screen">
        <main className="pt-12 md:pt-16">
          {/* 페이지 헤더 - 센터별 브랜딩 색상 적용 */}
          <section className="bg-gradient-to-br from-[var(--center-primary)] to-[var(--center-secondary)] text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                시설 안내
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                {centerInfo.name}의 쾌적하고 최신식 시설을 만나보세요
              </p>
            </div>
          </section>

          {/* 시설 상세 정보 */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* 메인 시설 정보 - 서버에서 가져온 데이터 전달 */}
              <Facilities facilities={facilitiesData} />

            <div className="mt-16 grid lg:grid-cols-2 gap-12">
              {/* 시설 특징 상세 설명 */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    최적의 운동 환경
                  </h2>
                  <div className="space-y-6">
                    <p className="text-gray-600 leading-relaxed">
                      전문적인 운동기구와 최신식 시설을 갖춘 {centerInfo.name}에서 효과적이고 안전한 운동을 경험하세요. 
                      개인의 운동 목표에 맞는 다양한 기구들이 준비되어 있습니다.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      쾌적하고 청결한 환경에서 운동할 수 있도록 정기적인 시설 관리와 소독을 실시하고 있으며, 
                      전문 트레이너가 안전한 기구 사용법을 안내해드립니다.
                    </p>
                  </div>
                </div>

                {/* 시설 스펙 */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    시설 스펙
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: 'var(--center-primary)' }}
                      ></div>
                      <span className="text-gray-700">최대 수용인원: 200명</span>
                    </div>
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: 'var(--center-primary)' }}
                      ></div>
                      <span className="text-gray-700">층수: 지하1층 ~ 지상1층</span>
                    </div>
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: 'var(--center-primary)' }}
                      ></div>
                      <span className="text-gray-700">주차: 지하주차장 완비</span>
                    </div>
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: 'var(--center-primary)' }}
                      ></div>
                      <span className="text-gray-700">엘리베이터: 직통 연결</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 이용 안내 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              이용 안내
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${getCenterHexColor(center)}20` }}
                >
                  <svg 
                    className="w-6 h-6"
                    style={{ color: getCenterHexColor(center) }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">운영 시간</h3>
                <p className="text-gray-600 mb-2">평일: {centerInfo.businessHours.weekdays.display}</p>
                <p className="text-gray-600">주말: {centerInfo.businessHours.weekends.display}</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: '#f3f4f620' }}
                >
                  <svg 
                    className="w-6 h-6"
                    style={{ color: '#6b7280' }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">시설 이용 규칙</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• 운동복 및 운동화 착용 필수</li>
                  <li>• 개인 물품 보관함 이용</li>
                  <li>• 기구 사용 전 설명 청취</li>
                  <li>• 안전 수칙 준수</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${getCenterHexColor(center)}15` }}
                >
                  <svg 
                    className="w-6 h-6"
                    style={{ color: getCenterHexColor(center) }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">특별 서비스</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• 무료 주차 2시간</li>
                  <li>• 무료 생수 제공</li>
                  <li>• 샤워실 및 라커룸</li>
                  <li>• Wi-Fi 무료 이용</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 관련 페이지 링크 - 센터별 경로로 수정 */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              더 알아보기
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {centerInfo.shortName}의 다른 정보들도 확인해보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${center}/trainers`}
                className="bg-[var(--center-primary)] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 inline-block text-center"
              >
                트레이너 소개
              </Link>
              <Link
                href={`/${center}/reviews`}
                className="bg-[var(--center-secondary)] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200"
              >
                고객 후기
              </Link>
              <Link
                href={`/${center}#contact`}
                className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
              >
                문의하기
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
    );
  } catch (error) {
    console.error('시설 데이터 로드 실패:', error);
    notFound();
  }
}
