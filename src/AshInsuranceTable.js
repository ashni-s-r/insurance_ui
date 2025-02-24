import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TablePagination,
  Menu,
  MenuItem,
  IconButton
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import API_URLS from "./backendHelper";

const AshInsuranceTable = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({});
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("");

  useEffect(() => {
    axios.get(API_URLS.GET_ALL_INSURANCE)
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = (event) => setSearch(event.target.value);
  const handleSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => setRowsPerPage(parseInt(event.target.value, 10));

  const handleOpenFilter = (event, column) => {
    setFilterAnchor(event.currentTarget);
    setCurrentFilter(column);
  };
  
  const handleCloseFilter = () => setFilterAnchor(null);
  
  const handleFilterChange = (event) => {
    setFilters({ ...filters, [currentFilter]: event.target.value });
  };

  const filteredData = data
    .filter((row) =>
      Object.keys(filters).every((key) =>
        row[key].toString().toLowerCase().includes(filters[key]?.toLowerCase() || "")
      )
    )
    .filter((row) =>
      Object.values(row).some((value) => value.toString().toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (order === "asc") return a[orderBy] > b[orderBy] ? 1 : -1;
      return a[orderBy] < b[orderBy] ? 1 : -1;
    });

  return (
    <Container sx={{ mt: 4, boxShadow: 3, borderRadius: 2, p: 3, bgcolor: "#f9f9f9" }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
        Ash Insurance
      </Typography>
      <TextField 
        label="Search" 
        variant="outlined" 
        size="small"
        sx={{ float: "right", mb: 2, bgcolor: "#fff", borderRadius: 1 }}
        onChange={handleSearch} 
      />
      <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#1976d2" }}>
            <TableRow>
              {["name", "type", "premium", "coverage"].map((column) => (
                <TableCell key={column} sx={{ color: "white", fontWeight: "bold", position: "relative" }}>
                  <TableSortLabel active={orderBy === column} direction={order} onClick={() => handleSort(column)}>
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                  </TableSortLabel>
                  <IconButton size="small" sx={{ color: "white", ml: 1 }} onClick={(e) => handleOpenFilter(e, column)}>
                    <FilterListIcon />
                  </IconButton>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { bgcolor: '#f1f1f1' } }}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.premium}</TableCell>
                <TableCell>{row.coverage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Menu anchorEl={filterAnchor} open={Boolean(filterAnchor)} onClose={handleCloseFilter}>
        <MenuItem>
          <TextField
            label={`Filter by ${currentFilter}`}
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleFilterChange}
          />
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default AshInsuranceTable;
