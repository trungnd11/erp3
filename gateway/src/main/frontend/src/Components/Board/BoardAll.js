import React, { forwardRef, useImperativeHandle } from "react";
import { Table, Input } from "reactstrap";

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    isEditable,
    checkbox
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <thead component="thead">
      <tr>
        {checkbox && <th padding="checkbox" style={{ width: "1%" }}>
          {/* <Checkbox
            disabled={!isEditable}
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          /> */}
          <Input
            className="form-check-input"
            type="checkbox"
            id="formCheckAll"
            onChange={onSelectAllClick}
            disabled={!isEditable}
            checked={rowCount>0 && numSelected === rowCount}
          />
        </th>}
        <th padding="checkbox" style={{ width: "1%" }}>
          No
        </th>
        {headCells.map((headCell) => (
          <th
            sx={({ typography: { size, fontWeightBold } }) => ({
              fontSize: size.xxs,
              fontWeight: fontWeightBold,
              textTransform: "uppercase",
              width: headCell.width || "auto",
            })}
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

function Board(
  { columns = [], rows = [], isEditable=true, component: Component, checkbox=false, onRowClick },
  ref
) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useImperativeHandle(ref, () => ({
    getSelectedRow: () => selected,
    setSelectedRow: (data) => {
      setSelected(data);
    },
  }));

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
            isEditable={isEditable}
            checkbox={checkbox}
          />
          <tbody>
            {stableSort(rows, getComparator(order, orderBy)).map(
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
                            onRowClick(row);
                          }
                        : () => {}
                    }
                    style={onRowClick ? {'cursor': 'pointer'} : {}}
                  >
                    {checkbox && <td padding="checkbox">
                      {/* <Checkbox
                        disabled={!isEditable}
                        onClick={(event) => { handleClick(event, row); }}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      /> */}

                      <Input
                        className="form-check-input"
                        type="checkbox"
                        disabled={!isEditable}
                        onClick={(event) => { handleClick(event, row); }}
                        checked={isItemSelected}
                      />
                    </td>}
                    <td padding="checkbox">
                      <div>{index + 1}</div>
                    </td>
                    <React.Fragment key={index}>
                      <Component item={row} />
                    </React.Fragment>
                  </tr>
                );
              }
            )}
            {(rows === null ? false : rows.length === 0) && (
              <tr
                style={{
                  height: dense ? 33 : 53,
                }}
              >
                <td colSpan={6} />
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default forwardRef(Board);
