import React, {Component, Fragment} from 'react';
import AppList from "../list/list";
import Services from "../Services";
import {Helmet} from "react-helmet";
import AppListCardCategory from "../list/category/Category";

class AppFront extends Component {


    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            category: []
        }
    }

    componentDidMount() {
        Services.getCategory(this.props.match.params.slug).then((getTweetsByCategoryResult) => {
            this.setState({
                'tweets': getTweetsByCategoryResult
            });
        });
    }

    render() {
        if (this.state.tweets.length === 0) {
            return null;
        } else {
            return (
                <Fragment>
                    <Helmet>
                        <title>{"IT Crowd . Hu - " + this.props.match.params.slug}</title>
                        <meta name="description" content={"IT Crowd . Hu - Tags - " + this.props.match.params.slug}/>
                        <meta property="og:url"
                              content={window.location.href}/>
                        <meta property="og:type" content="article"/>
                        <meta property="og:title" content={"IT Crowd . Hu - " + this.props.match.params.slug}/>
                        <meta property="og:description"
                              content={"IT Crowd . Hu - Tags - " + this.props.match.params.slug}/>
                        <meta property="og:image"
                              content="https://itcrowd.hu/logo.png"/>
                    </Helmet>
                    <div className="row">
                        <div className="col-md-10" id={"content"}>

                            <AppList tweets={this.state.tweets}></AppList>
                        </div>
                        <div className="col-md-2 mt-5 sidebar d-none d-md-block d-sm-none">
                            <AppListCardCategory category={this.state.category}/>
                        </div>
                    </div>
                </Fragment>
            );
        }

    }
}

export default (AppFront);
