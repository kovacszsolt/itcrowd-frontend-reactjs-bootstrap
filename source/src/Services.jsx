import ServicesRemote from "./Services.remote";

const CircularJSON = require('circular-json');

class Services extends ServicesRemote {
    UPDATEKEY_URL = process.env.REACT_APP_UPDATEKEY_URL;
    STORAGE_KEY_TWEETLIST = 'TWEETLIST';
    STORAGE_KEY_CATEGORYLIST = 'CATEGORYLIST';
    STORAGE_KEY_UPDATE = 'UPDATE';

    ITEMS_PET_PAGE = 6;
    REFRESH_TIME = 2; //update key refresh rate im secund


    /**
     * get tweets with page
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

    /**
     * search tweets by title
     * @param searchParam
     * @param pageNumber
     * @returns {Promise<any>}
     */
    getSearchTweets(searchParam = '', pageNumber = 1) {
        return new Promise((resolve, reject) => {
            this._getTweetsAll().then((_getTweetsAllResult) => {
                resolve(_getTweetsAllResult.filter(filterResult => filterResult.title.toLowerCase().includes(searchParam.toLowerCase())));
            });
        });
    }

    /**
     * get ALL tweets
     * @param tweetSlug
     * @returns {Promise<any>}
     */
    getTweet(tweetSlug) {
        return new Promise((resolve, reject) => {
            this._getTweetsAll().then((_getTweetsAllResult) => {
                resolve(_getTweetsAllResult.find(findResult => findResult.slug === tweetSlug));
            });
        });
    }

    /**
     * get ALL category
     * @returns {Promise<any>}
     */
    getCategory() {
        return new Promise((resolve, reject) => {
            this._getTweetsAll().then((_getTweetsAllResult) => {
                resolve(CircularJSON.parse(localStorage.getItem(this.STORAGE_KEY_CATEGORYLIST)));
            });
        });
    }

    /**
     * find category by SLUG
     * @param categorySlug
     * @returns {Promise<any>}
     */
    getTweetsByCategorySlug(categorySlug) {
        return new Promise((resolve, reject) => {
            this._getTweetsAll().then((w) => {
                const catgory = CircularJSON.parse(localStorage.getItem(this.STORAGE_KEY_CATEGORYLIST));
                resolve(catgory.find(q => q.slug === categorySlug).twitter);
            });
        });
    }

    _setUpdate(key) {
        localStorage.setItem(this.STORAGE_KEY_UPDATE, CircularJSON.stringify({key: key, date: Date.now()}));
    }

    _getUpdate() {
        return (localStorage.getItem(this.STORAGE_KEY_UPDATE) === null) ? null : CircularJSON.parse(localStorage.getItem(this.STORAGE_KEY_UPDATE));
    }

    /**
     * get DATA and UPDATEKEY from REMOTE SERVER
     * @returns {Promise<any>}
     * @private
     */
    _stroreData() {
        return new Promise((resolve, reject) => {
            return Promise.all([this.RemoteUpdateKey(), this.__receiveData()]).then((PromiseAllReceive) => {
                const updateKey = PromiseAllReceive[0];
                const data = PromiseAllReceive[1];
                localStorage.setItem(this.STORAGE_KEY_TWEETLIST, CircularJSON.stringify(data.tweetList));
                localStorage.setItem(this.STORAGE_KEY_CATEGORYLIST, CircularJSON.stringify(data.categoryList));
                this._setUpdate((updateKey === undefined ? 'dummy' : updateKey.value));
                resolve(true);
            });
        });
    }

    /**
     * get All Tweets
     * check update time
     * @returns {Promise<any>}
     * @private
     */
    _getTweetsAll() {
        return new Promise((resolve, reject) => {
            if ((this._getUpdate() === null) || (Date.now() > Number(this._getUpdate().date) + (this.REFRESH_TIME * 1000))) {
                this._stroreData().then((qq) => {
                    resolve(CircularJSON.parse(localStorage.getItem(this.STORAGE_KEY_TWEETLIST)));
                });
            } else {
                resolve(CircularJSON.parse(localStorage.getItem(this.STORAGE_KEY_TWEETLIST)));
            }
        });
    }


    /**
     * get DATA (tweets and category) from REMOTE SERVER
     * @returns {Promise<{categoryList, tweetList} | never>}
     * @private
     */
    __receiveData() {
        return Promise.all([this.RemoteTweetList(), this.RemoteCategoryList()]).then((promiseAllResponse) => {
                return this.__tweetListPopulateCategory(promiseAllResponse[0], promiseAllResponse[1]);
            }
        )
    }

    /**
     * add category data to tweets
     * add tweets data to category
     * @param tweetList
     * @param categoryList
     * @returns {{categoryList: *, tweetList: *}}
     * @private
     */
    __tweetListPopulateCategory(tweetList, categoryList) {
        categoryList.map((categoryListMapResult) => {
            categoryListMapResult.twitter = tweetList.filter(tweetListFilterResult => tweetListFilterResult.twitter_category.includes(categoryListMapResult._id));
        });
        tweetList.map((tweet) => {
            tweet.twitter_category = tweet.twitter_category.map((twitter_category) => {
                return (categoryList.find(findResult => findResult._id === twitter_category));
            });
        });
        return {categoryList: categoryList, tweetList: tweetList};
    }

}

export default Services;
