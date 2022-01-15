import '../../styles/FilterRequests.css';

function FilterRequests({ filterRequests }) {
    const onFilter = (e) => {
        filterRequests(e.target.value, e.target.checked);
    }

    return (
        <div className='filter-requests'>
            <label htmlFor='unknown'>
                جدید
            </label>
            <input
                type="checkbox"
                name='unknown'
                value='unknown' 
                onChange={(e) => onFilter(e)}/>
            <br />

            <label htmlFor='in progress'>
                در حال بررسی
            </label>
            <input
                type="checkbox"
                name='in progress'
                value='in progress' 
                onChange={(e) => onFilter(e)}/>
            <br />

            <label htmlFor='accept'>
                تایید شده
            </label>
            <input
                type="checkbox"
                name='accept'
                value='accept'
                onChange={(e) => onFilter(e)}/>
            <br />

            <label htmlFor='reject'>
                رد شده
            </label>
            <input
                type="checkbox"
                name='reject'
                value='reject'
                onChange={(e) => onFilter(e)}/>
            <br />
        </div >
    );

}

export default FilterRequests;