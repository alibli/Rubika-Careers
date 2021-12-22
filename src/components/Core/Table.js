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

    return(
        <table dir='rtl' className='table container'>
            <TableHead headerList={headerListMuck} />

        </table>

    );



}
export default Table;