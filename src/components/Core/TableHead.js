import '../../styles/TableHead.css';

function TableHead({columns}) {
    return (
        <thead>
            <tr>
                    {columns.map((column) => 
                    <th key={column.id}>
                        {column.name}
                    </th>
                    )}                        
            </tr>
        </thead>
    );

}
export default TableHead;