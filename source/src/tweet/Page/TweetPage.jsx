import React from 'react';
import AppListCardCategory from "../../list/category/Category";
import {Helmet} from "react-helmet";
import AppListSimple from "../../list/simple/Simple";

const AppTweetPage = (props) => {
    return (
        <div className="container">
            <Helmet>
                <title>{props.tweet.title}</title>
                <meta name="description" content={props.tweet.content}/>
                <meta property="og:url"
                      content={window.location.href}/>
                <meta property="og:type" content="article"/>
                <meta property="og:title" content={props.tweet.title}/>
                <meta property="og:description" content={props.tweet.content}/>
                <meta property="og:image"
                      content={process.env.REACT_APP_REACT_BACKEND_SERVER +'image/size1/'+ props.tweet.slug + "."+props.tweet.imageextension}/>
            </Helmet>
            <div className="row">
                <div className="col-md-8 pl-0 pr-0">
                    <img className="img-fluid" alt={props.tweet.title}
                         src={process.env.REACT_APP_REACT_BACKEND_SERVER +'image/size1/'+ props.tweet.slug + "."+props.tweet.imageextension}/>
                    <h1>{props.tweet.title}</h1>
                    <AppListCardCategory category={props.tweet.twitter_category_full}/>
                    <p> {props.tweet.content}</p>
                    <a className="btn btn-info btn-block " target={"_blank"} href={props.tweet.url}>jump
                        to the
                        article</a>
                </div>
                <div className="col-md-4 mt-4">
                    <AppListSimple tweets={props.categoryList}></AppListSimple>
                </div>
            </div>
        </div>
    )
}
export default (AppTweetPage);
