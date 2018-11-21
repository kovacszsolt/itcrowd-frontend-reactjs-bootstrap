import React from 'react';
import AppListCard from "./card/Card";

const AppList = (props) => {
    //console.log(props);
    return (
        <main>
            <div className="card-columns">
                {props.tweets.map((tweet) => {
                    return (
                        <AppListCard key={tweet.twitter_content._id} tweet={tweet}/>
                    );
                })
                }
            </div>
        </main>
    )
}

export default AppList;
