'use client';
import { CopyBlock, dracula } from 'react-code-blocks';
type CodeViewProps = {
  code: string;
};

const CodeView = ({ code }: CodeViewProps) => {
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
