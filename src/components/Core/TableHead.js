import '../../styles/TableHead.css';
function TableHead({headerList}){

    return(
        <thead className="">
            <tr>
                    {headerList.map((myHeader) => <th key={myHeader.id}>{myHeader.name}</th> )}                        
            </tr>
        </thead>
    );

}
export default TableHead;