/* eslint-disable react/no-array-index-key */
import React, { forwardRef } from "react";
import { Input, Table } from "reactstrap";
import PaginationTable from "../pagination/PaginationTable";

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    checkbox,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <thead component="thead">
      <tr>
        <th padding="checkbox" sx={{ width: "12px" }} className="table-light text-muted">
          <div>No.</div>
        </th>
        {checkbox && (
          <th padding="checkbox" className="table-light text-muted">
            {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}

            <Input
              className="form-check-input"
              type="checkbox"
              id="formCheckAll"
              onChange={onSelectAllClick}
              checked={rowCount > 0 && numSelected === rowCount}
            />
          </th>
        )}
        {headCells.map((headCell) => (
          <th
            sx={({ typography: { size, fontWeightBold } }) => ({
              fontSize: size.xxs,
              fontWeight: fontWeightBold,
              textTransform: "uppercase",
              width: headCell.width || "auto",
            })}
            className="table-light text-muted"
            style={{width: headCell.width || "auto",}}
            key={headCell.id}
            align={headCell.numeric ? "left" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* {headCell.sort ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              <div>{headCell.label}</div>
            )} */}
            <div>{headCell.label}</div>
          </th>
        ))}
      </tr>
    </thead>
  );
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
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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

const entries = [
  { label: "5" },
  { label: "10" },
  { label: "15" },
  { label: "20" },
];

function Board(
  {
    columns = [],
    rows = [],
    checkbox = true,
    pageInfo,
    setPageInfo,
    loading = false,
    onChangePage,
    onRowClick,
    component: Component,
  },
  ref
) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const isSelected = (row) => {
    if (selected.length === 0) {
      return false;
    }
    return selected.findIndex((item) => item.id === row.id) !== -1;
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.findIndex((item) => item.id === row.id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = [...rows];
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  return (
    <div>
      <div className="table-responsive mt-4 mt-xl-0">
        <Table>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headCells={columns}
            checkbox={checkbox}
          />
          <tbody>
            {!loading ? (
              stableSort(rows, getComparator(order, orderBy)).map(
                (row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <tr
                      hover
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      onClick={
                        onRowClick
                          ? () => {
                              onRowClick(row.id);
                            }
                          : () => {}
                      }
                      sx={{ cursor: onRowClick ? "pointer" : "auto" }}
                    >
                      <td padding="checkbox">
                        <div>{index + 1}</div>
                      </td>
                      {checkbox && (
                        <td padding="checkbox">
                          {/* <Checkbox
                            onClick={(event) => {
                              handleClick(event, row);
                            }}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          /> */}
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            onClick={(event) => {
                              handleClick(event, row);
                            }}
                            checked={isItemSelected}
                          />
                        </td>
                      )}
                      <React.Fragment key={index}>
                        <Component item={row} />
                      </React.Fragment>
                    </tr>
                  );
                }
              )
            ) : (
              <tr
                style={{
                  height: 64,
                }}
              >
                <td
                  colSpan={checkbox ? columns.length + 2 : columns.length + 1}
                >
                  <div
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* <CircularProgress /> */}
                    Loading...
                  </div>
                </td>
              </tr>
            )}
            {!loading && rows.length === 0 && (
              <tr
                style={{
                  height: 64,
                }}
              >
                <td
                  colSpan={checkbox ? columns.length + 2 : columns.length + 1}
                >
                  <div
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p component="i" sx={{ color: "#3447675c" }}>
                      No Data
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div p={3} sx={{ display: "flex", flexDirection: "row-reverse" }}>
        {/* <div display="flex" alignItems="center">
          <Autocomplete
            disableClearable
            options={entries}
            defaultValue={entries[1]}
            getOptionLabel={(option) => option.label}
            onChange={(event, newValue) => {
              setPageInfo((prev) => ({
                ...prev,
                rowPerPage: parseInt(newValue.label, 10),
                currentPage: 0,
              }));
            }}
            size="small"
            sx={{ width: "5rem" }}
            renderInput={(params) => <MDInput {...params} />}
          />
          <MDTypography variant="caption" color="secondary">
            &nbsp;&nbsp;entries per page
          </MDTypography>
        </div>
        <Pagination
          color="primary"
          count={pageInfo.totalPage}
          page={pageInfo.currentPage + 1}
          onChange={onChangePage}
        /> */}

        <PaginationTable
          className="pagination-bar"
          currentPage={pageInfo.page + 1}
          totalCount={pageInfo.totalElements}
          pageSize={pageInfo.size}
          onPageChange={onChangePage}
        />
      </div>
    </div>
  );
}

export default forwardRef(Board);
