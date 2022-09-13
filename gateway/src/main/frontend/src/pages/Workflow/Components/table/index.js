import React from 'react';
import { Table } from "reactstrap";

export default function TableCommon(prop, ref) {
  return (
    <div className="table-responsive">
      <Table className="table-striped table-nowrap align-middle mb-0">
        <thead>
          <tr>
            <th scope="col">Process code</th>
            <th scope="col">Process name</th>
            <th scope="col">Scope of application</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="fw-medium">01</td>
            <td>Bobby Davis</td>
            <td>Nov 14, 2021</td>
            <td>$2,410</td>
            <td>
              <i className="mdi mdi-text-box-plus"></i>
              <i className="mdi mdi-tooltip-edit-outline"></i>
              <i className="mdi mdi-delete-empty-outline"></i>
            </td>
          </tr>
          <tr>
            <td className="fw-medium">02</td>
            <td>Christopher Neal</td>
            <td>Nov 21, 2021</td>
            <td>$1,450</td>
            <td>
              <i className="mdi mdi-text-box-plus"></i>
              <i className="mdi mdi-tooltip-edit-outline"></i>
              <i className="mdi mdi-delete-empty-outline"></i>
            </td>
          </tr>
          <tr>
            <td className="fw-medium">03</td>
            <td>Monkey Karry</td>
            <td>Nov 24, 2021</td>
            <td>$3,500</td>
            <td>
              <i className="mdi mdi-text-box-plus"></i>
              <i className="mdi mdi-tooltip-edit-outline"></i>
              <i className="mdi mdi-delete-empty-outline"></i>
            </td>
          </tr>
          <tr>
            <td className="fw-medium">04</td>
            <td>Aaron James</td>
            <td>Nov 25, 2021</td>
            <td>$6,875</td>
            <td>
              <i className="mdi mdi-text-box-plus"></i>
              <i className="mdi mdi-tooltip-edit-outline"></i>
              <i className="mdi mdi-delete-empty-outline"></i>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
