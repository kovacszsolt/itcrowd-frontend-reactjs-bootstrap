import React, {Component} from 'react';
import AppList from "../list/list";
import Services from "../Services";

class AppFront extends Component {
    service = new Services();

    currentPage = 1;

    constructor(props) {
        super(props);
        this.state = {
            tweets: []
        }
    }

    componentDidMount() {
        this.readData();
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('content');
        if (this.isBottom(wrappedElement)) {
            this.readData();
        }
    }

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    readData() {
        this.service.getTweets(this.currentPage).then((tweetListsResult) => {
            const tmp = this.state.tweets;
            tmp.push(...tweetListsResult);
            this.setState({
                'tweets': tmp
            });
            this.currentPage++;
        });
    }

    render() {
        if (this.state.tweets.length === 0) {
            return null;
        } else {
            return (
                <div id={"content"}>
                    <AppList tweets={this.state.tweets}></AppList>
                </div>
            );
        }

    }
}

export default (AppFront);
