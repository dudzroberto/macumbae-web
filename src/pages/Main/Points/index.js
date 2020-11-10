import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useHistory } from 'react-router-dom';
// import AdSenseComponent from '../../../Components/Adsense';
import Header from '../../../Components/Header';
import {
  iconMarker,
  iconLocal,
  iconDisabled,
} from '../../../Components/Marker';
import api from '../../../services/api';
import { PagePoint, Content, MapBox, MapLoading } from './styles';

const Points = () => {
  const history = useHistory();
  const [markers, setMarkers] = useState();
  const [initialPosition, setInitialPosition] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    async function loadMarkers() {
      const getMarkers = await api.get('/points?filter=map').catch((err) => {
        return err;
      });
      setMarkers(getMarkers.data);
    }
    loadMarkers();
  }, []);

  function selectMarker(marker) {
    const lat = marker.latitude;
    const lng = marker.longitude;

    if (marker.published) {
      return (
        <Marker
          position={[lat, lng]}
          icon={iconMarker}
          eventHandlers={{
            click: () => {
              history.push(`/view-point/${marker.id}`);
            },
          }}
        >
          <Popup>Aguardando aprovação!</Popup>
        </Marker>
      );
    }
    return (
      <Marker position={[lat, lng]} icon={iconDisabled}>
        <Popup>Aguardando aprovação!</Popup>
      </Marker>
    );
  }

  return (
    <PagePoint>
      {/* <Adsense>
        <AdSenseComponent />
      </Adsense> */}
      <Content>
        <Header />
      </Content>
      <MapBox>
        {!markers ? (
          <MapLoading>Carregando mapa ...</MapLoading>
        ) : (
          <MapContainer center={initialPosition} zoom={13} scrollWheelZoom>
            <TileLayer
              attribution='&map;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
            />
            <Marker position={initialPosition} icon={iconLocal}>
              <Popup>Sua localização!</Popup>
            </Marker>

            {markers.map((marker) => {
              return selectMarker(marker);
            })}
          </MapContainer>
        )}
      </MapBox>
    </PagePoint>
  );
};

export default Points;
