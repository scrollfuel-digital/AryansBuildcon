import React, { useState } from 'react';
import { Tag, X, Plus, AlertCircle } from 'lucide-react';

interface KeywordInputProps {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
  error?: string;
}

export default function KeywordInput({
  keywords,
  setKeywords,
  error,
}: KeywordInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);

  const addKeyword = (rawText: string) => {
    const trimmed = rawText.trim();
    setInputError(null);
    if (!trimmed) return;

    if (keywords.some((k) => k.toLowerCase() === trimmed.toLowerCase())) {
      setInputError(`Keyword "${trimmed}" is already added.`);
      return;
    }

    setKeywords([...keywords, trimmed]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addKeyword(inputValue);
    }
  };

  const removeKeyword = (indexToRemove: number) => {
    setKeywords(keywords.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
          SEO Keywords <span className="text-amber-500">*</span>
        </label>
        <span className="text-[11px] text-gray-400">
          Press <kbd className="px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded text-gray-300">Enter</kbd> to add
        </span>
      </div>

      <div className="relative">
        <div className="flex items-center bg-gray-900 border border-gray-700 rounded-xl focus-within:border-amber-500 transition-colors px-3 py-2">
          <Tag className="w-4 h-4 text-amber-500 shrink-0 mr-2" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type keyword and press Enter (e.g. land investment in Nagpur)"
            className="w-full bg-transparent text-sm text-gray-100 placeholder-gray-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => addKeyword(inputValue)}
            disabled={!inputValue.trim()}
            className="ml-2 px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 font-medium text-xs rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      </div>

      {/* Keywords Chips Container */}
      <div className="flex flex-wrap gap-2 min-h-[38px] p-2 bg-gray-900/40 border border-gray-800 rounded-xl">
        {keywords.length === 0 ? (
          <span className="text-xs text-gray-500 italic p-1">
            No keywords added yet. Add relevant target keywords.
          </span>
        ) : (
          keywords.map((kw, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-medium rounded-lg group hover:bg-amber-500/20 transition-all shadow-sm"
            >
              <span>{kw}</span>
              <button
                type="button"
                onClick={() => removeKeyword(idx)}
                className="p-0.5 rounded-full hover:bg-amber-500/40 text-amber-400 hover:text-white transition-colors cursor-pointer"
                title={`Remove ${kw}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))
        )}
      </div>

      {(error || inputError) && (
        <div className="flex items-center gap-1.5 text-red-400 text-xs mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error || inputError}</span>
        </div>
      )}
    </div>
  );
}
