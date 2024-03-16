import { type FC } from 'react';
import * as lx from './lx';

const dictionary: Record<string, FC<any>> = {
  [lx.name]: lx.component
};

export default dictionary;
