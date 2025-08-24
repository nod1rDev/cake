import React from 'react';
import './Contact.scss';

const Contact = () => {
    return (
        <main className="container contact">
            <h1>Contact Us</h1>
            <p className="subtitle">We're here to help! Get in touch with our team.</p>

            <div className="grid">
                {/* Left Column */}
                <div className="left-panel">
                    <div className="contact-box">
                        <h2>Get in Touch</h2>
                        <ul className="contact-list">
                            <li>
                                <i className="fas fa-envelope"></i>
                                <div>
                                    <strong>Email</strong><br />
                                    <a href="mailto:support@zarinka.com">support@zarinka.com</a>
                                </div>
                            </li>
                            <li>
                                <i className="fas fa-phone"></i>
                                <div>
                                    <strong>Phone</strong><br />
                                    +1 (555) 123-4567
                                </div>
                            </li>
                            <li>
                                <i className="fas fa-map-marker-alt"></i>
                                <div>
                                    <strong>Address</strong><br />
                                    123 Bakery Street<br />Sweet City, SC 12345
                                </div>
                            </li>
                            <li>
                                <i className="fas fa-clock"></i>
                                <div>
                                    <strong>Business Hours</strong><br />
                                    Mon-Fri: 9:00 AM - 6:00 PM<br />
                                    Sat-Sun: 10:00 AM - 4:00 PM
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="faq-box">
                        <h2>FAQ</h2>
                        <p><strong>How long does it take to get a response?</strong><br />
                            We typically respond within 24 hours during business days.</p>
                        <p><strong>Can I cancel my order?</strong><br />
                            Yes, you can cancel orders that are still pending or confirmed.</p>
                        <p><strong>Do you offer refunds?</strong><br />
                            Refunds are available based on our refund policy. Contact us for details.</p>
                    </div>
                </div>

                {/* Right Column */}
                <div className="right-panel">
                    <form className="contact-form">
                        <h2>Send us a Message</h2>
                        <div className="input-group">
                            <div>
                                <label>Name *</label>
                                <input type="text" placeholder="Your full name" required />
                            </div>
                            <div>
                                <label>Email *</label>
                                <input type="email" placeholder="your.email@example.com" required />
                            </div>
                        </div>

                        <label>Subject *</label>
                        <input type="text" placeholder="Brief description of your inquiry" required />

                        <label>Category *</label>
                        <select required>
                            <option value="">Select a category</option>
                            <option value="general">General Inquiry</option>
                            <option value="support">Customer Support</option>
                            <option value="orders">Orders</option>
                        </select>

                        <label>Message *</label>
                        <textarea
                            placeholder="Please provide details about your inquiry..."
                            maxLength="500"
                            required
                        ></textarea>
                        <div className="char-count">0/500 characters</div>

                        <button type="submit">
                            <span>📨</span> Send Message
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Contact;
