import React, {Component} from 'react';
import AppTweetPage from "./Page/TweetPage";
import Services from "../Services";

class AppTweet extends Component {
    service = new Services();

    constructor(props) {
        super(props);
        this.state = {
            tweet: null,
            categoryList: null
        }
    }

    componentWillReceiveProps(nextProps) {
        this.readData(nextProps.match.params.slug);
    }

    readData(slug) {
        this.service.getTweet(slug).then((getTweetsBySlugResult) => {
            this.setState({
                'tweet': getTweetsBySlugResult
            });

            Promise.all(getTweetsBySlugResult.twitter_category_full.map((twitterCategoryResult) => this.service.getTweetsByCategorySlug(twitterCategoryResult.slug))).then((getTweetsByCategorySlugResult) => {
                const categoryTweetList = [...new Set([].concat(...getTweetsByCategorySlugResult))];
                const categoryList = [];
                categoryTweetList.forEach((forEachResult) => {
                    if (categoryList.filter(filterResult => filterResult._id === forEachResult._id).length === 0) {
                        categoryList.push(forEachResult);
                    }
                });
                this.setState({
                    'categoryList': categoryList
                });
            })

        })
    }

    componentDidMount() {
        this.readData(this.props.match.params.slug);
    }

    render() {

        if (this.state.tweet === null) {
            return null;
        } else {
            return (
                <AppTweetPage tweet={this.state.tweet}
                              categoryList={this.state.categoryList}></AppTweetPage>
            );
        }

    }
}

export default (AppTweet);
