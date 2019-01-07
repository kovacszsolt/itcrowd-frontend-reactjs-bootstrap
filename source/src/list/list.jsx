import React from 'react';
import AppListCard from "./card/Card";
const randomString = require('random-string');
const AppList = (props) => {
    return (
        <main>
            <div key={randomString({length: 20})} className="card-columns">
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
