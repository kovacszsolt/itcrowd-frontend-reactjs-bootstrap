import React, {Component, Fragment} from 'react';
import AppList from "../list/list";
import Services from "../Services";
import './Search.css';
import AppListSimple from "../list/simple/Simple";

class AppSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            category: [],
            search: '',
            firstStart: true
        }
    }

    componentDidMount() {
        this.readData(this.props.match.params.searchtext);
    }

    readData(searchText) {

        Services.findTweet(searchText).then((tweetListResult) => {
            let firstStart = this.state.firstStart;
            if (firstStart) {
                firstStart = false;
            }
            this.setState({
                'tweets': tweetListResult,
                'firstStart': firstStart,
                search: searchText
            });
        });


    }

    handleChange(event) {
        const searchText = event.target.value;
        if (searchText.length > 3) {
            this.props.history.push('/search/' + event.target.value);
            this.readData(event.target.value);
        } else {
            this.setState({
                search: searchText
            });
        }
    }

    render() {
        return (
            <div className="row mt-6">
                <div className="col-md-12 mb-2">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search"
                           value={this.state.search}
                           onChange={(e) => {
                               this.handleChange(e)
                           }}
                           aria-label="Search"/>
                </div>
                <Fragment>
                    {(this.state.tweets.length !== 0) ? (
                        <AppListSimple tweets={this.state.tweets} title={'Search Result'}></AppListSimple>
                    ) : (
                        (this.state.firstStart) ? (
                            <div className="d-flex justify-content-center">
                                <img alt={'Loading'} src={'/loading.gif'}/>
                            </div>
                        ) : (
                            <div className="d-flex justify-content-center">
                                <img alt={'no results'} src={'/oops.jpg'}/>
                            </div>
                        )
                    )
                    }
                </Fragment>
            </div>
        );

    }
}

export default (AppSearch);
