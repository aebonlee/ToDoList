import { useState, useCallback } from 'react';
import { Todo, UpdateTodoRequest } from '../types/todo';

// Mock data for demo mode
const initialDemoTodos: Todo[] = [
  {
    id: '1',
    title: '🎨 새로운 테마 시스템 체험해보기',
    description: '다크/라이트 모드와 5가지 컬러 팔레트를 사용해보세요!',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'demo-user'
  },
  {
    id: '2',
    title: '💫 애니메이션 효과 확인하기',
    description: '호버, 클릭, 전환 효과들을 체험해보세요.',
    completed: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date().toISOString(),
    userId: 'demo-user'
  },
  {
    id: '3',
    title: '📱 반응형 디자인 테스트',
    description: '브라우저 크기를 조절해서 반응형 레이아웃을 확인해보세요.',
    completed: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updatedAt: new Date().toISOString(),
    userId: 'demo-user'
  },
  {
    id: '4',
    title: '🔍 필터링 기능 사용하기',
    description: '전체/진행중/완료 탭을 클릭해서 할일을 분류해보세요.',
    completed: false,
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    updatedAt: new Date().toISOString(),
    userId: 'demo-user'
  },
  {
    id: '5',
    title: '✨ 새 할일 추가해보기',
    description: '위의 입력창에 새로운 할일을 추가해보세요!',
    completed: true,
    createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    updatedAt: new Date().toISOString(),
    userId: 'demo-user'
  }
];

export const useDemoTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // LocalStorage에서 데모 할일 복원
    const saved = localStorage.getItem('demo-todos');
    return saved ? JSON.parse(saved) : initialDemoTodos;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 로컬 스토리지에 저장
  const saveTodos = useCallback((newTodos: Todo[]) => {
    localStorage.setItem('demo-todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  }, []);

  const createTodo = useCallback(async (data: { title: string; description?: string }) => {
    setLoading(true);
    setError(null);
    
    try {
      // 실제 API 호출을 시뮬레이션하기 위한 지연
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'demo-user'
      };

      const newTodos = [newTodo, ...todos];
      saveTodos(newTodos);
    } catch (err) {
      setError('할일 추가에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [todos, saveTodos]);

  const updateTodo = useCallback(async (id: string, data: UpdateTodoRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newTodos = todos.map(todo =>
        todo.id === id 
          ? { 
              ...todo, 
              ...data, 
              updatedAt: new Date().toISOString() 
            }
          : todo
      );
      saveTodos(newTodos);
    } catch (err) {
      setError('할일 수정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [todos, saveTodos]);

  const deleteTodo = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const newTodos = todos.filter(todo => todo.id !== id);
      saveTodos(newTodos);
    } catch (err) {
      setError('할일 삭제에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [todos, saveTodos]);

  const toggleTodo = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const newTodos = todos.map(todo =>
        todo.id === id 
          ? { 
              ...todo, 
              completed: !todo.completed,
              updatedAt: new Date().toISOString() 
            }
          : todo
      );
      saveTodos(newTodos);
    } catch (err) {
      setError('할일 상태 변경에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [todos, saveTodos]);

  // 데모 데이터 초기화
  const resetDemoData = useCallback(() => {
    saveTodos(initialDemoTodos);
    setError(null);
  }, [saveTodos]);

  return {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    resetDemoData
  };
};