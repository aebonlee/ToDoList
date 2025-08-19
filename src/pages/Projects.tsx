import React, { useState } from 'react';
import { PlusIcon, FolderIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface Project {
  id: string;
  name: string;
  description: string;
  todosCount: number;
  completedCount: number;
  color: string;
  createdAt: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: '🚀 웹사이트 리뉴얼 프로젝트',
    description: '회사 웹사이트 전체 리뉴얼 및 반응형 디자인 적용',
    todosCount: 12,
    completedCount: 8,
    color: 'blue',
    createdAt: '2025-08-15'
  },
  {
    id: '2',
    name: '📱 모바일 앱 개발',
    description: '크로스 플랫폼 모바일 애플리케이션 개발',
    todosCount: 24,
    completedCount: 5,
    color: 'green',
    createdAt: '2025-08-10'
  },
  {
    id: '3',
    name: '📊 데이터 분석 시스템',
    description: '실시간 데이터 수집 및 분석 대시보드 구축',
    todosCount: 8,
    completedCount: 8,
    color: 'purple',
    createdAt: '2025-08-01'
  },
  {
    id: '4',
    name: '🎨 UI/UX 개선',
    description: '사용자 인터페이스 및 경험 개선 작업',
    todosCount: 15,
    completedCount: 10,
    color: 'pink',
    createdAt: '2025-07-28'
  }
];

export default function Projects() {
  const [projects] = useState<Project[]>(mockProjects);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const getProgressPercentage = (completed: number, total: number) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage === 100) return 'bg-success';
    if (percentage >= 70) return 'bg-accent';
    if (percentage >= 40) return 'bg-warning';
    return 'bg-danger';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-app mb-2">📁 내 프로젝트</h1>
          <p className="text-muted">
            프로젝트별로 할일을 분류하고 진행상황을 추적하세요.
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm hover:scale-105"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          새 프로젝트
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => {
          const progress = getProgressPercentage(project.completedCount, project.todosCount);
          
          return (
            <div
              key={project.id}
              className="bg-card rounded-xl border border-app shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              {/* Project Header */}
              <div className="p-6 border-b border-app">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg bg-${project.color}-100`}>
                      <FolderIcon className={`w-6 h-6 text-${project.color}-600`} />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-app text-lg leading-tight">
                        {project.name}
                      </h3>
                      <div className="flex items-center mt-1 text-sm text-muted">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {new Date(project.createdAt).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted mt-3 line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Project Stats */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-app">진행률</span>
                  <span className="text-sm font-bold text-app">{progress}%</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(progress)}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Todo Stats */}
                <div className="flex justify-between text-sm">
                  <div className="text-center">
                    <div className="font-bold text-app">{project.todosCount}</div>
                    <div className="text-muted">총 할일</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-warning">{project.todosCount - project.completedCount}</div>
                    <div className="text-muted">남은 할일</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-success">{project.completedCount}</div>
                    <div className="text-muted">완료</div>
                  </div>
                </div>
              </div>

              {/* Project Actions */}
              <div className="px-6 pb-6">
                <button className="w-full bg-accent-weak text-accent hover:bg-accent hover:text-white transition-all duration-200 py-2 rounded-lg font-medium">
                  프로젝트 열기
                </button>
              </div>
            </div>
          );
        })}

        {/* Create New Project Card */}
        <div
          onClick={() => setShowCreateForm(true)}
          className="bg-card rounded-xl border-2 border-dashed border-accent opacity-60 hover:opacity-100 transition-all duration-200 cursor-pointer hover:scale-[1.02] flex items-center justify-center min-h-[300px]"
        >
          <div className="text-center">
            <div className="p-4 rounded-full bg-accent-weak mb-4 mx-auto w-fit">
              <PlusIcon className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-semibold text-app mb-2">새 프로젝트 생성</h3>
            <p className="text-sm text-muted">
              새로운 프로젝트를 만들어<br />할일을 체계적으로 관리하세요
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon Banner */}
      <div className="mt-12 bg-gradient-to-r from-accent to-purple-600 rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">🚧 곧 출시될 기능들</h3>
        <p className="text-white/80 mb-4">
          프로젝트 생성, 팀 협업, 간트 차트, 시간 추적 등 더 많은 기능이 준비되고 있습니다!
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {['팀 협업', '간트 차트', '시간 추적', '파일 첨부', '알림 설정'].map((feature) => (
            <span key={feature} className="bg-white/20 px-3 py-1 rounded-full text-sm">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}