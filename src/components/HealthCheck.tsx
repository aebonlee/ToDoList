import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

interface HealthCheckProps {
  onStatusChange?: (isHealthy: boolean) => void;
}

export const HealthCheck: React.FC<HealthCheckProps> = ({ onStatusChange }) => {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkHealth = async () => {
    try {
      setIsChecking(true);
      await apiService.healthCheck();
      setIsHealthy(true);
      setLastChecked(new Date());
      onStatusChange?.(true);
    } catch (error) {
      console.error('Health check failed:', error);
      setIsHealthy(false);
      setLastChecked(new Date());
      onStatusChange?.(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkHealth();
    // 5분마다 헬스체크
    const interval = setInterval(checkHealth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isHealthy === null && isChecking) {
    return (
      <div className="flex items-center text-yellow-600 text-sm mb-4">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
        서버 연결 상태 확인 중...
      </div>
    );
  }

  if (isHealthy === false) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-red-700 text-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            서버에 연결할 수 없습니다. 
            {lastChecked && (
              <span className="ml-1">
                (마지막 확인: {lastChecked.toLocaleTimeString()})
              </span>
            )}
          </div>
          <button
            onClick={checkHealth}
            disabled={isChecking}
            className="text-red-600 hover:text-red-700 text-sm underline disabled:opacity-50"
          >
            {isChecking ? '확인 중...' : '다시 시도'}
          </button>
        </div>
        <div className="text-red-600 text-xs mt-1">
          로그인 및 데이터 동기화가 지연될 수 있습니다.
        </div>
      </div>
    );
  }

  if (isHealthy === true) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-md p-2 mb-4">
        <div className="flex items-center text-green-700 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          서버 연결 정상
          {lastChecked && (
            <span className="ml-1 text-green-600">
              (마지막 확인: {lastChecked.toLocaleTimeString()})
            </span>
          )}
        </div>
      </div>
    );
  }

  return null;
};