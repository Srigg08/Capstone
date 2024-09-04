import "./Main.css";
import Nav from "./Nav.js";
import BookingPage from "./BookingPage.js"
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import {fetchAPI, submitAPI} from "./mockAPI.js";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({top:0, behavior: 'smooth'});
  }, [pathname]);

  return null;
}

const Hero = () => {
    return (
        <>
        <h1>Little Lemon</h1>
        <div style={{display:'grid',
            gridTemplateAreas:'"description image" "button image"',
            gridTemplateRows:'2fr 1fr',
            margin: '0% 20%',
            paddingBottom: '10px'}}>
            <img src={require('./images/restauranfood.jpg')} alt="restaurant food" style={{gridArea:'image',maxHeight:'300px'}}/>
            <div style={{gridArea:'description',paddingRight:'35%'}}>
                <h2>Chicago</h2>
                <p>Little Lemon was founded some time ago by two borthers that wanted to provide good Italian and Mediterranean foodstuffs to people that like eating foodstuffs.</p>
            </div>
            <h2 style={{gridArea: 'button'}}>Reserve a Table</h2>
        </div>
        </>
    );
};

const Special = (props) => {
    return(
        <div style={{display:'grid',
                    gridTemplateAreas:'"image image" "name price" "description description" "order order"',
                    gridTemplateRows:'1.5fr .5fr 1.5fr .5fr',
                    border: 'solid',
                    textAlign:'center',
                    margin: '5% 10%'}}>
            <img src={props.image} alt="Dish" style={{gridArea:'image', width:'auto', maxHeight: '150px', justifySelf: 'center'}} />
            <h2 style={{gridArea:'name'}}>{props.name}</h2>
            <h2 style={{gridArea:'price', color: '#EE9972'}}>{props.price}</h2>
            <p style={{gridArea:'description', margin:'0% 5%'}}>{props.description}</p>
            <h3 style={{gridArea:'order'}}>Order for Delivery!</h3>
        </div>
    );
}

const Specials = () => {
    return (
        <>
            <h1>Specials</h1>
            <div className='cards'>
            <Special name="Greek Salad"
                    image={require('./images/greekSalad.jpg')}
                    price="$12.99"
                    description="A delicious meal the likes of which you have never tasted!!"/>
            <Special name="Bruschetta"
                    image={require('./images/bruschetta.png')}
                    price="$13.99"
                    description="A delicious meal the likes of which you have never tasted!!"/>
            <Special name="Lemon Cake"
                    image={require('./images/lemon dessert.jpg')}
                    price="$14.99"
                    description="A delicious meal the likes of which you have never tasted!!"/>
            </div>
        </>
    );
};

const Testimony = (props) => {
    return(
        <div style={{display:'grid',
                    gridTemplateAreas:'"profile name" "review review"',
                    gridTemplateColumns:'1fr 1fr',
                    border: 'solid',
                    margin: '5% 10%'}}>
            <img src={props.image} alt='profile' style={{gridArea:'profile',maxHeight:'150px'}} />
            <div style={{gridArea:'name',textAlign:'center'}}>
                <h2>{props.name}</h2>
                <h3>{props.rating}</h3>
            </div>
            <p style={{gridArea:'review', margin: '5%'}}>{props.review}</p>
        </div>
    );
};

const Testimonials = () => {
    return (
        <>
        <h1>Testimonials</h1>
        <div className='cards4'>
            <Testimony name="Stefan"
                        image={require('./images/customer1.jpeg')}
                        rating="8/10"
                        review="I liked the food and the atmosphere. Overall it was a good dining experience."/>
            <Testimony name="Chris"
                        image={require('./images/customer2.jpeg')}
                        rating="9/10"
                        review="I liked the food and the atmosphere. Overall it was a good dining experience."/>
            <Testimony name="Alice"
                        image={require('./images/customer3.jpeg')}
                        rating="7/10"
                        review="I liked the food and the atmosphere. Overall it was a good dining experience."/>
            <Testimony name="Jen"
                        image={require('./images/customer4.jpeg')}
                        rating="7/10"
                        review="I liked the food and the atmosphere. Overall it was a good dining experience."/>
        </div>
        </>
    );
};

const About = () => {
    return (
        <>
            <h1>Little Lemon</h1>
            <div style={{display:'grid',
            gridTemplateAreas:'"description image"',
            gridTemplateColumns:'1fr 1fr',
            margin: '0% 20%',
            minHeight:'400px'}}>
                <div style={{gridArea:'image'}}>
                    <img src={require('./images/Mario and Adrian A.jpg')} alt="founders A" style={{position:'absolute',maxHeight:'200px',paddingLeft:'250px'}}/>
                    <img src={require('./images/Mario and Adrian b.jpg')} alt="founders B" style={{position:'absolute',maxHeight:'200px',paddingLeft:'100px',paddingTop:'100px'}}/>
                </div>
                <div style={{gridArea:'description'}}>
                    <h2>Chicago</h2>
                    <p>Little Lemon was founded some time ago by two borthers that wanted to provide good Italian and Mediterranean foodstuffs to people that like eating foodstuffs.</p>
                </div>
            </div>
        </>
    );
};

const HomePage =() =>{
    return(
        <>
        <Hero/>
        <div className='alternate'>
            <Specials/>
        </div>
        <Testimonials/>
        <div className='alternate'>
            <About />
        </div>
        </>
    );
};


const Menu = () => {
    return(
        <>
        <h1>Menu</h1>
        <p className='content'>Various menu items and prices would go here.</p>
        </>
    );
};
const Order = () => {
    return(
        <>
        <h1>Order Online</h1>
        <p className='content'>Your current cart might be shown here, added from the menu section. Or, just add the menu component here as well?</p>
        </>
    );
};
const Login = () => {
    return(
        <>
        <h1>Login</h1>
        <p className='content'>Enter user email and password to login to your Little Lemon rewards account!</p>
        </>
    );
};

const ConfinrmedBooking = () => {
    return(
        <>
        <h1>Your booking has been confirmed!</h1>
        <p className='content'>Include booking details here</p>
        </>
    )
}


function Main() {
    const currentDate= new Date();
    const [availableTimes, setAvailableTimes] = useState([""]);
    const [date, setDate] = useState(currentDate.toJSON().slice(0,10));
    const navigate = useNavigate();

    const submitForm = async (formData) => {
        const success = await submitAPI(formData);
        console.log("form submitted:",success);
        if(success) navigate("/bookingconf");
    };

    useEffect(() => {
        fetchAPI(date)
            .then(data => setAvailableTimes(data))
            .catch(error => {console.error('Error:', error);setAvailableTimes(["Invalid Date"]);});//Need to edit this for better error resolution, likely
    },[date]);

    return (
        <>
            <ScrollToTop/>
        <Nav />
        <main>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/booking" element={<BookingPage availableTimes={availableTimes}
                                                            date={date}
                                                            setDate={setDate}
                                                            submitForm={submitForm}/>}/>
                <Route path="/bookingconf" element={<ConfinrmedBooking/>}/>
                <Route path="/order" element={<Order/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </main>
        </>
    );
  };
  export default Main;