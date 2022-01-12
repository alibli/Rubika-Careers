import '../../styles/TableRow.css';

function TableRow({ rows }) {
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
                    {row.modals.map((modal, index) =>
                        <td key={index}>
                            {modal.modalContainer}
                        </td>
                    )}
                </tr>
            )}
        </tbody>

    );

}
export default TableRow;