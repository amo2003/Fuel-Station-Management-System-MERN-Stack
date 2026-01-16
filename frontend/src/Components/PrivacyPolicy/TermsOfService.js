import "./TermsOfService.css";
import bgImage from "../../assets/f1.jpg"; 
import logo from "../../assets/f2.png"; 
function TermsOfService() {
  return (
    <div
      className="tos-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="tos-overlay">
        <div className="tos-content">
          <img src={logo} alt="Fuel Station Logo" className="tos-logo" />
          <h1>Terms of Service</h1>

          <p>
            Welcome to <strong>Dasu Fuel Station</strong>. By accessing or using
            our services, you agree to comply with these Terms of Service.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By using our website or services, you agree to be bound by these
            Terms. If you do not agree, please do not use our services.
          </p>

          <h2>2. Services Provided</h2>
          <p>
            We provide fuel supply management, EV charging appointments, and
            payment processing services. Services may be updated or discontinued
            at our discretion.
          </p>

          <h2>3. User Responsibilities</h2>
          <p>
            You agree to provide accurate information, comply with all
            applicable laws, and not misuse our platform. Misuse may result in
            account suspension or legal action.
          </p>

          <h2>4. Payment Terms</h2>
          <p>
            All payments must be completed using authorized methods. Unpaid
            bookings may be canceled, and we reserve the right to suspend
            services until payment is received.
          </p>

          <h2>5. Privacy</h2>
          <p>
            Your personal information is protected under our Privacy Policy. By
            using our services, you consent to the collection and use of your
            data as described therein.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            We are not liable for any direct or indirect damages resulting from
            your use of our services, including loss of data, missed
            appointments, or service disruptions.
          </p>

          <h2>7. Termination</h2>
          <p>
            We may terminate or suspend access to our services at any time for
            violation of these Terms or for any reason at our discretion.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms are governed by the laws of Sri Lanka. Any disputes
            shall be resolved in the appropriate courts within the jurisdiction
            of Sri Lanka.
          </p>

          <h2>9. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of our
            services constitutes acceptance of the updated Terms.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            For any questions regarding these Terms, please email us at{" "}
            <a href="mailto:tos@dasufuel.com">tos@dasufuel.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;
