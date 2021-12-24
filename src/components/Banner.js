import banner from '../assets/images/banner.jpg';
import '../styles/Banner.css';

function Banner() {
    return (
        <img
            src={banner}
            id="bannerImg"
            alt="Hiring" />
    );
}

export default Banner;