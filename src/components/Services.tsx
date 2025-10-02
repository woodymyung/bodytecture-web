import React from 'react';
import { CenterInfo } from '@/types';
import { membershipPlans, ptPlans } from '@/data/mockData';

// 제공 서비스 섹션 컴포넌트 props 타입 정의
interface ServicesProps {
  centerInfo?: CenterInfo; // 센터 정보 (Sanity에서 가져온 데이터)
}

// 제공 서비스 섹션 컴포넌트
const Services: React.FC<ServicesProps> = ({ centerInfo }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  // 센터별 서비스 데이터 가져오기 - Sanity 데이터 우선, 없으면 하드코딩된 데이터 사용
  const services = centerInfo?.services || [];
  
  // 서비스에서 일반 멤버십과 PT 서비스 분리
  const membershipService = services.find(service => 
    service.name.includes('멤버십') || service.name.includes('회원권')
  );
  const ptService = services.find(service => 
    service.name.includes('PT') || service.name.includes('개인')
  );

  // 센터별 서비스 제공 여부 확인
  // Sanity에 services 데이터가 있는 경우 해당 센터에서 실제 제공하는 서비스만 표시
  // Sanity에 데이터가 없는 경우에만 fallback 사용
  const hasSanityData = services.length > 0;
  
  // 멤버십 서비스 데이터 결정
  const membershipData = hasSanityData 
    ? (membershipService?.prices && membershipService.prices.length > 0) 
      ? membershipService.prices 
      : null // Sanity에 데이터가 있지만 멤버십 서비스가 없으면 null
    : membershipPlans.map(plan => ({ // Sanity 데이터가 없으면 fallback 사용
        period: plan.name,
        amount: plan.price,
        note: plan.pricePerMonth ? `월 ${formatPrice(plan.pricePerMonth)}원` : undefined
      }));
  
  // PT 서비스 데이터 결정
  const ptData = hasSanityData 
    ? (ptService?.prices && ptService.prices.length > 0) 
      ? ptService.prices 
      : null // Sanity에 데이터가 있지만 PT 서비스가 없으면 null
    : ptPlans.map(plan => ({ // Sanity 데이터가 없으면 fallback 사용
        period: plan.name,
        amount: plan.price,
        note: plan.pricePerSession ? `회당 ${formatPrice(plan.pricePerSession)}원` : undefined
      }));

  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            제공 서비스
          </h2>
        </div>

        <div className={`grid gap-12 ${
          membershipData && ptData ? 'md:grid-cols-2' : 
          membershipData || ptData ? 'md:grid-cols-1 max-w-2xl mx-auto' : 
          'md:grid-cols-1'
        }`}>
          {/* 일반 멤버십 - 데이터가 있을 때만 렌더링 */}
          {membershipData && (
            <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
              일반 멤버십
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              최대 200명 정원제로 쾌적한 시설을 이용하실 수 있어요
            </p>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      기간
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      가격
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {membershipData.map((pricing, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {pricing.period}
                      </td>
                      <td className="px-6 py-4 text-md text-gray-900">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <div className="font-bold">{formatPrice(pricing.amount)}원</div>
                          {pricing.note && (
                            <div className="text-sm text-gray-500">
                              ({pricing.note})
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          )}

          {/* 1:1 PT - 데이터가 있을 때만 렌더링 */}
          {ptData && (
            <div className="rounded-lg p-8 bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
              1:1 PT
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              맞춤 트레이닝을 합리적인 가격에 받아보세요
            </p>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      회차
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      가격
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {ptData.map((pricing, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {pricing.period}
                      </td>
                      <td className="px-6 py-4 text-md text-gray-900">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <div className="font-bold">{formatPrice(pricing.amount)}원</div>
                          {pricing.note && (
                            <div className="text-sm text-gray-500">
                              ({pricing.note})
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          )}

          {/* 서비스가 하나도 없는 경우 안내 메시지 */}
          {!membershipData && !ptData && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                서비스 정보 준비중
              </h3>
              <p className="text-gray-500">
                해당 센터의 서비스 정보를 준비중입니다. 자세한 내용은 문의해주세요.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
