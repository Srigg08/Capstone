import { useState } from 'react';



const BookingForm = (props) => {
    const [time, setTime]= useState("");
    const [guests, setGuests]= useState("");
    const [occasion, setOccasion]= useState("");

    const clearForm = () => {
        const currentDate= new Date();
        props.setDate(currentDate.toJSON().slice(0,10));
        setTime("");
        setGuests("");
        setOccasion("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.submitForm({date:props.date,time:time,guests:guests,occasion:occasion});
        clearForm();
    };

    return(
        <>
        <form style={{display: 'grid', maxWidth: '200px', gap: '20px',marginLeft:'20%'}} onSubmit={handleSubmit}>
            <label htmlFor="res-date">Choose a Date</label>
            <input value={props.date}
                    onChange={(e) => {
                        props.setDate(e.target.value);
                    }}
                    type="date"
                    id="res-date"/>
            <label htmlFor="res-time">Choose a Time</label>
            <select value ={time}
                    onChange={(e) => {
                        setTime(e.target.value);
                    }}
                    id="res-time">
                {props.availableTimes?.map((option) => (
                    <option key={option}>{option}</option>
                    ))}
            </select>
            <label htmlFor="guests">Number of guests</label>
            <input value={guests}
                    onChange={(e) => {
                        setGuests(e.target.value);
                    }}
                    type="number"
                    placeholder="1"
                    min="1" max="10"
                    id="guests"/>
            <label htmlFor="occasion">Occasion</label>
            <select value ={occasion}
                    onChange={(e) => {
                        setOccasion(e.target.value);
                    }}
                    id="occasion">
                <option>Birthday</option>
                <option>Anniversary</option>
            </select>
            <input type="submit" value="Make Your reservation"/>
        </form>
        </>
    );
}

function BookingPage(props) {
    /*const setTimesFromDate = (date) => {
        if(date === "2024-08-24")
            props.setAvailableTimes(["10:00","11:00","14:00"]);
        else if(date === "2024-08-27")
            props.setAvailableTimes(["12:00","15:00","17:00"]);
    };*/
    return(
        <>
        <h1>Reserve a Table</h1>
        <div className='content'>
            <BookingForm availableTimes={props.availableTimes}
                        date={props.date}
                        setDate={props.setDate}
                        submitForm={props.submitForm}/>
        </div>
        </>
    );
};

export default BookingPage;