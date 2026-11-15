import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header matching Screen 23 */}
      <div className="text-center space-y-2 py-4">
        <span className="text-[10px] font-bold text-[#006765] bg-[#CFE7E6]/40 px-3 py-1 rounded-full border border-[#006765]/20">
          CONTACT SUPPORT
        </span>
        <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
          Contact Us
        </h1>
        <p className="text-xs text-[#555E74] max-w-md mx-auto">
          Have a question? We're here to help you navigate, curate, and explore.
        </p>
      </div>

      {/* Split Grid matching Screen 23 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column (5 Cols): Get in Touch Info */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-[#151C27]">Get in Touch</h3>
              <p className="text-xs text-[#555E74] mt-1 leading-relaxed">
                Our specialized spatial data and venue curation team is ready to answer questions, resolve technical tickets, or assist with integration setup.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3.5 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <div className="w-8 h-8 rounded-lg bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-[#555E74] block">Email Support</span>
                  <a href="mailto:support@placezy.com" className="font-bold text-[#151C27] hover:text-[#006765]">
                    support@placezy.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <div className="w-8 h-8 rounded-lg bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-[#555E74] block">Direct Phone</span>
                  <span className="font-bold text-[#151C27]">+91 98564 77788</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <div className="w-8 h-8 rounded-lg bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-[#555E74] block">Headquarters</span>
                  <span className="font-bold text-[#151C27]">Rajkot, Gujarat, India</span>
                </div>
              </div>

              <div className="p-3 bg-[#CFE7E6]/30 border border-[#006765]/20 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#006765]">
                  <Clock size={14} />
                  <span>Support Hours</span>
                </div>
                <p className="text-[11px] text-[#555E74]">
                  Mon – Sat, 9am – 7pm • Response time: Typically within 2-4 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Send Message Form */}
        <div className="md:col-span-7">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#151C27] mb-1">Send Us a Message</h3>
            <p className="text-xs text-[#555E74] mb-6">Fill in the fields below and we'll get back to you shortly.</p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
                <CheckCircle2 size={40} className="text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-950">Message Dispatched!</h4>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  Thank you, <strong>{fullName}</strong>. Our Rajkot support desk has received your ticket and will respond to <strong>{email}</strong> within 2-4 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs text-[#006765] font-semibold underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Input
                  label="Subject"
                  placeholder="How can we help?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#151C27]">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-[#E2E8F0] text-xs text-[#151C27] focus:outline-none focus:border-[#006765] leading-relaxed resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  icon={<Send size={15} />}
                  iconPosition="right"
                >
                  Send Message
                </Button>

                <p className="text-center text-[10px] text-[#8E98B0]">
                  ✓ We'll get back to you as soon as possible.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
