import { Container } from '@mui/material';
import { SimpleCard } from 'app/components';
import { use } from 'echarts';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UnVerifyUser = () => {
  let params = useParams();
  console.log(params.userId);
  useEffect(() => {}, []);
  return (
    <Container>
      <SimpleCard title="Un Verify User"></SimpleCard>
    </Container>
  );
};

export default UnVerifyUser;
