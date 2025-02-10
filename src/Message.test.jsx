import { render, screen } from '@testing-library/react';
import Message from './Message';

describe('Message Component', () => {
    test('renders the message correctly', () => {
      render(<Message message="Test Message" isPositive={true} showMessage={true} />);
      
      // Tarkistetaan, että viesti näkyy ruudulla
      expect(screen.getByText('Test Message')).toBeInTheDocument();
    });
  });
  