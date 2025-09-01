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
            바디텍쳐의 다양한 서비스를 확인하세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* 일반 멤버십 */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              일반 멤버십
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              1개월 150,000원부터 시작하는 합리적인 가격
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatPrice(plan.price)}원
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">포함 서비스</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 최신식 운동 기구 이용</li>
                <li>• 넓고 쾌적한 운동 공간</li>
                <li>• 전문 트레이너 상담</li>
                <li>• 무료 주차</li>
              </ul>
            </div>
          </div>

          {/* 1:1 PT */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              1:1 PT
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              1회 30,000원부터 시작하는 맞춤 트레이닝
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatPrice(plan.price)}원
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">PT 특징</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 1:1 맞춤 트레이닝 프로그램</li>
                <li>• 체계적인 운동 목표 설정</li>
                <li>• 전문 트레이너의 지속적인 관리</li>
                <li>• 운동 자세 교정 및 영양 상담</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
