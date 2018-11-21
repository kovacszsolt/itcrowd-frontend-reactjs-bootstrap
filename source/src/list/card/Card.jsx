import React from 'react';
import './Card.css';
import AppListCardCategory from "../category/Category";


const AppListCard = (props) => {
    return (

        <div className="card rounded-0  border border-primary ">
            <img className="card-img-top rounded-0"
                 src={process.env.REACT_APP_IMAGE_URL + props.tweet.slug + "/size1.jpg"}
                 alt={props.tweet.twitter_content.title}/>

            <div className="card-body">
                <h5 className="card-title"><a href={"/" + props.tweet.slug}>{props.tweet.twitter_content.title}</a></h5>
                <p>
                    <small className="text-muted">{props.tweet.twitter_content.createdAt}</small>
                </p>
                <AppListCardCategory category={props.tweet.twitter_category}/>
                <p className="card-text">{props.tweet.twitter_content.content}</p>

            </div>
        </div>
    )
}
export default AppListCard;
