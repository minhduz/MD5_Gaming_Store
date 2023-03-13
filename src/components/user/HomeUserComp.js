import React from 'react'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import HeaderUserComp from './HeaderUserComp';

import SearchUserGame from './SearchUserGame';
import TrendingGame from './TrendingGame';
import SideBarSection from './SideBarSection';
import FooterUserComp from './FooterUserComp';
import LoadingComp from './LoadingComp';
import './css/style.css';


export default function() {
    
    return (
        <>
            {/* Page Preloder */}
            <LoadingComp/>
            {/* Header Section Begin */}
            <HeaderUserComp></HeaderUserComp>
            {/* Header End */}
            {/* Hero Section Begin */}
            <section className="hero">
                <div className="container">
                    <OwlCarousel
                    className='owl-theme'
                        loop={true}
                        margin={0}
                        items={1}
                        dots={true}
                        nav={true}
                        navText={["<span class='arrow_carrot-left'></span>", "<span class='arrow_carrot-right'></span>"]}
                        animateOut={'fadeOut'}
                        animateIn={'fadeIn'}
                        smartSpeed={1200}
                        autoHeight={false}
                        autoplay={true}
                        mouseDrag={false}
                    >
                        <div
                            className="hero__items set-bg"
                            style={{ backgroundImage: `url("assets/images/gow_ranarok.jpg")` }}
                        >
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="hero__text">
                                        <div className="label">Action</div>
                                        <div className="label">Fighting game</div>
                                        <h2 id="gow">God of war: Ranarok</h2>
                                        <p id="gow">
                                            Embark on an epic and heartfelt journey as Kratos and Atreus
                                            struggle with holding on and letting go
                                        </p>
                                        <a href="game-details.html">
                                            <span>Buy Now</span> <i className="fa fa-angle-right" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="hero__items set-bg"
                            style={{ backgroundImage: `url("assets/images/call_of_duty.jpg")` }}
                        >
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="hero__text">
                                        <div className="label">FPS</div>
                                        <div className="label">Multiplayer</div>
                                        <h2>Call of Duty:Modern Warfare II</h2>
                                        <p>
                                            Squad up and fight alongside the iconic operators of Task
                                            Force 141 with the return of Modern Warfare®.
                                        </p>
                                        <a href="#">
                                            <span>Buy Now</span> <i className="fa fa-angle-right" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="hero__items set-bg"
                            style={{ backgroundImage: `url("assets/images/elden_ring.jpg")` }}
                        >
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="hero__text">
                                        <div className="label">Adventure</div>
                                        <div className="label">Open world</div>
                                        <h2>Elden Ring</h2>
                                        <p>
                                            THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by
                                            grace to brandish the power of the Elden Ring and become an
                                            Elden Lord in the Lands Between.
                                        </p>
                                        <a href="#">
                                            <span>Buy Now</span> <i className="fa fa-angle-right" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </OwlCarousel>

                </div>
            </section>
            {/* Hero Section End */}
            {/* Product Section Begin */}
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {/* Trending Game Start */}
                            <TrendingGame/>
                            {/* Trending Game End */}
                        </div>
                        {/* Side Section End */ }
                        <SideBarSection/>
                        {/* Side Section End */}
                    </div>
                </div>
            </section>
            {/* Product Section End */}
            {/* Footer Section Begin */}
            <FooterUserComp/>
            {/* Footer Section End */}
            {/* Search model Begin */}
            <SearchUserGame/>
            {/* Search model end */}
        </>

    )
}
