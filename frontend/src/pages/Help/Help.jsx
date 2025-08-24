import React from 'react';
import './Help.scss';

const Help = () => {
    return (
        <div className="container help">
            <h1>How can we help you?</h1>
            <p>Find answers to common questions or get in touch with our support team</p>

            <div className="search-box">
                <input type="text" placeholder="Search for help articles, FAQs, or topics..." />
            </div>

            <div className="grid">
                <div className="card"><span>📦</span>Track Your Order</div>
                <div className="card"><span>💬</span>Contact Support</div>
                <div className="card"><span>📊</span>Baker Resources</div>
                <div className="card"><span>📄</span>Terms of Service</div>
                <div className="card"><span>🔒</span>Privacy Policy</div>
                <div className="card"><span>💰</span>Refund Policy</div>
            </div>

            <div className="contact-methods">
                <div className="contact-card">
                    <span>💬</span>
                    <strong>Live Chat</strong>
                    <p>Chat with our support team in real-time</p>
                    <button>Start Chat</button>
                </div>
                <div className="contact-card">
                    <span>📞</span>
                    <strong>Phone Support</strong>
                    <p>Call us Mon–Fri, 9AM–6PM EST</p>
                    <input type="text" readOnly value="(555) 123-CAKE" />
                </div>
                <div className="contact-card">
                    <span>✉️</span>
                    <strong>Email Support</strong>
                    <p>Get help via email within 24 hours</p>
                    <button>Send Email</button>
                </div>
            </div>

            <div className="faq-section">
                <h2>Frequently Asked Questions</h2>

                <div className="faq-item">
                    <div className="faq-left">
                        <span>💳</span> <strong>Ordering & Payment</strong>
                        <span className="faq-badge">4</span>
                    </div>
                    <span>›</span>
                </div>

                <div className="faq-item">
                    <div className="faq-left">
                        <span>🚚</span> <strong>Delivery & Pickup</strong>
                        <span className="faq-badge">4</span>
                    </div>
                    <span>›</span>
                </div>

                <div className="faq-item">
                    <div className="faq-left">
                        <span>🧁</span> <strong>Working with Bakers</strong>
                        <span className="faq-badge">4</span>
                    </div>
                    <span>›</span>
                </div>

                <div className="faq-item">
                    <div className="faq-left">
                        <span>👤</span> <strong>Account & Profile</strong>
                        <span className="faq-badge">4</span>
                    </div>
                    <span>›</span>
                </div>
            </div>

            <div className="help-box">
                <div style={{ fontSize: "40px" }}>📱</div>
                <h3>Still need help?</h3>
                <p>Can’t find what you're looking for? Our support team is here to help you with any questions or issues.</p>
                <button className="btn-light">Contact Support</button>
                <button className="btn-light">Baker Resources</button>
            </div>
        </div>
    );
};

export default Help;
