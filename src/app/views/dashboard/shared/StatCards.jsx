import { useEffect, useState } from 'react';
import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';
import { getTotalProducts, getTotalUsers } from '../../../../firebase';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' }
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main }
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main
}));

const StatCards = () => {
  const [cardList, setCardList] = useState([
    { name: 'Total Users', amount: 0, icon: 'group' },
    { name: 'Total Donations', amount: '$0', icon: 'attach_money' },
    { name: 'Total Products', amount: '0% Stock Surplus', icon: 'store' },
    { name: 'Products to deliver', amount: '0 Orders', icon: 'shopping_cart' }
  ]);
  useEffect(() => {
    // Define your Firestore functions here and update the state
    const updateDashboardData = async () => {
      try {
        const totalUsers = await getTotalUsers(); // Assuming you have a function for this
        const totalProducts = await getTotalProducts(); // Assuming you have a function for this
        // You can fetch other data similarly

        setCardList([
          { name: 'Total Users', amount: totalUsers, icon: 'group' },
          { name: 'Total Donations', amount: '$80,500', icon: 'attach_money' },
          { name: 'Total Products', amount: `${totalProducts} Stock Surplus`, icon: 'store' },
          { name: 'Products to deliver', amount: '0 Orders', icon: 'shopping_cart' }
          // Update other cards as needed
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    updateDashboardData();
  }, []);

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.amount}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
