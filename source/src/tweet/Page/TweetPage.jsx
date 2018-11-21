import React from 'react';
import AppListCardCategory from "../../list/category/Category";
import AppTweetRelation from "../Relation";

const AppTweetPage = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 pl-0 pr-0">
                    <img className="img-fluid" alt={props.tweet.title}
                         src={process.env.REACT_APP_IMAGE_URL + props.tweet.slug + "/size2.jpg"}/>
                    <h1>{props.tweet.twitter_content.title}</h1>
                    <AppListCardCategory category={props.tweet.twitter_category}/>
                    <p> {props.tweet.twitter_content.content}</p>
                    <a className="btn btn-info btn-block " target={"_blank"} href={props.tweet.twitter_content.url}>jump
                        to the
                        article</a>
                </div>
                <div className="col-md-4 pl-0 pr-0">
                    <AppTweetRelation currentId={props.tweet._id} categorylist={props.categoryList}/>
                </div>
            </div>
        </div>
    )
}
export default (AppTweetPage);
