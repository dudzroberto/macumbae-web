import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../../services/api';

import { Content, ContentHeader } from './styles';

export default function AdminPoints() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState([]);

  useEffect(() => {
    async function loadRequests() {
      const getRequest = await api.get(`/requests/${id}`).catch((err) => {
        return err;
      });
      if (getRequest.data) {
        setRequest(getRequest.data);
      }
      setLoading(false);
    }
    loadRequests();
  }, [id]);

  if (loading) {
    return <h1>Carregando ...</h1>;
  }
  return (
    <Content>
      <ContentHeader>
        <h1>{request.Point.entity}</h1>
      </ContentHeader>
      <fieldset>
        <h3>Endereço</h3>
        <p>{request.Point.entity}</p>
        <p>{request.Point.fulladdress}</p>
      </fieldset>
      <fieldset>
        <h3>Informações Adicionais</h3>
        <p>{request.name}</p>
        <p>{request.phonecode}</p>
        <p>{request.phone}</p>
        <p>{request.reason}</p>
        <p>{request.comments}</p>
        <p>{request.createdAt}</p>
      </fieldset>
    </Content>
  );
}
