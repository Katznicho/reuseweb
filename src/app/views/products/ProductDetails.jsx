import { Box, Stack, styled } from '@mui/material';
import { Breadcrumb, MatxLoading, SimpleCard } from 'app/components';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductsForm from '../material-kit/forms/ProductsForm';
import { getProductById } from '../../../firebase';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false);
  let params = useParams();
  useEffect(async () => {
    try {
      const productDetails = await getProductById(params.productId);
      setProductDetails(productDetails);
    } catch (error) {}
  }, []);

  if (loading) return <MatxLoading />;
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'product', path: '/details' }, { name: 'Product' }]} />
      </Box>
      <Stack spacing={3}>
        <SimpleCard title="Product Details">
          <ProductsForm productDetails={productDetails} setProductDetails={setProductDetails} />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default ProductDetails;
