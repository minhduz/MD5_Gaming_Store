import React, { useEffect, useState } from 'react'
import FooterUserComp from './FooterUserComp'
import HeaderUserComp from './HeaderUserComp'
import LoadingComp from './LoadingComp'
import { signupStart } from '../../actions/UserActions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const initialState = {
    userName: "",
    password: "",
    email: "",
    phone: ""
}
export default function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formSignup,setFormSignup] = useState(initialState);

    const [pass,setPass] = useState();
    const [confirm,setConfirm] = useState();
    const [notify,setNotify] = useState();
    const {userName,phone,email} = formSignup;

    useEffect(()=>{
        if(pass==confirm&&pass!=""&&confirm!=""&&pass!=undefined&&confirm!=undefined){
            setNotify("4px solid green")
        }else if(confirm==undefined||pass==undefined||pass==""||confirm==""){
            setNotify("")
        }else{
            setNotify("4px solid red")
        }
    },[confirm,pass])

    console.log("Pass",pass);
    console.log("Confirm",confirm);

    const onChangeSignup = (e) => {
        let {name,value} = e.target;
        setFormSignup({...formSignup,[name]:value})
    }

    useEffect(()=>{
        setFormSignup({...formSignup,password:pass})
    },[pass])

    console.log(formSignup);

    const handleSignup = (e) => {
        e.preventDefault();
        dispatch(signupStart(formSignup))
        navigate('/login')
    }   

    return (
        <>
            {/* Page Preloder */}
            <LoadingComp />
            {/* Header Section Begin */}
            <HeaderUserComp />
            {/* Header End */}

            {/* Normal Breadcrumb Begin */}
            <section className="normal-breadcrumb set-bg" style={{ backgroundImage: `url("../user/img/elden_ring.jpg")` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="normal__breadcrumb__text">
                                <h2>Sign Up</h2>
                                <p>Welcome to the GameX</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Normal Breadcrumb End */}
            {/* Signup Section Begin */}
            <section className="signup spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="login__form">
                                <h3>Sign Up</h3>
                                <form action="#">
                                    <div className="input__item">
                                        <input type="username" placeholder="Username" name='userName' value={userName} onChange={onChangeSignup}/>
                                        <span>
                                            <i class="fa-solid fa-user"></i>
                                        </span>
                                    </div>
                                    <div className="input__item">
                                        <input type="password" placeholder="Password" name='password' onChange={(e)=>setPass(e.target.value)}/>
                                        <span>
                                            <i class="fa-solid fa-lock"></i>
                                        </span>
                                    </div>
                                    <div className="input__item" style={{border:`${notify}`}}>
                                        <input type="password" placeholder="Confirm password" onChange={(e)=>setConfirm(e.target.value)}/>
                                        <span>
                                            <i class="fa-sharp fa-solid fa-lock"></i>
                                        </span>
                                    </div>
                                    <div className="input__item">
                                        <input type="number" placeholder="Phone" name='phone' value={phone} onChange={onChangeSignup}/>
                                        <span>
                                            <i className="fa-solid fa-phone" />
                                        </span>
                                    </div>
                                    <div className="input__item">
                                        <input type="email" placeholder="Email" name='email' value={email} onChange={onChangeSignup}/>
                                        <span>
                                            <i className="fa-solid fa-envelope" />
                                        </span>
                                    </div>
                                    <button type="submit" className="site-btn" onClick={handleSignup}>
                                        Sign up Now
                                    </button>
                                </form>
                                <h5>
                                    Already have an account? <a href="login.html">Log In!</a>
                                </h5>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="login__social__links">
                                <h3>Login With:</h3>
                                <ul>
                                    <li>
                                        <a href="#" className="facebook">
                                            <i className="fa fa-facebook" /> Sign in With Facebook
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="google">
                                            <i className="fa fa-google" /> Sign in With Google
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="twitter">
                                            <i className="fa fa-twitter" /> Sign in With Twitter
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Signup Section End */}

            {/* Footer Section Begin */}
            <FooterUserComp />
            {/* Footer End */}
        </>
    )
}
