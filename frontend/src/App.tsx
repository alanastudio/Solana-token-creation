import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import CreateToken from './pages/create_token/create_token';
import LiquidityPool from './pages/liquidity-pool/liquidity_pool';
import Home from './pages/home/home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0B0D10] text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path='/create-token' element ={<CreateToken />} />
          <Route path="/liquidity-pool" element={<LiquidityPool />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;