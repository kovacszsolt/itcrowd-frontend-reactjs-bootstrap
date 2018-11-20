import React, {Fragment} from 'react';
import './Category.css';
const randomString = require('random-string');


const AppListCardCategory = (props) => {
    return (
        <Fragment key={randomString({length: 20})}>
            {props.category.map((category) => {
                return (
                    <a key={category._id} href={'/tag/' + category.slug} className="mr-1 badge badge-success">{category.title}</a>
                )
            })
            }
        </Fragment>
    )
}


export default AppListCardCategory;

