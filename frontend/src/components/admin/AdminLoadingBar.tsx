import { motion, AnimatePresence } from 'motion/react';
import { Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';

interface AdminLoadingBarProps {
  isLoading: boolean;
  loadingMessage: string;
  statusMessage: { text: string; type: 'success' | 'error' } | null;
  setStatusMessage: (status: { text: string; type: 'success' | 'error' } | null) => void;
}

export default function AdminLoadingBar({
  isLoading,
  loadingMessage,
  statusMessage,
  setStatusMessage,
}: AdminLoadingBarProps) {
  return (
    <>
      {/* Global Top Loading Progress Bar */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-[10000] h-1 bg-accent-gold/20 overflow-hidden">
          <motion.div
            className="h-full bg-accent-gold shadow-[0_0_12px_#C5A880]"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          />
        </div>
      )}

      {/* Floating API Loading Status Badge */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-[999] bg-[#1a1613] border border-accent-gold/40 text-cream px-4 py-2.5 rounded-full shadow-2xl text-xs flex items-center gap-2.5 backdrop-blur-md"
          >
            <Loader2 className="w-4 h-4 text-accent-gold animate-spin" />
            <span className="font-mono text-[11px] font-medium">{loadingMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 right-6 z-[10000] px-5 py-3.5 rounded-2xl shadow-2xl border text-xs font-semibold flex items-center gap-3 max-w-md ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/95 border-emerald-500/50 text-emerald-100 backdrop-blur-md shadow-emerald-950/50'
                : 'bg-red-950/95 border-red-500/50 text-red-100 backdrop-blur-md shadow-red-950/50'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span className="flex-1 leading-snug">{statusMessage.text}</span>
            <button
              onClick={() => setStatusMessage(null)}
              className="p-1 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
