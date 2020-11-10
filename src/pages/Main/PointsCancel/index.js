import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiRotateCw } from 'react-icons/fi';
import Header from '../../../Components/Header';
import Input from '../../../Components/Form/Input';
import Textarea from '../../../Components/Form/Textarea';
import Toogle from '../../../Components/Toggle';
import api from '../../../services/api';
import { Fieldset, FieldGroup, Field, Label } from '../../../styles/form';
import { PageCancelPoint, Content, FormBox } from './styles';

export default function PointsCancel() {
  const { id } = useParams();
  const formRef = useRef();
  const history = useHistory();
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const [whatsapp, setWhatsapp] = useState(false);

  const [point, setPoint] = useState({});

  useEffect(() => {
    async function loadPoint() {
      const getPoint = await api.get(`/points/${id}`).catch((err) => {
        return err;
      });
      if (getPoint) {
        setPoint(getPoint.data);
      }
    }
    loadPoint();
  }, [id]);

  async function handleSubmit(data) {
    data.whatsapp = whatsapp;
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        phonecode: Yup.string().required('Campo obrigatório'),
        phone: Yup.string().required('Campo obrigatório'),
        reason: Yup.string().required('Campo obrigatório'),
        comments: Yup.string(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed
      setLoading(true);
      const request = await api.post(`/requests`, data).catch((err) => {
        setLoading(false);
        return err;
      });

      if (!request.data) {
        setLoading(false);
        return toast.error(request.response.data.msg);
      }

      setLoading(false);
      toast.success('Solicitação enviada ao setor responsável.');
      return history.push('/');

      // Validation passed
    } catch (err) {
      setLoading(false);
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
    <PageCancelPoint>
      <Content>
        <Header />
        <FormBox ref={formRef} onSubmit={handleSubmit}>
          <h1>
            Solicitar <br />
            cancelamento.
          </h1>
          <Fieldset>
            <Field>
              <Label htmlFor="entity">Nome da entidade</Label>
              <Input
                type="text"
                id="entity"
                name="entity"
                value={point.entity}
                disabled
              />
              <Input
                type="text"
                id="point_id"
                name="point_id"
                value={point.id}
                hidden
              />
            </Field>
            <Field>
              <Label htmlFor="name">Nome*</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Nome Completo"
              />
            </Field>
            <FieldGroup>
              <Field>
                <Label htmlFor="phonecode">DDD*</Label>
                <Input type="text" id="phonecode" name="phonecode" />
              </Field>
              <Field>
                <Label htmlFor="phone">Telefone*</Label>
                <Input type="text" id="phone" name="phone" />
              </Field>
            </FieldGroup>
            <Toogle
              ask="Caso seja celular, possuí whatsapp?"
              checked={whatsapp}
              onChange={() => {
                setWhatsapp(!whatsapp);
              }}
              name="whatsapp"
            />
            <Field>
              <Label htmlFor="reason">Motivo do cancelamento:*</Label>
              <Textarea
                rows={4}
                id="reason"
                name="reason"
                placeholder="Mensagem"
              />
            </Field>
            <Field>
              <Label htmlFor="comments">Críticas ou Sugestões:</Label>
              <Textarea
                rows={4}
                id="comments"
                name="comments"
                placeholder="Mensagem"
              />
            </Field>
            <Field>
              <Label htmlFor="confirm">
                Digite CANCELAR para confirma sua solicitação
              </Label>
              <Input
                type="text"
                id="confirm"
                name="confirm"
                placeholder="Ex. CANCELAR"
                onChange={(e) => setConfirm(e.target.value)}
              />
            </Field>
          </Fieldset>
          {confirm === 'CANCELAR' ? (
            <button type="submit">
              {!loading ? (
                `Solicitar Cancelamento`
              ) : (
                <span>
                  <FiRotateCw className="loading" /> Aguarde
                </span>
              )}
            </button>
          ) : null}
        </FormBox>
      </Content>
    </PageCancelPoint>
  );
}
