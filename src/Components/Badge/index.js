import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import { Container } from './styles';

export default function Badge({ table }) {
  const [notification, setNotification] = useState('');

  useEffect(() => {
    async function loadNotifications() {
      const getData = await api.get(`/${table}?filter=pending`).catch((err) => {
        return err;
      });
      if (getData.data.length >= 0) {
        setNotification(getData.data.length);
      }
    }
    loadNotifications();
  }, [table]);

  return (
    <Container visible={notification}>
      <span>{notification}</span>
    </Container>
  );
}

Badge.propTypes = {
  table: PropTypes.string.isRequired,
};
