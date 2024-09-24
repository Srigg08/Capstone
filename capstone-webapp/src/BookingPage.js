import { useState, useEffect } from 'react'
import './BookingPage.css'



const BookingForm = (props) => {
    const [time, setTime]= useState("");
    const [guests, setGuests]= useState("1");
    const [occasion, setOccasion]= useState("None");
    const [dateErr, setDateErr] = useState("");
    const [guestErr, setGuestErr] = useState("");
    const isDateInvalid = props.availableTimes[0]==="Unavailable";

    useEffect(()=>{
        setTime(props.availableTimes[0]);
    },[props.availableTimes]);

    const clearForm = () => {
        const currentDate= new Date();
        props.setDate(currentDate.toJSON().slice(0,10));
        setTime(props.availableTimes[0]);
        setGuests("1");
        setOccasion("None");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(props.date+" "+time+" "+guests+" "+occasion);
        props.submitForm({date:props.date,time:time,guests:guests,occasion:occasion});
        clearForm();
    };

    return(
        <>
        <form style={{display: 'grid', gridTemplateColumns:'1fr 1fr', maxWidth: '400px', gap: '20px'}} onSubmit={handleSubmit}>
            <label style={{gridColumn:'1'}} htmlFor="dateInput">Choose a Date</label>
            <input style={{gridColumn:'1'}} required value={props.date}
                    onChange={(e) => {
                        props.setDate(e.target.value);
                    }}
                    onBlur={(e)=>{
                        e.target.checkValidity() ? setDateErr(""):setDateErr("Please select a valid date");
                    }}
                    type="date"
                    id="dateInput"/>
            <p id="dateEntryError" style={{gridColumn:'2',margin:'0px',color:'red'}}>{dateErr}</p>
            <label style={{gridColumn:'1'}} htmlFor="timeInput">Choose a Time</label>
            <select style={{gridColumn:'1'}} value = {time}
                    {...isDateInvalid ? {className:"invalid"}:{}}
                    onChange={(e) => {
                        setTime(e.target.value);
                    }}
                    id="timeInput">
                {props.availableTimes?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                    ))}
            </select>
            <label htmlFor="guestInput" style={{gridColumn:'1'}} >Number of guests</label>
            <input id="guestInput" style={{gridColumn:'1'}} value={guests}
                    onChange={(e) => {
                        setGuests(e.target.value);
                    }}
                    onBlur={(e)=>{
                        e.target.checkValidity() ? setGuestErr(""):setGuestErr("Guests must be between 1-10");
                    }}
                    type="number"
                    placeholder="1"
                    min="1" max="10"/>
            <p id="guestEntryError" style={{gridColumn:'2',margin:'0px',color:'red'}}>{guestErr}</p>
            <label style={{gridColumn:'1'}} htmlFor="occasionInput">Occasion</label>
            <select style={{gridColumn:'1'}} value ={occasion}
                    onChange={(e) => {
                        setOccasion(e.target.value);
                    }}
                    id="occasionInput">
                <option>None</option>
                <option>Birthday</option>
                <option>Anniversary</option>
            </select>
            <input id="submitButton" aria-label="Submit Button" style={{gridColumn:'1'}} disabled={(guests < 1) || (guests > 10) || isDateInvalid} type="submit" value="Make Your Reservation"/>
        </form>
        </>
    );
}

function BookingPage(props) {
    return(
        <>
        <h1>Reserve a Table</h1>
        <section className='content'>
            <BookingForm availableTimes={props.availableTimes}
                        date={props.date}
                        setDate={props.setDate}
                        submitForm={props.submitForm}/>
        </section>
        </>
    );
};

export default BookingPage;