import './App.css';
import Main from './Main';
import Footer from './Footer';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Main/>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
