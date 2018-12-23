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
            const tags = getTweetsBySlugResult.tags;
            const relationTweetList = [];
            tags.forEach((tag) => {
                this.service.getStaticTweetsAll().filter(a => a.tags.includes(tag)).forEach((relTweet) => {
                    if ((relationTweetList.find(relationTweet => relationTweet.id === relTweet.id) === undefined) && (relTweet.id !== getTweetsBySlugResult.id)) {
                        relationTweetList.push(relTweet);
                    }
                });
            });
            this.setState({
                'tweet': getTweetsBySlugResult,
                'tweetRelation': relationTweetList
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
