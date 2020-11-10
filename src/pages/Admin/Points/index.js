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
  const [points, setPoints] = useState([]);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    async function loadRequests() {
      const getPoints = await api
        .get(`/points?filter=${filter}`)
        .catch((err) => {
          return err;
        });
      if (getPoints.data) {
        setPoints(getPoints.data);
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
            accessor: 'entity',
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
              <Link to={`/admin/points/view/${tableProps.value}`}>
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
    { value: 'active', label: 'Ativos' },
    { value: 'pending', label: 'Pendentes' },
    { value: 'excluded', label: 'Inativos' },
  ];

  return (
    <Content>
      <header>
        <h1>Pontos</h1>
        <SelectBox>
          <Select
            options={options}
            defaultValue={options[2]}
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
          {points.length <= 0 ? (
            <h3>Nenhum registro encontrado!</h3>
          ) : (
            <Table columns={columns} data={points} />
          )}
        </TableContent>
      )}
    </Content>
  );
}
