import React, { useState } from 'react'
import Button from './Button'
import type { FC, PropsWithChildren } from 'react';
import './CustomTag.scss';

interface Props extends PropsWithChildren {
  display: boolean
  title: string
  copyContent: string
}

const CustomTag: FC<Props> = ({ display, title, copyContent, children }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = (): void => {
    try {
      navigator.clipboard.writeText(copyContent).then(() => {
        console.log('Copied to clipboard');
        setIsCopied(true);
        setTimeout(() => { setIsCopied(false) }, 800);
      }).catch((error) => {
        console.error('Copy failed', error);
      });
    } catch (error) {
      console.error('Copy failed', error);
    }
  };

  return (
    <div className={`xlaude--custom-tag ${display ? 'block' : 'inline-block'}`} title={title}>
      {children}
      <Button done={isCopied} onClick={handleCopy} />
    </div>
  );
};

export default CustomTag;
