import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import { useDispatch } from 'react-redux';
import { returnBooks } from '../reducers/actions';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { books } from '../CONSTANTS/data';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function createData(id, date, totalBooks, cart, deadline, returned) {
    return {
        id,
        date,
        totalBooks,
        cart,
        deadline,
        returned,
    };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'totalBooks',
        numeric: true,
        disablePadding: false,
        label: 'Total Books',
    },
    {
        id: 'deadline',
        numeric: true,
        disablePadding: false,
        label: 'Deadline',
    },
    {
        id: 'returned',
        numeric: true,
        disablePadding: false,
        label: 'Returned',
    },
];


function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };


    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};




export default function TableMUI({ orderHistory }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const rows = orderHistory.map((order, index) => {

        return createData(
            index + 1,
            order.date.toString().slice(0, 10),
            order.cart.reduce((acc, element) => { return acc += element.quantity }, 0),
            order.cart,
            order.deadline.toString().slice(0, 10),
            order.returned,
        );
    })

    const [returned, setReturned] = React.useState(rows)

    function EnhancedTableToolbar(props) {
        const { numSelected, selected } = props;

        const dispatch = useDispatch()

        const returnOrder = () => {
            selected.forEach(order => {
                dispatch(returnBooks(order - 1))
                setReturned(prev => prev.map(element => {
                    if (element.id === order)
                        return { ...element, returned: true }
                    else
                        return element
                }))
            });
        }

        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        My History
                    </Typography>
                )}

                {(numSelected > 0) ? (
                    <Tooltip title="Return Books" onClick={returnOrder}>
                        <IconButton sx={{ fontSize: '15px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 14 14"><g fill="none" stroke="#333" strokeLinecap="round" strokeLinejoin="round"><path d="M.5 9.5h9a4 4 0 1 0 0-8h-3" /><path d="m3.5 6.5l-3 3l3 3" /></g></svg>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton>
                            {/* <FilterListIcon /> */}
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        );
    }
    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
    };

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );
const [cart,setCart]=React.useState([])
    const showBooks = (e, row) => {
        e.stopPropagation()
        setCart(row.cart)
        handleOpen()
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} selected={selected} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={false ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.id}
                                        </TableCell>

                                        <TableCell align="right">{row.date}</TableCell>
                                        <TableCell align="right">{row.totalBooks} <span className='p-1 px-3 rounded-md' style={{ backgroundColor: 'var(--primary)', color: 'white' }} onClick={(e) => showBooks(e, row)}>Show</span></TableCell>
                                        <TableCell align="right">{row.deadline}</TableCell>
                                        <TableCell align="right">{returned[row.id - 1].returned === true ? <div style={{ color: '#7cb518' }}>Yes</div> : <div style={{ color: '#d90429' }}>Not Yet</div>}</TableCell>
                                        <Modal
                                            aria-labelledby="transition-modal-title"
                                            aria-describedby="transition-modal-description"
                                            open={open}
                                            onClose={handleClose}
                                            closeAfterTransition
                                            slots={{ backdrop: Backdrop }}
                                            slotProps={{
                                                backdrop: {
                                                    timeout: 500,
                                                },
                                            }}
                                        >
                                            <Fade in={open}>
                                                <Box sx={style}>
                                                    <Typography id="transition-modal-title" variant="h6" component="h2">
                                                        Books that you ordered
                                                    </Typography>
                                                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                                        <div className={`flex justify-center items-center gap-5 text-lg font-bold my-10`}>
                                                            <div>Picture</div>
                                                            <div>Title</div>
                                                            <div>Quantity</div>
                                                            <div>Pages</div>
                                                        </div>

                                                        <div className={`flex flex-col gap-5`}>
                                                            {cart.map((book, index) => {
                                                                return <div key={index} className='flex justify-center items-center gap-5'>
                                                                    <div style={{ width: '25%' }}>
                                                                        <img src={books[book.index].image} alt={books[book.index].name} style={{ height: '100px', borderRadius: '10px' }} />
                                                                    </div>
                                                                    <div style={{ width: '20%' }}>{books[book.index].name}</div>
                                                                    <div className="flex items-center gap-5" style={{ width: '10%' }}>
                                                                        {book.quantity}
                                                                    </div>
                                                                    <div style={{ width: '10%' }}>{books[book.index].pages}</div>
                                                                    
                                                                </div>
                                                            })}
                                                        </div>
                                                    </Typography>
                                                </Box>
                                            </Fade>
                                        </Modal>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (false ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </Box>
    );
}
