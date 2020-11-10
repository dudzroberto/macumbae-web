import styled from 'styled-components';
import * as color from './colors';

export const Fieldset = styled.fieldset`
  margin-top: 64px;
  min-inline-size: auto;
  border: 0;
`;

export const Field = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  position: relative;

  input[type='text'],
  input[type='email'],
  input[type='number'],
  textarea {
    flex: 1;
    background: #f9fff8;
    border-radius: 8px;
    padding: 16px 24px;
    font-size: 16px;
    color: #6c6c80;
    border: 1px solid #f9fff8;

    &:focus {
      border-color: ${color.secundary};
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  input::placeholder,
  textarea::placeholder {
    color: #bcbcbc;
  }
`;

export const FieldGroup = styled.div`
  flex: 1;
  display: flex;

  div + div {
    margin-left: 24px;
  }
`;

export const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
`;
