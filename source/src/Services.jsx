import ServicesRemote from "./Services.remote";
import {parse} from 'flatted/esm';

class Services extends ServicesRemote {
    ITEMS_PET_PAGE = 6;

    getTweets(pageNumber = 1) {
        return this.getData().then((response) => {
            return response.tweetList.slice((pageNumber - 1) * this.ITEMS_PET_PAGE, pageNumber * this.ITEMS_PET_PAGE);
        });
    }

    search(searchText) {
        searchText = (searchText === undefined) ? '' : searchText;
        return this.getData().then((response) => {
            return response.tweetList.filter(filterResult => filterResult.title.toLowerCase().includes(searchText.toLowerCase()));
        });
    }

    getTweetsAll() {
        return this.getData().then((response) => {
            return response.tweetList;
        });
    }

    getStaticTweetsAll() {
        return parse(localStorage.getItem(this.STORAGE_KEY_TWEETLIST));
    }

    getCategory() {
        return this.getData().then((response) => {
            return response.categoryList;
        });
    }

    getTweetsByCategorySlug(categorySlug) {
        return this.getData().then((response) => {
            return response.tweetList.filter(category => category.tags.includes(categorySlug));
        });
    }

    getTweet(tweetSlug) {
        return this.getData().then((response) => {
            return response.tweetList.find(a => a.slug === tweetSlug);
        });
    }

    getTweetsByCategoryMultiple(categoryIds) {
        return this.getData().then((response) => {
            let tweetList = [];
            response.categoryList.filter(filterResult => categoryIds.includes(filterResult._id)).forEach((forEachResult) => {
                tweetList = tweetList.concat(forEachResult.tweets);
            });

            return tweetList;
        });
    }
}

export default Services;
