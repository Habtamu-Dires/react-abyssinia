import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { selectPostById } from './postsSlice';
import { ReactionButtons } from './ReactionButton';
import { TimeAgo } from './TimeAgo';

export const SinglePostPage = (props) => {
    
    const post = useSelector(state => selectPostById(state, props.postId));

    if(!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return(
        <section>
            <article>
                <PostAuthor userId={post.user}/>
                <TimeAgo timestamp={post.date}/>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <ReactionButtons post={post} />
                <Link to={`/editPost/${post.id}`}>Edit Post</Link>
            </article>
        </section>
    )
}