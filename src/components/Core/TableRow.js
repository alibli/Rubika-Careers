import '../../styles/TableRow.css';

function TableRow({ rowList, actions }) {
    return (

        <tbody>
            {rowList.map((myRow) =>
                <tr key={myRow.id} className="alert" role="alert">
                    {myRow.fields.map((rowField, i) => <td key={i}>{rowField}</td>)}
                    <td>
                        {(actions || []).map((action) => (
                            <a onClick={() => { action.onClick(myRow.id) }}>{action.caption}</a>
                        ))}
                    </td>
                </tr>)}

        </tbody>

    );

}
export default TableRow;