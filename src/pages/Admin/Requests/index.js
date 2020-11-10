import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Select from 'react-select';
import Table from '../../../Components/Table';
import api from '../../../services/api';

import { Content, TableContent, SelectBox } from './styles';
import * as color from '../../../styles/colors';

export default function AdminPoints() {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    async function loadRequests() {
      const getRequest = await api
        .get(`/requests?filter=${filter}`)
        .catch((err) => {
          return err;
        });
      if (getRequest.data) {
        setRequests(getRequest.data);
      }
      setLoading(false);
    }
    loadRequests();
  }, [filter]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'Ponto',
            accessor: 'Point.entity',
          },
          {
            Header: 'Solicitante',
            accessor: 'name',
          },
          {
            Header: 'Data',
            accessor: 'createdAt',
            Cell: (tableProps) => (
              <span>
                {format(parseISO(tableProps.value), 'dd/MM/yyyy', {
                  locale: pt,
                })}
              </span>
            ),
          },
          {
            Header: 'Ações',
            accessor: 'id',
            Cell: (tableProps) => (
              <Link to={`/admin/requests/view/${tableProps.value}`}>
                <FiEye size={20} color={color.secundary} />
              </Link>
            ),
          },
        ],
      },
    ],
    []
  );

  const options = [
    { value: '', label: 'Todos' },
    { value: 'pending', label: 'Pendentes' },
    { value: 'excluded', label: 'Concluídos' },
  ];

  return (
    <Content>
      <header>
        <h1>Requisições</h1>
        <SelectBox>
          <Select
            options={options}
            defaultValue={options[1]}
            onChange={(event) => {
              setFilter(event.value);
            }}
          />
        </SelectBox>
      </header>
      <p>Confira abaixo suas requisições</p>
      {loading ? (
        'carregando'
      ) : (
        <TableContent>
          {requests.msg ? (
            <h3>{requests.msg}</h3>
          ) : (
            <Table columns={columns} data={requests} />
          )}
        </TableContent>
      )}
    </Content>
  );
}
