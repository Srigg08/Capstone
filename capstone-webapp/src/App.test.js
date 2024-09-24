//import fetchMock from "jest-fetch-mock";
import { render, screen, fireEvent } from '@testing-library/react';
//import { userEvent } from '@testing-library/user-event';
import BookingPage from './BookingPage';
import './BookingPage.css';
import Main from './Main';
import { BrowserRouter } from 'react-router-dom';
import { fetchAPI, submitAPI } from './mockAPI';


test('Renders the BookingForm heading', () => {
  render(<BookingPage availableTimes={[""]}/>);
  const headingElement = screen.getByText("Number of guests");
  expect(headingElement).toBeInTheDocument();
})

test('Update availableTimes using updateTimes', async () => {
  render(<BrowserRouter><Main/></BrowserRouter>);
  const resBtn = screen.getByText("Reservations");
  fireEvent.click(resBtn);
  const dateBtn = screen.getByLabelText("Choose a Date");
  fireEvent.change(dateBtn, {target: {value: '2024-09-24'}});
  expect(dateBtn.value).toEqual("2024-09-24");
  const data = await fetchAPI('2024-09-24');
  console.log(data);
  expect(data).toEqual(["14:00","15:00","16:00"]);
})

test('Form Validation', async () => {
  render(<BrowserRouter><Main/></BrowserRouter>);
  const resBtn = screen.getByText("Reservations");
  fireEvent.click(resBtn);
  const timeBtn = screen.getByLabelText("Choose a Time");
  const guestBox = screen.getByLabelText("Number of guests");
  const submit = screen.getByDisplayValue("Make Your Reservation");
  const dateBtn = screen.getByLabelText("Choose a Date");
  expect(submit).toBeEnabled();
  fireEvent.change(guestBox, {target: {value: '0'}});
  expect(submit).toBeDisabled();
  fireEvent.change(guestBox, {target: {value: '10'}});
  expect(submit).toBeEnabled();
  fireEvent.change(guestBox, {target: {value: '11'}});
  expect(submit).toBeDisabled();
  fireEvent.change(guestBox, {target: {value: '5'}});
  const success = await submitAPI({date:dateBtn.value,time:'12:00',guests:guestBox.value,occasion:'None'});
  expect(success).toEqual(true);
})