const React = require('react');

const ReactRouterDom = {
  BrowserRouter: ({ children }) => React.createElement('div', { 'data-testid': 'router' }, children),
  Routes: ({ children }) => React.createElement('div', { 'data-testid': 'routes' }, children),
  Route: ({ element }) => React.createElement('div', { 'data-testid': 'route' }, element),
  Navigate: () => React.createElement('div', { 'data-testid': 'navigate' }, 'Navigate'),
  NavLink: ({ children, to, className }) => {
    const props = {
      href: to,
      className: typeof className === 'function' ? className({ isActive: false }) : className
    };
    return React.createElement('a', props, children);
  },
  useLocation: () => ({ pathname: '/' }),
};

module.exports = ReactRouterDom;