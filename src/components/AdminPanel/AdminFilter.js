import '../../styles/AdminFilter.css';

function AdminFilter({filterList}){

    return(
        <form className=''>
        
            {filterList.map((myFilter =>(<>
            
                <label key={myFilter.id}><input type="checkbox" name={myFilter.name} value={myFilter.name} id={myFilter} />{myFilter.name}</label>
                <br/>
            </>
            )))}
        
        </form>
    );

}

export default AdminFilter;