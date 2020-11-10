import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';
import Logo from '../Logo';
import { Content, BackButton } from './styles';

export default function Header(props) {
  const history = useHistory();
  const { buttonType } = props;
  function handleBack() {
    history.go(-1);
  }

  async function handleLogout() {
    await localStorage.removeItem('macumbae');
    history.push('/admin');
  }

  function LoadButton() {
    if (buttonType === 'logout') {
      return (
        <button type="button" onClick={handleLogout}>
          <FiLogOut />
          Desconectar
        </button>
      );
    }
    return (
      <button type="button" onClick={handleBack}>
        <IoMdArrowRoundBack />
        Voltar
      </button>
    );
  }

  return (
    <Content>
      <Logo buttonType={buttonType} />
      <BackButton>
        <LoadButton />
      </BackButton>
    </Content>
  );
}

Header.propTypes = {
  buttonType: PropTypes.string,
};

Header.defaultProps = {
  buttonType: 'back',
};
