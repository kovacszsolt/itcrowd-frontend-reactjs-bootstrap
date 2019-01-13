import React, {Fragment} from 'react';
import AppListCard from "./card/Card";

const AppList = (props) => {
    return (
        <Fragment>
            {props.tweets.map((tweet) => {
                return (
                    <div key={tweet._id} className="col-md-3">
                        <AppListCard key={tweet._id} tweet={tweet}/>
                    </div>
                )
            })
            }
        </Fragment>
    )
}

export default AppList;
