import React from 'react';

function Dropdown({ userName }) {

    let itemList = [    // must migrate to service
        {id: 0 , path: '/info' , name: 'اطلاعات'},
        {id: 1 , path: '/req' , name: 'درخواست ها'},
    ];
    function DropdownItem(props){
        return(
            <li>
                <link className="dropdown-item" to={props.src}>{props.name}</link>
            </li>
        );
    }

    return(
    <li className="nav-item dropdown btn dropdownClass" id="userDropdown">
        <a className="dropdown-toggle" type="button" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            سلام {userName}
        </a>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            {itemList.map((myItem) => <DropdownItem key={myItem.id} src={myItem.path} name={myItem.name} />)}
        </ul>
    </li>
    );

}

export default Dropdown;