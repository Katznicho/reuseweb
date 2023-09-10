import {
  Alert,
  AlertTitle,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Icon,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Radio,
  RadioGroup,
  TextField,
  styled
} from '@mui/material';
import { Span } from 'app/components/Typography';
import { useEffect, useState } from 'react';

// const TextField = styled()(() => ({
//   width: '100%',
//   marginBottom: '16px'
// }));

const ProductsForm = ({ productDetails, setProductDetails }) => {
  console.log('=====================================');
  console.log(JSON.stringify(productDetails));
  console.log('=====================================');
  return (
    <div>
      <Grid container spacing={6}>
        {/* cover image */}
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
          <Alert severity="info">
            <AlertTitle>Cover Image</AlertTitle>
            <strong>These are the Uploaded Product Cover Image</strong>
          </Alert>
          <Container>
            <img
              src={`${productDetails?.data?.product?.coverImage}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${productDetails?.data?.product?.coverImage}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={productDetails?.data?.product?.coverImage}
              loading="lazy"
            />
          </Container>
        </Grid>
        {/* cover image */}
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
          <Alert severity="info">
            <AlertTitle>Product Images</AlertTitle>
            <strong>These are the Uploaded Product Images</strong>
          </Alert>
          <ImageList sx={{ width: '80%', height: 'auto' }} cols={4}>
            {productDetails?.data?.product?.images?.map((item, index) => (
              <ImageListItem key={item} style={{ margin: '10px' }}>
                <img
                  src={`${item}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={`Product Image ${index + 1}`}
                  //   subtitle={<span>by: {item.author}</span>}
                  position="below"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>

        <Grid item lg={6} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
          <Alert severity="info">
            <AlertTitle>Product Title</AlertTitle>
          </Alert>
          <TextField
            type="text"
            name="Product Title"
            id="standard-basic"
            value={productDetails?.data?.product?.title}
            // label="Product Title"
            style={{
              width: '100%',
              marginBottom: '16px'
            }}
            disabled={true}
          />

          <Alert severity="info">
            <AlertTitle>Product Category</AlertTitle>
          </Alert>

          <TextField
            type="text"
            name="category"
            // label="First Name"
            value={productDetails?.data?.product?.category}
            style={{
              width: '100%',
              marginBottom: '16px'
            }}
            disabled={true}
          />

          <Alert severity="info">
            <AlertTitle>Product Description</AlertTitle>
          </Alert>

          <TextField
            type="text"
            value={productDetails?.data?.product?.description}
            style={{
              width: '100%',
              marginBottom: '16px'
            }}
            disabled={true}
          />
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
          <Alert severity="info">
            <AlertTitle>Product Estimated Weight</AlertTitle>
          </Alert>
          <TextField
            type="text"
            id="standard-basic"
            value={productDetails?.data?.product?.estimatedWeight}
            style={{
              width: '100%',
              marginBottom: '16px'
            }}
          />

          <Alert severity="info">
            <AlertTitle>Product Status</AlertTitle>
          </Alert>
          <TextField type="text" value={productDetails?.data?.product?.status} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductsForm;
