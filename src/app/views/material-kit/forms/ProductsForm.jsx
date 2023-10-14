import {
  Alert,
  AlertTitle,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
  Snackbar
} from '@mui/material';
import React, { useState } from 'react';
import { sendPushNotification, updateProductStatus, storeNotification } from '../../../../firebase';
import { useNavigate } from 'react-router-dom';

const ProductsForm = ({ productDetails, user, category, community }) => {
  const navigate = useNavigate();
  const [isOpenAcceptDialog, setIsOpenAcceptDialog] = useState(false);
  const [isOpenRejectDialog, setIsOpenRejectDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const [totalAmount, setTotalAmount] = useState(0);
  const [reason, setReason] = useState('');

  const handleOpenAcceptDialog = () => {
    setIsOpenAcceptDialog(true);
  };

  const handleOpenRejectDialog = () => {
    setIsOpenRejectDialog(true);
  };

  const handleCloseAcceptDialog = () => {
    setIsOpenAcceptDialog(false);
  };

  const handleCloseRejectDialog = () => {
    setIsOpenRejectDialog(false);
  };

  const onAcceptProduct = () => {
    setLoading(true);
    //update product status to accepted

    const title = `${productDetails?.data?.title} Accepted`;
    const message = `Hello ${user?.data?.firstName} ${user?.data?.lastName} your product has been accepted please check the app for more details`;
    const token = user?.data?.deviceId;

    updateProductStatus(productDetails?.id, 'ACCEPTED', totalAmount, reason);

    if (token) {
      sendPushNotification(title, message, token);
    }

    //store notification

    // Call the storeNotification function with the notification data
    const notificationData = {
      // Add your notification data here,
      description: `Hello ${user?.data?.firstName} ${user?.data?.lastName} your product has been accepted please check the app for more details`,
      status: 'ACCEPTED',
      unRead: true,
      title: `${productDetails?.data?.title} Accepted`,
      userId: productDetails?.data?.userId
    };

    storeNotification(notificationData);

    //close dialog
    handleCloseAcceptDialog();
    setLoading(false);

    //show snackbar
    <Snackbar
      open={true}
      autoHideDuration={6000}
      // onClose={handleClose}
      message="Product accepted successfully"
      // action={action}
    />;

    //navigate  to all products
    navigate('/products/all');
  };

  const onRejectProduct = () => {
    setLoading(true);
    const title = `${productDetails?.data?.title} Rejected`;
    const message = `Hello ${user?.data?.firstName} ${user?.data?.lastName} your product has been rejected please check the app for more details`;
    const token = user?.data?.deviceId;
    updateProductStatus(productDetails?.id, 'REJECTED', totalAmount, reason);
    if (token) {
      sendPushNotification(title, message, token);
    }
    //store notification
    const notificationData = {
      description: `Hello ${user?.data?.firstName} ${user?.data?.lastName} your product has been rejected please check the app for more details`,
      status: 'REJECTED',
      unRead: true,
      title: `${productDetails?.data?.title} Rejected`,
      userId: productDetails?.data?.userId
    };

    storeNotification(notificationData);
    //close dialog
    handleCloseRejectDialog();
    setLoading(false);

    navigate('/products/all');
  };

  return (
    <div>
      <Grid container spacing={6}>
        {/* accept dialog */}
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
          <Dialog onClose={handleCloseAcceptDialog} open={isOpenAcceptDialog}>
            <DialogTitle>Total Amount</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter the Total Amount.</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="amount"
                label="Amount"
                type="text"
                fullWidth
                onChange={(e) => setTotalAmount(e.target.value)}
              />
              <DialogContentText>Enter Description</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="reason"
                label="Enter Description"
                type="text"
                fullWidth
                onChange={(e) => setReason(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAcceptDialog} color="error">
                Cancel
              </Button>
              <Button color="success" onClick={onAcceptProduct} disabled={loading}>
                Accept Product
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        {/* accept dialog */}

        {/* reject dialog */}
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
          <Dialog onClose={handleCloseRejectDialog} open={isOpenRejectDialog}>
            <DialogTitle>Reject Reason</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter the reject reason</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                onChange={(e) => setReason(e.target.value)}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRejectDialog} color="error">
                Cancel
              </Button>
              <Button onClick={onRejectProduct} color="success" disabled={loading}>
                Reject Product
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        {/* reject dialog */}
        {/* cover image */}
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
          <Alert severity="info">
            <AlertTitle>Cover Image</AlertTitle>
            <strong>These are the Uploaded Product Cover Image</strong>
          </Alert>
          <Container>
            <img
              src={`${productDetails?.data?.coverImage}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${productDetails?.data?.coverImage}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={productDetails?.data?.coverImage}
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
            {productDetails?.data?.images?.map((item, index) => (
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
            value={productDetails?.data?.title}
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
            value={category?.data?.name}
            style={{
              width: '100%',
              marginBottom: '16px'
            }}
            disabled={true}
          />

          {/* price */}
          <Alert severity="info">
            <AlertTitle>Product Price</AlertTitle>
          </Alert>

          <TextField
            type="text"
            name="category"
            value={productDetails?.data?.price}
            style={{
              width: '100%',
              marginBottom: '16px'
            }}
            disabled={true}
          />
          {/* price */}

          {/* community */}
          <Alert severity="info">
            <AlertTitle>Receiver Community </AlertTitle>
          </Alert>

          <TextField
            type="text"
            name="category"
            value={community?.data?.communityName}
            style={{
              width: '100%',
              marginBottom: '16px'
            }}
            disabled={true}
          />
          {/* community */}

          <Alert severity="info">
            <AlertTitle>Product Description</AlertTitle>
          </Alert>

          <TextField
            type="text"
            value={productDetails?.data?.description}
            style={{
              width: '100%',
              marginBottom: '16px'
            }}
            disabled={true}
          />
          {/* pick up location */}
          <Alert severity="info">
            <AlertTitle>Product Location</AlertTitle>
          </Alert>

          <TextField
            type="text"
            value={productDetails?.data?.estimatedPickUp}
            style={{
              width: '100%',
              marginBottom: '16px'
            }}
            disabled={true}
          />
          {/* pick up location */}
        </Grid>

        <Grid item lg={6} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
          <Alert severity="info">
            <AlertTitle>Product Estimated Weight</AlertTitle>
          </Alert>
          <TextField
            type="text"
            id="standard-basic"
            value={productDetails?.data?.estimatedWeight}
            style={{
              width: '100%',
              marginBottom: '16px'
            }}
            disabled={true}
          />
          {/* isFree */}
          <Alert severity="info">
            <AlertTitle>Is Product Free </AlertTitle>
          </Alert>
          <TextField
            type="text"
            id="standard-basic"
            value={productDetails?.data?.isFree ? 'Yes' : 'No'}
            style={{
              width: '100%',
              marginBottom: '16px'
            }}
            disabled={true}
          />
          {/* isFree */}

          {/* is avaialable for all */}
          <Alert severity="info">
            <AlertTitle>Is Product Available For All </AlertTitle>
          </Alert>
          <TextField
            type="text"
            id="standard-basic"
            value={productDetails?.data?.isProductAvailableForAll ? 'Yes' : 'No'}
            style={{
              width: '100%',
              marginBottom: '16px'
            }}
            disabled={true}
          />
          {/* is available for all */}

          {/* delivery fee covered */}
          <Alert severity="info">
            <AlertTitle>Is Product Delivery Fee Covered </AlertTitle>
          </Alert>
          <TextField
            type="text"
            id="standard-basic"
            value={productDetails?.data?.isDeliveryFeeCovered ? 'Yes' : 'No'}
            style={{
              width: '100%',
              marginBottom: '16px'
            }}
            disabled={true}
          />
          {/* deliver fee covered */}

          {/* product damaged */}
          <Alert severity="info">
            <AlertTitle>Is Product Damaged </AlertTitle>
          </Alert>
          <TextField
            type="text"
            id="standard-basic"
            value={productDetails?.data?.isProductDamaged ? 'Yes' : 'No'}
            style={{
              width: '100%',
              marginBottom: '16px'
            }}
            disabled={true}
          />
          {/* product damaged */}

          {/* damage info */}
          {/* damage info */}

          <Alert severity="info">
            <AlertTitle>Product Status</AlertTitle>
          </Alert>
          <TextField
            type="text"
            value={productDetails?.data?.status}
            disabled={true}
            style={{
              width: '100%',
              marginBottom: '16px'
            }}
          />
        </Grid>

        {/* owner details */}
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
          <Alert severity="info">
            <AlertTitle>Owner Details</AlertTitle>
          </Alert>
          <div style={{ marginTop: '16px' }}></div>

          <Alert severity="info">
            <AlertTitle>Product Owner</AlertTitle>
          </Alert>
          <TextField
            type="text"
            value={`${user?.data?.firstName} ${user?.data?.lastName}`}
            disabled={true}
            style={{
              width: '100%',
              marginBottom: '16px'
            }}
          />

          {/* accept product */}
          <Button
            variant="contained"
            onClick={handleOpenAcceptDialog}
            style={{
              width: '100%',
              marginBottom: '16px'
            }}
            color="success"
          >
            Accept Product
          </Button>
          {/* accept product */}

          {/* cancel product */}
          <Button
            variant="contained"
            onClick={handleOpenRejectDialog}
            style={{
              width: '100%',
              marginBottom: '16px'
            }}
            color="error"
          >
            Reject Product
          </Button>
          {/* cancel product */}
        </Grid>
        {/* owner details */}
      </Grid>
    </div>
  );
};

export default ProductsForm;
