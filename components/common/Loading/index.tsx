import React from 'react';
import { Loading, LoadingProps } from '@nextui-org/react';

type Props = {
  color?: LoadingProps['color'];
};

const Loader = ({ color = 'secondary' }: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Loading color={color} />
    </div>
  );
};

export default Loader;
