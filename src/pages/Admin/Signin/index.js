import React, { useEffect, useState, useRef } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { MdLockOutline } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import { FiRotateCw, FiLogIn } from 'react-icons/fi';
import Input from '../../../Components/Form/Input';
import Logo from '../../../Components/Logo';

import api from '../../../services/api';

import {
  PageHome,
  Content,
  FormBox,
  Header,
  Fieldset,
  Icon,
  Button,
} from './styles';

export default function Home() {
  const formRef = useRef(null);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('macumbae'));
    if (storage) {
      history.push('/admin/dashboard');
    }
  });

  async function handleSubmit(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().email().required('Campo obrigatório'),
        password: Yup.string()
          .min(6, 'Mínimo 6 caractres.')
          .required('Campo obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed
      setLoading(true);

      const session = await api.post('/session', data).catch((err) => {
        setLoading(false);
        return toast.error(err.response.data);
      });

      if (session) {
        const { name, email } = session.data.user;
        const { hash } = session.data;

        localStorage.setItem('macumbae', JSON.stringify({ name, email, hash }));
        history.push('/admin/dashboard');
      }

      // Validation passed
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
    <PageHome>
      <Content>
        <FormBox ref={formRef} onSubmit={handleSubmit}>
          <Header>
            <Logo />
          </Header>
          <Fieldset>
            <Icon>
              <MdLockOutline />
            </Icon>
            <Input type="email" name="email" />
          </Fieldset>
          <Fieldset>
            <Icon>
              <HiOutlineMail />
            </Icon>
            <Input type="password" name="password" />
          </Fieldset>
          <Button type="submit" disabled={loading}>
            {!loading ? (
              <span>
                <FiLogIn /> Entrar
              </span>
            ) : (
              <span>
                <FiRotateCw className="loading" /> Aguarde
              </span>
            )}
          </Button>
        </FormBox>
      </Content>
    </PageHome>
  );
}
