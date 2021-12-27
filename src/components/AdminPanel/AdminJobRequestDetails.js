import '../../styles/AdminJobRequestDetails.css';

import Table from '../Core/Table';
import AdminFilter from './AdminFilter';


function AdminJobRequestDetails() {
    
    const hList = [
        { id: 0, name: "نام" },
        { id: 1, name: "تاریخ درخواست" },
        { id: 2, name: "**وضعیت" },
        { id: 3, name: "جزییات" },
        
    ];

    const rList = [
        { id: 0, fields: ["علیرضا علی آبادی", "10/5/1400" , 'dropdown' ]},
        { id: 1, fields: ["پریناز ستایشگر", "10/5/1400" , 'dropDown' ]},
        { id: 2, fields: ["علی بهلولی", "10/5/1400" , 'dropDown' ]},
        { id: 3, fields: ["فرزانه زیرک", "10/5/1400" , 'dropDown']}
    ];

    const actions = [
        {
            caption: <i className="fa fa-eye"></i>, onClick: (id) => {
                // /requestdetails/$(id)
            }
        },

    ];

    // const fList = ['نامشخص' , 'قبول' , 'رد' , 'در حال بررسی'  ];
    const fList = [
        { id: 0 , name : 'نامشخص' },
        { id: 1 , name : 'قبول' },
        { id: 2 , name : 'رد' },
        { id: 3 , name : 'در حال بررسی' },
    ];

    return (

        <div className='row col col-lg-11 col-12 offset-1' >

            <div dir='rtl' className='col col-lg-9 col-12'>
                <h3>درخواست ها </h3>
                <Table actions={actions} headerListMuck={hList} rowListMuck={rList} ></Table>
            </div>

            <div dir='rtl' className='col col-lg-2 offset-lg-1 col-6 offset-6 '>
                <AdminFilter filterList={fList}></AdminFilter>
            </div>

        </div>


    );
}

export default AdminJobRequestDetails;