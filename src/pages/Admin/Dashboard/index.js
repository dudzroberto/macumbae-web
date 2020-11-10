import React from 'react';
import { FiClock } from 'react-icons/fi';

import { Content } from './styles';

export default function AdminDashboard() {
  const { name } = JSON.parse(localStorage.getItem('macumbae'));
  const date = new Date();
  return (
    <Content>
      <header>
        <h1>Dashboard</h1>
        <p>
          {JSON.stringify(date)}
          <FiClock size={24} />
        </p>
      </header>
      <p>
        Olá, <strong>{name}</strong> seja bem vindo!
      </p>
    </Content>
  );
}
