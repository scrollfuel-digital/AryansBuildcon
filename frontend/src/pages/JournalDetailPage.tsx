
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { journalArticles } from '../data';
import { ArrowLeft, Clock, Calendar, ArrowRight, BookOpen, Quote, Sparkles, Share2, Bookmark } from 'lucide-react';
import { useState } from 'react';

export default function JournalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = journalArticles.find((a) => a.id === id);

  const [bookmarked, setBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!article) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 text-charcoal">
        <span className="font-sans text-[11px] font-medium text-accent-gold uppercase tracking-[0.24em] mb-4">
          ✦ Journal Archive
        </span>
        <h2 className="font-serif text-3xl font-light mb-6">
          Investment Guide <span className="italic text-accent-gold">Not Found</span>
        </h2>
        <Link
          to="/"
          className="bg-charcoal text-white hover:bg-accent-gold font-sans text-xs font-semibold uppercase tracking-[0.16em] py-4 px-8 rounded-full transition-all duration-300"
        >
          Return to Guides
        </Link>
      </div>
    );
  }

  const handleShareClick = () => {
    setCopiedLink(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  // Curated list of related articles
  const otherArticles = journalArticles.filter((a) => a.id !== article.id);

  return (
    <div className="bg-cream min-h-screen text-charcoal pb-24">
      {/* Immersive Editorial Header Image */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden bg-charcoal">
        <img
          src={article.imageUrl}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/10 to-transparent" />
        
        {/* Floating Back Navigation */}
        <div className="absolute top-28 left-6 md:left-12 lg:left-20 z-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-charcoal/85 hover:bg-accent-gold backdrop-blur-md text-white px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 cursor-pointer shadow-md"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Guides
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 mt-[-100px] relative z-10 space-y-12">
        {/* Main Card Wrapper */}
        <div className="bg-[#FAF8F4] border border-black/5 rounded-3xl p-8 md:p-16 shadow-2xl space-y-8">
          
          {/* Metadata Block */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 bg-accent-gold/10 text-accent-gold rounded-full font-sans text-[10px] font-medium uppercase tracking-[0.16em]">
                {article.category}
              </span>
              <div className="flex items-center gap-4 text-grey/60 font-sans text-[11px] uppercase tracking-[0.12em]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-accent-gold" /> {article.date}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-black/10" />
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-accent-gold" /> {article.readTime}
                </span>
              </div>
            </div>

            {/* Utility Quick Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBookmarked(!bookmarked)}
                title="Bookmark article"
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  bookmarked 
                    ? 'bg-accent-gold text-white border-accent-gold' 
                    : 'bg-white/60 border-black/10 hover:border-black/20 text-grey hover:text-charcoal'
                }`}
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                onClick={handleShareClick}
                title="Copy link"
                className="p-2 rounded-full bg-white/60 border border-black/10 hover:border-black/20 text-grey hover:text-charcoal transition-all cursor-pointer flex items-center gap-1"
              >
                <Share2 className="w-4 h-4" />
                {copiedLink && <span className="text-[9px] uppercase tracking-wider pr-1 text-accent-gold font-sans font-semibold">Copied!</span>}
              </button>
            </div>
          </div>

          {/* Large Editorial Title */}
          <h1 className="font-serif text-3xl md:text-5xl text-charcoal font-light leading-tight tracking-wide">
            {article.title}
          </h1>

          {/* Extensive Text Body with Editorial Styling */}
          <div className="space-y-6 text-grey leading-relaxed font-sans text-base font-light">
            {/* Elegant Callout Block */}
            <p className="font-medium text-charcoal font-serif text-lg md:text-xl italic flex items-start gap-3 bg-white/50 border-l-2 border-accent-gold p-6 rounded-r-2xl shadow-sm">
              <Quote className="w-10 h-10 text-accent-gold/40 shrink-0 mt-[-4px]" />
              "{article.summary}"
            </p>

            {/* Paragraph 1 */}
            <p className="pt-4 first-letter:text-5xl first-letter:font-serif first-letter:font-light first-letter:text-accent-gold first-letter:float-left first-letter:mr-3 first-letter:mt-1">
              To invest in land with true confidence requires understanding market appreciation patterns, legal regulations, and local infrastructure developments. At Aryans Buildcons, we have helped over 1,500+ landowners secure premium, clear-title residential plots in Nagpur's fastest-growing corridors. In this editorial guide, we expand on why land remains the most solid asset class for long-term wealth building.
            </p>

            <p>
              When evaluating plotted communities, one must pay close attention to local connectivity and layout sanctions. A RERA-registered, NMRDA/NIT-sanctioned layout ensures that your investment is completely legal and pre-approved for bank finance. Beyond legalities, purchasing a plot in a master-planned community guarantees high-quality concrete internal roads, clean drinking water access, and planned landscape parks.
            </p>

            <div className="my-10 border-y border-black/10 py-8 text-center space-y-3">
              <span className="font-sans text-[10px] text-accent-gold uppercase tracking-[0.2em] font-medium block">
                ✦ Slogan of Trust
              </span>
              <p className="font-serif italic text-charcoal text-lg font-light max-w-xl mx-auto leading-relaxed">
                "Real estate is not just about coordinates on a map—it is the foundation where your family's future begins. Owning land gives you the ultimate freedom to build a secure, customized tomorrow."
              </p>
            </div>

            <p>
              Nagpur's real estate market is undergoing a phenomenal growth cycle driven by the Nagpur Metro Expansion, the MIHAN cargo hub, and multi-lane expressways. Corridors like Wardha Road and Hingna MIDC are seeing immediate capital appreciation. By buying early in these high-growth zones, smart investors can lock in lower entry prices and reap premium capital gains in the coming years.
            </p>

            <p>
              Our commitment at Aryans Buildcons remains absolute: we deliver trust. We take the stress out of plot purchasing by handling all legal search reports, stamp duty processes, and bank loan approvals. Every guide in our Investment Archive is designed to empower you with direct market insights and expert knowledge.
            </p>
          </div>

          {/* Publication Footer */}
          <div className="pt-8 border-t border-black/10 flex flex-wrap justify-between items-center gap-4 text-xs">
            <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-grey/80">
              Published by Aryans Buildcons Research Desk
            </span>
            <span className="font-serif italic text-accent-gold text-sm">
              Aryans Buildcons Investment Desk © 2026
            </span>
          </div>
        </div>

        {/* Curated Recommendations Segment */}
        <div className="space-y-6 pt-12">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-light text-charcoal tracking-wide">
              Further <span className="italic text-accent-gold">Insights</span>
            </h3>
            <span className="font-sans text-[10px] text-grey/60 uppercase tracking-[0.2em]">Curated Reading</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherArticles.map((other) => (
              <Link
                key={other.id}
                to={`/journal/${other.id}`}
                className="group flex flex-col justify-between bg-white border border-black/5 hover:border-black/10 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="space-y-4">
                  <div className="relative h-[180px] w-full rounded-xl overflow-hidden bg-charcoal">
                    <img
                      src={other.imageUrl}
                      alt={other.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.14em] text-accent-gold font-sans font-semibold">
                    {other.category}
                  </span>
                  <h4 className="font-serif text-xl text-charcoal font-light leading-snug group-hover:text-accent-gold transition-colors duration-300">
                    {other.title}
                  </h4>
                </div>
                <div className="pt-4 mt-4 border-t border-black/5 flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.14em] text-charcoal font-medium">
                  Read Guide <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
