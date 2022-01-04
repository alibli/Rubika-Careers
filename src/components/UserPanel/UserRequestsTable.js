import '../../styles/UserRequestsTable.css';

import Table from '../Core/Table';

import userService from '../../Service/UserService';
import { useEffect } from 'react';
import toastService from '../../Service/ToastService';

function UserRequestsTable(){
    const hList = [
        { id: 0, name: "عنوان" },
        { id: 1, name: "تاریخ ارسال" }, 
        { id: 2, name: "وضعیت" },
        { id: 3, name: "جزییات" }
    ];

    const rList = [
        { id: 0, fields: ["front-end1" , "1/1/1400" , "rejected" ] },
        { id: 1, fields: ["front-end2" , "1/1/1400" , "rejected" ] }, 
        { id: 2, fields: ["front-end3" , "1/1/1400" , "rejected" ] },
        { id: 3, fields: ["front-end4" , "1/1/1400" , "rejected" ] }
    ];

    const actions = [
        { caption:<i className="fa fa-eye"></i>, onClick:(id)=>{
// /requestdetails/$(id)
        }},
    ];

    

    useEffect(() => {

        async function userTable() {
           try {
               const response = await userService.getUserProfile();
               if(response){
                   rList = response.data.applications;
               }

           } catch (error) {
            console.log(error);
            toastService.showToast(error, 'danger');     
           }
            
        }

    }, []);


    return(
        <div dir='rtl' className='container'>
            <h3>درخواست ها</h3>
            <Table actions={actions} headerListMuck={hList} rowListMuck={rList} id='table'></Table>
        </div>
    );

}

export default UserRequestsTable;