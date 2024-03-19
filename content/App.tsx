import React from 'react';
import type { FC, PropsWithChildren } from 'react';
import { PortalObserverProvider } from './MutationContext';
import InputUI from './inputUI';

const App: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div id="app-root">
      <PortalObserverProvider>
        {children}
        <InputUI onClick={() => {}} selector="fieldset.relative" />
      </PortalObserverProvider>
    </div>
  );
}

export default App;
