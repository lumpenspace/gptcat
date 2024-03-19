import React, { type PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

// Type for the context value
interface PortalObserverContextType {
  register: (selector: string, id: string, setPortalRoot: (el: HTMLElement | null) => void) => void
  unregister: (id: string) => void
};

// Create the context with an empty initial value
const PortalObserverContext = createContext<PortalObserverContextType | undefined>(undefined);

type MapsRegistry = Map<string, { selector: string, setPortalRoot: (el: HTMLElement | null) => void }>;

const PortalObserverProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [registrations, setRegistrations] = useState<MapsRegistry>(new Map());

  const unregister = (id: string): void => {
    registrations.delete(id);
    setRegistrations(new Map(registrations));
  };

  const register = (selector: string, id: string, setPortalRoot): HTMLElement | null => {
    if (registrations.has(id)) {
      console.warn(`Portal with id ${id} already exists`);
      unregister(id);
      return null;
    }
    setRegistrations(new Map(registrations.set(id, { selector, setPortalRoot })));
    return document.getElementById(id);
  };

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          registrations.forEach((value, key) => {
            const { selector, setPortalRoot } = value;
            const found = document.querySelector(selector);
            if (found) {
              let el = document.getElementById(key);
              if (!el) {
                el = document.createElement('div');
                el.id = key;
                found.appendChild(el);
              }
              setPortalRoot(el);
            }
          });
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => { observer.disconnect() };
  }, [registrations]);

  return (
    <PortalObserverContext.Provider value={{ register, unregister }}>
      {children}
    </PortalObserverContext.Provider>
  );
};

// Hook for consuming the context
const usePortalObserver = (): PortalObserverContextType => {
  const context = useContext(PortalObserverContext);
  if (context === undefined) {
    throw new Error('usePortalObserver must be used within a PortalObserverProvider');
  }
  return context;
};

export { PortalObserverProvider, usePortalObserver };
