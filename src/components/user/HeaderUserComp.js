import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getListHomeCategoryStart } from '../../actions/UserActions';


export default function HeaderUserComp() {
    const dispatch = useDispatch();

    const [avatar, setAvatar] = useState("");
    const [iconLogin, setIconLogin] = useState(<NavLink to={"/login"}><i title='Login' class="fa-solid fa-door-closed"></i></NavLink>);
    const navigate = useNavigate();
    
    const handeLogout = () => {
        console.log("Logout");
        localStorage.removeItem("user")
        window.location.reload();
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIconLogin(<button title='Log out' onClick={handeLogout}><i class="fa-solid fa-right-from-bracket"></i></button>)
            if (user.avatar === null) {
                setAvatar(<NavLink to={`user/${user.ID}`}><img
                    style={{ display: "inline-block" }}
                    id="profile"
                    src="../user/img/default-avatar.png"
                /></NavLink>)

            } else {
                setAvatar(<img
                    style={{ display: "inline-block" }}
                    id="profile"
                    src={user.avatar}
                />)
            }
        }

    }, [])

    useEffect(() => {
        dispatch(getListHomeCategoryStart())
    }, [])

    const { categories } = useSelector(state => state.categoryHomeReducer);

    return (
        <header className="header">
            <div className="container">
                <div className="row d-flex align-items-center">
                    <div className="col-lg-2">
                        <div className="header__logo">
                            <NavLink to={"/"}>
                                <img src="../user/img/logo.png" alt="" />
                            </NavLink>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="header__nav">
                            <nav className="header__menu mobile-menu">
                                <ul>
                                    <li className="active">
                                        <a href="./index.html">Homepage</a>
                                    </li>
                                    <li>
                                        <a href="./categories.html">
                                            Categories <span className="arrow_carrot-down" />
                                        </a>
                                        <ul className="dropdown">
                                            {categories && categories.map((category, index) => {
                                                return <li key={index}>
                                                    <NavLink to={`/category/${category.catID}`}>{category.catName}</NavLink>
                                                    <div className="child-categories">
                                                        {category.listCatChild.map((catChild, index) => {
                                                            return <NavLink key={index} to={`/category/${catChild.catID}`}>{catChild.catName}</NavLink>
                                                        })}
                                                    </div>
                                                </li>
                                            })}
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="./blog.html">Our Blog</a>
                                    </li>
                                    <li>
                                        <a href="following.html">Following</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="header__right">
                            <a href="#" className="search-switch">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </a>
                            {avatar}
                            <NavLink to={'/cart'}>
                            <i className="fa fa-shopping-cart" />
                                <span className="badge" style={{ paddingLeft: "4px" }}>3</span>
                            </NavLink>
                            {iconLogin}

                        </div>
                    </div>
                </div>
                <div id="mobile-menu-wrap" />
            </div>
        </header>
    )
}
