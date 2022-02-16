import React from 'react';
import {ReactComponent as ErrorImage} from '../../../content/error.svg';
import './Error.scss';

type ErrorProps = {
  error: string;
}

const Error: React.FC<ErrorProps> = ({error}) => {
  return (
    <div className="error">
      <ErrorImage/>
      <h1 className="error__text">{error}</h1>
    </div>
  );
};

export default Error;
