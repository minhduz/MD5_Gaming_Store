import React, { useEffect, useState } from 'react'
import LoadingAdComp from './LoadingAdComp'
import SideBar from './SideBar'
import NavBar from './NavBar'
import FooterSection from './FooterSection'
import { useNavigate, useParams } from 'react-router-dom'
import { getGameDetailStart } from '../../actions/AdminActions'
import { useDispatch, useSelector } from 'react-redux'

export default function GameDetail() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {id} = useParams()
    const [game,setGame] = useState({})
    
    useEffect(() => {
        dispatch(getGameDetailStart(id))
    },[])
    
    const gameReturn = useSelector(state => state.gameDetailReducer.game)

    useEffect(() => {
        setGame(gameReturn)
    },[gameReturn])

    console.log(game);
    
    const gamePlatforms = game?.listPlatform?.map(platform => platform.platformName).join(', ')
    const gameCategories = game?.listCategory?.map(category => category.categoryName).join(', ')

    const handleBack = () => {
        navigate('/admin/game')
    }
    
    const getSearch = (name) => {

    }
    
    return (
        <div className="container-fluid position-relative d-flex p-0">
            {/* Spinner Start */}
            <LoadingAdComp />
            {/* Spinner End */}
            {/* Sidebar Start */}
            <SideBar />
            {/* Sidebar End */}
            {/* Content Start */}
            <div className="content">
                {/* Navbar Start */}
                <NavBar onSearch={getSearch} />
                {/* Navbar End */}
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <div className="col-sm-12 col-xl-4">
                            <div className="bg-secondary rounded h-100 p-4">
                                <h6 className="mb-4">Main Image</h6>
                                <img id="mainImage" src={game.gameMainImage} />
                            </div>
                        </div>
                        <div className="col-sm-12 col-xl-8">
                            <div className="bg-secondary rounded h-100 p-4">
                                <h6 className="mb-4">Responsive Table</h6>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">GameID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Categories</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td scope="col">{game.gameID}</td>
                                                <td scope="col">{game.gameName}</td>
                                                <td scope="col">
                                                    {gameCategories}
                                                </td>
                                                <td scope="col">{game.gamePrice}$</td>
                                                <td scope="col">{game.gameStatus?"Active":"Inactive"}</td>
                                                <td scope="col">
                                                    <button type="button" className="btn btn-outline-warning m-2" onClick={handleBack}>
                                                        Back to All
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="bg-secondary rounded h-100 p-4">
                                <h6 className="mb-4">Sub Images</h6>
                                <div className="subImages">
                                    {game?.listImage?.map(image => {
                                        return <img src={image.imageUrl} />
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-xl-8">
                            <div className="bg-secondary rounded h-100 p-4">
                                <h6 className="mb-4">Detail</h6>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Platforms</th>
                                            <th scope="col">Developer</th>
                                            <th scope="col">Publisher</th>
                                            <th scope="col">Releash Date</th>
                                            <th scope="col">Discount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>{gamePlatforms}</th>
                                            <td>{game.gameDeveloper}</td>
                                            <td>{game.gamePublisher}</td>
                                            <td>{game.gameReleaseDate}</td>
                                            <td>{game.gameDiscount}%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-sm-12 col-xl-4">
                            <div className="bg-secondary rounded h-100 p-4">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Descriptions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td scope="col">
                                                    {game.gameDescription}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer Start */}
                <FooterSection />
                {/* Footer End */}
            </div>
            {/* Content End */}


            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
                <i className="bi bi-arrow-up" />
            </a>
        </div>
    )
}
