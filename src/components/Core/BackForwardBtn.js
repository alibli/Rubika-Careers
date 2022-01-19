import { useNavigate } from "react-router-dom";
import '../../styles/BackForwardBtn.css';

function BackForwardBtn() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    const goForward = () => {
        navigate(1);
    }

    return (
        <div className="back-forward-buttons">
            <i
                className="fa fa-arrow-right fa-lg"
                onClick={goForward}>
            </i>
            <i
                className="fa fa-arrow-left fa-lg"
                onClick={goBack}>
            </i>
        </div>

    );
}

export default BackForwardBtn;