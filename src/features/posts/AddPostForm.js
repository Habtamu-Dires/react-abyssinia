import { nanoid } from "@reduxjs/toolkit";
import React,{ useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postsSlice";
import { addNewPost } from "./postsSlice";

export const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const dispatch = useDispatch();

    const users = useSelector(state => state.users);
    //Temp data should be keept inside the component
    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged= e =>  setUserId(e.target.value);
    

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    //Dispatching the "Post Added" Action  --will run the reducer make to return new state
    const onSavePostClicked = async () => {
        if(canSave) {
            try{
                setAddRequestStatus('pending');
                await dispatch(addNewPost({ title, content, user: userId, 
                                    date: (new Date()).toISOString(),
                        reactions: {"thumbsUp": 0, "hooray": 0, "heart": 0, "rocket": 0, "eyes": 0}}))
                        .unwrap();

                setTitle('');
                setContent('');
                setUserId('');
            } catch(err){
                alert('Failed to save the post: ', err.message);
            } finally {
                setAddRequestStatus('idle');
            }
        }
    }

    const userOpotions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

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
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {userOpotions}
                </select>
                <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
                    Save Post
                </button>
            </form>
        </section>
    );
}