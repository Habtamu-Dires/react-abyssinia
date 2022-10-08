import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { reactionAdded, selectPostById, updateReaction } from "./postsSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}

export const ReactionButtons = ({post}) => {
    const dispatch = useDispatch();
    const thePost = useSelector(state =>  selectPostById(state, post.id));

    const [addRequestStatus, setAddRequestStatus] = useState('idle');
    const canSave = addRequestStatus === 'idle';
    const theReactions = {...thePost.reactions};
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return(
            <button 
                key={name} 
                type="button"
                onClick={ async ()=> {
                    if(canSave){
                        try {
                            setAddRequestStatus("pending");
                            ++theReactions[name];                       
                             await dispatch(updateReaction({postId: post.id, reaction: theReactions})).unwrap();
                         } catch(err) {
                             alert("Network error");
                         } finally {
                            setAddRequestStatus("idle");
                         }
                    }
                    
                  }
                }
            >
                    {emoji} {post.reactions[name]}
            </button>
        );
    })

    return <div>{reactionButtons}</div>
}