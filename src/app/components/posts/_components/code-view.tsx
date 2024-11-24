'use client';
import { CopyBlock, dracula } from 'react-code-blocks';
import { Language } from '../types/Language';
type CodeViewProps = {
  code: string;
  language: Language;
};

const CodeView = ({ code, language }: CodeViewProps) => {
  return (
    <CopyBlock
      text={code}
      language={'typescript'}
      theme={dracula}
      showLineNumbers={false}
      wrapLongLines={true}
      codeBlock
    />
  );
};

export default CodeView;
