import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import CreateToken from './pages/create_token/create_token';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path='/create-token' element ={<CreateToken />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;