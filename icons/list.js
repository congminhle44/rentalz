/** @format */

import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Form = (props) => (
  <Svg
    width={24}
    height={24}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 48 48'
    {...props}>
    <Path
      fill='#bdbdbd'
      d='M20 1H2a1 1 0 00-1 1v18a1 1 0 001 1h18a1 1 0 001-1V2a1 1 0 00-1-1z'
    />
    <Path
      fill='#bdbdbd'
      data-color='color-2'
      d='M46 1H28a1 1 0 00-1 1v18a1 1 0 001 1h18a1 1 0 001-1V2a1 1 0 00-1-1z'
    />
    <Path
      fill='#bdbdbd'
      data-color='color-2'
      d='M20 27H2a1 1 0 00-1 1v18a1 1 0 001 1h18a1 1 0 001-1V28a1 1 0 00-1-1z'
    />
    <Path
      fill='#bdbdbd'
      d='M46 27H28a1 1 0 00-1 1v18a1 1 0 001 1h18a1 1 0 001-1V28a1 1 0 00-1-1z'
    />
  </Svg>
);

export default Form;
