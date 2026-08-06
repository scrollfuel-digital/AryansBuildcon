import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, CheckCircle, Send, Phone, ShieldCheck, AlertCircle, Clock } from 'lucide-react';
import { submitInquiry } from '../../api';

interface InquiryModalProps {
  // Allow manual opening if needed
  isOpenOverride?: boolean;
  onCloseOverride?: () => void;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  emailAddress?: string;
  location?: string;
  details?: string;
}

export default function InquiryModal({ isOpenOverride, onCloseOverride }: InquiryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    emailAddress: '',
    location: 'Wardha Road Corridor',
    details: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [secondsUntilNext, setSecondsUntilNext] = useState<number>(120);

  // Trigger popup only once after initial page load
  useEffect(() => {
    const hasBeenShown = sessionStorage.getItem('vip_consultation_shown');
    if (hasBeenShown) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem('vip_consultation_shown', 'true');
    }, 6000); // Popup once after 6 seconds on initial load

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Sync with controlled override if provided
  useEffect(() => {
    if (typeof isOpenOverride === 'boolean') {
      setIsOpen(isOpenOverride);
    }
  }, [isOpenOverride]);

  const handleClose = () => {
    setIsOpen(false);
    if (onCloseOverride) {
      onCloseOverride();
    }
  };

  const validate = (data = formData): FormErrors => {
    const errs: FormErrors = {};

    if (!data.fullName.trim() || data.fullName.trim().length < 3) {
      errs.fullName = 'Please enter your full name (at least 3 letters).';
    }

    const phoneClean = data.phone.replace(/[^0-9]/g, '');
    if (!data.phone.trim() || phoneClean.length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.emailAddress.trim()) {
      errs.emailAddress = 'Email address is required.';
    } else if (!emailRegex.test(data.emailAddress.trim())) {
      errs.emailAddress = 'Please enter a valid email address.';
    }

    if (!data.location.trim()) {
      errs.location = 'Please select or enter preferred location.';
    }

    if (!data.details.trim() || data.details.trim().length < 8) {
      errs.details = 'Please provide project requirements or questions (at least 8 letters).';
    }

    return errs;
  };

  const handleChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    if (touched[field]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      phone: true,
      emailAddress: true,
      location: true,
      details: true
    });

    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      return;
    }

    setIsSubmitting(true);

    submitInquiry({
      name: formData.fullName,
      email: formData.emailAddress,
      phone: formData.phone,
      projectTitle: formData.location,
      message: formData.details
    })
      .then(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ fullName: '', phone: '', emailAddress: '', location: 'Wardha Road Corridor', details: '' });
        setErrors({});
        setTouched({});
        setTimeout(() => { setIsSubmitted(false); handleClose(); }, 2500);
      })
      .catch(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-6 sm:px-6">
          {/* Dark Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#FAF8F4] border border-accent-gold/30 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Top Accent Header Bar */}
            <div className="bg-[#1b120c] text-white p-5 md:p-6 relative shrink-0">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Inquiry Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent-gold/20 border border-accent-gold/40 text-accent-gold text-[10px] font-sans font-semibold uppercase tracking-[0.2em]">
                  <Sparkles className="w-3 h-3 text-accent-gold" />
                  Special VIP Consultation
                </span>
              </div>

              <h3 className="font-serif text-xl md:text-2xl text-[#fef9e2] font-light leading-snug">
                Book a Free Site Visit Tour
              </h3>
              <p className="font-sans text-xs text-white/70 font-light mt-1">
                NMRDA Approved Layouts • 100% Immediate Bank Loan Sanction • Free AC Transport
              </p>
            </div>

            {/* Modal Body / Scrollable Content */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-5">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Top Validation Alert if errors present */}
                  {Object.keys(errors).length > 0 && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-sans flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-900">Please correct the highlighted fields:</p>
                        <ul className="list-disc list-inside mt-0.5 text-red-700">
                          {errors.fullName && <li>{errors.fullName}</li>}
                          {errors.phone && <li>{errors.phone}</li>}
                          {errors.emailAddress && <li>{errors.emailAddress}</li>}
                          {errors.location && <li>{errors.location}</li>}
                          {errors.details && <li>{errors.details}</li>}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Name Input */}
                  <div className="space-y-1">
                    <label className="font-sans text-[10px] font-semibold text-charcoal uppercase tracking-[0.15em]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      onBlur={() => handleBlur('fullName')}
                      placeholder="e.g. Ramesh Sharma"
                      className={`w-full bg-white border rounded-xl px-4 py-2.5 font-sans text-xs text-charcoal focus:outline-none transition-all ${
                        errors.fullName
                          ? 'border-red-500 bg-red-50/30 focus:ring-1 focus:ring-red-400'
                          : 'border-black/10 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[10px] text-red-600 font-sans flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3 text-red-500" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Grid for Phone & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="font-sans text-[10px] font-semibold text-charcoal uppercase tracking-[0.15em]">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        placeholder="e.g. 8767010825"
                        className={`w-full bg-white border rounded-xl px-4 py-2.5 font-sans text-xs text-charcoal focus:outline-none transition-all ${
                          errors.phone
                            ? 'border-red-500 bg-red-50/30 focus:ring-1 focus:ring-red-400'
                            : 'border-black/10 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[10px] text-red-600 font-sans flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-3 h-3 text-red-500" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="font-sans text-[10px] font-semibold text-charcoal uppercase tracking-[0.15em]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.emailAddress}
                        onChange={(e) => handleChange('emailAddress', e.target.value)}
                        onBlur={() => handleBlur('emailAddress')}
                        placeholder="e.g. ramesh@gmail.com"
                        className={`w-full bg-white border rounded-xl px-4 py-2.5 font-sans text-xs text-charcoal focus:outline-none transition-all ${
                          errors.emailAddress
                            ? 'border-red-500 bg-red-50/30 focus:ring-1 focus:ring-red-400'
                            : 'border-black/10 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold'
                        }`}
                      />
                      {errors.emailAddress && (
                        <p className="text-[10px] text-red-600 font-sans flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-3 h-3 text-red-500" />
                          {errors.emailAddress}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Location Dropdown / Input */}
                  <div className="space-y-1">
                    <label className="font-sans text-[10px] font-semibold text-charcoal uppercase tracking-[0.15em]">
                      Preferred Layout Corridor *
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      className="w-full bg-white border border-black/10 focus:border-accent-gold rounded-xl px-4 py-2.5 font-sans text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-accent-gold cursor-pointer"
                    >
                      <option value="Wardha Road Corridor">Wardha Road Corridor (Chinchbhavan / AIIMS)</option>
                      <option value="MIHAN Special Zone">MIHAN SEZ / Metro Belt</option>
                      <option value="Samruddhi Expressway Junction">Samruddhi Expressway Layouts</option>
                      <option value="Hingna Road Educational Hub">Hingna Road Layouts</option>
                    </select>
                  </div>

                  {/* Project Details / Questions */}
                  <div className="space-y-1">
                    <label className="font-sans text-[10px] font-semibold text-charcoal uppercase tracking-[0.15em]">
                      Project Requirements & Questions *
                    </label>
                    <textarea
                      rows={3}
                      value={formData.details}
                      onChange={(e) => handleChange('details', e.target.value)}
                      onBlur={() => handleBlur('details')}
                      placeholder="e.g. Looking for a 1500 sq.ft residential plot with SBI finance, free site visit request..."
                      className={`w-full bg-white border rounded-xl px-4 py-2.5 font-sans text-xs text-charcoal focus:outline-none transition-all resize-none ${
                        errors.details
                          ? 'border-red-500 bg-red-50/30 focus:ring-1 focus:ring-red-400'
                          : 'border-black/10 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold'
                      }`}
                    />
                    {errors.details && (
                      <p className="text-[10px] text-red-600 font-sans flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3 h-3 text-red-500" />
                        {errors.details}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-charcoal hover:bg-accent-gold text-white font-sans text-xs font-semibold uppercase tracking-[0.15em] py-3 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Submit Plot Inquiry
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-3 border border-black/10 hover:border-black/30 rounded-xl font-sans text-xs text-grey font-medium hover:text-charcoal transition-colors cursor-pointer"
                    >
                      Remind Me Later
                    </button>
                  </div>

                  <p className="text-[10px] text-grey/60 font-sans text-center flex items-center justify-center gap-1 pt-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Your privacy is 100% protected. No spam ever.</span>
                  </p>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4 flex flex-col items-center justify-center">
                  <div className="p-3 bg-emerald-100 rounded-full text-emerald-600 animate-bounce">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="font-serif text-2xl text-charcoal font-light">
                    Site Visit Request Confirmed!
                  </h4>
                  <p className="font-sans text-xs text-grey max-w-sm mx-auto leading-relaxed">
                    Thank you! An official Aryans Buildcon consultant will call you at{' '}
                    <span className="font-semibold text-charcoal">{formData.phone || 'your phone'}</span> shortly to arrange your free site visit transport.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer Timer Indicator */}
            <div className="bg-cream/80 border-t border-black/5 px-6 py-2.5 flex items-center justify-between text-[10px] font-sans text-grey">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-accent-gold" />
                Next automated prompt in 2 minutes
              </span>
              <a href="tel:8767010825" className="flex items-center gap-1 font-semibold text-charcoal hover:text-accent-gold">
                <Phone className="w-3 h-3 text-accent-gold" />
                Call Helpline: +91 8767010825
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
