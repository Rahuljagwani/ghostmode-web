"use client";

import { useState } from "react";
import { apiFetch, ApiError } from "@/lib/api";
import { HugeiconsIcon } from "@hugeicons/react";
import { SentIcon, Loading03Icon, CheckmarkCircle02Icon, Mail01Icon, Location01Icon } from "@hugeicons/core-free-icons";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiFetch("/contact", {
        method: "POST",
        body: JSON.stringify({ name, email, subject, message }),
      });
      setSent(true);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-xl">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={48} className="text-emerald-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Message sent!
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Thanks for reaching out. We&apos;ll get back to you within 24
              hours. A confirmation has been sent to your email.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Get in touch
          </h1>
          <p className="text-gray-600 text-base max-w-lg mx-auto">
            Have a question, feedback, or need help? We&apos;d love to hear from
            you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {/* Contact info */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl">
              <div className="flex items-start gap-3 mb-4">
                <HugeiconsIcon icon={Mail01Icon} size={20} className="text-gray-700 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Email</h3>
                  <a
                    href="mailto:support@renekin.com"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    support@renekin.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HugeiconsIcon icon={Location01Icon} size={20} className="text-gray-700 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Location
                  </h3>
                  <p className="text-sm text-gray-500">India</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <p className="text-sm text-gray-600 leading-relaxed">
                We typically respond within 24 hours. For urgent issues, email
                us directly at{" "}
                <a
                  href="mailto:support@renekin.com"
                  className="font-medium underline text-gray-900"
                >
                  support@renekin.com
                </a>
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="md:col-span-2">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1.5 font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-400 transition"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1.5 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-400 transition"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1.5 font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-400 transition"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1.5 font-medium">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-400 transition resize-none"
                    placeholder="Tell us more..."
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
                >
                  {loading ? (
                    <HugeiconsIcon icon={Loading03Icon} size={16} className="animate-spin" />
                  ) : (
                    <HugeiconsIcon icon={SentIcon} size={16} />
                  )}
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
