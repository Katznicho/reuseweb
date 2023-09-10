import { Container } from '@mui/material';
import { SimpleCard } from 'app/components';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const AcceptProducts = () => {
  let params = useParams();
  console.log(params.productId);
  useEffect(() => {}, []);

  return (
    <Container>
      <SimpleCard title="Product Details"></SimpleCard>
    </Container>
  );
};
