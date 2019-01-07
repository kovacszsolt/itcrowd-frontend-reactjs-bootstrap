import React from 'react';
import AppListCard from "./card/Card";

const AppList = (props) => {
    return (
        <main>
            <div key={props.tweets} className="card-columns">
                {props.tweets.map((tweet) => {

                    return (
                        <AppListCard key={tweet._id} tweet={tweet}/>
                    );
                })
                }
            </div>
        </main>
    )
}

export default AppList;
