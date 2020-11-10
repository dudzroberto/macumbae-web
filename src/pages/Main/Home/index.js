import React from 'react';
import { Link } from 'react-router-dom';
// import { FiMapPin, FiPlusCircle } from 'react-icons/fi';

import Logo from '../../../Components/Logo';
import { PageHome, Content, Main, Options } from './styles';

export default function Home() {
  return (
    <PageHome>
      <Content>
        <Main>
          <Logo />
          <h1>Espiritualidade, Amor e Caridade.</h1>
          <p>
            Nosso objetivo é ajudar umbandistas e adeptos da religião a
            encontrarem um casa espiritual onde possam exercitar a sua fé, o
            amor e a caridade.
          </p>
          <Options>
            <Link to="/">
              <strong>Lançamento em breve!</strong>
            </Link>
            {/* <Link to="/points">
              <span>
                <FiMapPin />
              </span>
              <strong>Localizar</strong>
            </Link>
            <Link to="/create-point">
              <span>
                <FiPlusCircle />
              </span>
              <strong>Cadastrar</strong>
            </Link> */}
          </Options>
        </Main>
      </Content>
    </PageHome>
  );
}
