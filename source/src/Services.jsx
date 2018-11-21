class Services {
    LIST_URL = process.env.REACT_APP_TWITTER_LIST_URL;
    ITEMS_PET_PAGE = 5;

    getTweets(pageNumber = 1) {
        return new Promise((resolve, reject) => {
            this.getTweetsAll().then((qq) => {
                resolve(qq.slice((pageNumber - 1) * this.ITEMS_PET_PAGE, pageNumber * this.ITEMS_PET_PAGE));
            });
        });
    }

    getTweetsAll() {
        return new Promise((resolve, reject) => {
            const tweets = localStorage.getItem('tweets');
            if (tweets === null) {
                this.tweetLists().then((tweetListsResult) => {
                    localStorage.setItem('tweets', JSON.stringify(tweetListsResult));
                    resolve(tweetListsResult);
                });
            } else {
                resolve(JSON.parse(tweets));
            }

        });
    }

    tweetLists() {
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
