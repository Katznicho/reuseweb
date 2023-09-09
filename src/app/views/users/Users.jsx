import React, { Fragment } from 'react';
import PaginationTable from '../material-kit/tables/PaginationTable';
import { Box, Card, Grid, styled, useTheme } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

function Users() {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Users', path: '/users/all' }, { name: 'Users' }]} />
      </Box>

      <SimpleCard title="Pagination Table">
        <PaginationTable />
      </SimpleCard>
    </Container>
  );
}

export default Users;
