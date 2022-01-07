import '../../styles/AdminRequestsTable.css';

import Table from '../Core/Table';

function AdminJobs() {
    const hList = [
        { id: 0, name: "عنوان" },
        { id: 1, name: "تعداد درخواست ها " },
        { id: 2, name: "وضعیت" },
        { id: 3, name: "جزییات" },
        { id: 4, name: "تغییر" }
    ];

    const rList = [
        { id: 0, fields: ["front-end1", "5"] },
        { id: 1, fields: ["front-end2", "10"] },
        { id: 2, fields: ["front-end3", "19"] },
        { id: 3, fields: ["front-end4", "7"] }
    ];

    const actions = [
        {
            caption: <i className="fa fa-search"></i>, 
            onClick: <a href='#'></a>
        },
        {
            caption: <i className="fa fa-eye"></i>, onClick: (id) => {
                // /requestdetails/$(id)
            }
        },
        {
            caption: <i class="fa fa-pencil" aria-hidden="true"></i>, onClick: (id) => {

            }
        },

    ];

    return (

        <div dir='rtl' className='container'>
            <button className='btn' id='addJobBtn'>افزودن موقعیت شغلی </button>
            <Table actions={actions} headerListMuck={hList} rowListMuck={rList} id='table'></Table>
        </div>


    );

}

export default AdminJobs;