import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as Yup from 'yup';
import { FiRotateCw, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Header from '../../../Components/Header';
import Dropzone from '../../../Components/Dropzone';
import Toogle from '../../../Components/Toggle';
import Input from '../../../Components/Form/Input';
import Textarea from '../../../Components/Form/Textarea';

import { Fieldset, FieldGroup, Field, Label } from '../../../styles/form';
import {
  PageCreatePoint,
  Content,
  FormBox,
  LeafletAdvisor,
  ZipcodeIcon,
  Address,
} from './styles';

export default function PointsCreateUpdate() {
  const history = useHistory();
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [loadingMap, setLoadingMap] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  const [initialPosition, setInitialPosition] = useState({ lat: 0, lng: 0 });
  const [selectedPosition, setSelectedPosition] = useState({ lat: 0, lng: 0 });
  const [zipcode, setZipcode] = useState();

  const [checkbox, setCheckbox] = useState({
    owner: false,
    document: false,
    whatsapp: false,
    accessibility: false,
    priority: false,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition({ lat: latitude, lng: longitude });
    });
  }, []);

  async function handleZipcodeAddress(event) {
    const zipcodeHandle = event.target.value;
    if (zipcodeHandle.length <= 7) {
      setZipcode();
    }
    if (zipcodeHandle.length === 8) {
      await axios
        .get(`https://viacep.com.br/ws/${zipcodeHandle}/json/`)
        .then(async (res) => {
          if (res.data) {
            const { bairro, cep, localidade, logradouro, uf } = res.data;
            setZipcode({ bairro, cep, localidade, logradouro, uf });
            const formatLogradouro = logradouro.split(' ').join('+');
            await axios
              .get(
                `https://nominatim.openstreetmap.org/search?q=${formatLogradouro}&format=json`
              )
              .then((response) => {
                const { lat, lon } = response.data[0];
                setInitialPosition({ lat, lng: lon });
                setSelectedPosition({ lat, lng: lon });
                setLoadingMap(true);
              })
              .catch((err) => {
                return err;
              });
          }
        });
    }
  }

  function handleCheckboxChange(event) {
    if (event.target.name === 'owner' && checkbox.doc) {
      setCheckbox({
        ...checkbox,
        [event.target.name]: event.target.checked,
        document: false,
      });
    } else {
      setCheckbox({
        ...checkbox,
        [event.target.name]: event.target.checked,
      });
    }
  }

  function LocationMarker() {
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            const { lat, lng } = marker.getLatLng();
            setSelectedPosition({ lat, lng });
          }
        },
      }),
      []
    );

    return selectedPosition === null ? null : (
      <Marker
        ref={markerRef}
        draggable
        eventHandlers={eventHandlers}
        position={selectedPosition}
      />
    );
  }

  async function handleSubmit(data) {
    const imageFile = new FormData();

    if (selectedFile) {
      imageFile.append('file', selectedFile);
    }

    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        owner: Yup.boolean(),
        document: Yup.string().when('documentchecked', {
          is: true,
          then: Yup.string()
            .min(14, 'Formato de CPNJ inválido')
            .required('Campo obrigatório'),
        }),
        entity: Yup.string().required('Campo obrigatório'),
        zipcode: Yup.string().required('Campo obrigatório'),
        number: Yup.string().required('Campo obrigatório'),
        attendance: Yup.string().required('Campo obrigatório'),
        phonecode: Yup.string().required('Campo obrigatório'),
        phone: Yup.string().required('Campo obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      // Validation passed START //
      setLoading(true);

      const fullAddress = `${zipcode.logradouro}, ${data.number} - ${zipcode.bairro} - CEP ${zipcode.cep} - ${zipcode.localidade} - ${zipcode.uf}`;

      data.fulladdress = fullAddress;
      data.owner = checkbox.owner;
      data.documentchecked = checkbox.document;
      data.whatsapp = checkbox.whatsapp;
      data.accessibility = checkbox.accessibility;
      data.priority = checkbox.priority;

      const { lat, lng } = selectedPosition;
      data.latitude = lat;
      data.longitude = lng;

      const imageUpload = await api
        .post('/points/file', imageFile)
        .catch((err) => {
          setLoading(false);
          return err;
        });

      if (imageUpload) {
        data.image = imageUpload.data.filename;
        const point = await api.post('/points', data).catch((err) => {
          setLoading(false);
          return err;
        });

        if (point) {
          setLoading(false);
          history.push('/');
        }
      }
      // Validation passed END //
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
    return null;
  }

  return (
    <PageCreatePoint>
      <Content>
        <Header />
        <FormBox ref={formRef} onSubmit={handleSubmit}>
          <h1>
            Cadastro da <br />
            casa espiritual.
          </h1>
          <p>
            Basta preencher o formulário abaixo com o maior número de detalhes
            possível e clicar em cadastrar local. O local será cadastrado e
            ficará em análise até que nossa equipe possa confirmar os dados e
            liberar para acesso.
          </p>
          <Dropzone onFileUploaded={setSelectedFile} />
          <Fieldset>
            <Toogle
              ask="É o dirigente espiritual ou proprietário deste local?"
              checked={checkbox.owner}
              onChange={handleCheckboxChange}
              name="owner"
            />
            {!checkbox.owner ? null : (
              <Toogle
                ask="Possuí CNPJ para validação dos dados?"
                checked={checkbox.document}
                onChange={handleCheckboxChange}
                name="document"
              />
            )}
            {!checkbox.document ? null : (
              <Field>
                <Label htmlFor="doc">CNPJ*</Label>
                <Input
                  type="text"
                  name="document"
                  placeholder="Ex. 12.453.222/00001-12"
                />
              </Field>
            )}
            <Field>
              <Label htmlFor="entity">Nome da entidade*</Label>
              <Input
                type="text"
                id="entity"
                name="entity"
                placeholder="Ex. Terreiro de Pai Joaquim"
              />
            </Field>
            <FieldGroup>
              <Field>
                <Label htmlFor="zipcode">CEP*</Label>
                <Input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  placeholder="Ex. 00342-010"
                  defaultValue={!zipcode ? '' : zipcode.cep}
                  onChange={handleZipcodeAddress}
                />
                {!zipcode ? null : (
                  <ZipcodeIcon>
                    <FiCheckCircle color="green" />
                  </ZipcodeIcon>
                )}
                {/* {zipcode ? null : (<ZipcodeIcon><FiXCircle color="red" /></ZipcodeIcon))} */}
              </Field>
              <Field>
                <Label htmlFor="number">Número*</Label>
                <Input
                  type="text"
                  id="number"
                  name="number"
                  placeholder="Ex. 142"
                />
              </Field>
            </FieldGroup>
            {!zipcode ? null : (
              <Address>
                <p>
                  {zipcode.logradouro}, {zipcode.bairro}, {zipcode.cep},{' '}
                  {zipcode.localidade},{zipcode.uf}
                </p>
              </Address>
            )}
            {!loadingMap ? null : (
              <>
                <MapContainer
                  center={initialPosition}
                  zoom={15}
                  scrollWheelZoom
                >
                  <TileLayer
                    attribution='&map;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
                  />
                  <LocationMarker />
                </MapContainer>
                <LeafletAdvisor>
                  <FiInfo size={20} />
                  <p>
                    Localização aproximada, para confirmar a localização clique
                    em um ponto do mapa.
                  </p>
                </LeafletAdvisor>
              </>
            )}
            <Field>
              <Label htmlFor="attendance">Dias e tipo de atendimento*</Label>
              <Textarea
                rows={4}
                id="attendance"
                name="attendance"
                placeholder="Exemplo: Atendimento às sextas feiras com abertura da casa às 19h e início dos trabalhos as 20h. Atendimento por ordem de chega."
              />
            </Field>
            <Toogle
              ask="Este local é acessível para deficientes?"
              checked={checkbox.accessibility}
              onChange={handleCheckboxChange}
              name="accessibility"
            />
            <Toogle
              ask="Este local tem atendimento prioritário?"
              checked={checkbox.priority}
              onChange={handleCheckboxChange}
              name="priority"
            />
            <FieldGroup>
              <Field>
                <Label htmlFor="phonecode">DDD</Label>
                <Input type="text" id="phonecode" name="phonecode" />
              </Field>
              <Field>
                <Label htmlFor="phone">Telefone</Label>
                <Input type="text" id="phone" name="phone" />
              </Field>
            </FieldGroup>
            <Toogle
              ask="Caso seja celular, possuí whatsapp?"
              checked={checkbox.whatsapp}
              onChange={handleCheckboxChange}
              name="whatsapp"
            />
          </Fieldset>
          <button type="submit">
            {!loading ? (
              `Cadastrar local`
            ) : (
              <span>
                <FiRotateCw className="loading" /> Aguarde
              </span>
            )}
          </button>
        </FormBox>
      </Content>
    </PageCreatePoint>
  );
}
