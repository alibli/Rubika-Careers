import '../../styles/FilterRequests.css';

function FilterRequests({ filterRequests }) {
    const onFilter = (e) => {
        filterRequests(e.target.value, e.target.checked);
    }

    return (
        <div className='filter-requests'>
            <input
                type="checkbox"
                name='unknown'
                value='unknown' 
                onChange={(e) => onFilter(e)}/>
            <label htmlFor='unknown'>
                جدید
            </label>
            <br />

            <input
                type="checkbox"
                name='in progress'
                value='in progress' 
                onChange={(e) => onFilter(e)}/>
            <label htmlFor='in progress'>
                در حال بررسی
            </label>
            <br />

            <input
                type="checkbox"
                name='accept'
                value='accept'
                onChange={(e) => onFilter(e)}/>
            <label htmlFor='accept'>
                تایید شده
            </label>
            <br />

            <input
                type="checkbox"
                name='reject'
                value='reject'
                onChange={(e) => onFilter(e)}/>
            <label htmlFor='reject'>
                رد شده
            </label>
            <br />
        </div >
    );

}

export default FilterRequests;