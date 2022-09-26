import React from "react";
import { useSelector } from "react-redux";

export const PostsList = () => {
    //the selector re-run every time whenever the redux store is updated,
    //if the data they return has changed the, the component will re-render.
    const posts = useSelector(state => state.posts); // read from Redux store.

    const renderPosts = posts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
        </article>
    ))
    return(
        <section>
            <h2>Posts</h2>
            {renderPosts}
        </section>
    )

}