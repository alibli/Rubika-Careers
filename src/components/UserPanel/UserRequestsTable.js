import Table from '../Core/Table';

function UserRequestsTable(){
    hList = [
        { id: 0, name: "2عنوان" },
        { id: 1, name: "2تاریخ ارسال" }, 
        { id: 2, name: "2وضعیت" },
        { id: 3, name: "2جزییات" }
    ];

    rList = [
        { id: 0, fields: ["front-end" , "1/1/1400" , "rejected" , "details..."] },
        { id: 1, fields: ["front-end2" , "1/1/1400" , "rejected" , "details..."] }, 
        { id: 2, fields: ["front-end3" , "1/1/1400" , "rejected" , "details..."] },
        { id: 3, fields: ["front-end4" , "1/1/1400" , "rejected" , <a href='abc'>ABC</a>] }
    ];

    return(
        <Table headerListMuck={hList} rowListMuck={rList}></Table>
    );

}

export default UserRequestsTable;