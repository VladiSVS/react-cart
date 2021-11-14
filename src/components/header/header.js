import './header.css';
import { Link } from 'react-router-dom';

const Header = (props) => {

    const { cartAmountItems } = props;

    return (
        <header>
            <ul>
                <li><Link to='/'><i className="fas fa-home"></i></Link></li>
                <li><Link to='/add'><i className="fas fa-tools"></i></Link></li>
                <li>
                    <Link to='/cart'>
                        <i className="fas fa-shopping-cart"></i>
                        <span className="cartNum">{cartAmountItems}</span>
                    </Link>
                </li>
            </ul>
        </header >
    );
}

export default Header;