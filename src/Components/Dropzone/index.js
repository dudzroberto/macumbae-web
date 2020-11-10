import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import { DropzoneBox } from './styles';

export default function Dropzone({ onFileUploaded }) {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileUrl = URL.createObjectURL(file);
      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <DropzoneBox {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Point thumbnail" />
      ) : (
        <p>
          <FiUpload />
          <span>Imagem em formato paisagem.</span>
        </p>
      )}
    </DropzoneBox>
  );
}

Dropzone.propTypes = {
  onFileUploaded: PropTypes.func,
};

Dropzone.defaultProps = {
  onFileUploaded: null,
};
