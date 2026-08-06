import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { journalArticles } from '../../data';
import { JournalArticle } from '../../types';
import { Clock, Calendar, ArrowRight, X, BookOpen, Quote } from 'lucide-react';

export default function JournalSection() {
  const navigate = useNavigate();

  return (
    <section id="journal-section" className="py-24 md:py-32 bg-cream">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-xl mx-auto space-y-4 mb-16 md:mb-24"
        >
          <span className="font-sans text-[11px] font-medium text-accent-gold uppercase tracking-[0.24em] block">
            ✦ Investment Guides & Market Insights
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal font-light leading-tight tracking-tight">
            Why Residential Plots <br />
            <span className="italic text-accent-gold">Are the Smartest Investment.</span>
          </h2>
          <p className="font-sans text-sm text-grey leading-relaxed font-light">
            Read our notes on land valuation, Nagpur’s high-growth infrastructure corridors, RERA legal compliance, and smart long-term wealth building with plotted developments.
          </p>
        </motion.div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {journalArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => navigate(`/journal/${article.id}`)}
              className="group flex flex-col justify-between bg-white/30 border border-black/5 hover:border-black/10 rounded-2xl p-5 cursor-pointer hover:shadow-xl transition-all duration-500 hover:bg-white"
            >
              <div className="space-y-4">
                {/* Image Wrapper */}
                <div className="relative h-[240px] w-full rounded-xl overflow-hidden bg-charcoal">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md py-1 px-3.5 rounded-full font-sans text-[9px] uppercase tracking-[0.14em] text-charcoal font-medium shadow-sm">
                    {article.category}
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-grey/60 font-sans text-[10px] uppercase tracking-[0.12em]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-accent-gold" /> {article.date}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-black/10" />
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-accent-gold" /> {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl text-charcoal font-light leading-tight tracking-wide group-hover:text-accent-gold transition-colors duration-300">
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="font-sans text-sm text-grey font-light leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              {/* Read More Link */}
              <div className="pt-6 mt-6 border-t border-black/5 flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-charcoal font-medium group-hover:text-accent-gold transition-colors duration-300">
                Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
