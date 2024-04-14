import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="navbar navbar-expand-md navbar-light bg-light border-bottom shadow-sm">
            <div className="container">
                <Link to="/" className="navbar-brand text-dark">
                    Sistema de Apólice
                </Link>
            </div>
        </div>
    );
}

export default NavBar;