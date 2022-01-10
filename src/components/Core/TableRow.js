import '../../styles/TableRow.css';

function TableRow({ rows, actions }) {
    return (

        <tbody>
            {rows.map((row) =>
                <tr key={row.id}
                    className="alert"
                    role="alert">
                    {row.fields.map((field, index) =>
                        <td key={index}>
                            {field[Object.keys(field)[0]]}
                        </td>
                    )}

                    <td>
                        {row.details}
                    </td>

                </tr>)}

        </tbody>

    );

}
export default TableRow;