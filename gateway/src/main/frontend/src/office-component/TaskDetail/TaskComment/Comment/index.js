import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

import avatar10 from "../../../../assets/images/users/avatar-10.jpg";
import avatar7 from "../../../../assets/images/users/avatar-7.jpg";
import CustomEditor from "../../../../Components/Editor";
import style from "./style.module.css";
import SimpleBar from 'simplebar-react';
import { getCommentTask, replyRootComment, updateComment } from '../../../../api/comment';
import InfiniteScroll from "react-infinite-scroll-component";
import { formatDate } from '../../../../utils/date';
import { showSuccessNotice, showErrorNotice } from '../../../../utils/toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getComment, replyComment, setComment } from "../../../../store/comment";
import { ACCOUNT_KEY } from "../../../../store/auth/authentication/authentication";
import { Storage } from "../../../../utils/storage-utils";
import ReactHtmlParser from 'react-html-parser';

const RootComment = ({ comment, setSelectedCmt, selectedCmt,editCmt, setEditCmt, children }) => {
  const editorRef = useRef();
  const editRef = useRef();
  const [loading, setLoading] = useState(false);
  const account = useSelector(state => state.authentication.account) || Storage.local.get(ACCOUNT_KEY);
  const dispatch = useDispatch()

  const handleEditClick = () => {
    editRef.current.setData(comment.content);
    setEditCmt(comment.id);
  }

  const handleUpdateComment = () => {
    const { data } = editRef.current;
    if (data.length === 0) {
      return;
    }
    setLoading(true);
    updateComment(comment.id, { content: data }).then(response => {
      showSuccessNotice("Update successfully!");
      setEditCmt(null);
      setLoading(false);
    }).catch(ex => {
      showErrorNotice("Failure to update")
      setLoading(false);
    });
  }

  const handleReplyComment = () => {
    const commentId = comment.id;
    const { data } = editorRef.current;
    if (data.length === 0) {
      return;
    }
    setLoading(false);

    const payload ={content: data, user: account.username}
    replyRootComment(commentId, payload).then(response => {
      dispatch(replyComment({parentId: commentId, comment: response.data}));
      setLoading(false);
      showSuccessNotice('Reply successfully!');
      setSelectedCmt(null);
    }).catch(ex => {
      setLoading(false)
      showErrorNotice("Reply fail");
    })
  }

  return (
    <React.Fragment>
      <div className="d-flex mt-4 comment">
        <div className="flex-shrink-0">
          <img
            src={comment.commentator_avatar}
            alt=""
            className="avatar-xs rounded-circle"
          />
        </div>
        <div className="flex-grow-1 ms-3">
          <div className="d-flex fs-13 align-items-center">
            <div className={`fs-13 flex-grow-1 ${style.font_weight_500}`}>
              <Link to="/pages-profile">{comment.commentator_name}</Link>
              <small className="text-muted">{formatDate(comment.createdDate)}</small>
            </div>
            <UncontrolledDropdown>
              <DropdownToggle
                tag="button"
                className="btn btn-icon btn-sm fs-16 text-muted dropdown shadow-none"
                type="button"
              >
                <i className="ri-more-fill"></i>
              </DropdownToggle>
              <DropdownMenu>
                <div>
                  <DropdownItem onClick={handleEditClick}>
                    <i className="ri-pencil-fill text-muted me-2 align-bottom"></i>
                    Edit
                  </DropdownItem>
                </div>
                <div>
                  <DropdownItem>
                    <i className="ri-delete-bin-5-fill text-muted me-2 align-bottom"></i>
                    Delete
                  </DropdownItem>
                </div>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <div className={ editCmt !== comment.id ? "d-none" : "d-block"}>
            <CustomEditor ref={editRef} />
            <div className="bg-light text-right">
              <Link
                to="#"
                color="light"
                onClick={() => {
                  setEditCmt(null);
                }}
                className="btn btn-link link-primary fw-medium shadow-none"
              >
                <i className="ri-close-line me-1 align-middle" />
                Cancel
              </Link>
              <Button color="success" className="btn-label right" onClick={handleUpdateComment}>
                <i className="bx bxs-send label-icon align-middle fs-16 ms-2"></i>
                Update
              </Button>
            </div>
          </div>
          <p className={`text-muted ${editCmt === comment.id ? "d-none" : "d-block"}`}>
            {ReactHtmlParser(comment.content)}
          </p>
          <Button
            className="badge text-muted bg-light"
            style={{ border: "none" }}
            onClick={() => {
              setSelectedCmt(comment.id);
            }}
          >
            <i className="mdi mdi-reply"></i> Reply
          </Button>
          {selectedCmt === comment.id && (
            <div className="mt-2" style={{ position: "relative" }}>
              <CustomEditor ref={editorRef} />
              <div className="bg-light text-right">
                <Link
                  to="#"
                  color="light"
                  onClick={() => {
                    setSelectedCmt(null);
                  }}
                  className="btn btn-link link-primary fw-medium shadow-none"
                >
                  <i className="ri-close-line me-1 align-middle" />
                  Cancel
                </Link>
                <Button color="success" className="btn-label right" onClick={handleReplyComment}>
                  <i className="bx bxs-send label-icon align-middle fs-16 ms-2"></i>
                  Reply{" "}
                </Button>
              </div>
            </div>
          )}
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

const ChildComment = ({ comment, parent, setSelectedCmt, selectedCmt, editCmt, setEditCmt }) => {
  const editorRef = useRef();
  const editRef = useRef();
  const [loading, setLoading] = useState(false);
  const account = useSelector(state => state.authentication.account) || Storage.local.get(ACCOUNT_KEY);
  const dispatch = useDispatch()

  const handleEditClick = () => {
    editRef.current.setData(comment.content);
    setEditCmt(comment.id); 
  }

  const handleUpdateComment = () => {
    const { data } = editRef.current;
    if (data.length === 0) {
      return;
    }
    setLoading(true);
    updateComment(comment.id, { content: data }).then(response => {
      showSuccessNotice("Update successfully!");
      setEditCmt(null);
      setLoading(false);
    }).catch(ex => {
      showErrorNotice("Failure to update")
      setLoading(false);
    });
  }

  const handleReplyComment = () => {
    const { data } = editorRef.current;
    if (data.length === 0) {
      return;
    }
    setLoading(true);
    const commentId = parent.id;
    const payload ={content: data, user: account.username}
    replyRootComment(commentId, payload).then(response => {
      dispatch(replyComment({parentId: commentId, comment: response.data}));
      setLoading(false);
      setSelectedCmt(null);
      showSuccessNotice('Reply successfully!');
    }).catch(ex => {
      setLoading(false)
      showErrorNotice("Reply fail");
    })

  }

  return (
    <React.Fragment>
      <div className="d-flex mt-4">
        <div className="flex-shrink-0">
          <img
            src={comment.commentator_avatar}
            alt=""
            className="avatar-xs rounded-circle"
          />
        </div>
        <div className="flex-grow-1 ms-3">
          <div className="d-flex fs-13 align-items-center">
            <div className={`fs-13 flex-grow-1 ${style.font_weight_500}`}>
              <Link to="/pages-profile">{comment.commentator_name}</Link>
              <small className="text-muted">{formatDate(comment.createdDate)}</small>
            </div>
            <UncontrolledDropdown>
              <DropdownToggle
                tag="button"
                className="btn btn-icon btn-sm fs-16 text-muted dropdown shadow-none"
                type="button"
              >
                <i className="ri-more-fill"></i>
              </DropdownToggle>
              <DropdownMenu>
                <div>
                  <DropdownItem onClick={handleEditClick}>
                    <i className="ri-pencil-fill text-muted me-2 align-bottom"></i>
                    Edit
                  </DropdownItem>
                </div>
                <div>
                  <DropdownItem>
                    <i className="ri-delete-bin-5-fill text-muted me-2 align-bottom"></i>
                    Delete
                  </DropdownItem>
                </div>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <div className={ editCmt !== comment.id ? "d-none" : "d-block"}>
            <CustomEditor ref={editRef} />
            <div className="bg-light text-right">
              <Link
                to="#"
                color="light"
                onClick={() => {
                  setEditCmt(null);
                }}
                className="btn btn-link link-primary fw-medium shadow-none"
              >
                <i className="ri-close-line me-1 align-middle" />
                Cancel
              </Link>
              <Button color="success" className="btn-label right" onClick={handleUpdateComment}>
                <i className="bx bxs-send label-icon align-middle fs-16 ms-2"></i>
                Update
              </Button>
            </div>
          </div>
          <p className={`text-muted ${editCmt === comment.id ? "d-none" : "d-block"}`}>
            {ReactHtmlParser(comment.content)}
          </p>
          <Button
            className={`badge text-muted bg-light ${ editCmt === comment.id ? "d-none" : "d-block"}`}
            style={{ border: "none" }}
            onClick={() => {
              setSelectedCmt(comment.id);
            }}
          >
            <i className="mdi mdi-reply"></i> Reply
          </Button>
          {selectedCmt === comment.id && (
            <div className="mt-2" style={{ position: "relative" }}>
              <CustomEditor ref={editorRef} />
              <div className="bg-light text-right">
                <Link
                  to="#"
                  color="light"
                  onClick={() => {
                    setSelectedCmt(null);
                  }}
                  className="btn btn-link link-primary fw-medium shadow-none"
                >
                  <i className="ri-close-line me-1 align-middle" />
                  Cancel
                </Link>
                <Button color="success" className="btn-label right" onClick={handleReplyComment}>
                  <i className="bx bxs-send label-icon align-middle fs-16 ms-2"></i>
                  Reply
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const id = 2;

function Comment(props) {
  const taskData = props.taskData;
  // console.log(taskData)
  const id = taskData.id;
  const dispatch = useDispatch();
  const [replyCmt, setReplyCmt] = useState();
  const [editCmt, setEditCmt] = useState();
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    size: 5,
    sort: "createdDate,desc",
    total: 0,
    hasMore: true,
  })
  const refScroll = useRef();
  const comments = useSelector(state => state.comments.comments)
  const [loading, setLoading] = useState(false);

  const fetchComment = () => {
    getCommentTask(id, pageInfo.page, pageInfo.size, pageInfo.sort).then((response) => {
      setPageInfo({ ...pageInfo, total: response.data.totalPages, hasMore: !response.data.last })
      dispatch(setComment({taskId: id, comments: response.data.content}))
    })
  }

  const loadMore = () => {
    getCommentTask(id, pageInfo.page+1, pageInfo.size, pageInfo.sort).then((response) => {
      const fetchData = comments.concat(response.data.content);
      dispatch(setComment({ taskId: id, comments: fetchData }));
      setPageInfo({...pageInfo,page: pageInfo.page+1,total: response.data.totalPages, hasMore: !response.data.last})
    })
  }

  useEffect(() => {
    fetchComment();
  }, [])

  return (
    <div id="scrollableDiv" style={{ height: 500, overflow: "auto" }}>
      <InfiniteScroll
        scrollableTarget="scrollableDiv"
        dataLength={comments.length}
        next={loadMore}
        hasMore={pageInfo.hasMore}
        loader={<h4>Loading...</h4>}
      >
          {comments.map((item, index) => (
            <RootComment
              key={index}
              comment={item}
              selectedCmt={replyCmt}
              setSelectedCmt={setReplyCmt}
              editCmt={editCmt}
              setEditCmt={setEditCmt}
            >
              {item.childrens.map((comment, index2) => (
                <ChildComment
                  key={index2}
                  comment={comment}
                  parent={item}
                  selectedCmt={replyCmt}
                  setSelectedCmt={setReplyCmt}
                  editCmt={editCmt}
                  setEditCmt={setEditCmt}
                />
              ))}
            </RootComment>
        ))}
        </InfiniteScroll>
    </div>
      
  );
}

export default Comment;
