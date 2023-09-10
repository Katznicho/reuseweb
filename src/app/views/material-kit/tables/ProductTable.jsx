import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { useState } from 'react';

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

const ProductTable = () => {
  const [products, setProducts] = useState([
    {
      name: 'john doe',
      date: '18 january, 2019',
      amount: 1000,
      status: 'close',
      company: 'ABC Fintech LTD.'
    },
    {
      name: 'kessy bryan',
      date: '10 january, 2019',
      amount: 9000,
      status: 'open',
      company: 'My Fintech LTD.'
    },
    {
      name: 'kessy bryan',
      date: '10 january, 2019',
      amount: 9000,
      status: 'open',
      company: 'My Fintech LTD.'
    },
    {
      name: 'james cassegne',
      date: '8 january, 2019',
      amount: 5000,
      status: 'close',
      company: 'Collboy Tech LTD.'
    },
    {
      name: 'lucy brown',
      date: '1 january, 2019',
      amount: 89000,
      status: 'open',
      company: 'ABC Fintech LTD.'
    },
    {
      name: 'lucy brown',
      date: '1 january, 2019',
      amount: 89000,
      status: 'open',
      company: 'ABC Fintech LTD.'
    },
    {
      name: 'lucy brown',
      date: '1 january, 2019',
      amount: 89000,
      status: 'open',
      company: 'ABC Fintech LTD.'
    },
    {
      name: 'lucy brown',
      date: '1 january, 2019',
      amount: 89000,
      status: 'open',
      company: 'ABC Fintech LTD.'
    },
    {
      name: 'lucy brown',
      date: '1 january, 2019',
      amount: 89000,
      status: 'open',
      company: 'ABC Fintech LTD.'
    }
  ]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">Company</TableCell>
            <TableCell align="center">Start Date</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product, index) => (
              <TableRow key={index}>
                <TableCell align="left">{product.name}</TableCell>
                <TableCell align="center">{product.company}</TableCell>
                <TableCell align="center">{product.date}</TableCell>
                <TableCell align="center">{product.status}</TableCell>
                <TableCell align="center">${product.amount}</TableCell>
                <TableCell align="right">
                  <IconButton>
                    <Icon color="error">close</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={products.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
      />
    </Box>
  );
};

export default ProductTable;
