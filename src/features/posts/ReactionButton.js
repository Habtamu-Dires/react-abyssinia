import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded, updateReaction } from "./postsSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}

export const ReactionButtons = ({post}) => {
    const dispatch = useDispatch();

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return(
            <button 
                key={name} 
                type="button"
                onClick={ async ()=> {
                    try {
                        await dispatch(updateReaction({postId: post.id, reaction: name})).unwrap();
                    } catch(err) {
                        alert("Network error");
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