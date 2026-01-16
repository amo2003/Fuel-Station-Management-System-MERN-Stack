import "./PrivacyPolicy.css";
import bgImage from "../../assets/f1.jpg"; 
import logo from "../../assets/f2.png"; 

function PrivacyPolicy() {
  return (
    <div
      className="privacy-policy-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="privacy-policy-overlay">
        <div className="privacy-policy-content">
          <img src={logo} alt="Fuel Station Logo" className="privacy-logo" />
          <h1>Privacy Policy</h1>
          <p>
            Welcome to <strong>Dasu Fuel Station</strong>. Your privacy is very
            important to us, and we are committed to protecting your personal
            information.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including
            when you register, book services, or make payments. This includes
            your name, contact details, vehicle information, and payment
            details.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            Your data is used for service delivery, improving our platform,
            payment processing, and sending service updates or promotional
            offers.
          </p>

          <h2>3. Data Protection</h2>
          <p>
            We implement strict security measures to protect your information
            from unauthorized access, disclosure, or misuse.
          </p>

          <h2>4. Sharing of Information</h2>
          <p>
            We do not sell your personal data. We may share it with trusted
            partners who assist us in operating our services, under strict
            confidentiality agreements.
          </p>

          <h2>5. Cookies</h2>
          <p>
            Our website uses cookies to improve user experience, analyze traffic
            patterns, and personalize content.
          </p>

          <h2>6. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal data.
            Please contact us to exercise these rights.
          </p>

          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Please check
            this page periodically for changes.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions, please email us at{" "}
            <a href="mailto:privacy@dasufuel.com">privacy@dasufuel.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
