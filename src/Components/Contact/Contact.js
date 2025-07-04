// src/pages/Contact.js
import React, { useRef, useState, useEffect } from 'react';
import './Contact.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/f2.png';
import emailjs from '@emailjs/browser';


function Contact() {
   const form = useRef();
   const [currentTime, setCurrentTime] = useState('');
   const [sending, setSending] = useState(false);
 
   useEffect(() => {
     const updateTime = () => {
       const now = new Date();
       const formattedTime = now.toLocaleString(undefined, {
         year: 'numeric',
         month: 'short',
         day: 'numeric',
         hour: '2-digit',
         minute: '2-digit',
         second: '2-digit',
       });
       setCurrentTime(formattedTime);
     };
 
     updateTime();
     const timer = setInterval(updateTime, 1000);
     return () => clearInterval(timer);
   }, []);
 
   const sendEmail = (e) => {
     e.preventDefault();
     if (sending) return; // Prevent duplicate submits
     setSending(true);
 
     emailjs
       .sendForm(
         'service_0fe7u5s',
         'template_a11y5na',
         form.current,
         { publicKey: '98tA3GrZ8CKCHsRoe' }
       )
       .then(() => {
         alert("✅ SUCCESS! Your message has been sent.");
         form.current.reset();
         setSending(false);
       })
       .catch(() => {
         alert("⚠️ Oops! Something went wrong. Please try again.");
         setSending(false);
       });
   };
 
  return (
    <div className="fuel-contact-page">
      {/* Navigation Bar */}
      <nav className="fuel-contact-nav">
        <Link to="/" className="fuel-contact-logo">
          <img src={logo} alt="FuelFlow Logo" className="nav-logo" />
          Dasu Filling Station
        </Link>
        <div className="fuel-contact-links">
          <Link to="/">Home</Link>
          
        </div>
      </nav>

      {/* Header with logo */}
      <div className="fuel-contact-header">
        <div className="header-content">
          <img src={logo} alt="FuelFlow Logo" className="fuel-contact-header-logo" />
          <h1>Contact Dasu Filling Station</h1>
          <p>We're here to help you 24/7. Reach out anytime!</p>
          <div className="contact-badges">
            <div className="badge">
              <i className="fas fa-clock"></i> 24/7 Service
            </div>
            <div className="badge">
              <i className="fas fa-gas-pump"></i> All Fuel Types
            </div>
            <div className="badge">
              <i className="fas fa-car"></i> Free Vehicle Check
            </div>
          </div>
        </div>
      </div>

      {/* Info + Form Section */}
      <div className="fuel-contact-section">
        <div className="fuel-contact-info">
          <h2><i className="fas fa-map-marker-alt"></i> Visit Us</h2>
          <div className="info-card">
            <i className="fas fa-map-pin"></i>
            <div>
              <strong>Address:</strong>
              <p>123 Galle Road, Near Kottawa Junction, Galle, Sri Lanka</p>
            </div>
          </div>
          <div className="info-card">
            <i className="fas fa-phone"></i>
            <div>
              <strong>Phone:</strong>
              <p>+94 77 123 4567 (24/7 Support)</p>
            </div>
          </div>
          <div className="info-card">
            <i className="fas fa-envelope"></i>
            <div>
              <strong>Email:</strong>
              <p>support@dasufuel.lk</p>
            </div>
          </div>
          <div className="info-card">
            <i className="fas fa-clock"></i>
            <div>
              <strong>Business Hours:</strong>
              <p>Fuel Station: Open 24/7</p>
              <p>Service Center: 7AM - 10PM Daily</p>
            </div>
          </div>
          
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>

        <div className="fuel-contact-form">
          <h2><i className="fas fa-paper-plane"></i> Send a Message</h2>

          <form ref={form} onSubmit={sendEmail} className="contact-form" noValidate>
            <label htmlFor="customer_name">Customer Name:</label>
            <input id="customer_name" type="text" name="customer_name" placeholder="Your full name" required disabled={sending} />

            <label htmlFor="customer_email">Customer Email:</label>
            <input id="customer_email" type="email" name="customer_email" placeholder="you@example.com" required disabled={sending} />

            <label htmlFor="customer_contact">Customer Contact:</label>
            <input id="customer_contact" type="text" name="customer_contact" placeholder="+94XXXXXXXXX" required disabled={sending} />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" placeholder="Write your message here..." required disabled={sending} />

            <label htmlFor="submission_time_display">Submission Time:</label>
            <input
              id="submission_time_display"
              type="text"
              name="submission_time_display"
              value={currentTime}
              readOnly
              disabled
            />
            <input type="hidden" name="submission_time" value={currentTime} />

            <input
              type="submit"
              value={sending ? "Sending..." : "Send Message"}
              disabled={sending}
              aria-busy={sending}
            />
          </form>
        </div>
      </div>

      {/* Map */}
      <div className="fuel-contact-map">
        <iframe
          title="Dasu Station Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d80.21798731539396!3d6.597092622279792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae17bd9a7c3a7a5%3A0x7d4b4e1b3e0e0b1e!2sGalle!5e0!3m2!1sen!2slk!4v1620000000000!5m2!1sen!2slk"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Emergency Contact */}
      <div className="emergency-contact">
        <div className="emergency-content">
          <i className="fas fa-exclamation-triangle"></i>
          <div>
            <h3>Emergency Contact</h3>
            <p>For fuel leaks or safety concerns after hours</p>
            <p><strong>+94 77 765 4321</strong></p>
          </div>
        </div>
      </div>

      <footer className="fuel-contact-footer">
        <div className="footer-content">
          <img src={logo} alt="FuelFlow Logo" className="footer-logo" />
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/careers">Careers</Link>
          </div>
          <p>&copy; 2025 Dasu Filling Station, Galle. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Contact;