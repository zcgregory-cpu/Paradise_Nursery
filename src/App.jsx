import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { ShoppingCart, Sprout } from "lucide-react";
import { useSelector } from "react-redux";
import AboutUs from "./AboutUs.jsx";
import ProductList from "./ProductList.jsx";
import CartItem from "./CartItem.jsx";
import { selectCartQuantity } from "./CartSlice.jsx";

function Header() {
  const cartQuantity = useSelector(selectCartQuantity);

  return (
    <header className="site-header">
      <Link className="brand-link" to="/" aria-label="Paradise Nursery home">
        <Sprout aria-hidden="true" />
        <span>Paradise Nursery</span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/plants">Plants</NavLink>
        <NavLink className="cart-link" to="/cart" aria-label={`Cart with ${cartQuantity} items`}>
          <ShoppingCart aria-hidden="true" />
          <span>Cart</span>
          <strong>{cartQuantity}</strong>
        </NavLink>
      </nav>
    </header>
  );
}

function LandingPage() {
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate("/plants");
  };

  return (
    <main className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">Fresh houseplants delivered with care</p>
          <h1>Paradise Nursery</h1>
          <AboutUs />
          <button className="primary-button get-started-button" type="button" onClick={handleGetStartedClick}>
            Get Started
          </button>
        </div>
      </section>
    </main>
  );
}

function AppShell({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/plants"
        element={
          <AppShell>
            <ProductList />
          </AppShell>
        }
      />
      <Route
        path="/cart"
        element={
          <AppShell>
            <CartItem />
          </AppShell>
        }
      />
    </Routes>
  );
}

export default App;
