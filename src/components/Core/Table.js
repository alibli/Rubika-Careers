import '../../styles/Table.css'
import TableRow from './TableRow';
import TableHead from './TableHead';
function Table() {

    const headerListMuck = [
        { id: 0, name: "عنوان" },
        { id: 1, name: "تاریخ ارسال" }, 
        { id: 2, name: "وضعیت" },
        { id: 3, name: "جزییات" }
    ];

    const rowListMuck = [
        { id: 0, fields: ["front-end" , "1/1/1400" , "rejected" , "details..."] },
        { id: 1, fields: ["front-end2" , "1/1/1400" , "rejected" , "details..."] }, 
        { id: 2, fields: ["front-end3" , "1/1/1400" , "rejected" , "details..."] },
        { id: 3, fields: ["front-end4" , "1/1/1400" , "rejected" , "details..."] }
    ];

    return(
        <table dir='rtl' className='table container'>
            <TableHead headerList={headerListMuck} />
            <TableRow  rowList={rowListMuck}/>
        </table>

    );

}
export default Table;