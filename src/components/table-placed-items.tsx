import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import {
  Button, Chip, IconButton, Paper,
} from '@mui/material';
// import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { format, isBefore } from 'date-fns';
import { useRootSelector, useAppDispatch } from '../store/hooks';
import { removeItem } from '../store/items-slice';
import ItemDialog from './item-dialog';
import Status from '../types/status-enum';

type StatusDisplayProps = {
  status: Status
  validUntil: Date
};

const StatusDisplay: React.FC<StatusDisplayProps> = ({ status, validUntil }) => {
  let result;
  switch (status) {
    case Status.Wish:
      result = <Chip label="Wish" size="small" color="info" />;
      break;
    case Status.Packed:
      result = isBefore(new Date(), validUntil)
        ? <Chip label="Packed" size="small" color="success" /> : <Chip label="Expired" size="small" color="error" />;
      break;

    default:
      break;
  }
  return result ?? null;
};

type TablePlacedItemsProps = {
  placeId?: number
};

const TablePlacedItems: React.FC<TablePlacedItemsProps> = ({ placeId }) => {
  const items = useRootSelector((state) => state.items.filter((i) => (placeId ? i.placeId === placeId : true)));
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <TableContainer sx={{ margin: '20px auto' }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="center">Unit</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Valid until</TableCell>
            {placeId && (<TableCell />)}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th, &:nth-last-child(odd)': { border: -1, bgcolor: 'secondary.main' } }}
            >
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="center">{row.units}</TableCell>
              <TableCell align="center"><StatusDisplay status={row.status} validUntil={row.validUntil} /></TableCell>
              <TableCell align="center">{format(row.validUntil, 'PPP')}</TableCell>
              {placeId
                && (
                  <TableCell align="right">
                    {/* <IconButton onClick={handleOpen}><EditRoundedIcon color="info" /></IconButton> */}
                    <IconButton onClick={() => dispatch(removeItem(row.id))}><DeleteForeverIcon color="error" /></IconButton>
                  </TableCell>
                )}
            </TableRow>
          ))}
        </TableBody>
        {placeId
          && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Button onClick={handleOpen} variant="outlined">
                    {' '}
                    <AddIcon fontSize="small" />
                    {' '}
                    add Item
                  </Button>
                  <ItemDialog open={open} handleClose={handleClose} placeId={placeId} />
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
      </Table>
    </TableContainer>
  );
};

export default TablePlacedItems;
