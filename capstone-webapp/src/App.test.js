import { render, screen, fireEvent } from '@testing-library/react';
import BookingPage from './BookingPage';
import Main from './Main';

test('Renders the BookingForm heading', () => {
  render(<BookingPage availableTimes={[""]}/>);
  const headingElement = screen.getByText("Number of guests");
  expect(headingElement).toBeInTheDocument();
})

test('Initialize availableTimes correctly', () => {
  render(<Main/>);
  const btn1 = screen.getByText("Reservations");
  fireEvent.click(btn1);
  const btn2 = screen.getByLabelText("Choose a Time");
  fireEvent.click(btn2);
  expect(screen.getByText(":00")).toBeInTheDocument();
})

test('Update availableTimes using updateTimes', () => {
  render(<Main/>);
  const resBtn = screen.getByText("Reservations");
  fireEvent.click(resBtn);
  const dateBtn = screen.getByLabelText("Choose a Date");
  fireEvent.change(dateBtn, {target: {value: '2024-08-24'}});
  const btn2 = screen.getByLabelText("Choose a Time");
  fireEvent.click(btn2);
  expect(screen.getByText("10:00")).toBeInTheDocument();
  expect(screen.getByText("11:00")).toBeInTheDocument();
  expect(screen.getByText("12:00")).toBeInTheDocument();
})