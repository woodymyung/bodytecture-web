// 임시 디버그 페이지 - Sanity SEO 데이터 확인용
import { getAllCenterInfo, getSEOSettings } from '@/lib/sanityData';

export default async function DebugSEO() {
  const centerInfos = await getAllCenterInfo();
  const seoSettings = await getSEOSettings();
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🔍 Sanity centerInfo.seo 데이터 확인</h1>
      
      <div className="space-y-8">
        {centerInfos.map((centerInfo) => (
          <div key={centerInfo.id} className="border rounded-lg p-6 bg-gray-50">
            <h2 className="text-xl font-bold text-blue-600 mb-4">
              {centerInfo.name} ({centerInfo.centerId})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">기본 정보</h3>
                <p><span className="font-medium">이름:</span> {centerInfo.name}</p>
                <p><span className="font-medium">설명:</span> {centerInfo.description}</p>
                <p><span className="font-medium">상태:</span> {centerInfo.status}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">SEO 데이터</h3>
                <div className="bg-white p-3 rounded border">
                  <p><span className="font-medium">metaTitle:</span> {centerInfo.seo.metaTitle || '❌ 비어있음'}</p>
                  <p><span className="font-medium">metaDescription:</span> {centerInfo.seo.metaDescription || '❌ 비어있음'}</p>
                  <p><span className="font-medium">keywords:</span> {centerInfo.seo.keywords?.length > 0 ? centerInfo.seo.keywords.join(', ') : '❌ 비어있음'}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-bold text-yellow-800 mb-2">📋 마이그레이션용 JSON 데이터</h3>
        <div className="space-y-4">
          
          {/* 새로운 SEO Settings 구조로 변환된 데이터 */}
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2">🎯 새로운 SEO Settings 구조</h4>
            <pre className="text-xs bg-white p-3 rounded border overflow-auto max-h-96">
              {JSON.stringify({
                _type: 'seoSettings',
                rootPage: {
                  metaTitle: '바디텍쳐 & 최원준GYM - 서울 프리미엄 피트니스 센터',
                  metaDescription: '왕십리·대치·청담 3개 지점 운영. 전문 PT와 그룹클래스를 제공하는 프리미엄 헬스장입니다.',
                  keywords: ['바디텍쳐', '최원준GYM', '헬스장', 'PT', '센터선택', '왕십리', '대치', '청담']
                },
                centers: centerInfos.map(c => ({
                  centerId: c.centerId,
                  mainPage: {
                    metaTitle: c.seo.metaTitle || `${c.name} - 프리미엄 피트니스 센터`,
                    metaDescription: c.seo.metaDescription || c.description,
                    keywords: c.seo.keywords || []
                  },
                  trainersPage: {
                    metaTitle: `${c.centerId === 'wangsimni' ? '왕십리' : c.centerId === 'daechi' ? '대치' : '청담'} 최고 PT 트레이너 - ${c.name.includes('바디텍쳐') ? '바디텍쳐' : '최원준GYM'}`,
                    metaDescription: `${c.name}의 전문 트레이너들을 소개합니다. 경험이 풍부한 트레이너들이 회원님의 건강한 변화를 위해 최선을 다하겠습니다.`,
                    keywords: [`${c.centerId}PT`, '전문트레이너', '피트니스트레이너', 'PT', '개인트레이닝', '헬스트레이너']
                  },
                  reviewsPage: {
                    metaTitle: `${c.name} 후기 - 실제 회원 리뷰`,
                    metaDescription: `${c.name}을 이용하신 회원님들의 생생한 후기를 만나보세요. 실제 경험담과 변화 스토리를 통해 차별화된 서비스를 확인하실 수 있습니다.`,
                    keywords: [`${c.centerId}헬스장후기`, '고객후기', 'PT후기', '회원리뷰', '운동후기', '피트니스후기']
                  },
                  postsPage: {
                    metaTitle: `${c.name} 포스트 - 건강 정보`,
                    metaDescription: `${c.name}에서 건강과 운동에 대한 유용한 정보를 공유합니다. 전문 트레이너의 팁과 운동법을 만나보세요.`,
                    keywords: ['운동정보', '건강정보', '피트니스팁', '운동법', '헬스정보', '트레이닝팁']
                  },
                  facilitiesPage: {
                    metaTitle: `${c.name} 시설 안내`,
                    metaDescription: `${c.name}의 쾌적하고 최신식 시설을 만나보세요. 다양한 운동 기구와 편의시설을 이용하실 수 있습니다.`,
                    keywords: ['헬스장시설', '운동시설', '피트니스시설', '헬스기구', '라커룸', '샤워실', '주차장']
                  }
                })),
                trainers: [] // 트레이너별 SEO는 별도 단계에서 처리
              }, null, 2)}
            </pre>
          </div>

          {/* 기존 데이터 */}
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2">📊 기존 centerInfo.seo 데이터</h4>
            <pre className="text-xs bg-white p-3 rounded border overflow-auto max-h-96">
              {JSON.stringify(centerInfos.map(c => ({
                centerId: c.centerId,
                name: c.name,
                description: c.description,
                status: c.status,
                seo: c.seo
              })), null, 2)}
            </pre>
          </div>
        </div>
      </div>

      {/* SEO Settings 현재 적용 상태 */}
      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded">
        <h3 className="font-bold text-green-800 mb-2">🎯 현재 적용된 SEO Settings</h3>
        
        {seoSettings ? (
          <div className="space-y-6">
            {/* 루트 페이지 */}
            <div>
              <h4 className="font-semibold text-green-700 mb-2">🏠 루트 페이지 (센터 선택)</h4>
              <div className="bg-white p-3 rounded border text-sm">
                <p><span className="font-medium">제목:</span> {seoSettings.rootPage?.metaTitle || '없음'}</p>
                <p><span className="font-medium">키워드:</span> {seoSettings.rootPage?.keywords?.join(', ') || '없음'}</p>
              </div>
            </div>

            {/* 센터별 페이지 */}
            {seoSettings.centers?.map((center) => (
              <div key={center.centerId}>
                <h4 className="font-semibold text-green-700 mb-2">
                  🏢 {center.centerId === 'wangsimni' ? '왕십리점' : center.centerId === 'daechi' ? '대치점' : '청담점'}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 트레이너 페이지 키워드 */}
                  <div className="bg-white p-3 rounded border">
                    <p className="font-medium text-blue-700 mb-1">👥 트레이너 페이지</p>
                    <p className="text-sm"><span className="font-medium">제목:</span> {center.trainersPage?.metaTitle || '없음'}</p>
                    <p className="text-sm"><span className="font-medium">키워드:</span> {center.trainersPage?.keywords?.join(', ') || '없음'}</p>
                  </div>

                  {/* 리뷰 페이지 키워드 */}
                  <div className="bg-white p-3 rounded border">
                    <p className="font-medium text-purple-700 mb-1">⭐ 리뷰 페이지</p>
                    <p className="text-sm"><span className="font-medium">제목:</span> {center.reviewsPage?.metaTitle || '없음'}</p>
                    <p className="text-sm"><span className="font-medium">키워드:</span> {center.reviewsPage?.keywords?.join(', ') || '없음'}</p>
                  </div>

                  {/* 포스트 페이지 키워드 */}
                  <div className="bg-white p-3 rounded border">
                    <p className="font-medium text-orange-700 mb-1">📝 포스트 페이지</p>
                    <p className="text-sm"><span className="font-medium">제목:</span> {center.postsPage?.metaTitle || '없음'}</p>
                    <p className="text-sm"><span className="font-medium">키워드:</span> {center.postsPage?.keywords?.join(', ') || '없음'}</p>
                  </div>

                  {/* 시설 페이지 키워드 */}
                  <div className="bg-white p-3 rounded border">
                    <p className="font-medium text-green-700 mb-1">🏗️ 시설 페이지</p>
                    <p className="text-sm"><span className="font-medium">제목:</span> {center.facilitiesPage?.metaTitle || '없음'}</p>
                    <p className="text-sm"><span className="font-medium">키워드:</span> {center.facilitiesPage?.keywords?.join(', ') || '없음'}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* 트레이너별 SEO */}
            {seoSettings.trainers && seoSettings.trainers.length > 0 && (
              <div>
                <h4 className="font-semibold text-green-700 mb-2">👤 트레이너별 SEO</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {seoSettings.trainers.map((trainer) => (
                    <div key={`${trainer.centerId}-${trainer.slug}`} className="bg-white p-3 rounded border">
                      <p className="font-medium text-indigo-700 mb-1">👤 {trainer.slug} ({trainer.centerId})</p>
                      <p className="text-sm"><span className="font-medium">제목:</span> {trainer.metaTitle}</p>
                      <p className="text-sm"><span className="font-medium">설명:</span> {trainer.metaDescription?.substring(0, 60)}...</p>
                      <p className="text-sm"><span className="font-medium">키워드:</span> {trainer.keywords?.join(', ') || '없음'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-red-600">SEO Settings 데이터를 불러올 수 없습니다.</p>
        )}
      </div>
    </div>
  );
}
