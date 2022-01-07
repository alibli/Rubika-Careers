import '../../styles/TableRow.css';

function TableRow({ rows, actions }) {
    return (

        <tbody>
            {rows.map((row) =>
                <tr key={row.id}
                    className="alert"
                    role="alert">
                    {row.fields.map((rowField, index) =>
                        <td key={index}>
                            {rowField}
                        </td>
                    )}

                    {(actions || []).map((action, index) => (
                        <td key={index}>
                            {action.caption}
                        </td>
                    ))}

                </tr>)}

        </tbody>

    );

}
export default TableRow;