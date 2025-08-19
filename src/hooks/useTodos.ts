import { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo';
import apiService from '../services/api';

interface UseTodosReturn {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  createTodo: (todoData: CreateTodoRequest) => Promise<void>;
  updateTodo: (id: string, todoData: UpdateTodoRequest) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  refreshTodos: () => Promise<void>;
}

export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const todosData = await apiService.getTodos();
      setTodos(todosData);
    } catch (err) {
      setError('할 일 목록을 불러오는데 실패했습니다.');
      console.error('Failed to fetch todos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTodo = useCallback(async (todoData: CreateTodoRequest) => {
    try {
      setError(null);
      const newTodo = await apiService.createTodo(todoData);
      setTodos(prev => [...prev, newTodo]);
    } catch (err) {
      setError('할 일 생성에 실패했습니다.');
      throw err;
    }
  }, []);

  const updateTodo = useCallback(async (id: string, todoData: UpdateTodoRequest) => {
    try {
      setError(null);
      const updatedTodo = await apiService.updateTodo(id, todoData);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (err) {
      setError('할 일 수정에 실패했습니다.');
      throw err;
    }
  }, []);

  const deleteTodo = useCallback(async (id: string) => {
    try {
      setError(null);
      await apiService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError('할 일 삭제에 실패했습니다.');
      throw err;
    }
  }, []);

  const toggleTodo = useCallback(async (id: string) => {
    try {
      setError(null);
      const updatedTodo = await apiService.toggleTodo(id);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (err) {
      setError('할 일 상태 변경에 실패했습니다.');
      throw err;
    }
  }, []);

  const refreshTodos = useCallback(async () => {
    await fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    refreshTodos,
  };
};