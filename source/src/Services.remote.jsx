class ServicesRemote {
    LIST_URL = process.env.REACT_APP_TWITTER_LIST_URL;
    CATEGORY_URL = process.env.REACT_APP_TWITTER_CATEGORY_LIST_URL;
    UPDATEKEY_URL = process.env.REACT_APP_UPDATEKEY_URL;

    RemoteTweetList() {
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


    RemoteCategoryList() {
        return new Promise((resolve, reject) => {
            fetch(this.CATEGORY_URL)
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

    RemoteUpdateKey() {
        return new Promise((resolve, reject) => {
            fetch(this.UPDATEKEY_URL)
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

export default ServicesRemote;
