import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.svg';

import { Macumbae } from './styles';

export default function Logo(props) {
  const { buttonType } = props;

  return (
    <Macumbae to={buttonType === 'logout' ? '/admin/dashboard' : '/'}>
      <img src={logo} alt="Macumbaê" />
    </Macumbae>
  );
}

Logo.propTypes = {
  buttonType: PropTypes.string,
};

Logo.defaultProps = {
  buttonType: 'back',
};
