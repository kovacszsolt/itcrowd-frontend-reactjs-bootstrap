import React, {Fragment} from 'react';
import './Category.css';

const randomString = require('random-string');


const AppListCardCategory = (props) => {
    if (props.category.length === 0) {
        return null;
    } else {
        return (
            <Fragment key={randomString({length: 20})}>
                {props.category.map((category) => {
                    return (
                        <a key={category.title} href={'/tag/' + category.title}
                           className="mr-1 badge badge-success">{category.title} ({category.count})</a>
                    )
                })
                }
            </Fragment>
        )
    }
}


export default AppListCardCategory;

