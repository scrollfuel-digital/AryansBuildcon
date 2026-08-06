import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Alto Studio Uncaught Error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center p-6 text-charcoal">
          {/* Noise background overlay to match the premium theme */}
          <div className="absolute inset-0 bg-image-noise opacity-2 pointer-events-none" />
          
          <div className="max-w-md w-full bg-white/40 backdrop-blur-[16px] saturate-[140%] border border-black/10 rounded-3xl p-8 md:p-10 space-y-6 shadow-2xl relative z-10">
            <div className="space-y-3">
              <span className="font-sans text-[11px] font-medium text-accent-gold uppercase tracking-[0.24em] block">
                ✦ System Diagnosis
              </span>
              <h2 className="font-serif text-3xl font-light text-charcoal tracking-tight leading-tight">
                An exception has been <br />
                <span className="italic text-accent-gold">caught gracefully.</span>
              </h2>
            </div>
            
            <p className="font-sans text-xs text-grey leading-relaxed font-light">
              Something went wrong in the presentation layer. Our digital concierge has intercepted the exception to preserve interface integrity.
            </p>
            
            <div className="bg-charcoal text-white/90 p-4 rounded-xl overflow-x-auto max-h-[180px] text-[10px] font-mono leading-relaxed border border-white/10 no-scrollbar">
              <span className="text-accent-gold">[Error]</span> {this.state.error?.name || 'RuntimeError'}: {this.state.error?.message || 'Unknown Exception'}
              {this.state.error?.stack && (
                <div className="text-white/40 mt-2 whitespace-pre text-[9px]">
                  {this.state.error.stack.split('\n').slice(0, 4).join('\n')}
                </div>
              )}
            </div>
            
            <button
              onClick={this.handleReset}
              className="w-full bg-charcoal hover:bg-accent-gold text-white font-sans text-xs font-semibold uppercase tracking-[0.16em] py-4 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer text-center"
            >
              Reset Interface
            </button>

            
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
