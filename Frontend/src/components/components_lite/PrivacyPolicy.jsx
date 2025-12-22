import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8faff] via-[#eef2ff] to-[#e9ecff] px-4 md:px-20 py-16 text-gray-800">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-purple-600">
        Privacy Policy
      </h1>

      <p className="text-center mb-10 text-gray-700">
        Your privacy is important to us. This policy explains how Job Portal collects, uses, and protects your personal information.
      </p>

      {/* Introduction */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p>
          Job Portal is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and secure the personal information you provide when using our platform.
        </p>
      </section>

      {/* Information Collected */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Personal Information:</strong> Name, email address, phone number, resume/CV, and other information you provide when applying for jobs.
          </li>
          <li>
            <strong>Usage Data:</strong> IP address, browser type, pages visited, time spent on pages, and other usage data to improve your experience.
          </li>
        </ul>
      </section>

      {/* Use of Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>To provide and maintain our services effectively.</li>
          <li>To notify you about new jobs and updates relevant to your profile.</li>
          <li>To enable participation in interactive features such as applications and job alerts.</li>
          <li>To provide customer support and assistance.</li>
          <li>To analyze usage patterns and improve the platform.</li>
          <li>To monitor and enhance security.</li>
          <li>To comply with legal obligations and protect our rights.</li>
        </ul>
      </section>

      {/* Data Security */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
        <p>
          We implement robust security measures including encryption and secure storage to protect your personal information from unauthorized access or disclosure.
        </p>
      </section>

      {/* Sharing Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">5. Sharing Your Information</h2>
        <p>
          We do not sell or rent your personal information. We may share data only with:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Service providers assisting in operating the platform.</li>
          <li>Legal authorities if required by law.</li>
        </ul>
      </section>

      {/* User Rights */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">6. Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Access your personal information.</li>
          <li>Request correction of inaccurate information.</li>
          <li>Request deletion of personal information.</li>
        </ul>
      </section>

      {/* Changes */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. Any changes will be communicated by posting the revised policy on this page.
        </p>
      </section>

      {/* Contact */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
        <p>
          For any questions or concerns regarding this Privacy Policy, please contact us at{" "}
          <a href="mailto:support@jobportal.com" className="text-purple-600 underline">
            support@jobportal.com
          </a>.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
