import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  EnvelopeIcon, 
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Demo User',
    email: user?.email || 'demo@example.com',
    bio: '열정적인 개발자이자 효율적인 할일 관리를 추구합니다.',
    location: '서울, 대한민국',
    joinDate: '2025-08-01',
    website: 'https://github.com/aebonlee'
  });

  const stats = [
    {
      label: '총 완료한 할일',
      value: '47',
      icon: ChartBarIcon,
      color: 'text-success'
    },
    {
      label: '연속 사용일',
      value: '12',
      icon: CalendarIcon,
      color: 'text-accent'
    },
    {
      label: '진행중인 프로젝트',
      value: '3',
      icon: CogIcon,
      color: 'text-warning'
    },
    {
      label: '달성률',
      value: '87%',
      icon: ShieldCheckIcon,
      color: 'text-purple-600'
    }
  ];

  const handleSave = () => {
    // 여기서 실제로는 API 호출을 통해 프로필을 업데이트
    setIsEditing(false);
    // 성공 메시지 표시 등
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-app mb-2">👤 내 프로필</h1>
        <p className="text-muted">
          개인 정보를 관리하고 활동 통계를 확인하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl border border-app shadow-sm">
            {/* Profile Header */}
            <div className="p-6 border-b border-app">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    {profileData.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-6">
                    <h2 className="text-2xl font-bold text-app">{profileData.name}</h2>
                    <p className="text-muted flex items-center mt-1">
                      <EnvelopeIcon className="w-4 h-4 mr-2" />
                      {profileData.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-all duration-200 text-sm font-medium"
                >
                  {isEditing ? '취소' : '편집'}
                </button>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-app mb-2">이름</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-app rounded-lg bg-card text-app focus:border-accent focus:ring-4 ring-accent ring-opacity-20 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-app mb-2">소개</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-app rounded-lg bg-card text-app focus:border-accent focus:ring-4 ring-accent ring-opacity-20 transition-all duration-200 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-app mb-2">위치</label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      className="w-full px-3 py-2 border border-app rounded-lg bg-card text-app focus:border-accent focus:ring-4 ring-accent ring-opacity-20 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-app mb-2">웹사이트</label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      className="w-full px-3 py-2 border border-app rounded-lg bg-card text-app focus:border-accent focus:ring-4 ring-accent ring-opacity-20 transition-all duration-200"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-success text-white rounded-lg hover:opacity-90 transition-all duration-200 font-medium"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:opacity-90 transition-all duration-200 font-medium"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted mb-1">소개</h3>
                    <p className="text-app">{profileData.bio}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted mb-1">위치</h3>
                      <p className="text-app">{profileData.location}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted mb-1">가입일</h3>
                      <p className="text-app">{new Date(profileData.joinDate).toLocaleDateString('ko-KR')}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted mb-1">웹사이트</h3>
                    <a 
                      href={profileData.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      {profileData.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats & Activity */}
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="bg-card rounded-xl border border-app shadow-sm p-6">
            <h3 className="text-lg font-semibold text-app mb-4 flex items-center">
              <ChartBarIcon className="w-5 h-5 mr-2" />
              활동 통계
            </h3>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <stat.icon className={`w-5 h-5 mr-3 ${stat.color}`} />
                    <span className="text-sm text-app">{stat.label}</span>
                  </div>
                  <span className={`font-bold ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card rounded-xl border border-app shadow-sm p-6">
            <h3 className="text-lg font-semibold text-app mb-4">📈 최근 활동</h3>
            <div className="space-y-3">
              {[
                { action: '할일 완료', item: '프로젝트 기획서 작성', time: '2시간 전' },
                { action: '새 할일 추가', item: 'UI 디자인 리뷰', time: '4시간 전' },
                { action: '프로젝트 생성', item: '웹사이트 리뉴얼', time: '1일 전' },
                { action: '할일 완료', item: '데이터베이스 설계', time: '2일 전' }
              ].map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-app">
                      <span className="font-medium">{activity.action}</span>: {activity.item}
                    </p>
                    <p className="text-xs text-muted">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-xl border border-app shadow-sm p-6">
            <h3 className="text-lg font-semibold text-app mb-4">⚡ 빠른 작업</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent-weak transition-colors duration-200 text-sm text-app">
                🔐 비밀번호 변경
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent-weak transition-colors duration-200 text-sm text-app">
                📧 이메일 설정
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent-weak transition-colors duration-200 text-sm text-app">
                🔔 알림 설정
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent-weak transition-colors duration-200 text-sm text-app">
                📊 데이터 내보내기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}