import {Link} from 'react-router-dom';
import {useAuth} from "react-oidc-context";
import 'boxicons/css/boxicons.min.css';

export const Sidebar = ({changePage, page}) => {
    const auth = useAuth();

    const logout = async () => {
        await auth.signoutRedirect();
    };

    let menu = null;

    if (auth.isAuthenticated) {
        menu = <ClientMenu changePage={changePage} page={page} logoutHandler={async () => logout()}/>;
    }

    return (
        <section id="side-menu">
            <h1 id="logo"><i className='bx bxs-bank'></i> Fiap Bank</h1>
            {menu}
        </section>
    )
}

export const ClientMenu = (props) => {
    const {logoutHandler, page} = props;

    const handleLogout = () => {
        logoutHandler();
    };

    return (
        <ul>
            <SideLink to="/" active={page} text="Home" icon="bx bx-home"/>
            <SideLink to="/" onClick={handleLogout} text="Sair" icon="bx bx-log-out"/>
        </ul>
    )
}

export const SideLink = (props) => {
    const {icon, text, to, active, onClick} = props;

    return (
        <li>
            <Link to={to} className={active === to ? 'active' : ''} onClick={onClick}>
                <i className={icon}></i> {text}
            </Link>
        </li>
    )
}
