import React from 'react';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import UserTable from '../material-kit/tables/UserTable';

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

      <SimpleCard title="Users Table">
        <UserTable />
      </SimpleCard>
    </Container>
  );
}

export default Users;
