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
        this.service.getTweetsBySlug(slug).then((getTweetsBySlugResult) => {
            this.setState({
                'tweet': getTweetsBySlugResult
            });
            const categoryList = this.state.tweet.twitter_category.map((categoryMapResult) => {
                return categoryMapResult._id;
            });
            this.setState({
                'categoryList': categoryList
            });
        })
    }

    componentDidMount() {
        this.readData(this.props.match.params.slug);
    }

    render() {

        if (this.state.categoryList === null) {
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
