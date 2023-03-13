import React, { useState, useEffect } from 'react'
import FooterUserComp from './FooterUserComp'
import HeaderUserComp from './HeaderUserComp'
import LoadingComp from './LoadingComp'
import { useDispatch, useSelector } from 'react-redux'
import { loginStart } from '../../actions/UserActions'
import { NavLink, useNavigate } from 'react-router-dom';


const initialState = {
    userName: "",
    password: ""
}

export default function Login() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [formLogin, setFormLogin] = useState(initialState)

    const { userName, password } = formLogin

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormLogin({ ...formLogin, [name]: value });
    }

    const handleSummit = (e) => {
        e.preventDefault();
        if (userName && password) {
            dispatch(loginStart(formLogin))
        }
        setFormLogin(initialState)
    }

    let loginStatus = useSelector(state => state.loginReducer.loginStatus);
    const { loginData } = useSelector(state => state.loginReducer)

    if (loginData !== undefined) {
        if (loginData?.listRoles?.length === 3 || loginData?.listRoles?.length === 2) {
            navigate('/admin/category')
        } else if (loginData?.listRoles?.length === 1) {
            navigate(-1)
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            navigate('/')
        }
    }, [])

    console.log("Data: ", loginData?.listRoles?.length);
    console.log("Status: ", loginStatus);

    return (
        <>
            {/* Page Preloder */}
            <LoadingComp />
            {/* Header Section Begin */}
            <HeaderUserComp />
            {/* Header End */}

            {/* Normal Breadcrumb Begin */}
            <section className="normal-breadcrumb set-bg" style={{ backgroundImage: `url("../user/img/spider_man.jpg")` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="normal__breadcrumb__text">
                                <h2>Login</h2>
                                <p>Welcome to the GameX</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Normal Breadcrumb End */}
            {/* Login Section Begin */}
            <section className="login spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="login__form">
                                <h3>Login</h3>
                                <form action="#">
                                    <div className="input__item">
                                        <input type="text" placeholder="Username" name='userName' value={userName} onChange={handleChange} />
                                        <span className="icon_mail"><i class="fa-solid fa-user"></i></span>
                                    </div>
                                    <div className="input__item">
                                        <input type="text" placeholder="Password" name='password' value={password} onChange={handleChange} />
                                        <span className="icon_lock"><i class="fa-solid fa-lock"></i></span>
                                    </div>
                                    <button type="submit" className="site-btn" onClick={handleSummit}>
                                        Login Now
                                    </button>
                                </form>
                                <a href="#" className="forget_pass">
                                    Forgot Your Password?
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login__register">
                                <h3>Dont’t Have An Account?</h3>
                                <NavLink to={'/signup'} className="primary-btn">
                                    Register Now
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="login__social">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-6">
                                <div className="login__social__links"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Login Section End */}


            {/* Footer Section Begin */}
            <FooterUserComp />
            {/* Footer End */}
        </>

    )
}
