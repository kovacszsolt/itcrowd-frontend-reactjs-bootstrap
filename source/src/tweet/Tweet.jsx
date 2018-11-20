import React, {Component} from 'react';
import AppTweetPage from "./Page/TweetPage";

class AppTweet extends Component {
    url = process.env.REACT_APP_ROUTE_URL;

    constructor(props) {
        super(props);
        this.state = {
            tweet: null
        }
    }

    componentDidMount() {
        fetch(this.url + this.props.match.params.slug)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        'tweet': result.result[0].twitter_tweet
                    });
                    const categoryList = this.state.tweet.twitter_category.map((a) => {
                        return a.title;
                    }).join(',');
                    this.setState({
                        'categoryList': categoryList
                    });
                },
                (error) => {
                }
            )
    }

    render() {

        if (this.state.tweet === null) {
            return null;
        } else {
            return (
                <AppTweetPage tweet={this.state.tweet} categoryList={this.state.categoryList}></AppTweetPage>
            );
        }

    }
}

export default (AppTweet);
