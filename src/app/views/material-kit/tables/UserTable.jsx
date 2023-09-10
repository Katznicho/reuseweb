import {
  Box,
  Button,
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
import { MatxLoading } from 'app/components';
import { getUsers } from '../../../../firebase';
import { useState, useEffect } from 'react';

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1)
}));

const UserTable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(async () => {
    try {
      setLoading(true);
      let users = await getUsers();
      setUsers(users);
      setLoading(false);
    } catch (error) {}
  }, []);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [users, setUsers] = useState([]);

  if (loading) return <MatxLoading />;

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">UserName</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Verification</TableCell>
            <TableCell align="center">User Type</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
            <TableRow key={user.id}>
              <TableCell align="left">
                {user?.data?.firstName
                  ? `${user?.data?.firstName} ${user?.data?.lastName}`
                  : user?.data?.communityName}
              </TableCell>
              <TableCell align="center">{user?.data?.username}</TableCell>
              <TableCell align="center">{user?.data?.email}</TableCell>
              <TableCell align="center">{user?.data?.gender}</TableCell>
              <TableCell align="center">
                {user?.data?.isVerified ? 'Verified' : 'Not Verified'}
              </TableCell>
              <TableCell align="center">
                {user?.data?.isVerified ? (
                  <StyledButton
                    variant="contained"
                    href={`/user/unverify/${user.id}`}
                    color="warning"
                  >
                    UnVerify
                  </StyledButton>
                ) : (
                  <StyledButton
                    color="success"
                    variant="contained"
                    href={`/user/verify/${user.id}`}
                  >
                    Verify
                  </StyledButton>
                )}
              </TableCell>
              <TableCell align="center">{user?.data?.userType}</TableCell>
              <TableCell align="right">
                <StyledButton color="info" variant="contained" href={`/user/details/${user.id}`}>
                  View Details
                </StyledButton>
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
        count={users.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
      />
    </Box>
  );
};

export default UserTable;
