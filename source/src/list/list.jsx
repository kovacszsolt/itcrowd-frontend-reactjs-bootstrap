import React from 'react';
import AppListCard from "./card/Card";

const AppList = (props) => {
    return (
        <main>
            <div className="card-columns">
                {props.tweets.map((tweet) => {
                    return (
                        <AppListCard key={tweet.twitter_content._id} tweet={tweet}/>
                    );
                })
                }
            </div>
        </main>
    )
}

export default AppList;
/*
import React, {Component} from 'react';
import ListCard from "../list/card/Card";
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    root: {
        flexGrow: 1,
    }
});

class AppList extends Component {
    url = process.env.REACT_APP_TWITTER_LIST_URL;


    constructor(props) {
        super(props);
        this.state = {
            tweets: props.tweets
        }
    }

    render() {
        const {classes} = this.props;
        if (this.state.tweets.length === 0) {
            return null;
        } else {
            return (
                <div className={classes.root}>
                    <Grid container spacing={0}>
                        {this.state.tweets.map((tweet) => {
                            return (
                                <Grid key={tweet._id} item xl={3}>
                                    <ListCard key={tweet.twitter_content._id} tweet={tweet}/>
                                </Grid>
                            );
                        })
                        }
                    </Grid>
                </div>
            );
        }
    }
}

export default withStyles(styles)(AppList);
*/