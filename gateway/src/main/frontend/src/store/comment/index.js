import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCommentTask } from "../../api/comment";
import { serializeAxiosError } from "../reducer.utils";
import produce from 'immer';

const initialState = {
  loading: false,
  taskId: null,
  comments: [],
}

export const getComment = createAsyncThunk(
  'getComment',
  async({taskId, page, size, sort}) => {
    console.log(taskId, page, size, sort);
    return getCommentTask(taskId, page, size, sort);
  },
  {
    serializeError: serializeAxiosError,
  },
)

export const CommentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComment(state, action) {
      return {
        ...state,
        taskId: action.payload.taskId,
        comments: action.payload.comments,
      }
    },
    concatComment(state, action) {
      
      return ({
        ...state,
        comments: [action.payload.comments ,...state.comments]
      })
    },
    replyComment(state, action){
      const rootComment = state.comments.find(el => el.id === action.payload.parentId);
      if(!!rootComment){
        rootComment.childrens.push(action.payload.comment);
      }
    },
    updateRootComment(state, action){
      const targetComment = state.find(el => el.id === action.payload.id);
      if(!!targetComment){
        targetComment.content = action.payload.content;
      }
    },
    updateChildComment(state, action){
      const parentComment = state.find(el => el.id === action.payload.id);
      if(!!parentComment){
        const targetComment = parentComment.childrens.find(el => el.id === action.payload.comment.id)
        targetComment.content = action.payload.comment.content;
      }
    }
  },
  // extraReducers(builder) {
  //   builder.addCase(getComment.pending, (state, action) => ({
  //     ...state,
  //     loading: true,
  //   }))
  //   .addCase(getComment.rejected, (state, action) => ({
  //       ...state,
  //       loading: false,
  //   }))
  //     .addCase(getComment.fulfilled, (state, action) => ({
  //       ...state,
  //       loading: false,
  //       comments: action.payload.data.content,
  //       taskId: action.meta.arg.taskId,
  //   }))
  // }
})

export const { setComment, concatComment, replyComment, updateRootComment, updateChildComment } = CommentSlice.actions;

// Reducer
export default CommentSlice.reducer;