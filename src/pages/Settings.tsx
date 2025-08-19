import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import PalettePicker from '../components/PalettePicker';
import ThemeToggle from '../components/ThemeToggle';
import {
  PaintBrushIcon,
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

export default function Settings() {
  const { mode, palette } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    mobile: false,
    weeklyReport: true
  });

  const [privacy, setPrivacy] = useState({
    profilePublic: false,
    showActivity: true,
    allowAnalytics: true
  });

  const [language, setLanguage] = useState('ko');
  const [autoSave, setAutoSave] = useState(true);

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const ToggleSwitch = ({ enabled, onChange, label }: { 
    enabled: boolean; 
    onChange: (value: boolean) => void; 
    label: string;
  }) => (
    <div className="flex items-center justify-between">
      <span className="text-sm text-app">{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
          enabled ? 'bg-accent' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-app mb-2">⚙️ 설정</h1>
        <p className="text-muted">
          앱의 동작을 사용자 환경에 맞게 조정하세요.
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance Settings */}
        <div className="bg-card rounded-xl border border-app shadow-sm">
          <div className="p-6 border-b border-app">
            <h2 className="text-xl font-semibold text-app flex items-center">
              <PaintBrushIcon className="w-6 h-6 mr-3" />
              🎨 외관 설정
            </h2>
            <p className="text-sm text-muted mt-1">테마와 색상을 설정하세요.</p>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-app mb-3">테마 모드</label>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <span className="text-sm text-muted">
                  현재: <span className="font-medium text-app">{mode === 'dark' ? '다크' : '라이트'} 모드</span>
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-app mb-3">컬러 팔레트</label>
              <div className="flex items-center gap-4">
                <PalettePicker />
                <span className="text-sm text-muted">
                  현재: <span className="font-medium text-app capitalize">{palette} 테마</span>
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-app mb-3">애니메이션</label>
              <ToggleSwitch
                enabled={true}
                onChange={() => {}}
                label="부드러운 전환 효과 사용"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-card rounded-xl border border-app shadow-sm">
          <div className="p-6 border-b border-app">
            <h2 className="text-xl font-semibold text-app flex items-center">
              <BellIcon className="w-6 h-6 mr-3" />
              🔔 알림 설정
            </h2>
            <p className="text-sm text-muted mt-1">받고 싶은 알림을 선택하세요.</p>
          </div>
          <div className="p-6 space-y-4">
            <ToggleSwitch
              enabled={notifications.email}
              onChange={(value) => handleNotificationChange('email', value)}
              label="이메일 알림"
            />
            <ToggleSwitch
              enabled={notifications.browser}
              onChange={(value) => handleNotificationChange('browser', value)}
              label="브라우저 푸시 알림"
            />
            <ToggleSwitch
              enabled={notifications.mobile}
              onChange={(value) => handleNotificationChange('mobile', value)}
              label="모바일 앱 알림"
            />
            <ToggleSwitch
              enabled={notifications.weeklyReport}
              onChange={(value) => handleNotificationChange('weeklyReport', value)}
              label="주간 리포트 이메일"
            />
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-card rounded-xl border border-app shadow-sm">
          <div className="p-6 border-b border-app">
            <h2 className="text-xl font-semibold text-app flex items-center">
              <ShieldCheckIcon className="w-6 h-6 mr-3" />
              🔒 개인정보 설정
            </h2>
            <p className="text-sm text-muted mt-1">개인정보 보호 및 공개 범위를 설정하세요.</p>
          </div>
          <div className="p-6 space-y-4">
            <ToggleSwitch
              enabled={privacy.profilePublic}
              onChange={(value) => handlePrivacyChange('profilePublic', value)}
              label="프로필 공개"
            />
            <ToggleSwitch
              enabled={privacy.showActivity}
              onChange={(value) => handlePrivacyChange('showActivity', value)}
              label="활동 내역 표시"
            />
            <ToggleSwitch
              enabled={privacy.allowAnalytics}
              onChange={(value) => handlePrivacyChange('allowAnalytics', value)}
              label="사용 통계 수집 동의"
            />
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-card rounded-xl border border-app shadow-sm">
          <div className="p-6 border-b border-app">
            <h2 className="text-xl font-semibold text-app flex items-center">
              <GlobeAltIcon className="w-6 h-6 mr-3" />
              🌍 일반 설정
            </h2>
            <p className="text-sm text-muted mt-1">언어, 지역 및 기본 동작을 설정하세요.</p>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-app mb-2">언어</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-app rounded-lg bg-card text-app focus:border-accent focus:ring-4 ring-accent ring-opacity-20 transition-all duration-200"
              >
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
                <option value="zh">中文</option>
              </select>
            </div>
            <ToggleSwitch
              enabled={autoSave}
              onChange={setAutoSave}
              label="자동 저장"
            />
          </div>
        </div>

        {/* Device & Sync Settings */}
        <div className="bg-card rounded-xl border border-app shadow-sm">
          <div className="p-6 border-b border-app">
            <h2 className="text-xl font-semibold text-app flex items-center">
              <CloudIcon className="w-6 h-6 mr-3" />
              💽 기기 및 동기화
            </h2>
            <p className="text-sm text-muted mt-1">기기 간 데이터 동기화를 관리하세요.</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-accent-weak rounded-lg">
              <div className="flex items-center">
                <DevicePhoneMobileIcon className="w-5 h-5 text-accent mr-3" />
                <div>
                  <p className="text-sm font-medium text-app">현재 기기</p>
                  <p className="text-xs text-muted">Chrome on Windows</p>
                </div>
              </div>
              <span className="text-xs bg-success text-white px-2 py-1 rounded-full">활성</span>
            </div>
            <button className="w-full text-left p-4 border border-app rounded-lg hover:bg-accent-weak transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-app">기기 관리</p>
                  <p className="text-xs text-muted">연결된 기기 확인 및 관리</p>
                </div>
                <span className="text-accent">→</span>
              </div>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-card rounded-xl border border-danger shadow-sm">
          <div className="p-6 border-b border-danger">
            <h2 className="text-xl font-semibold text-danger flex items-center">
              <TrashIcon className="w-6 h-6 mr-3" />
              ⚠️ 위험 구역
            </h2>
            <p className="text-sm text-muted mt-1">신중하게 사용하세요. 되돌릴 수 없는 작업들입니다.</p>
          </div>
          <div className="p-6 space-y-4">
            <button className="w-full text-left p-4 border border-warning rounded-lg hover:bg-warning-weak transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-app">모든 데이터 초기화</p>
                  <p className="text-xs text-muted">모든 할일과 프로젝트가 삭제됩니다</p>
                </div>
                <span className="text-warning">⚠️</span>
              </div>
            </button>
            <button className="w-full text-left p-4 border border-danger rounded-lg hover:bg-danger-weak transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-danger">계정 삭제</p>
                  <p className="text-xs text-muted">계정과 모든 데이터가 영구적으로 삭제됩니다</p>
                </div>
                <span className="text-danger">🗑️</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button className="px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-all duration-200 font-medium shadow-sm hover:scale-105">
          💾 설정 저장
        </button>
      </div>
    </div>
  );
}