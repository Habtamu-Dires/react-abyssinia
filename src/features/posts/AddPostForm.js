import React,{ useState} from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "./postsSlice";
import {nanoid} from '@reduxjs/toolkit'; //to generate random id

export const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const dispatch = useDispatch();
    //Temp data should be keept inside the component
    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);

    //Dispatching the "Post Added" Action  --will run the reducer make to return new state
    const onSavePostClicked =() => {
        if(title && content) {
            dispatch(
                postAdded({
                    id: nanoid(),
                    title,
                    content
                })
            )
            setTitle('')
            setContent('')
        }
    }

    return(
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title: </label>
                <input type="text" id="postTitle" name="postTitle"
                    value={title}
                    onChange={onTitleChanged}/>
                <label htmlFor="postContent">Content:</label>
                <textarea id="postContent" name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button type="button" onClick={onSavePostClicked}>Save Post</button>
            </form>
        </section>
    );
}