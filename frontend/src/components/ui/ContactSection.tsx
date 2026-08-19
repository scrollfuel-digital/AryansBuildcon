import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, ShieldCheck, Mail, Send, Compass, Phone, AlertCircle, ArrowRight } from 'lucide-react';
import { submitInquiry } from '../../api';

interface FormErrors {
  fullName?: string;
  phone?: string;
  emailAddress?: string;
  location?: string;
  narrative?: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    phone: '',
    scope: 'Residential Plot',
    investment: '10 Lakhs – 25 Lakhs',
    location: '',
    narrative: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (data = formData): FormErrors => {
    const errs: FormErrors = {};

    if (!data.fullName.trim() || data.fullName.trim().length < 3) {
      errs.fullName = 'Full name is required (at least 3 characters).';
    }

    const phoneClean = data.phone.replace(/[^0-9]/g, '');
    if (!data.phone.trim() || phoneClean.length < 10) {
      errs.phone = 'Please enter a valid 10-digit contact mobile number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.emailAddress.trim()) {
      errs.emailAddress = 'Email address is required to send project layout details.';
    } else if (!emailRegex.test(data.emailAddress.trim())) {
      errs.emailAddress = 'Please enter a valid email address (e.g. name@gmail.com).';
    }

    if (!data.location.trim() || data.location.trim().length < 2) {
      errs.location = 'Please enter preferred plot area (e.g. Wardha Road, MIHAN).';
    }

    if (!data.narrative.trim() || data.narrative.trim().length < 10) {
      errs.narrative = 'Please enter project details or questions (at least 10 characters).';
    }

    return errs;
  };

  const handleChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    if (touched[field]) {
      const errs = validate(updated);
      setErrors(errs);
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate();
    setErrors(errs);
  };

  const WHATSAPP_NUMBER = '918767010825';

  const openWhatsApp = (data: typeof formData) => {
    const msg = `🏡 *New Site Visit Inquiry - Aryans Buildcon*

👤 *Name:* ${data.fullName}
📞 *Phone:* ${data.phone}
📧 *Email:* ${data.emailAddress}
🏘️ *Plot Interest:* ${data.scope}
📍 *Preferred Area:* ${data.location}
💰 *Budget:* ${data.investment}
📝 *Message:* ${data.narrative}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      phone: true,
      emailAddress: true,
      location: true,
      narrative: true
    });

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    submitInquiry({
      name: formData.fullName,
      email: formData.emailAddress,
      phone: formData.phone,
      projectTitle: `${formData.scope} - ${formData.location}`,
      message: `Budget: ${formData.investment}. Notes: ${formData.narrative}`
    })
      .then(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        openWhatsApp(formData);
        setFormData({ fullName: '', emailAddress: '', phone: '', scope: 'Residential Plot', investment: '10 Lakhs – 25 Lakhs', location: '', narrative: '' });
        setErrors({});
        setTouched({});
      })
      .catch(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        openWhatsApp(formData);
      });
  };

  const scopeOptions = ['Residential Plot', 'Commercial Plot', 'Investment Land', 'Highway Facing Plot'];
  const investmentOptions = [
    'Under 10 Lakhs',
    '10 Lakhs – 25 Lakhs',
    '25 Lakhs – 50 Lakhs',
    '50 Lakhs+'
  ];

  return (
    <section id="contact-section" className="bg-[#FAF8F4] overflow-hidden">

      <div id="contact-form" className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Direct Inquiries & Brand Details */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-8 md:space-y-12"
          >
            <div className="space-y-4">
              <span className="font-sans text-[15px] font-medium text-gold uppercase tracking-[0.2em] block">
                ✦ Start Your Journey
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black font-bold leading-[1.15] tracking-tight max-w-3xl">
                Let's Build Your <br />
                <span className=" text-gold font-semibold">Future Together.</span>
              </h2>
              <p className="font-sans text-lg text-ink/70 font-medium max-w-2xl ">
                Every successful journey begins with a single step. Take the first step toward owning a premium residential plot with Aryans Buildcons. Whether you're investing for tomorrow or planning your forever home, we're here to guide you at every stage.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-6 pt-6 border-t border-black/10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold rounded-full text-cream shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-semibold text-gold uppercase tracking-[0.15em] mb-1">
                    Direct Inquiry Email
                  </h4>
                  <a href="mailto:aryansbuildcon@gmail.com" className="font-sans text-[17px] text-ink/70 font-medium duration-300">
                    aryansbuildcon@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold rounded-full text-cream shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-semibold text-gold uppercase tracking-[0.15em] mb-1">
                    Call Center Support
                  </h4>
                  <a href="tel:8767010825" className="font-sans text-[15px] text-ink/70 font-medium duration-300">
                    +91 8767010825
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold rounded-full text-cream shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-semibold text-gold uppercase tracking-[0.15em] mb-1">
                    Office Working Hours
                  </h4>
                  <p className="font-sans text-[15px] text-ink/70 font-medium">
                    Monday — Sunday, 09:00 — 19:00 IST (Open all 7 days for Site Visits)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold rounded-full text-cream shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-semibold text-gold uppercase tracking-[0.15em] mb-1">
                    Verified Documents Guarantee
                  </h4>
                  <p className="font-sans text-[15px] text-ink/70 font-medium">
                    All layouts have approved sanctions from local authorities (NMRDA/NIT) with clear, immediate 7/12 land registration.
                  </p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Premium Form with Glassmorphism / Cream styling */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="bg-white/30 backdrop-blur-[16px] saturate-[140%] border border-white/40 rounded-3xl p-5 sm:p-6 md:p-10 shadow-2xl relative">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="onboarding-form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Top validation summary banner if form has errors */}
                    {Object.keys(errors).length > 0 && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3 text-xs font-sans">
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-red-900">Please correct the following errors before submitting:</p>
                          <ul className="list-disc list-inside mt-1 space-y-0.5 text-red-700">
                            {errors.fullName && <li>{errors.fullName}</li>}
                            {errors.phone && <li>{errors.phone}</li>}
                            {errors.emailAddress && <li>{errors.emailAddress}</li>}
                            {errors.location && <li>{errors.location}</li>}
                            {errors.narrative && <li>{errors.narrative}</li>}
                          </ul>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label className="font-sans text-[12px] font-semibold text-ink/70 uppercase tracking-[0.15em] flex items-center justify-between">
                          <span>Your Full Name *</span>
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleChange('fullName', e.target.value)}
                          onBlur={() => handleBlur('fullName')}
                          placeholder="e.g. Ramesh Kumar"
                          className={`w-full bg-cream/50 border rounded-xl px-4 py-3 font-sans text-sm focus:outline-none transition-all duration-300 placeholder:text-grey/40 ${
                            errors.fullName
                              ? 'border-red-500/80 bg-red-50/30 focus:ring-2 focus:ring-red-400 focus:border-red-500'
                              : 'border-black/10 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="font-sans text-[11px] text-red-600 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            <span>{errors.fullName}</span>
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="font-sans text-[12px] font-semibold text-ink/70 uppercase tracking-[0.15em] flex items-center justify-between">
                          <span>Contact Number *</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          onBlur={() => handleBlur('phone')}
                          placeholder="e.g. +91 8767010825"
                          className={`w-full bg-cream/50 border rounded-xl px-4 py-3 font-sans text-sm focus:outline-none transition-all duration-300 placeholder:text-grey/40 ${
                            errors.phone
                              ? 'border-red-500/80 bg-red-50/30 focus:ring-2 focus:ring-red-400 focus:border-red-500'
                              : 'border-black/10 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold'
                          }`}
                        />
                        {errors.phone && (
                          <p className="font-sans text-[11px] text-red-600 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            <span>{errors.phone}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email Address */}
                      <div className="space-y-2">
                        <label className="font-sans text-[12px] font-semibold text-ink/70 uppercase tracking-[0.15em] flex items-center justify-between">
                          <span>Email Address *</span>
                        </label>
                        <input
                          type="email"
                          value={formData.emailAddress}
                          onChange={(e) => handleChange('emailAddress', e.target.value)}
                          onBlur={() => handleBlur('emailAddress')}
                          placeholder="e.g. ramesh@gmail.com"
                          className={`w-full bg-cream/50 border rounded-xl px-4 py-3 font-sans text-sm focus:outline-none transition-all duration-300 placeholder:text-grey/40 ${
                            errors.emailAddress
                              ? 'border-red-500/80 bg-red-50/30 focus:ring-2 focus:ring-red-400 focus:border-red-500'
                              : 'border-black/10 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold'
                          }`}
                        />
                        {errors.emailAddress && (
                          <p className="font-sans text-[11px] text-red-600 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            <span>{errors.emailAddress}</span>
                          </p>
                        )}
                      </div>

                      {/* Project Scope Selection */}
                      <div className="space-y-2">
                        <label className="font-sans text-[12px] font-semibold text-ink/70 uppercase tracking-[0.15em]">
                          Plot Category Interest
                        </label>
                        <select
                          value={formData.scope}
                          onChange={(e) => handleChange('scope', e.target.value)}
                          className="w-full bg-cream/50 border border-black/10 focus:border-accent-gold rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-accent-gold transition-all duration-300 cursor-pointer"
                        >
                          {scopeOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Investment Range selection */}
                      <div className="space-y-2">
                        <label className="font-sans text-[12px] font-semibold text-ink/70 uppercase tracking-[0.15em]">
                          Expected Investment Bracket
                        </label>
                        <select
                          value={formData.investment}
                          onChange={(e) => handleChange('investment', e.target.value)}
                          className="w-full bg-cream/50 border border-black/10 focus:border-accent-gold rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-accent-gold transition-all duration-300 cursor-pointer"
                        >
                          {investmentOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Location of Interest */}
                      <div className="space-y-2">
                        <label className="font-sans text-[12px] font-semibold text-ink/70 uppercase tracking-[0.15em]">
                          Preferred Layout Area in Nagpur *
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => handleChange('location', e.target.value)}
                          onBlur={() => handleBlur('location')}
                          placeholder="e.g. Wardha Road / MIHAN / Hingna"
                          className={`w-full bg-cream/50 border rounded-xl px-4 py-3 font-sans text-sm focus:outline-none transition-all duration-300 placeholder:text-grey/40 ${
                            errors.location
                              ? 'border-red-500/80 bg-red-50/30 focus:ring-2 focus:ring-red-400 focus:border-red-500'
                              : 'border-black/10 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold'
                          }`}
                        />
                        {errors.location && (
                          <p className="font-sans text-[11px] text-red-600 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            <span>{errors.location}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Narrative Description */}
                    <div className="space-y-2">
                      <label className="font-sans text-[12px] font-semibold text-ink/70 uppercase tracking-[0.15em]">
                        Your Project Details or Specific Requirements *
                      </label>
                      <textarea
                        rows={4}
                        value={formData.narrative}
                        onChange={(e) => handleChange('narrative', e.target.value)}
                        onBlur={() => handleBlur('narrative')}
                        placeholder="e.g. Seeking East-facing 2000 sq.ft plot near Mountfort school on Wardha Road, require SBI bank loan details..."
                        className={`w-full bg-cream/50 border rounded-xl px-4 py-3 font-sans text-sm focus:outline-none transition-all duration-300 placeholder:text-grey/40 resize-none ${
                          errors.narrative
                            ? 'border-red-500/80 bg-red-50/30 focus:ring-2 focus:ring-red-400 focus:border-red-500'
                            : 'border-black/10 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold'
                        }`}
                      />
                      {errors.narrative && (
                        <p className="font-sans text-[11px] text-red-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span>{errors.narrative}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit button */}
                    <button
                      id="btn-submit-consultation"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-ink hover:bg-gold/70 hover:border-2 border-gold/30  border-2 border-black/30  text-cream font-sans text-xs font-semibold uppercase tracking-[0.16em] py-4 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 rounded-full animate-spin" />
                          Submitting Booking Request...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Book My Site Visit Today
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-6 flex flex-col items-center justify-center"
                  >
                    <div className="p-4 bg-accent-gold/10 rounded-full text-accent-gold animate-bounce">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-3xl text-charcoal font-light leading-tight">
                        Booking Request Sent!
                      </h3>
                      <p className="font-sans text-xs font-medium text-accent-gold uppercase tracking-[0.2em]">
                        ✦ Instant Verification ✦
                      </p>
                    </div>
                    <p className="max-w-md mx-auto font-sans text-sm text-grey leading-relaxed font-light">
                      Thank you for choosing Aryans Buildcons. We have received your plot inquiry and site visit booking request. One of our senior Nagpur real estate advisors will call you shortly to arrange a complimentary site visit tour with free transport.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="font-sans text-xs uppercase tracking-[0.14em] text-charcoal font-semibold border-b border-charcoal hover:text-accent-gold hover:border-accent-gold pb-0.5 transition-colors duration-300 cursor-pointer mt-4"
                    >
                      Enquire for Another Plot
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>

      </div>
      </div>
    </section>
  );
}
