import React, {Fragment} from 'react';
import './Category.css';



const AppListCardCategory = (props) => {
    if (props.category.length === 0) {
        return null;
    } else {
        return (
            <Fragment key={props.category}>
                {props.category.map((category) => {
                    return (
                        <a key={category} href={'/tag/' + category}
                           className="mr-1 badge badge-success">{category}</a>
                    )
                })
                }
            </Fragment>
        )
    }
}


export default AppListCardCategory;

