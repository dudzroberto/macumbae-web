import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import { GoVerified } from 'react-icons/go';
import { MdAccessible } from 'react-icons/md';
import { FiPhoneCall } from 'react-icons/fi';
import { RiRouteFill } from 'react-icons/ri';
import { FaWhatsapp } from 'react-icons/fa';
import Header from '../../../Components/Header';
import api from '../../../services/api';
import {
  PageViewPoint,
  Content,
  Ponto,
  Title,
  Legend,
  Acessibility,
  Warning,
  Actions,
} from './styles';

export default function PointsView() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [initialPosition, setInitialPosition] = useState({ lat: 0, lng: 0 });
  const [point, setPoint] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    async function loadPoint() {
      await api
        .get(`/points/${id}`)
        .then((response) => {
          const imageurl = `http://localhost:5000/uploads/${response.data.image}`;

          const newPoint = {
            ...response.data,
            imageurl,
          };
          setPoint(newPoint);
          setLoading(false);
        })
        .catch((err) => {
          return err;
        });
    }
    loadPoint();
  }, [id]);

  if (loading) {
    return null;
  }

  return (
    <PageViewPoint>
      <Content>
        <Header />
        <Ponto>
          <img src={point.imageurl} alt="Foto" />
          <Title>
            <h1>{point.entity}</h1>
          </Title>
          <Legend>
            <h2>Endereço</h2>
            <span>{point.fulladdress}</span>
            <MapContainer
              center={{ lat: point.latitude, lng: point.longitude }}
              zoom={17}
              scrollWheelZoom
            >
              <TileLayer
                attribution='&map;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
              />
              <Marker
                position={{ lat: point.latitude, lng: point.longitude }}
              />
            </MapContainer>
          </Legend>
          <Legend>
            <h2>Atendimento</h2>
            <span>{point.attendance}</span>
            {!point.accessibility && !point.priority ? null : (
              <Acessibility>
                <div>
                  <MdAccessible />
                </div>
                {point.accessibility && point.priority
                  ? 'Ambiente acessível e atendimento preferêncial.'
                  : null}
                {point.accessibility && !point.priority
                  ? 'Ambiente com acessibilidade disponível.'
                  : null}
                {!point.accessibility && point.priority
                  ? 'Atendimento preferêncial.'
                  : null}
              </Acessibility>
            )}
          </Legend>
          <Actions>
            <a
              href={`https://www.google.com/maps/dir/${initialPosition.lat},${initialPosition.lng}/${point.latitude},${point.longitude}/`}
              target="blank"
            >
              <span>
                <RiRouteFill />
              </span>
              <strong>Como Chegar</strong>
            </a>
            {point.whatsapp ? (
              <a
                href={`https://api.whatsapp.com/send?phone=${point.phonecode}${point.phone}`}
                target="blank"
              >
                <span>
                  <FaWhatsapp />
                </span>
                <strong>
                  ({point.phonecode}) {point.phone}
                </strong>
              </a>
            ) : (
              <a href={`tel:${point.phonecode}${point.phone}`} target="blank">
                <span>
                  <FiPhoneCall />
                </span>
                <strong>
                  ({point.phonecode}) {point.phone}
                </strong>
              </a>
            )}
          </Actions>
          <Warning to={`/cancel-point/${id}`}>
            Clique aqui caso seja o dirigente espiritual dessa instituição e
            queira se descadastrar.
          </Warning>
        </Ponto>
      </Content>
    </PageViewPoint>
  );
}
