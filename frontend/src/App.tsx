import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home/home';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import CreateToken from './pages/create_token/create_token';
import LiquidityPool from './pages/liquidity-pool/liquidity_pool';
import ManageLiquidity from './pages/manage-liquidity/manage_liquidity';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#0B0D10] text-white">
        <Header />
        <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path='/create-token' element ={<CreateToken />} />
          <Route path="/liquidity-pool" element={<LiquidityPool />} />
          <Route path="/manage-liquidity" element={<ManageLiquidity />} />
        </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;