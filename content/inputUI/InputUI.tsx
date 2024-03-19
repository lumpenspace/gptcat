import React, { type FC } from 'react';
import PortalRoot from '../PortalRoot';
import Button from '../components/Button';

const InputUI: FC<{ onClick: (button: string) => void, selector: string }> = ({ onClick, selector }) => {
  console.log('rendering inputUI');
  console.log(selector);
  console.log(document.querySelector(selector));

  return (
    <PortalRoot id="gptcat--input" selector={selector}>
       <Button iconName="close" label="Copy" color="primary" onClick={() => {}} />
    </PortalRoot>

  );
}

export default InputUI;
