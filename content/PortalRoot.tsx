import React, { type FC, useEffect, useState, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

const PortalRoot: FC<PropsWithChildren<{ selector: string, id: string }>> = ({ id, selector, children }) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const found = document.querySelector(selector);
          if (found) {
            let el = document.getElementById(id);
            if (!el) {
              el = document.createElement('div');
              el.id = id;
              found.appendChild(el);
            }
            setPortalRoot(el);
            observer.disconnect();
            break;
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => { observer.disconnect() }
  }, [selector, id]);

  if (!portalRoot) return null;
  return <>{createPortal(children, portalRoot)}</>;
}

export default PortalRoot;
