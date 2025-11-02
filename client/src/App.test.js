import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Sweet Shop Management System heading', () => {
  render(<App />);
  const heading = screen.getByText(/Sweet Shop Management System/i);
  expect(heading).toBeInTheDocument();
});