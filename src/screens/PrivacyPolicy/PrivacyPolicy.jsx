import React from 'react';
import styles from './PrivacyPolicy.module.css'; 

const PrivacyPolicy = () => {
  return (
    <div className={styles.privacyContainer}>
      <h1 className={styles.privacyTitle}>Privacy Policy</h1>
      <p className={styles.effectiveDate}>Effective Date: 7 March 2025</p>

      <section>
        <h2>1. Information We Collect</h2>
        <p>
          We may collect the following types of data:
          <ul>
            <li>Optional user account information, such as name and email, only if you register.</li>
          </ul>
          We do <strong>not</strong> collect sensitive personal data.
        </p>
      </section>

      <section>
        <h2>2. How We Use Your Information</h2>
        <p>
          We use collected data to:
          <ul>
            <li>Improve website performance and content</li>
            <li>Understand how visitors interact with CodeBasket</li>
            <li>Respond to user inquiries or support requests</li>
          </ul>
          We do <strong>not</strong> sell, trade, or share your information with third parties.
        </p>
      </section>


      <section>
        <h2>3. Third-Party Services</h2>
        <p>
          We may use third-party services (like analytics or code hosting platforms) which may have their own privacy policies. CodeBasket is not responsible for the data handling of these services.
        </p>
      </section>

      <section>
        <h2>4. Data Security</h2>
        <p>
          We implement reasonable security practices to protect your information. However, no internet transmission is 100% secure.
        </p>
      </section>

      <section>
        <h2>5. Your Rights</h2>
        <p>
          You can:
          <ul>
            <li>Request access to your personal data (if applicable)</li>
            <li>Ask for corrections or deletion of your data</li>
            <li>Opt out of any email communications</li>
          </ul>
        </p>
      </section>

      <section>
        <h2>6. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy as needed. Any changes will be posted here with a new effective date.
        </p>
      </section>

      <section>
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about this policy, feel free to contact us at <strong>souhaibcr123@gmail.com</strong>.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
