import React from 'react';
import AppListCardCategory from "../../list/category/Category";
import {Helmet} from "react-helmet";

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
                      content={process.env.REACT_APP_REACT_BACKEND_SERVER +'image/size1/'+ props.tweet.slug + "."+props.tweet.extension}/>
            </Helmet>
            <div className="row">
                <div className="col-md-12">
                    <img className="img-fluid" alt={props.tweet.title}
                         src={process.env.REACT_APP_REACT_BACKEND_SERVER +'image/size2/'+ props.tweet.slug + "."+props.tweet.extension}/>
                    <h1>{props.tweet.title}</h1>
                    <AppListCardCategory category={props.tweet.tags}/>
                    <p> {props.tweet.description}</p>
                    <a className="btn btn-info btn-block " target={"_blank"} href={props.tweet.url}>jump
                        to the
                        article</a>
                </div>
            </div>
        </div>
    )
}
export default (AppTweetPage);
