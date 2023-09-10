import { Container } from '@mui/material';
import { SimpleCard } from 'app/components';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  let params = useParams();
  console.log(params.userId);
  useEffect(() => {}, []);
  return (
    <Container>
      <SimpleCard title="Details Page"></SimpleCard>
    </Container>
  );
};

export default UserDetails;
