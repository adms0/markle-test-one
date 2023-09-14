import {TableRow, TableCell} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
const TableRowsLoader = ({rowsNum}) => {
  return [...Array(rowsNum)].map((row, index) => {
    return (
      <TableRow key={index}>
        <TableCell component="th" scope="row">
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
        <TableCell>
          <Skeleton animation="wave" variant="text" />
        </TableCell>
      </TableRow>
    );
  });
};

export default TableRowsLoader;
