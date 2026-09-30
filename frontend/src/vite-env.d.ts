/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module 'react-rte' {
  import * as React from 'react';

  export interface EditorValue {
    toString(format: string): string;
    setContentFromString(content: string, format: string): EditorValue;
  }

  export interface RichTextEditorProps {
    value: EditorValue;
    onChange: (value: EditorValue) => void;
    placeholder?: string;
    readOnly?: boolean;
    autoFocus?: boolean;
    className?: string;
    editorClassName?: string;
    toolbarClassName?: string;
    customControls?: Array<any>;
    disabled?: boolean;
    rootStyle?: React.CSSProperties;
    editorStyle?: React.CSSProperties;
    toolbarStyle?: React.CSSProperties;
  }

  export default class RichTextEditor extends React.Component<RichTextEditorProps> {
    static createEmptyValue(): EditorValue;
    static createValueFromString(markup: string, format: string, options?: any): EditorValue;
  }
}

