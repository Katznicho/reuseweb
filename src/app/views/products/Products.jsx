import React from 'react';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import ProductTable from '../material-kit/tables/ProductTable';

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

      <SimpleCard title="Products Table">
        <ProductTable />
      </SimpleCard>
    </Container>
  );
};

export default Products;
