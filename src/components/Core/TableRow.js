import '../../styles/TableRow.css';

function TableRow({rowList}){
    return(
        
            <tbody>
                {rowList.map((myRow) =>
                <tr key={myRow.id} className="alert" role="alert">
                    {myRow.fields.map((rowField , i) => <td key={i}>{rowField}</td>)}
                </tr> )} 

            </tbody>    
        
    );

}
export default TableRow;