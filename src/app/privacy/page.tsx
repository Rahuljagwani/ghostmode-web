import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Renekin AI",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-10">Last updated: March 20, 2026</p>

      <div className="prose prose-invert prose-gray max-w-none space-y-8 text-gray-300 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
          <p>
            Renekin AI (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the Renekin AI website (renekin.com)
            and the Ghost desktop application. This Privacy Policy explains how we collect, use,
            and protect your information when you use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
          <h3 className="text-base font-medium text-white mb-2">Account Information</h3>
          <p>When you create an account, we collect your name, email address, and password (hashed). If you sign in with Google, we receive your name and email from Google.</p>

          <h3 className="text-base font-medium text-white mb-2 mt-4">Usage Data</h3>
          <p>We collect aggregated usage statistics such as the number of screenshots taken, voice queries, and text queries to display in your dashboard and manage credit balances.</p>

          <h3 className="text-base font-medium text-white mb-2 mt-4">Payment Information</h3>
          <p>Payments are processed by Stripe and Razorpay. We do not store your credit card details. We only store transaction records (amount, plan, status).</p>

          <h3 className="text-base font-medium text-white mb-2 mt-4">Screenshots and Voice Data</h3>
          <p>
            Screenshots and voice recordings are sent to our server solely to process your AI query.
            They are forwarded to the AI provider (Anthropic Claude) for analysis and are
            <strong className="text-white"> not stored on our servers</strong> after the response is generated.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>To provide and maintain our services</li>
            <li>To manage your account and credit balance</li>
            <li>To process payments</li>
            <li>To process your AI queries (screenshots, voice, text)</li>
            <li>To send important service updates</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong className="text-white">Anthropic (Claude)</strong> — AI processing for queries</li>
            <li><strong className="text-white">Groq</strong> — Speech-to-text transcription</li>
            <li><strong className="text-white">Stripe</strong> — International payment processing</li>
            <li><strong className="text-white">Razorpay</strong> — Indian payment processing</li>
            <li><strong className="text-white">Google OAuth</strong> — Authentication</li>
          </ul>
          <p className="mt-2">Each provider has their own privacy policy governing how they handle data.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Data Retention</h2>
          <p>
            Account data is retained as long as your account is active. Screenshots and voice
            recordings are processed in real-time and not persisted. Payment records are retained
            for accounting and legal purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Data Security</h2>
          <p>
            We use industry-standard security measures including encrypted connections (HTTPS/TLS),
            hashed passwords, and secure token-based authentication. However, no method of transmission
            over the internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your account and associated data</li>
            <li>Export your data</li>
          </ul>
          <p className="mt-2">To exercise any of these rights, contact us at the email below.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">8. Cookies</h2>
          <p>
            We use localStorage to store your authentication token. We do not use tracking cookies
            or third-party analytics cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes
            by posting the new policy on this page and updating the &quot;Last updated&quot; date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">10. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, contact us at:{" "}
            <a href="mailto:support@renekin.com" className="text-purple-400 hover:text-purple-300 transition">
              support@renekin.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
