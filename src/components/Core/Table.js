import '../../styles/Table.css'
import TableRow from './TableRow';
import TableHead from './TableHead';
function Table({headerListMuck , rowListMuck,actions}) {

    return(
        <table dir='rtl' className='table container'>
            <TableHead headerList={headerListMuck} />
            <TableRow  rowList={rowListMuck} actions={actions}/>
        </table>

    );

}
export default Table;