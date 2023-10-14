import { Box, Stack, styled } from '@mui/material';
import { Breadcrumb, MatxLoading, SimpleCard } from 'app/components';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductsForm from '../material-kit/forms/ProductsForm';
import { getProductById, getCategoryById, getUserById } from '../../../firebase';

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
  const [categories, setCategories] = useState('');
  const [users, setUsers] = useState({});
  const [community, setCommunity] = useState({});
  const [loading, setLoading] = useState(false);
  let params = useParams();
  useEffect(async () => {
    try {
      setLoading(true);
      const productDetails = await getProductById(params.productId);
      setProductDetails(productDetails);
      if (productDetails) {
        const category = await getCategoryById(productDetails?.data?.category);
        console.log(category);
        setCategories(category);
        const user = await getUserById(productDetails?.data?.userId);
        console.log(user);
        setUsers(user);
        const community = await getUserById(productDetails?.data?.receiverCommunity);
        console.log(community);
        setCommunity(community);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <MatxLoading />;
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'product', path: '/details' }, { name: 'Product' }]} />
      </Box>
      <Stack spacing={3}>
        <SimpleCard title="Product Details">
          <ProductsForm
            productDetails={productDetails}
            setProductDetails={setProductDetails}
            category={categories}
            user={users}
            community={community}
          />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default ProductDetails;
