import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRobot } from "react-icons/fa";

import axios from 'axios'; 
import './Home.css';
import HomeNav from '../HomeNav/HomeNav';
import logoImg from '../../assets/f2.png';

import heroImage1 from '../../assets/f6.jpeg';
import heroImage2 from '../../assets/f1.jpg';
import heroImage3 from '../../assets/n4.jpg';

import featureIcon1 from '../../assets/f6.jpeg';
import featureIcon2 from '../../assets/q1.jpg';
import featureIcon3 from '../../assets/q2.jpg';

const heroImages = [heroImage1, heroImage2, heroImage3];


function Home() {
  const history = useNavigate();
  const [admin, setAdmin] = useState({
    gmail: "",
    password: "",
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest();
      if (response.admin) {
        alert("Login Success");
        history("/admin");
      } else {
        alert("Login error: Invalid credentials");
      }
    } catch (err) {
      //alert("Error: " + err.message);
      alert("Login error: Invalid credentials");

    }
  };

const sendRequest = async () => {
  return await axios
    .post("http://localhost:5000/admin/login", {
      gmail: admin.gmail,
      password: admin.password,
    })
    .then((res) => res.data);
};

  return (
    <>
      <HomeNav />
{/*chat */}
<button 
  className="chat-button"
  onClick={() => history("/enterpin")}
>
  <FaRobot size={38} />
</button>


      <div className="home-page">
        <section className="hero-section">
          <div className="hero-slideshow">
            {heroImages.map((img, index) => (
              <div 
                key={index}
                className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${img})` }}
              >
                <div className="slide-overlay">
                  <h1>Premium Fuel Solutions</h1>
                  <p>Efficient. Reliable. Always Available</p>
                  <button onClick={() => setShowLogin(!showLogin)} className="cta-button">
                    {showLogin ? 'Explore More' : 'Admin Login'}
                  </button>
                </div>
              </div>
            ))}
            <div className="slide-dots">
              {heroImages.map((_, index) => (
                <span 
                  key={index}
                  className={index === currentSlide ? 'active' : ''}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>
        

        {/* Features Section */}
        <section className="features-section">
          <div className="feature-card">
            <img src={featureIcon1} alt="Fast Service" />
            <h3>Fast Service</h3>
            <p>Our automated systems ensure you get fuel quickly without delays</p>
          </div>
          <div className="feature-card">
            <img src={featureIcon2} alt="24/7 Availability" />
            <h3>24/7 Availability</h3>
            <p>Round-the-clock service for all your fuel needs</p>
          </div>
          <div className="feature-card">
            <img src={featureIcon3} alt="Easy Payments" />
            <h3>Easy Payments</h3>
            <p>Multiple payment options including digital wallets</p>
          </div>
        </section>

        {/* Login/Register Section */}
        <section className={`auth-section ${showLogin ? 'show-login' : ''}`}>
          <div className="auth-container">
            {showLogin ? (
              <form className="login-form" onSubmit={handleSubmit}>
                <h3>Admin Portal</h3>
                <input
                  type="email"
                  id="gmail"
                  name="gmail"
                  onChange={handleInputChange}
                  value={admin.gmail}
                  placeholder="Admin Email"
                  required
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleInputChange}
                  value={admin.password}
                  placeholder="Password"
                  required
                />
                <div className="form-options">
                  <label>
                    <input type="checkbox" /> Remember me
                  </label>
                  <a href="/">Forgot password?</a>
                </div>
                <button type="submit">SIGN IN</button>
              </form>
            ) : (
              <div className="welcome-content">
                <div className="logo">
                  <img src={logoImg} alt="FuelFlow Logo" />
                  <h2>
                    <span className="fuel">FUEL</span>
                    <span className="flow">FLOW</span>
                  </h2>
                  <p className="subtitle">Dasu Filling Station, Galle</p>
                </div>
                <div className="action-buttons">
                  <button onClick={() => history('/evlog')} className="action-button">
                    Charge Your Electric Vehicle.
                  </button>
                  <button onClick={() => history('/flogin')} className="action-button">
                    Place Your Commercial Purpose Fuel Order.
                  </button>
                  <button onClick={() => history('/stations')} className="action-button">
                    Find Our Other Stations.
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <h2>What Our Customers Say...</h2>
          <div className="testimonials-container">
            <div className="testimonial-card">
              <p>"The fastest fuel service I've ever experienced. Highly recommended!"</p>
              <div className="customer-info">
                <span className="customer-name">- Kamal D.</span>
                <span className="customer-role">Regular Customer</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p>"Their digital payment system saves me so much time during my deliveries."</p>
              <div className="customer-info">
                <span className="customer-name">- Amal M.</span>
                <span className="customer-role">Commercial Client</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="modern-home-footer">
          <div className="home-footer-content">
            <div className="home-footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/services">Services</a></li>
                <li><a href="/fuel-prices">Fuel Prices</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className="home-footer-section">
              <h4>Services</h4>
              <ul>
                <li><a href="/">Fuel Delivery</a></li>
                <li><a href="/">Fleet Services</a></li>
                <li><a href="/">Loyalty Program</a></li>
                <li><a href="/">Corporate Accounts</a></li>
              </ul>
            </div>
            <div className="home-footer-section">
              <h4>Contact Us</h4>
              <p className='p'>Dasu Filling Station</p>
              <p>123 Main Road, Galle</p>
              <p>Phone: +94 76 677 3745</p>
              <p>Email: info@dasufilling.com</p>
            </div>
            <div className="home-footer-section">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="https://www.facebook.com/amod.indupa/"><i className="fab fa-facebook"></i></a>
                <a href="#twitter"><i className="fab fa-twitter"></i></a>
                <a href="https://www.instagram.com/amod_5_2/"><i className="fab fa-instagram"></i></a>
                <a href="https://www.linkedin.com/in/amod-indupa-739a74293/"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
          <div className="home-footer-bottom">
            <p>© 2025 Dasu Filling Station. All Rights Reserved. | Create & Developed by Amod Indupa</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;