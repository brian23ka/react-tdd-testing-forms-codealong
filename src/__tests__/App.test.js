import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Select Pizza Toppings App', () => {
  test('pizza checkbox is initially unchecked', () => {
    render(<App />);
    const checkbox = screen.getByRole('checkbox', { name: /add pepperoni/i });
    expect(checkbox).not.toBeChecked();
  });

  test('toppings list initially contains only cheese', () => {
    render(<App />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(1);
    expect(screen.getByText('Cheese')).toBeInTheDocument();
    expect(screen.queryByText('Pepperoni')).not.toBeInTheDocument();
  });

  test('checkbox appears as checked when user clicks it', () => {
    render(<App />);
    const checkbox = screen.getByRole('checkbox', { name: /add pepperoni/i });
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('topping appears in toppings list when checked', () => {
    render(<App />);
    const checkbox = screen.getByRole('checkbox', { name: /add pepperoni/i });
    userEvent.click(checkbox);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(screen.getByText('Cheese')).toBeInTheDocument();
    expect(screen.getByText('Pepperoni')).toBeInTheDocument();
  });

  test('selected topping disappears when checked a second time', () => {
    render(<App />);
    const checkbox = screen.getByRole('checkbox', { name: /add pepperoni/i });
    // First click: add pepperoni
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(screen.getByText('Pepperoni')).toBeInTheDocument();

    // Second click: remove pepperoni
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(screen.queryByText('Pepperoni')).not.toBeInTheDocument();
  });
});
