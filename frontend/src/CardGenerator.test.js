import { render, screen } from '@testing-library/react';
import { CardGenerator } from './CardGenerator';

test('renders card generator UI', () => {
  render(<CardGenerator />);
  const nameLabel = screen.getByText(/Name:/i);
  expect(nameLabel).toBeInTheDocument();
});
