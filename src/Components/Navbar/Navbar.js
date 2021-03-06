import React ,{useState}from 'react'
import './Navbar.css'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
    const [click, setClick] = useState(false);

    const handleClick = () =>setClick(!click)
    return (
        <>
        <nav className="navbar">
            <div className="nav-container">
                <NavLink exact to="/" className="nav-logo">
                    Logo
                </NavLink>
                <ul className={click ? "nav-menu active":"nav-menu"}>
                <li className="nav-item">
                        <NavLink activeClassName="active" exact to="/categories" className="nav-links" onClick={handleClick}>
                        Category
                        </NavLink> 
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="active" exact to="/" className="nav-links" onClick={handleClick}>
                        product
                        </NavLink> 
                    </li>
                        {/* <li className="nav-item">
                        <NavLink exact activeClassName="active" to="/Add Product" className="nav-links" onClick={handleClick}>
                        Add Product
                        </NavLink> 
                    </li> */}
                    
                </ul>
                
                <div className="nav-icon" onClick={handleClick}><i className={click ? "fas fa-times":"fas fa-bars"}></i></div>
            </div>
            
        </nav>
        </>
    )
}

export default Navbar
