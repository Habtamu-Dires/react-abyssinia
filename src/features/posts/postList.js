import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { selectAllPosts, fetchPosts } from "./postsSlice";
import { ReactionButtons } from "./ReactionButton";
import { TimeAgo } from "./TimeAgo";
import { Loading } from "../../components/LoadingComponent";
import { features } from "../users/usersSlice";

export const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts); // read from Redux store.
    const postStatus = useSelector(state => state.posts.status);
    const errMess = useSelector(state => state.posts.error);
    
    useEffect(() => {
        if(postStatus === 'idle') {
            dispatch(fetchPosts());
            dispatch(features());         
        }
    }, [postStatus, dispatch])
    console.log(postStatus);
    const orderedPosts = posts.slice().sort((a,b)=> b.date.localeCompare(a.date));
    const renderPosts = orderedPosts.map(post => (
        <article key={post.id}>
            <PostAuthor userId={post.user}/>
            <TimeAgo timestamp={post.date}/>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 50)}</p>
            <ReactionButtons post={post}/> 
            <Link to={`/contactus/${post.id}`}>View Post</Link>
        </article>
    ))
    if(postStatus === 'loading') {
        return(
            <Loading />
        );
    }else if(postStatus === 'failed'){
        return(
            <div>{errMess}</div>
        );
    }else {
        return(
            <section>
                <h2>Posts</h2>
                {renderPosts}
            </section>
        )
    }
    

}