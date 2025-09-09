import React from 'react';
import { membershipPlans, ptPlans } from '@/data/mockData';

// 제공 서비스 섹션 컴포넌트
const Services: React.FC = () => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            제공 서비스
          </h2>
          <p className="text-lg text-gray-600">
            합리적인 가격에 서비스를 이용해보세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* 일반 멤버십 */}
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
                  {membershipPlans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {plan.name}
                      </td>
                      <td className="px-6 py-4 text-md text-gray-900">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <div className="font-bold">{formatPrice(plan.price)}원</div>
                          {plan.pricePerMonth && (
                            <div className="text-sm text-gray-500">
                              (월 {formatPrice(plan.pricePerMonth)}원)
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

          {/* 1:1 PT */}
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
                  {ptPlans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {plan.name}
                      </td>
                      <td className="px-6 py-4 text-md text-gray-900">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <div className="font-bold">{formatPrice(plan.price)}원</div>
                          {plan.pricePerSession && (
                            <div className="text-sm text-gray-500">
                              (회당 {formatPrice(plan.pricePerSession)}원)
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
        </div>
      </div>
    </section>
  );
};

export default Services;
