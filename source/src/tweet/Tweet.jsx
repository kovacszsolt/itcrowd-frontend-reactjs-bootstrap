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
                <AppTweetPage tweet={this.state.tweet}></AppTweetPage>
            );
        }

    }
}

export default (AppTweet);
