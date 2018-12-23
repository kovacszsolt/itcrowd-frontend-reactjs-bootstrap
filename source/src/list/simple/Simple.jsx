import React from 'react';
import {Link} from "react-router-dom";

const AppListSimple = (props) => {
    if (props.tweets !== null) {
        return (
            <ul className="list-group border border-primary  h-100">
                <li className="list-group-item active rounded-0">Related Contents</li>
                {props.tweets.map((tweet) => {
                    return (
                        <li key={tweet._id} className="list-group-item"><Link
                            to={'/' + tweet.slug}> {tweet.title}</Link></li>
                    );
                })}
            </ul>
        )

    } else {
        return null;
    }
}
export default AppListSimple;
