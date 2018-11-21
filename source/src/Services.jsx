class Services {
    LIST_URL = process.env.REACT_APP_TWITTER_LIST_URL;
    ITEMS_PET_PAGE = 5;

    /**
     * get Tweet
     * with page
     * @param pageNumber
     * @returns {Promise<any>}
     */
    getTweets(pageNumber = 1) {
        return new Promise((resolve, reject) => {
            this._getTweetsAll().then((_getTweetsAllResult) => {
                resolve(_getTweetsAllResult.slice((pageNumber - 1) * this.ITEMS_PET_PAGE, pageNumber * this.ITEMS_PET_PAGE));
            });
        });
    }

    getTweetsBySlug(tweetSlug) {
        return new Promise((resolve, reject) => {
            this._getTweetsAll().then((getTweetsAllResult) => {
                resolve(getTweetsAllResult.find(getTweetsAllResultFind => getTweetsAllResultFind.slug === tweetSlug));
            });
        });
    }

    getTweetsByCategoryMultiple(categoryId) {
        return new Promise((resolve, reject) => {
            Promise.all(
                categoryId.map((categoryListResult) => {
                    return this.getTweetsByCategoryId(categoryListResult);
                })
            ).then((categoryListMapResult) => {
                const tweets = [];
                categoryListMapResult.flat().forEach((flatResult) => {
                    if (tweets.find((findResult) => {
                        return (JSON.stringify(findResult) === JSON.stringify(flatResult))
                    }) === undefined) {
                        tweets.push(flatResult);
                    }
                });
                resolve(tweets);
            });
        });
    }

    /**
     * get tweets where category slug
     * @param categorySlug
     * @returns {Promise<any>}
     */
    getTweetsByCategorySlug(categorySlug) {
        return new Promise((resolve, reject) => {
            this._getTweetsAll().then((getTweetsAllResult) => {
                const tweets = [];
                getTweetsAllResult.forEach((getTweetsAllResultMapResult) => {
                    if (getTweetsAllResultMapResult.twitter_category.filter(filterResult => filterResult.slug === categorySlug).length !== 0) {
                        tweets.push(getTweetsAllResultMapResult);
                    }
                });
                resolve(tweets);
            });
        });
    }

    getTweetsByCategoryId(categoryId) {
        return new Promise((resolve, reject) => {
            this._getTweetsAll().then((getTweetsAllResult) => {
                const tweets = [];
                getTweetsAllResult.forEach((getTweetsAllResultMapResult) => {
                    if (getTweetsAllResultMapResult.twitter_category.filter(filterResult => filterResult._id === categoryId).length !== 0) {
                        tweets.push(getTweetsAllResultMapResult);
                    }
                });
                resolve(tweets);
            });
        });
    }

    /**
     * get all tweet
     * test localstorage
     * @returns {Promise<any>}
     * @private
     */
    _getTweetsAll() {
        return new Promise((resolve, reject) => {
            const tweets = localStorage.getItem('tweets');
            if (tweets === null) {
                this._tweetLists().then((tweetListsResult) => {
                    localStorage.setItem('tweets', JSON.stringify(tweetListsResult));
                    resolve(tweetListsResult);
                });
            } else {
                resolve(JSON.parse(tweets));
            }

        });
    }

    /**
     * get data from server
     * @returns {Promise<any>}
     * @private
     */
    _tweetLists() {
        return new Promise((resolve, reject) => {
            fetch(this.LIST_URL)
                .then(res => res.json())
                .then(
                    (result) => {
                        resolve(result.result);
                    },
                    (error) => {
                    }
                )
        });
    }
}

export default Services;
