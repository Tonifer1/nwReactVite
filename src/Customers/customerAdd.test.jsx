import { render, screen, fireEvent } from '@testing-library/react';
import CustomerAdd from './customerAdd';

describe('CustomerAdd Component', () => {
  test('renders form inputs correctly', () => {
    render(<CustomerAdd />);

    // Tarkista, että lomakkeen kentät renderöityvät
    expect(screen.getByPlaceholderText('ID with 5 capital letters')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Company name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contact name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contact title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Country')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('City')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Postal code')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Fax')).toBeInTheDocument();
  });

  test('submits the form with valid data', () => {
    render(<CustomerAdd />);

    fireEvent.change(screen.getByPlaceholderText('ID with 5 capital letters'), { target: { value: 'ABCDE' } });
    fireEvent.change(screen.getByPlaceholderText('Company name'), { target: { value: 'Test Company' } });
    fireEvent.change(screen.getByPlaceholderText('Contact name'), { target: { value: 'Test Name' } });
    fireEvent.change(screen.getByPlaceholderText('Contact title'), { target: { value: 'Test title' } });
    fireEvent.change(screen.getByPlaceholderText('Country'), { target: { value: 'Test Country' } });
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: 'Test Address' } });
    fireEvent.change(screen.getByPlaceholderText('City'), { target: { value: 'Test City' } });
    fireEvent.change(screen.getByPlaceholderText('Postal code'), { target: { value: '12345' } });
    fireEvent.change(screen.getByPlaceholderText('Phone'), { target: { value: '123456789' } });
    fireEvent.change(screen.getByPlaceholderText('Fax'), { target: { value: '123456789' } });

    fireEvent.click(screen.getByRole('button', { name: 'save' }));

    // Testaa, että lomake käsitellään oikein
    expect(screen.getByPlaceholderText('ID with 5 capital letters').value).toBe('ABCDE');
    expect(screen.getByPlaceholderText('Company name').value).toBe('Test Company');
    expect(screen.getByPlaceholderText('Contact name').value).toBe('Test Name');
    expect(screen.getByPlaceholderText('Contact title').value).toBe('Test title');
    expect(screen.getByPlaceholderText('Country').value).toBe('Test Country');
    expect(screen.getByPlaceholderText('Address').value).toBe('Test Address');
    expect(screen.getByPlaceholderText('City').value).toBe('Test City');
    expect(screen.getByPlaceholderText('Postal code').value).toBe('12345');
    expect(screen.getByPlaceholderText('Phone').value).toBe('123456789');
    expect(screen.getByPlaceholderText('Fax').value).toBe('123456789');

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

