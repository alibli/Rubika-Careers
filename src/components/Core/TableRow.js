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


                    <td>
                        {
                            row.applicationsCountModal
                                ? row.applicationsCountModal
                                : <></>
                        }
                    </td>

                    <td>
                        {
                            row.detailsModal
                                ? row.detailsModal
                                : <></>
                        }
                    </td>

                    <td>
                        {
                            row.editModal
                                ? row.editModal
                                : <></>
                        }
                    </td>

                </tr>)}

        </tbody>

    );

}
export default TableRow;