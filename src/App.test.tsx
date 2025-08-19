import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login form', () => {
  render(<App />);
  const todoManagementText = screen.getByText(/할 일 관리를 시작하세요/i);
  expect(todoManagementText).toBeInTheDocument();
});
