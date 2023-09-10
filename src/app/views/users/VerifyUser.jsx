import { Container } from '@mui/material';
import { SimpleCard } from 'app/components';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VerifyUser = () => {
  let params = useParams();
  console.log(params.userId);
  useEffect(() => {}, []);
  return (
    <Container>
      <SimpleCard title="Verify User"></SimpleCard>
    </Container>
  );
};

export default VerifyUser;
