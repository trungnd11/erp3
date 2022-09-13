import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";
import { getUserNotActive } from "../../api/account";
import PaginationTable from "../../Components/pagination/PaginationTable";
import { formatDate } from "../../utils/date";
import { showErrorNotice } from "../../utils/toastify";

function ListNotActiveAccount({ keySearch }, ref) {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    size: 10,
    sort: "createdDate,desc",
    totalPages: 0,
    totalElements: 0,
  });

  const history = useHistory();

  const getData = (key = "", page, size, sort) => {
    setLoading(true);
    getUserNotActive(key, page, size, sort)
      .then((res) => {
        setAccounts(res.content);
        setPageInfo((prev) => ({
          ...prev,
          page: res.number,
          size: res.size,
          totalPages: res.totalPages,
          totalElements: res.totalElements,
        }));
        setLoading(false);
      })
      .catch((ex) => {
        showErrorNotice("Getting data failure!!!");
        setLoading(false);
      });
  };

  const onChangePage = (page) => {
    getData(keySearch, page - 1, pageInfo.size, pageInfo.sort);
  };

  useEffect(() => {
    getData(keySearch, pageInfo.page, pageInfo.size, pageInfo.sort);
  }, []);

  const onRowClick = (item) => {
    history.push(`/user/${item.id}`);
  };

  useImperativeHandle(
    ref,
    () => ({
      getData,
      pageInfo,
    }),
    [pageInfo]
  );

  return (
    <React.Fragment>
      <div className="table-responsive mt-4 mt-xl-0">
        <Table className="table-hover table-striped align-middle table-nowrap mb-0">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">User</th>
              <th scope="col">Code</th>
              <th scope="col">Fullname</th>
              <th scope="col">Department</th>
              <th scope="col">Created Date</th>
              <th scope="col">Activated Date</th>
              {/* <th scope="col" style={{ width: "12%" }}>
                          Action
                        </th> */}
            </tr>
          </thead>
          <tbody>
            {accounts.map((item, index) => (
              <tr key={index}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  onRowClick(item);
                }} >
                <td className="fw-medium">{index + 1}</td>
                <td>{item.username}</td>
                <td> {item.employeeCode}</td>
                <td>{item.fullname}</td>
                <td>{item.department}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td>{formatDate(item.activedAt)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <PaginationTable
        className="pagination-bar"
        currentPage={pageInfo.page + 1}
        totalCount={pageInfo.totalElements}
        pageSize={pageInfo.size}
        onPageChange={onChangePage}
      />
    </React.Fragment>
  );
}

export default forwardRef(ListNotActiveAccount);
