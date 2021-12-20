import React from 'react';
import '../styles/Footer.css';

function Footer() {

    return (
        <footer dir="rtl" className="footer">
            <div className='footerInfo'>
                <p className="col col-9"><i className=' fa fa-map-marker'></i> خیابان ونک </p>
                <p className="col col-9"><i className=' fa fa-phone'></i> 02188123456</p>
                <p className="col col-9"><i className=' fa fa-envelope'></i> jobs@rubika.com </p>
            </div>
        </footer>
    );

}
export default Footer