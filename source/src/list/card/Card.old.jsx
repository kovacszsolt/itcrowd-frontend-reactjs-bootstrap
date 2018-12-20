import React from 'react';
import './Card.css';
import AppListCardCategory from "../category/Category";


const AppListCard = (props) => {
    return (

        <div className="card rounded-0  border border-primary ">
            <img className="card-img-top rounded-0"
                 src={process.env.REACT_APP_REACT_BACKEND_SERVER +'image/size1/'+ props.tweet.slug + "."+props.tweet.imageextension}
                 alt={props.tweet.title}/>
            <div className="card-body">
                <h5 className="card-title"><a href={"/" + props.tweet.slug}>{props.tweet.title}</a></h5>
                <p>
                    <small className="text-muted">{props.tweet.createdAt}</small>
                </p>
               <AppListCardCategory category={props.tweet.twitter_category_full}/>
                <p className="card-text">{props.tweet.content}</p>

            </div>
        </div>
    )
}
export default AppListCard;
