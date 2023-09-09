import React, { Fragment } from 'react';
import { Box, Card, Grid, styled, useTheme } from '@mui/material';
import PaginationTable from '../material-kit/tables/PaginationTable';
import { Breadcrumb, SimpleCard } from 'app/components';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const Products = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Products', path: '/products/all' }, { name: 'All Products' }]}
        />
      </Box>

      <SimpleCard title="Pagination Table">
        <PaginationTable />
      </SimpleCard>
    </Container>
  );
};

export default Products;
