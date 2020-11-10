import React from 'react';
import PropTypes from 'prop-types';
import { FiLayout, FiMapPin, FiInbox } from 'react-icons/fi';
import Header from '../Header';
import Badge from '../Badge';

import { PageAdminDashBoard, Content, DataBox, Menu, MenuLink } from './styles';

export default function AdminLayout({ children }) {
  return (
    <PageAdminDashBoard>
      <Content>
        <Header buttonType="logout" />
        <Menu>
          <MenuLink to="/admin/dashboard">
            <FiLayout />
            Dashboard
          </MenuLink>
          <MenuLink to="/admin/points">
            <Badge table="points" />
            <FiMapPin />
            Pontos
          </MenuLink>
          <MenuLink to="/admin/requests">
            <Badge table="requests" />
            <FiInbox />
            Requisições
          </MenuLink>
        </Menu>
        <DataBox>{children}</DataBox>
      </Content>
    </PageAdminDashBoard>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
