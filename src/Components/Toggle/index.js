import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import * as color from '../../styles/colors';
import { ToogleContent } from './styles';

export default function Toggle({ ask, ...props }) {
  const Swipe = withStyles({
    switchBase: {
      color: `${color.secundary}`,
      '&$checked': {
        color: `${color.secundary}`,
      },
      '&$checked + $track': {
        backgroundColor: `${color.secundary}`,
      },
    },
    thumb: {
      boxShadow: 'none',
    },
    checked: {},
    track: {
      backgroundColor: '#bfc3be',
    },
  })(Switch);

  return (
    <ToogleContent>
      <span>{ask}</span>
      <Swipe {...props} inputProps={{ 'aria-label': 'secondary checkbox' }} />
    </ToogleContent>
  );
}

Toggle.propTypes = {
  ask: PropTypes.string.isRequired,
};
