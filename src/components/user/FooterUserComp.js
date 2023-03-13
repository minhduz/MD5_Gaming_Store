import React from 'react'

export default function FooterUserComp() {
    return (
        <footer className="footer">
            <div className="page-up">
                <a href="#" id="scrollToTopButton">
                    <i class="fa-solid fa-chevron-up"></i>
                </a>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="footer__logo">
                            <a href="./index.html">
                                <img src="img/logo.png" alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="footer__nav">
                            <ul>
                                <li className="active">
                                    <a href="./index.html">Homepage</a>
                                </li>
                                <li>
                                    <a href="./categories.html">Categories</a>
                                </li>
                                <li>
                                    <a href="./blog.html">Our Blog</a>
                                </li>
                                <li>
                                    <a href="#">Contacts</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <p>Copyright ©</p>
                        <p>Contacts us: </p>
                        <p>Email: gamingX@gmail.com</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
