import React from 'react';

// 찾아오는 길 컴포넌트
const Location: React.FC = () => {
  return (
    <section id="location" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            찾아오는 길
          </h2>
          <p className="text-lg text-gray-600">
            바디텍쳐 왕십리 청계점을 쉽게 찾아오세요
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* 지도 및 주소 정보 */}
          <div>
            <div className="bg-gray-200 aspect-video rounded-lg mb-6 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-600">지도 영역</p>
                <a
                  href="https://maps.app.goo.gl/qfJirYBLBQxnkfhM9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block"
                >
                  구글 지도에서 보기 →
                </a>
              </div>
            </div>

            {/* 주소 정보 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">주소</h3>
              <p className="text-gray-700 mb-4">
                서울특별시 성동구 왕십리로 315<br />
                바디텍쳐 왕십리 청계점
              </p>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>02-123-4567</span>
              </div>
            </div>
          </div>

          {/* 교통 정보 */}
          <div className="space-y-6">
            {/* 대중교통 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V7M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
                대중교통으로 오시는 길
              </h3>
              <div className="space-y-3 text-gray-700">
                <div>
                  <p className="font-medium text-gray-900">지하철</p>
                  <p className="text-sm">2호선 왕십리역 1번 출구 도보 5분</p>
                  <p className="text-sm">5호선 왕십리역 1번 출구 도보 5분</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">버스</p>
                  <p className="text-sm">간선버스: 101, 102, 103, 104</p>
                  <p className="text-sm">지선버스: 201, 202, 203</p>
                </div>
              </div>
            </div>

            {/* 주차 정보 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                주차 정보
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">무료 주차</p>
                    <p className="text-sm">헬스장 이용 시 2시간 무료 주차</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">지하 주차장</p>
                    <p className="text-sm">지하 1층 ~ 지하 2층 주차 가능</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">엘리베이터</p>
                    <p className="text-sm">주차장에서 헬스장까지 직통 엘리베이터</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 운영 시간 */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                운영 시간
              </h3>
              <div className="space-y-2 text-blue-800">
                <div className="flex justify-between">
                  <span>평일</span>
                  <span>06:00 - 24:00</span>
                </div>
                <div className="flex justify-between">
                  <span>토요일</span>
                  <span>06:00 - 24:00</span>
                </div>
                <div className="flex justify-between">
                  <span>일요일</span>
                  <span>06:00 - 24:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
