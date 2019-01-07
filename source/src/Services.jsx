import ServicesRemote from "./Services.remote";
import {getCategory, getTweet, getTweetKeys, getTweets} from "./Services.indexeddb";

class Services {
    static getData() {
        return ServicesRemote.getData();
    }

    static getTweets(pageNumber = 1) {
        return ServicesRemote.getData().then(() => {
            return getTweets(pageNumber).then((result) => {
                return result;
            });
        });
    }

    static getCategoryCount(category) {
        return ServicesRemote.getData().then(() => {
            return getCategory(category).then((result) => {
                console.log('result', result);
                return result.length;
            });
        });
    }

    static getCategory(category) {
        return ServicesRemote.getData().then(() => {
            return getCategory(category).then((result) => {
                return result;
            });
        });
    }

    static getTweet(slug) {
        return ServicesRemote.getData().then(() => {
            return getTweet(slug).then((result) => {
                return result;
            });
        });
    }

    static findTweet(searchText) {
        return ServicesRemote.getData().then(() => {
            return getTweetKeys().then((result) => {
                const keys = [];
                result.forEach((tweet) => {
                    if (tweet.indexOf(searchText) !== -1) {
                        keys.push(tweet);
                    }
                });
                return Promise.all(keys.map((key) => {
                    return getTweet(key);
                }));

            });
        });
    }
}

export default Services;
