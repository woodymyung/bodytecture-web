import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Header from '@/components/Header';
import { getTrainerBySlug, getTrainersByCenter, getReviewsByTrainer, getTrainerSEO, getCenterPageSEO } from '@/lib/sanityData';
import { renderRichTextToHTML, isRichTextEmpty } from '@/lib/simpleRichTextRenderer';
import TrainerReviews from '@/components/TrainerReviews';
import TrainerImageGallery from '@/components/TrainerImageGallery';
import Link from 'next/link';
import { generatePersonStructuredData, generatePageMetadata } from '@/lib/metadata';
import { isValidCenterId, getCenterById, getAllCenters } from '@/constants/centers';
import { urlFor } from '@/lib/sanity';

// 센터별 개별 트레이너 페이지 props 타입 정의
interface TrainerPageProps {
  params: Promise<{ center: string; slug: string }>;
}

// 정적 파라미터 생성 함수 - 모든 센터와 해당 센터의 트레이너 조합 생성
export async function generateStaticParams() {
  const centers = getAllCenters();
  const params = [];
  
  // 각 센터별로 트레이너를 가져와서 조합 생성
  for (const center of centers) {
    try {
      const trainers = await getTrainersByCenter(center.id);
      for (const trainer of trainers) {
        params.push({
          center: center.id,
          slug: trainer.slug,
        });
      }
    } catch (error) {
      console.warn(`센터 ${center.id}의 트레이너를 가져오는데 실패했습니다:`, error);
      // 에러 발생시에도 파라미터는 생성하되, 빈 배열로 처리
    }
  }
  
  return params;
}

// 센터별 트레이너 메타데이터 생성 함수
export async function generateMetadata({
  params,
}: {
  params: Promise<{ center: string; slug: string }>;
}): Promise<Metadata> {
  const { center, slug } = await params;
  
  // 센터 ID 유효성 검사
  if (!isValidCenterId(center)) {
    return {
      title: '페이지를 찾을 수 없습니다',
      description: '요청하신 트레이너 페이지를 찾을 수 없습니다.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  
  // 트레이너 정보 가져오기 (센터별)
  const trainer = await getTrainerBySlug(slug, center);
  if (!trainer) {
    return {
      title: '트레이너를 찾을 수 없습니다',
      description: '요청하신 트레이너 정보를 찾을 수 없습니다.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  
  // Sanity SEO Settings에서 트레이너별 SEO 데이터 가져오기
  const trainerSEO = await getTrainerSEO(slug, center);
  const centerMainSEO = await getCenterPageSEO(center, 'mainPage');
  
  // 트레이너별 SEO 데이터가 있으면 최적화된 SEO 사용, 없으면 기본 메타데이터 사용
  if (trainerSEO) {
    // 키워드 합치기: 센터 메인 키워드 + 트레이너 개별 키워드 (중복 제거)
    const centerKeywords = centerMainSEO?.keywords || [];
    const trainerKeywords = trainerSEO.keywords || [];
    const combinedKeywords = [...new Set([...centerKeywords, ...trainerKeywords])];
    
    // 트레이너 프로필 이미지를 OG 이미지로 사용
    let ogImages = undefined;
    if (trainer.images && trainer.images.length > 0 && trainer.images[0].asset) {
      try {
        const trainerOGImageUrl = urlFor(trainer.images[0])
          .width(1200)
          .height(630)
          .quality(90)
          .format('webp')
          .fit('crop')
          .url();
          
        ogImages = [{
          url: trainerOGImageUrl,
          width: 1200,
          height: 630,
          alt: trainerSEO.metaTitle
        }];
      } catch (error) {
        console.warn('트레이너 프로필 이미지 OG 변환 실패:', error);
      }
    }

    // SEO Settings 기반 메타데이터 생성 (트레이너 프로필 이미지 사용)
    // 트레이너 SEO title에 이미 센터명이 포함되어 있으므로 generatePageMetadata 사용
    return generatePageMetadata({
      title: trainerSEO.metaTitle, // 센터명이 이미 포함된 완전한 제목
      description: trainerSEO.metaDescription,
      path: `/${center}/trainers/${slug}`,
      keywords: combinedKeywords,
      images: ogImages,
      type: 'profile'
    });
  } else {
    // Fallback: 기본 메타데이터 생성 (SEO Settings에 트레이너 데이터가 없는 경우)
    // 센터 이름을 수동으로 추가하여 완전한 제목 구성
    const centerInfo = getCenterById(center);
    
    // 트레이너 프로필 이미지 처리 (Fallback에서도)
    let ogImages = undefined;
    if (trainer.images && trainer.images.length > 0 && trainer.images[0].asset) {
      try {
        const trainerOGImageUrl = urlFor(trainer.images[0])
          .width(1200)
          .height(630)
          .quality(90)
          .format('webp')
          .fit('crop')
          .url();
          
        ogImages = [{
          url: trainerOGImageUrl,
          width: 1200,
          height: 630,
          alt: `${trainer.name} - 전문 트레이너`
        }];
      } catch (error) {
        console.warn('트레이너 프로필 이미지 OG 변환 실패:', error);
      }
    }
    
    return generatePageMetadata({
      title: `${trainer.name} - 전문 트레이너 | ${centerInfo.name}`,
      description: trainer.description || `${trainer.name} 트레이너를 소개합니다.`,
      path: `/${center}/trainers/${slug}`,
      keywords: [trainer.name, '전문트레이너', 'PT', '개인트레이닝'],
      images: ogImages,
      type: 'profile'
    });
  }
}

// 센터별 개별 트레이너 페이지 컴포넌트
export default async function TrainerPage({ params }: TrainerPageProps) {
  const { center, slug } = await params;
  
  // 센터 ID 유효성 검사
  if (!isValidCenterId(center)) {
    notFound();
  }
  
  // 센터 정보 가져오기
  const centerInfo = getCenterById(center);
  
  // 트레이너 정보 가져오기 (센터별)
  const trainer = await getTrainerBySlug(slug, center);
  if (!trainer) {
    notFound();
  }

  // 해당 트레이너의 리뷰들 가져오기 (센터별)
  const trainerReviews = await getReviewsByTrainer(trainer.id, center);

  // SEO 최적화를 위한 센터별 구조화된 데이터 생성
  const personStructuredData = generatePersonStructuredData({
    name: trainer.name,
    description: trainer.description || `${trainer.name} 트레이너`,
    slug: trainer.slug,
    images: trainer.images
  }, center);

  return (
    <div className="min-h-screen">
      {/* 구조화된 데이터 (JSON-LD) - Google 검색 최적화를 위한 트레이너 정보 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
      />
      
      <Header currentCenter={center} />

      <main className="pt-8 md:pt-16">
        {/* 트레이너 히어로 섹션 - 센터별 브랜딩 색상 적용 */}
        <section className="bg-gradient-to-br from-[var(--center-primary)] to-[var(--center-secondary)] text-white py-8 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-12">
              {/* 트레이너 프로필 이미지 갤러리 */}
              <div className="lg:w-1/3">
                <TrainerImageGallery
                  images={trainer.images || []}
                  trainerName={trainer.name}
                />
              </div>

              {/* 트레이너 기본 정보 */}
              <div className="lg:w-2/3 text-center lg:text-left">
                {/* 센터 정보 표시 */}
                <div className="mb-4">
                  <span className="inline-block bg-white/20 text-white/90 px-4 py-2 rounded-full text-sm font-medium">
                    {centerInfo.name}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                  {trainer.name}
                </h1>
                <p className="text-lg md:text-2xl font-medium text-white/90 md:mb-8 font-light leading-relaxed">
                  {trainer.description}
                </p>

                {/* 소셜 미디어 */}
                {trainer.socialMedia && (
                  <div className="flex justify-center lg:justify-start space-x-4 mb-8">
                    {trainer.socialMedia.instagram && (
                      <a
                        href={trainer.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                        aria-label={`${trainer.name} 인스타그램`}
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                    )}
                    {trainer.socialMedia.naverBlog && (
                      <a
                        href={trainer.socialMedia.naverBlog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                        aria-label={`${trainer.name} 네이버 블로그`}
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V12.845z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}

                {/* CTA 버튼 */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href={trainer.bookingUrl || `/${center}#contact`}
                    target={trainer.bookingUrl ? "_blank" : "_self"}
                    rel={trainer.bookingUrl ? "noopener noreferrer" : ""}
                    className="bg-white text-[var(--center-primary)] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg"
                  >
                    상담 예약하기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 상세 정보 섹션 */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* 경력 정보 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2H10a2 2 0 00-2-2V6m8 0h2a2 2 0 012 2v6a2 2 0 01-2 2H2a2 2 0 01-2-2V8a2 2 0 012-2h2" />
                    </svg>
                  </div>
                  경력
                </h3>
                {trainer.experience && !isRichTextEmpty(trainer.experience) ? (
                  <div
                    className="rounded-lg p-3 text-gray-700 prose prose-sm max-w-none prose-p:text-sm prose-ul:text-sm prose-li:text-sm"
                    dangerouslySetInnerHTML={{ __html: renderRichTextToHTML(trainer.experience) }}
                  />
                ) : (
                  <p className="text-gray-500 italic text-sm">경력 정보가 없습니다.</p>
                )}
              </div>

              {/* 수상 경력 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  수상
                </h3>
                {trainer.awards && !isRichTextEmpty(trainer.awards) ? (
                  <div
                    className="rounded-lg p-3 text-gray-700 prose prose-sm max-w-none prose-p:text-sm prose-ul:text-sm prose-li:text-sm"
                    dangerouslySetInnerHTML={{ __html: renderRichTextToHTML(trainer.awards) }}
                  />
                ) : (
                  <p className="text-gray-500 italic text-sm">수상 경력 정보가 없습니다.</p>
                )}
              </div>

              {/* 자격증 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  자격증
                </h3>
                {trainer.certifications && !isRichTextEmpty(trainer.certifications) ? (
                  <div
                    className="rounded-lg p-3 text-gray-700 prose prose-sm max-w-none prose-p:text-sm prose-ul:text-sm prose-li:text-sm"
                    dangerouslySetInnerHTML={{ __html: renderRichTextToHTML(trainer.certifications) }}
                  />
                ) : (
                  <p className="text-gray-500 italic text-sm">자격증 정보가 없습니다.</p>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* 트레이너 리뷰 섹션 */}
        <TrainerReviews
          trainerName={trainer.name}
          initialReviews={trainerReviews}
        />
      </main>

    </div>
  );
}
