import React, {Component} from 'react';
import AppList from "../list/list";
import Services from "../Services";

class AppFront extends Component {
    currentPage = 1;

    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            category: []
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
        this.componentWillUnmount();
        Services.getTweets(this.currentPage).then((tweetList) => {
            const tmp = this.state.tweets;
            tmp.push(...tweetList);
            this.setState({
                'tweets': tmp
            });
            this.currentPage++;
            document.addEventListener('scroll', this.trackScrolling);
        });
    }

    render() {
        if (this.state.tweets.length === 0) {
            return null;
        } else {
            console.log(this.state.tweets);
            return (
                <div className="row" id={"content"}>
                    <AppList tweets={this.state.tweets}></AppList>
                </div>
            );
        }

    }
}

export default (AppFront);
