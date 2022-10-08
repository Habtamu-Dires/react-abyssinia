import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../shared/baseUrl";
import fetch from "cross-fetch";

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
      reactionAdded(state, action) {
        const { postId, reaction } = action.payload;
        const existingPost = state.posts.find(post => post.id === postId);
        if(existingPost){
          existingPost.reactions[reaction]++;
        }
      }
    },
    extraReducers(builder) {
      builder
        .addCase(fetchPosts.pending, (state, action) => {
          state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status ='succeeded'
          // Add any fetched posts to the array
          state.posts = state.posts.concat(action.payload);
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message;
        })
        .addCase(addNewPost.fulfilled,(state, action)=> {
          state.posts.push(action.payload);
        })
        .addCase(updatePost.fulfilled, (state, action)=> {
          const existingPost = state.posts.find(post => post.id === action.payload.id);
          if(existingPost) {
            existingPost.title = action.payload.title;
            existingPost.content =action.payload.content;
          }
        })
        .addCase(updateReaction.fulfilled, (state, action)=> {
          const existingPost = state.posts.find(post => post.id === action.payload.id);
          if(existingPost) {
            existingPost.reactions = action.payload.reactions;
          }
        })
        .addCase(updateReaction.rejected, (state, action)=> {
          
        })
    }
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
  const response = await fetch(baseUrl + 'posts');
  return response.json();
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async initialPost => {
  const response = await fetch(baseUrl + 'posts',{
    method: 'POST',
    body: JSON.stringify(initialPost),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
  return response.json();
});

export const updatePost = createAsyncThunk('posts/updatePost', async newValue => {
  const { id, title, content } = newValue;
  const response = await fetch(baseUrl + 'posts/' + id, {
      method: 'PATCH',
      body: JSON.stringify({
        title: title,
        content: content
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'

  });
  return response.json();
});

export const updateReaction = createAsyncThunk('posts/updateReaction', async newReaction => {
    const {postId, reaction} = newReaction;

    const response = await fetch(baseUrl + 'posts/' + postId, {
      method: 'PATCH',
      body: JSON.stringify({
        reactions: reaction
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'

    });
    return response.json();
});

//createSlice will generate action cretor function for each reducer we add to a slice
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
export const selectAllPosts = state => state.posts.posts;
export const selectPostById = (state, postId) => 
  state.posts.posts.find(post => post.id === postId);

export default postsSlice.reducer;

