import "./Main.css";
import Nav from "./Nav.js";
import BookingPage from "./BookingPage.js"
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchAPI, submitAPI } from "./mockAPI.js";

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
        <section style={{display:'grid',
            gridTemplateAreas:'"description image" "button image"',
            gridTemplateRows:'2fr 1fr',
            margin: '0% 20%',
            paddingBottom: '10px'}}>
            <img src={require('./images/restauranfood.jpg')} alt="restaurant food" style={{gridArea:'image',maxHeight:'300px'}}/>
            <section style={{gridArea:'description',paddingRight:'35%'}}>
                <h2>Chicago</h2>
                <p>Little Lemon was founded some time ago by two borthers that wanted to provide good Italian and Mediterranean foodstuffs to people that like eating foodstuffs.</p>
            </section>
            <h2 style={{gridArea: 'button'}}>Reserve a Table</h2>
        </section>
        </>
    );
};

const Special = (props) => {
    return(
        <figure style={{display:'grid',
                    gridTemplateAreas:'"image image" "name price" "description description" "order order"',
                    gridTemplateRows:'1.5fr .5fr 1.5fr .5fr',
                    border: 'solid',
                    textAlign:'center',
                    margin: '5% 10%'}}>
            <img src={props.image} alt="Dish" style={{gridArea:'image', maxWidth:'100%', maxHeight: '150px', justifySelf: 'center'}} />
            <h2 className='specialMenu' style={{gridArea:'name'}}>{props.name}</h2>
            <h2 className='specialMenu' style={{gridArea:'price', color: '#EE9972'}}>{props.price}</h2>
            <p style={{gridArea:'description', margin:'0% 5%'}}>{props.description}</p>
            <h3 style={{gridArea:'order'}}>Order for Delivery!</h3>
        </figure>
    );
}

const Specials = () => {
    return (
        <>
            <h1>Specials</h1>
            <section className='cards'>
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
            </section>
        </>
    );
};

const Testimony = (props) => {
    return(
        <figure className='testimony' style={{
                    border: 'solid',
                    margin: '5% 10%'}}>
            <img className='profile' src={props.image} alt='profile' style={{display:'block', marginLeft:'auto',marginRight:'auto', maxHeight:'150px'}} />
            <section className='rating' style={{textAlign:'center'}}>
                <h2>{props.name}</h2>
                <h3>{props.rating}</h3>
            </section>
            <p className='review' style={{margin: '5%'}}>{props.review}</p>
        </figure>
    );
};

const Testimonials = () => {
    return (
        <>
        <h1>Testimonials</h1>
        <section className='cards4'>
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
        </section>
        </>
    );
};

const About = () => {
    return (
        <>
            <h1>Little Lemon</h1>
            <section style={{display:'grid',
            gridTemplateAreas:'"description image"',
            gridTemplateColumns:'1fr 1fr',
            margin: '0% 10% 0% 20%'
            ,minHeight:'400px'
            }}>
                <figure style={{gridArea:'image',width:'100%'}}>
                    <img src={require('./images/Mario and Adrian A.jpg')} alt="founders A" style={{position:'absolute',maxHeight:'200px',paddingLeft:'7%',maxWidth:'300px',width:'30%',height:'auto'}}/>
                    <img src={require('./images/Mario and Adrian b.jpg')} alt="founders B" style={{position:'absolute',maxHeight:'200px',paddingLeft:'0%',maxWidth:'300px',width:'30%',paddingTop:'100px'}}/>
                </figure>
                <section style={{gridArea:'description'}}>
                    <h2>Chicago</h2>
                    <p>Little Lemon was founded some time ago by two borthers that wanted to provide good Italian and Mediterranean foodstuffs to people that like eating foodstuffs.</p>
                </section>
            </section>
        </>
    );
};

const HomePage =() =>{
    return(
        <>
        <Hero/>
        <section className='alternate'>
            <Specials/>
        </section>
        <Testimonials/>
        <section className='alternate'>
            <About />
        </section>
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
        <p className='content'>Your current cart might be shown here, added from the menu section. Include the menu as well to add further items.</p>
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
        //console.log("form submitted:",success);
        if(success) navigate("/bookingconf");
    };

    useEffect(() => {
        let ignore = false;
        fetchAPI(date)
            .then(data => {
                if(!ignore) {
                    setAvailableTimes(data);
                }
            })
            .catch(error => {console.error('Error:', error);
                            setAvailableTimes(["Unavailable"]);});
        return () => {
            ignore = true;
        }
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