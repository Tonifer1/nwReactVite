import { render, screen, fireEvent } from '@testing-library/react';
import CustomerAdd from './customerAdd';

describe('CustomerAdd Component', () => {
  test('renders form inputs correctly', () => {
    render(<CustomerAdd />);

    // Tarkista, että lomakkeen kentät renderöityvät
    expect(screen.getByPlaceholderText('ID with 5 capital letters')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Company name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contact name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone')).toBeInTheDocument();
  });

  test('submits the form with valid data', () => {
    render(<CustomerAdd />);

    fireEvent.change(screen.getByPlaceholderText('ID with 5 capital letters'), { target: { value: 'ABCDE' } });
    fireEvent.change(screen.getByPlaceholderText('Company name'), { target: { value: 'Test Company' } });
    fireEvent.change(screen.getByPlaceholderText('Contact name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Phone'), { target: { value: '123456789' } });

    fireEvent.click(screen.getByRole('button', { name: 'save' }));

    // Testaa, että lomake käsitellään oikein
    expect(screen.getByPlaceholderText('ID with 5 capital letters').value).toBe('ABCDE');
    expect(screen.getByPlaceholderText('Company name').value).toBe('Test Company');
  });

  test('does not submit form with invalid data', () => {
    render(<CustomerAdd />);
  
    // Jätä pakollinen kenttä tyhjäksi
    fireEvent.change(screen.getByPlaceholderText('ID with 5 capital letters'), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: 'save' }));
  
    // Tarkista, että lomake ei mene läpi
    expect(screen.getByPlaceholderText('ID with 5 capital letters')).toBeInvalid();
  });
  
});

