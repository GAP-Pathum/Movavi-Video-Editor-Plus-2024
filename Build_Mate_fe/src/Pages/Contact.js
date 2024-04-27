// Contact.js

import React, { useState } from "react";
import './Contact.css';
import Axios from 'axios'; // Import Axios library
import Navbar from '../Components/Navbar/Navbar';
import conta1 from '../Components/Assets/conta1.jpg';


export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Axios.post('/api/contact', formData); // Send form data to backend
      alert('Contact form submitted successfully');
      // Clear form fields after submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Error submitting contact form. Please try again later.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <Navbar/>
      <div className="contact-image-container">
        <img src={conta1} alt="Background" />

        <div className="contact-white-container">
          <div className='contact-head'>Let's Connect: <br/>Reach Out and Build Together</div>
          <div className="contact-orange-container">
            <div className="contact-head1">Get In Touch</div>
            <div className="contact-name">Your Name</div>
            <input type="text" className="contact-name-input" placeholder="Enter Your Name" name="name" value={formData.name} onChange={handleChange} />
            <div className="contact-email">Your Email</div>
            <input type="email" className="contact-email-input" placeholder="Enter Your Email" name="email" value={formData.email} onChange={handleChange} />
            <div className="contact-subject">Your Subject</div>
            <input type="text" className="contact-subject-input" placeholder="Enter Your Subject" name="subject" value={formData.subject} onChange={handleChange} />
            <div className="contact-message">Your Message</div>
            <input type="text" className="contact-message-input" placeholder="Enter Your Message" name="message" value={formData.message} onChange={handleChange} />
            <button className="contact-button" onClick={handleSubmit}>Submit</button>
          </div>

          <div className="contact-white-container2">
            <div className="contact-para">Have a question or need assistance?<br/>Reach out to us! We're here to help you bring<br/>your construction dreams to life.</div>
            <div className="contact-phone">Phone Number</div>
            <div className="contact-phone-result">123-456-7890</div>
            <div className="contact-email2">Email Address</div>
            <div className="contact-email2-result">info@buildmateplus.com</div>
            <div className="contact-address">Address</div>
            <div className="contact-address-result">123 Main Street, City, Country</div>
            <div className="contact-web">Web Address</div>
            <div className="contact-web-result">www.buildmateplus.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}
