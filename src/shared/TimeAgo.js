import React from "react";
import { parseISO, formatDistanceToNow} from 'date-fns';

export const TimeAgo = ({ timestamp }) => {
    let timeAgo = ''
    if(timestamp) {
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date);
        let now = new Date().toISOString();        
        if(now > timestamp){
            timeAgo = `${timePeriod} ago`;
        } else{
            timeAgo = `after  ${timePeriod}`;
        }
    }

    return (
        <span title="{timestamp}">
            &nbsp; <i>{timeAgo}</i>
        </span>
    );
}
