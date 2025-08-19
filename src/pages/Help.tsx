import React, { useState } from 'react';
import { 
  QuestionMarkCircleIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    question: '할일은 어떻게 추가하나요?',
    answer: '상단의 "할일 추가" 입력창에 할일을 입력하고 Enter 키를 누르거나 "추가" 버튼을 클릭하세요. 상세 설명과 우선순위도 함께 설정할 수 있습니다.',
    category: '기본 사용법'
  },
  {
    question: '테마를 변경하려면 어떻게 하나요?',
    answer: '우상단의 테마 토글 버튼으로 다크/라이트 모드를 변경할 수 있고, 컬러 팔레트 선택기로 5가지 색상 테마 중 선택할 수 있습니다.',
    category: '테마 설정'
  },
  {
    question: '데모 모드와 서버 모드의 차이점은 무엇인가요?',
    answer: '데모 모드는 브라우저 로컬 저장소를 사용하여 오프라인으로 작동하며, 서버 모드는 실제 서버와 연동하여 데이터를 동기화합니다.',
    category: '모드 설정'
  },
  {
    question: '프로젝트는 어떻게 관리하나요?',
    answer: '프로젝트 페이지에서 새 프로젝트를 생성하고, 할일을 프로젝트별로 분류하여 관리할 수 있습니다. 진행률과 통계도 확인 가능합니다.',
    category: '프로젝트 관리'
  },
  {
    question: '키보드 단축키가 있나요?',
    answer: 'Ctrl+N (새 할일), Ctrl+/ (검색), Escape (모달 닫기), Space (체크박스 토글) 등의 단축키를 지원합니다.',
    category: '단축키'
  },
  {
    question: '데이터를 백업하거나 내보낼 수 있나요?',
    answer: '설정 > 일반 설정에서 데이터 내보내기 기능을 사용할 수 있습니다. JSON, CSV 형식으로 내보내기가 가능합니다.',
    category: '데이터 관리'
  },
  {
    question: '알림 설정은 어떻게 변경하나요?',
    answer: '설정 > 알림 설정에서 이메일, 브라우저 푸시, 모바일 알림 등을 개별적으로 설정할 수 있습니다.',
    category: '알림 설정'
  },
  {
    question: '모바일에서도 사용할 수 있나요?',
    answer: '네, 반응형 디자인으로 제작되어 모바일, 태블릿, 데스크톱 모든 기기에서 최적화된 경험을 제공합니다.',
    category: '호환성'
  }
];

const categories = Array.from(new Set(faqData.map(item => item.category)));

export default function Help() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFAQ = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-app mb-2">❓ 도움말</h1>
        <p className="text-muted">
          Enhanced TodoList 사용법과 자주 묻는 질문들을 확인하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Help Cards */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Getting Started */}
            <div className="bg-card rounded-xl border border-app shadow-sm p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-accent-weak">
                  <BookOpenIcon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-app ml-3">시작하기</h3>
              </div>
              <p className="text-sm text-muted mb-4">
                새로운 사용자를 위한 기본 사용법과 팁을 확인하세요.
              </p>
              <button className="text-accent hover:underline text-sm font-medium">
                가이드 보기 →
              </button>
            </div>

            {/* Feature Guide */}
            <div className="bg-card rounded-xl border border-app shadow-sm p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-success-weak">
                  <QuestionMarkCircleIcon className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-lg font-semibold text-app ml-3">기능 안내</h3>
              </div>
              <p className="text-sm text-muted mb-4">
                모든 기능과 고급 사용법을 자세히 알아보세요.
              </p>
              <button className="text-accent hover:underline text-sm font-medium">
                기능 살펴보기 →
              </button>
            </div>

            {/* Contact Support */}
            <div className="bg-card rounded-xl border border-app shadow-sm p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-warning-weak">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-warning" />
                </div>
                <h3 className="text-lg font-semibold text-app ml-3">문의하기</h3>
              </div>
              <p className="text-sm text-muted mb-4">
                문제가 해결되지 않으면 언제든 문의해주세요.
              </p>
              <button className="text-accent hover:underline text-sm font-medium">
                문의하기 →
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl border border-app shadow-sm">
            <div className="p-6 border-b border-app">
              <h2 className="text-xl font-semibold text-app mb-4">💬 자주 묻는 질문</h2>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === 'all'
                      ? 'bg-accent text-white'
                      : 'bg-gray-100 text-app hover:bg-gray-200'
                  }`}
                >
                  전체
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                      selectedCategory === category
                        ? 'bg-accent text-white'
                        : 'bg-gray-100 text-app hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {filteredFAQ.map((faq, index) => (
                  <div key={index} className="border border-app rounded-lg">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-accent-weak transition-colors duration-200"
                    >
                      <span className="font-medium text-app">{faq.question}</span>
                      {openFAQ === index ? (
                        <ChevronUpIcon className="w-5 h-5 text-muted" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 text-muted" />
                      )}
                    </button>
                    {openFAQ === index && (
                      <div className="px-4 pb-3 border-t border-app">
                        <p className="text-muted pt-3">{faq.answer}</p>
                        <span className="inline-block mt-2 px-2 py-1 bg-accent-weak text-accent text-xs rounded-full">
                          {faq.category}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Contact Card */}
          <div className="bg-card rounded-xl border border-app shadow-sm p-6">
            <h3 className="text-lg font-semibold text-app mb-4 flex items-center">
              <EnvelopeIcon className="w-5 h-5 mr-2" />
              📞 연락처
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <EnvelopeIcon className="w-4 h-4 mr-3 text-muted" />
                <div>
                  <p className="font-medium text-app">이메일</p>
                  <p className="text-muted">support@todolist.com</p>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <PhoneIcon className="w-4 h-4 mr-3 text-muted" />
                <div>
                  <p className="font-medium text-app">전화</p>
                  <p className="text-muted">02-1234-5678</p>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <ChatBubbleLeftRightIcon className="w-4 h-4 mr-3 text-muted" />
                <div>
                  <p className="font-medium text-app">채팅 지원</p>
                  <p className="text-muted">평일 9:00-18:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Version Info */}
          <div className="bg-card rounded-xl border border-app shadow-sm p-6">
            <h3 className="text-lg font-semibold text-app mb-4">📋 버전 정보</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">앱 버전</span>
                <span className="font-medium text-app">v2.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">빌드</span>
                <span className="font-medium text-app">2025.08.19</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">React</span>
                <span className="font-medium text-app">19.1.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">TypeScript</span>
                <span className="font-medium text-app">4.9.5</span>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div className="bg-card rounded-xl border border-app shadow-sm p-6">
            <h3 className="text-lg font-semibold text-app mb-4">🔗 유용한 링크</h3>
            <div className="space-y-2">
              <a href="#" className="block text-accent hover:underline text-sm">
                📖 사용자 매뉴얼
              </a>
              <a href="#" className="block text-accent hover:underline text-sm">
                🎥 튜토리얼 영상
              </a>
              <a href="#" className="block text-accent hover:underline text-sm">
                🐛 버그 신고
              </a>
              <a href="#" className="block text-accent hover:underline text-sm">
                💡 기능 제안
              </a>
              <a href="https://github.com/aebonlee/ToDoList" className="block text-accent hover:underline text-sm">
                📦 GitHub 저장소
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Still Need Help */}
      <div className="mt-12 bg-gradient-to-r from-accent to-purple-600 rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">🤝 여전히 도움이 필요하신가요?</h3>
        <p className="text-white/80 mb-6">
          위 답변으로 해결되지 않는 문제가 있으시면 언제든 문의해주세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-accent px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
            📧 이메일로 문의하기
          </button>
          <button className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors duration-200">
            💬 실시간 채팅
          </button>
        </div>
      </div>
    </div>
  );
}