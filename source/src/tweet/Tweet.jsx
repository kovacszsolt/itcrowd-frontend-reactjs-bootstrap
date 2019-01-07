import React, {Component} from 'react';
import AppTweetPage from "./Page/TweetPage";
import Services from "../Services";

class AppTweet extends Component {

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
        Services.getTweet(slug).then((tweet) => {
            let relationTweetList = [];
            Promise.all(tweet.tags.map((tag) => {
                return Services.getCategory(tag);
            })).then((promiseArray) => {
                promiseArray.forEach((promiseItem) => {
                    promiseItem.forEach((relationTweet) => {
                        if (relationTweetList.find(a => a._id === relationTweet._id) === undefined) {
                            relationTweetList.push(relationTweet);
                        }
                    });
                    relationTweetList = relationTweetList.filter(a => a._id !== tweet._id);
                });
                this.setState({
                    'tweet': tweet,
                    'tweetRelation': relationTweetList
                });
                console.log(relationTweetList);
            });
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
                <AppTweetPage tweet={this.state.tweet} tweetRelationList={this.state.tweetRelation}></AppTweetPage>
            );
        }

    }
}

export default (AppTweet);
