import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

const Header = ({showHome, showFav}) =>  {
    return ( 
        <header className="navbar containerHeader">
            <div className="col-sm-3">
                {showHome ?
                    <Link
                        className="textHeader"
                        to={'/'}
                    >
                        &laquo; Home
                    </Link>
                :null}
            </div>
            <div className="col-sm-6 mx-auto text-center ">
                <img src={logo} alt="logo" className="mx-auto logoHeader"/>
            </div>
            <div className="col-sm-3 text-right">
                {showFav ?
                    <Link
                        to={'/favoritos'}
                        className="textHeader"
                    >
                        &#x02605; View Favorites
                    </Link>
                :null}
            </div>
            
        </header>
    );
}
 
export default Header;