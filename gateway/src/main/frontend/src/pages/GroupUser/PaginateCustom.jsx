import React, { useState } from 'react'
import { Col, Label, Pagination, PaginationItem, PaginationLink } from 'reactstrap'

export default function PaginateCustom({ totalPg, itemSz, setItemSz, pageNumb, setPageNumb, currentPage, setCurPage }) {

    const items = [];

    for (let i = (currentPage - 2); i <= (currentPage + 2); i++) {
        if (i <= 0) { break }
        if (totalPg === 1) {
            items.push(
                <PaginationItem className={`${pageNumb === 1 ? "active" : ""}`} key={1}>
                    <PaginationLink href="#">
                        1
                    </PaginationLink>
                </PaginationItem>,
            )
            break;
        }
        if (totalPg <= 4 && i === 5) { break }
        if (totalPg <= 3 && i === 4) { break }
        if (totalPg <= 2 && i === 3) { break }
        if (totalPg === (i - 1)) { break }

        items.push(
            <PaginationItem className={`${pageNumb === i ? "active" : ""}`} key={i} onClick={() => { handlePage(i) }}>
                <PaginationLink href="#">
                    {i}
                </PaginationLink>
            </PaginationItem>,
        )

    }

    const handlePage = (number) => {
        setPageNumb(number);
        if (number > 3) {
            if (number <= (totalPg - 2)) {
                setCurPage(number++);
            } else if (number === 4) {
                setCurPage(3)
            } else {
                setCurPage(totalPg - 2)
            }
        } else {
            setCurPage(3)
        }
    }
    return (
        <div style={{ display: 'flex', padding: 30, justifyContent: 'space-between', width: '100%' }}>
            <Col lg={2}>
                <div className="input-group input-group-sm">

                    {/* <select className="form-control" id="inputGroupSelect01" style={{ maxWidth: '15%' }}
                        onChange={(e) => {
                            // console.log(e.target.value)
                            setItemSz(e.target.value)
                            setPageNumb(1)
                            setCurPage(3)
                        }} >
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={5}>5</option>
                    </select>
                    <Label className="input-group-text">per page</Label> */}
                </div>
            </Col>

            <Pagination className='pagination pagination-separated'>
                <PaginationItem className={`${pageNumb === 1 || totalPg === 0 ? "disabled" : ""}`}
                    onClick={() => {
                        setPageNumb(1)
                        setCurPage(3)
                    }
                    }>
                    <PaginationLink to="#"> <i className=' las la-fast-backward'> </i> First page</PaginationLink>
                </PaginationItem>
                &nbsp;
                <div className="vr"></div>

                {items}

                &nbsp;
                <div className="vr"></div>

                <PaginationItem className={`${pageNumb === totalPg || totalPg === 0 ? "disabled" : ""}`}
                    onClick={() => {
                        setPageNumb(totalPg)
                        if (totalPg >= 5) {
                            setCurPage(totalPg - 2)
                        } else if (totalPg === 0) {
                            setPageNumb(1)
                            setCurPage(3)
                        }

                    }
                    }>
                    <PaginationLink to="#">Last page <i className='las la-fast-forward'> </i> </PaginationLink>
                </PaginationItem>

            </Pagination>
            <Col lg={2}>
                <div className="live-preview">

                    {/* <div className="d-flex flex-wrap gap-2">
                        <span className="badge badge-soft-primary badge-border">Page {pageNumb} of {dataEmp.dataEmployeesBySearch.totalPages}</span>
                        <span className="badge badge-soft-secondary badge-border">
                            Showing {1 + pageNumb * itemSz - itemSz} to {dataEmp.dataEmployeesBySearch.totalElements > pageNumb * itemSz ? pageNumb * itemSz : dataEmp.dataEmployeesBySearch.totalElements}</span>
                        <span className="badge badge-soft-info badge-border">Total Employees : {dataEmp.dataEmployeesBySearch.totalElements}</span>

                    </div> */}
                </div>
            </Col>

        </div>
    )
}
