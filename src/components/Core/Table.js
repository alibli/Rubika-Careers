import TableRow from './TableRow';
import TableHead from './TableHead';
function Table({ columns, rows }) {

    return (
        <table dir='rtl' className='table container'>
            <TableHead columns={columns} />
            <TableRow rows={rows} />
        </table>

    );

}
export default Table;