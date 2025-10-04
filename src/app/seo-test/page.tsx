// SEO 통합 관리 시스템 최종 검증 페이지
import Link from 'next/link';
import { getSEOSettings, getAllCenterInfo, getTrainers } from '@/lib/sanityData';

export default async function SEOTestPage() {
  const seoSettings = await getSEOSettings();
  const centerInfos = await getAllCenterInfo();
  const allTrainers = await getTrainers();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">🎯 SEO 통합 관리 시스템 최종 검증</h1>
        <p className="text-black">모든 페이지의 SEO 메타데이터가 Sanity에서 관리되는지 확인합니다.</p>
      </div>

      {/* 시스템 상태 개요 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-blue-800 mb-2">🏠 루트 페이지</h3>
          <p className="text-black font-medium">
            {seoSettings?.rootPage ? '✅ Sanity 관리' : '❌ 하드코딩'}
          </p>
          <p className="text-sm text-black mt-2">
            {seoSettings?.rootPage?.metaTitle ? 'SEO 데이터 있음' : 'SEO 데이터 없음'}
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-green-800 mb-2">🏢 센터별 페이지</h3>
          <p className="text-black font-medium">
            {seoSettings?.centers?.length || 0}개 센터
          </p>
          <p className="text-sm text-black mt-2">
            {seoSettings?.centers?.reduce((acc, c) => acc + 
              (c.mainPage ? 1 : 0) + 
              (c.trainersPage ? 1 : 0) + 
              (c.reviewsPage ? 1 : 0) + 
              (c.postsPage ? 1 : 0) + 
              (c.facilitiesPage ? 1 : 0), 0) || 0}개 페이지 SEO 설정
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-purple-800 mb-2">👤 트레이너 페이지</h3>
          <p className="text-black font-medium">
            {seoSettings?.trainers?.length || 0}명 / {allTrainers.length}명
          </p>
          <p className="text-sm text-black mt-2">
            {seoSettings?.trainers?.length === allTrainers.length ? '✅ 완료' : '🔄 일부 적용'}
          </p>
        </div>
      </div>

      {/* 페이지별 SEO 상태 */}
      <div className="space-y-8">
        
        {/* 루트 페이지 */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">🏠 루트 페이지 (센터 선택)</h2>
          
          {seoSettings?.rootPage ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-black mb-2">📍 현재 설정</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-black"><span className="font-medium">제목:</span> {seoSettings.rootPage.metaTitle}</p>
                  <p className="text-black"><span className="font-medium">설명:</span> {seoSettings.rootPage.metaDescription}</p>
                  <p className="text-black"><span className="font-medium">키워드:</span> {seoSettings.rootPage.keywords.join(', ')}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-black mb-2">🔗 테스트 링크</h3>
                <div className="space-y-2">
                  <Link href="/" className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center">
                    루트 페이지 확인
                  </Link>
                  <p className="text-sm text-black">개발자도구에서 &lt;title&gt;, &lt;meta&gt; 태그 확인</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 p-4 rounded">
              <p className="text-black font-medium">❌ 루트 페이지 SEO 데이터가 없습니다.</p>
            </div>
          )}
        </div>

        {/* 센터별 페이지들 */}
        {centerInfos.map((centerInfo) => {
          const centerSEO = seoSettings?.centers?.find(c => c.centerId === centerInfo.centerId);
          
          return (
            <div key={centerInfo.centerId} className="bg-white border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                🏢 {centerInfo.name} ({centerInfo.centerId})
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                
                {/* 메인 페이지 */}
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold text-black mb-2">🏠 메인 페이지</h3>
                  {centerSEO?.mainPage ? (
                    <div className="space-y-1 text-sm">
                      <p className="text-black"><span className="font-medium">제목:</span> {centerSEO.mainPage.metaTitle}</p>
                      <p className="text-black"><span className="font-medium">키워드:</span> {centerSEO.mainPage.keywords.slice(0, 3).join(', ')}...</p>
                      <Link href={`/${centerInfo.centerId}`} className="inline-block bg-green-600 text-white px-3 py-1 rounded text-xs mt-2 hover:bg-green-700">
                        확인하기
                      </Link>
                    </div>
                  ) : (
                    <p className="text-black text-sm font-medium">❌ SEO 데이터 없음</p>
                  )}
                </div>

                {/* 트레이너 목록 페이지 */}
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold text-black mb-2">👥 트레이너 목록</h3>
                  {centerSEO?.trainersPage ? (
                    <div className="space-y-1 text-sm">
                      <p className="text-black"><span className="font-medium">제목:</span> {centerSEO.trainersPage.metaTitle}</p>
                      <p className="text-black"><span className="font-medium">키워드:</span> {centerSEO.trainersPage.keywords.slice(0, 3).join(', ')}...</p>
                      <Link href={`/${centerInfo.centerId}/trainers`} className="inline-block bg-green-600 text-white px-3 py-1 rounded text-xs mt-2 hover:bg-green-700">
                        확인하기
                      </Link>
                    </div>
                  ) : (
                    <p className="text-black text-sm font-medium">❌ SEO 데이터 없음</p>
                  )}
                </div>

                {/* 리뷰 페이지 */}
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold text-black mb-2">⭐ 리뷰</h3>
                  {centerSEO?.reviewsPage ? (
                    <div className="space-y-1 text-sm">
                      <p className="text-black"><span className="font-medium">제목:</span> {centerSEO.reviewsPage.metaTitle}</p>
                      <p className="text-black"><span className="font-medium">키워드:</span> {centerSEO.reviewsPage.keywords.slice(0, 3).join(', ')}...</p>
                      <Link href={`/${centerInfo.centerId}/reviews`} className="inline-block bg-green-600 text-white px-3 py-1 rounded text-xs mt-2 hover:bg-green-700">
                        확인하기
                      </Link>
                    </div>
                  ) : (
                    <p className="text-black text-sm font-medium">❌ SEO 데이터 없음</p>
                  )}
                </div>

                {/* 포스트 페이지 */}
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold text-black mb-2">📝 포스트</h3>
                  {centerSEO?.postsPage ? (
                    <div className="space-y-1 text-sm">
                      <p className="text-black"><span className="font-medium">제목:</span> {centerSEO.postsPage.metaTitle}</p>
                      <p className="text-black"><span className="font-medium">키워드:</span> {centerSEO.postsPage.keywords.slice(0, 3).join(', ')}...</p>
                      <Link href={`/${centerInfo.centerId}/posts`} className="inline-block bg-green-600 text-white px-3 py-1 rounded text-xs mt-2 hover:bg-green-700">
                        확인하기
                      </Link>
                    </div>
                  ) : (
                    <p className="text-black text-sm font-medium">❌ SEO 데이터 없음</p>
                  )}
                </div>

                {/* 시설 안내 페이지 */}
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold text-black mb-2">🏗️ 시설 안내</h3>
                  {centerSEO?.facilitiesPage ? (
                    <div className="space-y-1 text-sm">
                      <p className="text-black"><span className="font-medium">제목:</span> {centerSEO.facilitiesPage.metaTitle}</p>
                      <p className="text-black"><span className="font-medium">키워드:</span> {centerSEO.facilitiesPage.keywords.slice(0, 3).join(', ')}...</p>
                      <Link href={`/${centerInfo.centerId}/facilities`} className="inline-block bg-green-600 text-white px-3 py-1 rounded text-xs mt-2 hover:bg-green-700">
                        확인하기
                      </Link>
                    </div>
                  ) : (
                    <p className="text-black text-sm font-medium">❌ SEO 데이터 없음</p>
                  )}
                </div>
              </div>

              {/* 해당 센터 트레이너들 */}
              {seoSettings?.trainers && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-700 mb-3">👤 개별 트레이너 SEO</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {seoSettings.trainers
                      .filter(t => t.centerId === centerInfo.centerId)
                      .map((trainer) => (
                        <div key={trainer.slug} className="bg-purple-50 p-3 rounded border">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-purple-700">{trainer.slug}</span>
                            <Link 
                              href={`/${trainer.centerId}/trainers/${trainer.slug}`}
                              className="bg-purple-600 text-white px-2 py-1 rounded text-xs hover:bg-purple-700"
                            >
                              확인
                            </Link>
                          </div>
                          <p className="text-sm text-black">{trainer.metaTitle}</p>
                          <p className="text-xs text-black mt-1">키워드: {trainer.keywords.slice(0, 3).join(', ')}...</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* 마이그레이션 이전 vs 이후 비교 */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-2xl font-bold text-orange-800 mb-4">📊 마이그레이션 성과 비교</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-black mb-3">❌ 마이그레이션 이전</h3>
              <div className="bg-red-50 p-4 rounded border">
                <ul className="space-y-2 text-sm text-black">
                  <li>• 루트 페이지: &quot;바디텍쳐 왕십리 청계점&quot; (하드코딩)</li>
                  <li>• 트레이너 목록: &quot;전문 트레이너&quot; (하드코딩)</li>
                  <li>• 리뷰 페이지: &quot;고객 후기&quot; (하드코딩)</li>
                  <li>• 트레이너 개별: 기본 템플릿만 사용</li>
                  <li>• SEO 변경 시: 개발자 + 배포 필요</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-3">✅ 마이그레이션 이후</h3>
              <div className="bg-green-50 p-4 rounded border">
                <ul className="space-y-2 text-sm text-black">
                  <li>• 루트 페이지: &quot;바디텍쳐 & 최원준GYM - 서울 프리미엄 피트니스 센터&quot; (Sanity)</li>
                  <li>• 트레이너 목록: &quot;왕십리 최고 PT 트레이너 - 바디텍쳐&quot; (Sanity)</li>
                  <li>• 리뷰 페이지: &quot;바디텍쳐 왕십리점 후기 - 실제 회원 리뷰&quot; (Sanity)</li>
                  <li>• 트레이너 개별: 전문분야별 최적화 (Sanity)</li>
                  <li>• SEO 변경 시: 마케팅 팀이 실시간 수정</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 테스트 체크리스트 */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">✅ 최종 테스트 체크리스트</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <p className="font-medium text-black">1. 루트 페이지 메타데이터</p>
                <p className="text-sm text-black">브라우저에서 / 접속 → 개발자도구 → &lt;title&gt; 태그가 &quot;바디텍쳐 & 최원준GYM...&quot;인지 확인</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <p className="font-medium text-black">2. 센터별 메인 페이지</p>
                <p className="text-sm text-black">/wangsimni, /daechi 접속 → 각 센터별 최적화된 제목 확인</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <p className="font-medium text-black">3. 트레이너 목록 페이지</p>
                <p className="text-sm text-black">/wangsimni/trainers 접속 → &quot;왕십리 최고 PT 트레이너&quot; 제목 확인</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <p className="font-medium text-black">4. 트레이너 개별 페이지</p>
                <p className="text-sm text-black">/wangsimni/trainers/kimkwon 접속 → 전문분야별 최적화된 제목 확인</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <p className="font-medium text-black">5. Sanity 실시간 반영</p>
                <p className="text-sm text-black">Sanity Studio에서 SEO 제목 변경 → 브라우저 새로고침 → 즉시 반영 확인</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <p className="font-medium text-black">6. 키워드 합치기 확인</p>
                <p className="text-sm text-black">개발자도구 → &lt;meta name=&quot;keywords&quot;&gt; → 센터 키워드 + 페이지 키워드 합쳐진 것 확인</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1" />
              <div>
                <p className="font-medium text-black">7. OG 이미지 자동 적용</p>
                <p className="text-sm text-black">트레이너 페이지 → 개발자도구 → &lt;meta property=&quot;og:image&quot;&gt; → 트레이너 프로필 이미지 URL 확인</p>
              </div>
            </div>
          </div>
        </div>

        {/* 정리 안내 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-yellow-800 mb-3">🧹 최종 정리</h2>
          <p className="text-black mb-4">
            모든 테스트 완료 후 임시 파일들을 정리하세요:
          </p>
          <div className="space-y-2 text-sm text-black">
            <p>• <code className="bg-yellow-200 px-2 py-1 rounded">/debug-seo</code> 페이지 삭제</p>
            <p>• <code className="bg-yellow-200 px-2 py-1 rounded">/seo-test</code> 페이지 삭제</p>
            <p>• <code className="bg-yellow-200 px-2 py-1 rounded">seo-backup-current.md</code> 파일 정리</p>
            <p>• <code className="bg-yellow-200 px-2 py-1 rounded">manual-seo-input-guide.md</code> 파일 정리</p>
          </div>
        </div>
      </div>
    </div>
  );
}
