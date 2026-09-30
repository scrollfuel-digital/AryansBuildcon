import React from 'react';

interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ message = 'Loading...', fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="w-10 h-10 border-3 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin" />
      {message && <p className="font-sans text-xs font-medium text-grey uppercase tracking-widest">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className="fixed inset-0 z-50 bg-[#FAF8F4]/90 backdrop-blur-sm flex items-center justify-center">{content}</div>;
  }

  return content;
};

export default Loader;
