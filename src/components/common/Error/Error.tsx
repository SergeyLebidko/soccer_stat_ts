import React from 'react';
import './Error.scss';

type ErrorProps = {
  error: string;
}

const Error: React.FC<ErrorProps> = ({error}) => {
  return <div>{error}</div>;
};

export default Error;
