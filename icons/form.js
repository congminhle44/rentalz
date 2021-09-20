/** @format */

import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Paper = (props) => (
  <Svg
    width={24}
    height={24}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 48 48'
    {...props}>
    <Path fill='#bdbdbd' data-color='color-2' d='M32 2.586V12h9.414z' />
    <Path
      fill='#bdbdbd'
      d='M30 13V1H7a2 2 0 00-2 2v42a2 2 0 002 2h34a2 2 0 002-2V14H31a1 1 0 01-1-1zm-16 2h8a1 1 0 110 2h-8a1 1 0 110-2zm20 22H14a1 1 0 110-2h20a1 1 0 110 2zm1-11a1 1 0 01-1 1H14a1 1 0 110-2h20a1 1 0 011 1z'
    />
  </Svg>
);

export default Paper;
