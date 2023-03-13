import React, { useEffect } from 'react'
import FooterUserComp from './FooterUserComp';
import GameReview from './GameReview';
import HeaderUserComp from './HeaderUserComp';
import LoadingComp from './LoadingComp';
import SearchUserGame from './SearchUserGame';
import SideBarSection from './SideBarSection';
import './css/bootstrap.min.css';
import './css/style.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetailStart } from '../../actions/AdminActions';
import moment from 'moment';

export default function GameUserDetail() {
    useEffect(()=>{
        window.scrollTo(0,0);
    },[])

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGameDetailStart(id))
    }, [id])

    const { game } = useSelector(state => state.gameDetailReducer)
    console.log(game);
    const gamePlatforms = game?.listPlatform?.map(platform => platform.platformName).join(', ')
    const gameCategories = game?.listCategory?.map(category => category.categoryName).join(', ')
    const releaseDate = moment(game.gameReleaseDate).format('MMMM Do YYYY');
    console.log(releaseDate);


    console.log(game);

    return (
        <>
            {/* Page Preloder */}
            <LoadingComp />
            {/* Header Section Begin */}
            <HeaderUserComp />
            {/* Header End */}

            <section className="anime-details spad">
                <div className="container">
                    <div className="anime__details__content">
                        <div className="row">
                            <div className="col-lg-3">
                                <div
                                    className="anime__details__pic set-bg"
                                    style={{ backgroundImage: `url("${game.gameMainImage}")` }}
                                    id="main-img"
                                >
                                    <div className="comment">
                                        <i className="fa fa-comments" /> 11
                                    </div>
                                    <div className="view">
                                        <i className="fa fa-dollar" /> {game.gamePrice}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <div className="sub-image">
                                    {game?.listImage?.map((image, index) => {
                                        return <img key={index} src={image.imageUrl} alt="" className="small-img" />
                                    })}
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="anime__details__text">
                                    <div className="anime__details__title">
                                        <h3>{game.gameName}</h3>
                                    </div>
                                    <div className="price">
                                        <h4>Price: {game.gamePrice}$</h4>
                                    </div>
                                    <p>
                                        {game.gameDescription}
                                    </p>
                                    <div className="anime__details__widget">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <ul>
                                                    <li>
                                                        <span>Platforms: </span>{gamePlatforms}
                                                    </li>
                                                    <li>
                                                        <span>Developer: </span>{game.gameDeveloper}
                                                    </li>
                                                    <li>
                                                        <span>Pulisher: </span>{game.gamePublisher}
                                                    </li>

                                                </ul>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <ul>
                                                    <li>
                                                        <span>Release date :</span>{releaseDate}
                                                    </li>
                                                    <li>
                                                        <span>Genre:</span>{gameCategories}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="anime__details__btn">
                                        <a href="#" className="follow-btn">
                                            <i className="fa fa-heart-o" /> Follow
                                        </a>
                                        <a href="#" className="watch-btn">
                                            <span>Buy Now</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8 col-md-8">
                                {/* Review Section Begin */}
                                <GameReview />
                                {/* Review Section End */}
                            </div>
                            {/* Side Bar Section Begin */}
                            <SideBarSection />
                            {/* Side Bar Section End */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section Begin */}
            <FooterUserComp />
            {/* Footer Section End */}

            {/* Search model Begin */}
            <SearchUserGame />
            {/* Search model end */}
        </>
    )
}
