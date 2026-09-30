import React, { useRef, useState, useEffect } from 'react';
import {
  Sparkles,
  AlertCircle,
  HelpCircle,
  ListOrdered,
  List,
  Quote,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Unlink,
  Eye,
  Edit3,
} from 'lucide-react';

interface BlogEditorProps {
  value: string;
  onChange: (htmlContent: string) => void;
  error?: string;
}

export default function BlogEditor({ value, onChange, error }: BlogEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isRawMode, setIsRawMode] = useState(false);

  // Synchronize external value with contentEditable DOM if different
  useEffect(() => {
    if (editorRef.current && !isRawMode) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value, isRawMode]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCmd = (command: string, valueArg: string | undefined = undefined) => {
    document.execCommand(command, false, valueArg);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleAddLink = () => {
    const url = prompt('Enter link URL (e.g. https://aryansbuildcon.com):');
    if (url) {
      execCmd('createLink', url);
    }
  };

  const insertCustomHtml = (htmlSnippet: string) => {
    if (isRawMode) {
      onChange((value || '') + htmlSnippet);
    } else if (editorRef.current) {
      editorRef.current.focus();
      execCmd('insertHTML', htmlSnippet);
    } else {
      onChange((value || '') + htmlSnippet);
    }
  };

  const handleInsertHighlightBox = () => {
    const highlightHtml = `
      <div class="blog-highlight-box bg-amber-500/10 border-l-4 border-amber-500 p-4 my-4 rounded-r-xl font-medium text-amber-900 dark:text-amber-200">
        <p><strong>Important:</strong> A plot investment should be evaluated based on RERA & NATP sanction status, verified connectivity, and surrounding infrastructure growth rather than speculative pricing.</p>
      </div>
    `;
    insertCustomHtml(highlightHtml);
  };

  const handleInsertNumberedSections = () => {
    const sectionsHtml = `
      <h3>Key Factors Driving Residential Plot Growth in Nagpur</h3>
      <ol>
        <li><strong>Land Offers Superior Appreciation:</strong> Plotted land appreciates continuously while structures age over time.</li>
        <li><strong>Infrastructure Defines Future Capital Growth:</strong> Corridors along Nagpur Metro expansion and major expressways show high returns.</li>
        <li><strong>Bank Approved Clear Titles:</strong> Buying RERA-registered plots ensures seamless bank finance and immediate possession.</li>
      </ol>
    `;
    insertCustomHtml(sectionsHtml);
  };

  const handleInsertBulletPoints = () => {
    const bulletHtml = `
      <p><strong>Location Evaluation Checklist:</strong></p>
      <ul>
        <li>Direct connectivity to Metro stations & Wardha Road corridor</li>
        <li>Proximity to MIHAN cargo hub & employment zones</li>
        <li>NMRDA / NIT layout sanction & clear search reports</li>
        <li>Concrete internal roads, electricity, and water infrastructure</li>
      </ul>
    `;
    insertCustomHtml(bulletHtml);
  };

  const handleInsertQuoteBox = () => {
    const quoteHtml = `
      <blockquote class="border-l-4 border-amber-500 italic pl-4 py-2 my-4 text-gray-300 bg-gray-900/60 rounded-r-lg">
        "Real estate investment is not about timing the market, but time in the market. Secure land is the most resilient foundation for long-term family wealth."
      </blockquote>
    `;
    insertCustomHtml(quoteHtml);
  };

  return (
    <div className="space-y-3 font-sans">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
          Blog Main Content <span className="text-amber-500">*</span>
        </label>
        <button
          type="button"
          onClick={() => setIsRawMode(!isRawMode)}
          className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 px-2.5 py-1 bg-gray-900 border border-gray-800 rounded-lg cursor-pointer transition-colors"
        >
          {isRawMode ? <Edit3 className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
          <span>{isRawMode ? 'Switch to Visual Mode' : 'Switch to Raw HTML'}</span>
        </button>
      </div>

      {/* Quick Insert Formatting Templates */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Formatting Tools & Editorial Templates</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={handleInsertHighlightBox}
            className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>+ Highlight Box</span>
          </button>
          <button
            type="button"
            onClick={handleInsertNumberedSections}
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-750 border border-gray-700 text-gray-200 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ListOrdered className="w-3.5 h-3.5 text-amber-400" />
            <span>+ Numbered List</span>
          </button>
          <button
            type="button"
            onClick={handleInsertBulletPoints}
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-750 border border-gray-700 text-gray-200 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5"
          >
            <List className="w-3.5 h-3.5 text-amber-400" />
            <span>+ Bullet Checklist</span>
          </button>
          <button
            type="button"
            onClick={handleInsertQuoteBox}
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-750 border border-gray-700 text-gray-200 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Quote className="w-3.5 h-3.5 text-amber-400" />
            <span>+ Quote Box</span>
          </button>
        </div>
      </div>

      {/* Editor Container */}
      <div className="bg-white border border-gray-700 rounded-xl overflow-hidden focus-within:border-amber-500 transition-colors shadow-inner">
        {/* Formatting Toolbar */}
        {!isRawMode && (
          <div className="bg-gray-950 border-b border-gray-800 p-2 flex flex-wrap items-center gap-1 text-gray-300">
            <button
              type="button"
              onClick={() => execCmd('bold')}
              className="p-1.5 hover:bg-gray-800 hover:text-white rounded transition-colors"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => execCmd('italic')}
              className="p-1.5 hover:bg-gray-800 hover:text-white rounded transition-colors"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => execCmd('underline')}
              className="p-1.5 hover:bg-gray-800 hover:text-white rounded transition-colors"
              title="Underline"
            >
              <UnderlineIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => execCmd('strikeThrough')}
              className="p-1.5 hover:bg-gray-800 hover:text-white rounded transition-colors"
              title="Strikethrough"
            >
              <Strikethrough className="w-4 h-4" />
            </button>

            <span className="w-px h-4 bg-gray-800 mx-1" />

            <button
              type="button"
              onClick={() => execCmd('formatBlock', '<h2>')}
              className="p-1.5 hover:bg-gray-800 hover:text-white rounded transition-colors"
              title="Heading 2"
            >
              <Heading2 className="w-4 h-4 text-amber-400" />
            </button>
            <button
              type="button"
              onClick={() => execCmd('formatBlock', '<h3>')}
              className="p-1.5 hover:bg-gray-800 hover:text-white rounded transition-colors"
              title="Heading 3"
            >
              <Heading3 className="w-4 h-4 text-amber-400" />
            </button>

            <span className="w-px h-4 bg-gray-800 mx-1" />

            <button
              type="button"
              onClick={() => execCmd('insertUnorderedList')}
              className="p-1.5 hover:bg-gray-800 hover:text-white rounded transition-colors"
              title="Unordered List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => execCmd('insertOrderedList')}
              className="p-1.5 hover:bg-gray-800 hover:text-white rounded transition-colors"
              title="Ordered List"
            >
              <ListOrdered className="w-4 h-4" />
            </button>

            <span className="w-px h-4 bg-gray-800 mx-1" />

            <button
              type="button"
              onClick={handleAddLink}
              className="p-1.5 hover:bg-gray-800 hover:text-white rounded transition-colors"
              title="Insert Link"
            >
              <LinkIcon className="w-4 h-4 text-amber-400" />
            </button>
            <button
              type="button"
              onClick={() => execCmd('unlink')}
              className="p-1.5 hover:bg-gray-800 hover:text-white rounded transition-colors"
              title="Remove Link"
            >
              <Unlink className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content Area */}
        {isRawMode ? (
          <textarea
            rows={14}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="<p>Write raw HTML content here...</p>"
            className="w-full p-4 bg-gray-900 text-amber-300 font-mono text-xs focus:outline-none leading-relaxed"
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onBlur={handleInput}
            className="px-4 py-3 min-h-[340px] max-h-[600px] overflow-y-auto text-gray-100 font-sans leading-relaxed text-sm focus:outline-none border-none prose prose-invert max-w-none"
            style={{ minHeight: '340px' }}
          />
        )}
      </div>

      {error && (
        <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
          <AlertCircle className="w-3.5 h-3.5" /> {error}
        </p>
      )}

      <p className="text-[11px] text-gray-500 flex items-center gap-1">
        <HelpCircle className="w-3 h-3 text-amber-500/70" />
        <span>
          Visual Editor is React 19 ready. Use <strong>+ Highlight Box</strong>, headings, and lists to format your blog post.
        </span>
      </p>
    </div>
  );
}
