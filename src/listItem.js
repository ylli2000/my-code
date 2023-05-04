import { NavLink } from "react-router-dom";

const ListItem =({path, item}) => {
    return <div key={item.url.split('/')[6]}>
    <NavLink to={'/'+path+'/'+item.url.split('/')[6]}>
        {item.name}
    </NavLink>
    </div>
}

export default ListItem;