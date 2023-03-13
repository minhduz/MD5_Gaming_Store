import React, { useState, useEffect } from 'react'
import LoadingAdComp from './LoadingAdComp'
import SideBar from './SideBar'
import NavBar from './NavBar'
import Game from './Game'
import FooterSection from './FooterSection'
import { useDispatch, useSelector } from 'react-redux'
import { getListAdminGameStart, getAllPlatformStart, getAllCategoryStart, createNewGameStart } from '../../actions/AdminActions'
import { storage } from '../../firebase-config/firebase'
import { ref, uploadBytes, getDownloadURL} from "firebase/storage";

const initialState = {
    gameName: "",
    gamePrice: 0,
    gameDescription: "",
    gameDeveloper: "",
    gamePublisher: "",
    gameMainImage: "",
    gameReleaseDate: "",
    gameDiscount: 0,
    gameStatus: true,
    listCategory: [],
    listPlatform: [],
    listImage: []
}

export default function GameAdmin() {
    const dispatch = useDispatch();
    const [pageNumber, setPageNumber] = useState(0);
    const [listGame, setListGame] = useState([]);



    useEffect(() => {
        dispatch(getListAdminGameStart(pageNumber));
    }, [pageNumber])

    useEffect(() => {
        dispatch(getAllPlatformStart())
    }, [])

    useEffect(() => {
        dispatch(getAllCategoryStart())
    }, [])


    const pagingGame = useSelector(state => state.gameAdminReducer.games)
    useEffect(() => {
        if (pagingGame !== []) {
            setListGame(pagingGame);
        }
    }, [pagingGame])

    const pages = useSelector(state => state.gameAdminReducer.pages)

    let rows = [];
    for (let i = 0; i < pages; i++) {
        rows.push(<a style={{ cursor: "default" }} className={i === pageNumber ? "active" : ""} onClick={() => setPageNumber(i)}>{i + 1}</a>)
    }

    // // Create game 
    const [formCreate, setFormCreate] = useState(initialState)
    const { gameName, gamePrice, gameDescription, gameDeveloper, gamePublisher, gameReleaseDate, gameDiscount, gameStatus } = formCreate


    const onChangeCreate = (e) => {
        let { name, value } = e.target;
        setFormCreate({ ...formCreate, [name]: value })
    }

    // Receive list Platform ID 
    const { platforms } = useSelector(state => state.platformAllReducer)
    const [listPlatformID, setlistPlatformID] = useState([])
    function onChangePlatform(event) {
        const options = event.target.selectedOptions
        const listObject = []
        for (let index = 0; index < options.length; index++) {
            const id = options[index].value
            const obj = { platformID: id }
            listObject.push(obj)
        }
        setlistPlatformID(listObject)
    }

    useEffect(() => {
        setFormCreate({ ...formCreate, listPlatform: listPlatformID })
    }, [listPlatformID])
    // End

    // Receive list Category ID
    const { categories } = useSelector(state => state.categoryAllReducer)
    const [listCategoryID, setListCategoryID] = useState([])
    function onChangeCategory(event) {
        const options = event.target.selectedOptions
        const listObject = []
        for (let index = 0; index < options.length; index++) {
            const id = options[index].value
            const obj = { categoryID: id }
            listObject.push(obj)
        }
        setListCategoryID(listObject)
    }

    useEffect(() => {
        setFormCreate({ ...formCreate, listCategory: listCategoryID })
    }, [listCategoryID])
    // End

    // Upload main image to firebase storage
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrl, setImageUrl] = useState([]);

    const uploadFile = (e) => {
        e.preventDefault();
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrl((prev) => [...prev, url]);
            });
        });
    };

    const [mainImage, setMainImage] = useState("")

    useEffect(() => {
        if (imageUrl !== []) {
            setMainImage(imageUrl[0]);
        }
    }, [imageUrl])

    useEffect(() => {
        setFormCreate({ ...formCreate, gameMainImage: mainImage })
    }, [mainImage])

    // End

    // Upload list subImages to firebase storage
    const [imageUploads, setImageUploads] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    const onChangeMultifile = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            setImageUploads((prevState => [...prevState, newImage]));
        }
    }

    const uploadFileMultiple = (e) => {
        e.preventDefault();
        if (imageUploads == []) return;
        imageUploads.forEach((file) => {
            const imageRef = ref(storage, `images/${file.name}`);
            uploadBytes(imageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        })
    };

    const [listSubImage,setListSubImage] = useState([])

    useEffect(() =>{
        const listObject = []
        imageUrls.forEach((url) =>{
            const obj = {imageUrl: url}
            listObject.push(obj)
        })
        setListSubImage(listObject)
    },[imageUrls])

    useEffect(() => {
        setFormCreate({ ...formCreate, listImage: listSubImage})
    }, [listSubImage])
    // End

    const handleCreate = (e) => {
        if(gameName && gamePrice){
            dispatch(createNewGameStart(formCreate))
        }
    }

    // // End




    const getSearch = (search) => {

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
                        <div className="col-12">
                            <div className="bg-secondary rounded h-100 p-4">
                                <h6 className="mb-4">Responsive Table</h6>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">GameID</th>
                                                <th scope="col">Main Image</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listGame.map((game, index) => {
                                                return <Game key={index} game={game} />
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <div className="col-6">
                            <button type="button" className="btn btn-outline-info m-2" data-bs-toggle="modal" data-bs-target="#createModal">
                                Create a new Product
                            </button>
                        </div>
                        <div className="col-6">
                            <div className="pagination">
                                {pageNumber !== 0 && (
                                    <a style={{ cursor: "default" }} onClick={() => setPageNumber(pageNumber - 1)}>Previous</a>
                                )}
                                {rows}
                                {pageNumber !== pages - 1 && (
                                    <a style={{ cursor: "default" }} onClick={() => setPageNumber(pageNumber + 1)}>Next</a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer Start */}
                <FooterSection />
                {/* Footer End */}
            </div>
            {/* Content End */}

            {/*Create New Game Modal*/}
            <div
                className="modal fade"
                id="createModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div style={{ backgroundColor: "#191C24" }} className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h5 className="modal-title">Create new Game</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th scope="col">
                                                <label htmlFor="gaName" className="form-label">
                                                    Game Name
                                                </label>
                                            </th>
                                            <th scope="col">
                                                <input
                                                    type="text"
                                                    id="gaName"
                                                    name="gameName"
                                                    className="form-control"
                                                    value={gameName}
                                                    onChange={onChangeCreate}
                                                />
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col">
                                                <label htmlFor="gaPrice" className="form-label">
                                                    Game Price
                                                </label>
                                            </th>
                                            <th>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input
                                                        type="number"
                                                        id="gaPrice"
                                                        name="gamePrice"
                                                        className="form-control"
                                                        aria-label="Amount (to the nearest dollar)"
                                                        value={gamePrice}
                                                        onChange={onChangeCreate}
                                                    />
                                                    <span className="input-group-text">.00</span>
                                                </div>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col">
                                                <label htmlFor="gaPlatforms" className="form-label">
                                                    Platforms
                                                </label>
                                            </th>
                                            <th>
                                                <select
                                                    className="form-select mb-3"
                                                    id="gaPlatforms"
                                                    name="gamePlatforms"
                                                    aria-label="Default select example"
                                                    multiple="true"
                                                    onChange={onChangePlatform}
                                                >
                                                    {platforms && platforms.map((platform, index) => {
                                                        return <option key={index} value={platform.platformID}>{platform.platformName}</option>
                                                    })}
                                                </select>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col">
                                                <label htmlFor="gaDescriptions" className="form-label">
                                                    Descriptions
                                                </label>
                                            </th>
                                            <th>
                                                <textarea
                                                    className="form-control"
                                                    id="gaDescriptions"
                                                    name="gameDescription"
                                                    aria-label="With textarea"
                                                    value={gameDescription}
                                                    onChange={onChangeCreate}
                                                />
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col">
                                                <label htmlFor="gaDeveloper" className="form-label">
                                                    Developer
                                                </label>
                                            </th>
                                            <th scope="col">
                                                <input
                                                    type="text"
                                                    id="gaDeveloper"
                                                    name="gameDeveloper"
                                                    className="form-control"
                                                    value={gameDeveloper}
                                                    onChange={onChangeCreate}
                                                />
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col">
                                                <label htmlFor="gaPublisher" className="form-label">
                                                    Publisher
                                                </label>
                                            </th>
                                            <th scope="col">
                                                <input
                                                    type="text"
                                                    id="gaPublisher"
                                                    name="gamePublisher"
                                                    className="form-control"
                                                    value={gamePublisher}
                                                    onChange={onChangeCreate}
                                                />
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col">
                                                <label htmlFor="gaMainImage" className="form-label">
                                                    Main Image
                                                </label>
                                            </th>
                                            <th scope="col">
                                                <input
                                                    className="form-control bg-dark"
                                                    type="file"
                                                    id="gaMainImage"
                                                    name="gameMainImage"
                                                    onChange={(e) => { setImageUpload(e.target.files[0]) }}
                                                />
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>
                                                {imageUrl.map(url => {
                                                    return <img style={{ borderRadius: "6px" }} src={url} width={"100px"} height={"140px"}></img>
                                                })}
                                            </th>
                                            <th>
                                                <button className="btn btn-outline-info m-2" onClick={uploadFile}>Upload</button>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col">
                                                <label htmlFor="gaSubImages" className="form-label">
                                                    Sub Images
                                                </label>
                                            </th>
                                            <th scope="col">
                                                <input
                                                    className="form-control bg-dark"
                                                    type="file"
                                                    id="gaSubImages"
                                                    name="gameSubImages"
                                                    multiple
                                                    onChange={onChangeMultifile}
                                                />
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>
                                                {imageUrls.map(url => {
                                                    return <img style={{ borderRadius: "6px", marginBottom: "2px", marginRight: "2px" }} src={url} width={"80px"} height={"60px"}></img>
                                                })}
                                            </th>
                                            <th>
                                                <button className="btn btn-outline-info m-2" onClick={uploadFileMultiple}>Upload</button>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col">
                                                <label htmlFor="gaCategories" className="form-label">
                                                    Choose Categories
                                                </label>
                                            </th>
                                            <th scope="col">
                                                <select
                                                    className="form-select"
                                                    id="gaCategories"
                                                    name="gameCategories"
                                                    multiple
                                                    aria-label="multiple select example"
                                                    onChange={onChangeCategory}
                                                >
                                                    {categories && categories.map((category, index) => {
                                                        return <option key={index} value={category.categoryID}>{category.categoryName}</option>
                                                    })}
                                                </select>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col">
                                                <label htmlFor="gaReleaseDate" className="form-label">
                                                    Release Date
                                                </label>
                                            </th>
                                            <th scope="col">
                                                <input
                                                    className="form-control bg-dark"
                                                    type="date"
                                                    id="gaReleaseDate"
                                                    name="gameReleaseDate"
                                                    value={gameReleaseDate}
                                                    onChange={onChangeCreate}
                                                />
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col">
                                                <label htmlFor="gaDiscount" className="form-label">
                                                    Discount
                                                </label>
                                            </th>
                                            <th scope="col">
                                                <div className="input-group mb-3">
                                                    <input
                                                        className="form-control bg-dark"
                                                        type="number"
                                                        id="gaDiscount"
                                                        name="gameDiscount"
                                                        value={gameDiscount}
                                                        onChange={onChangeCreate}
                                                    />
                                                    <span className="input-group-text">%</span>
                                                </div>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col">
                                                <label className="form-label">Game Status</label>
                                            </th>
                                            <th>
                                                <input
                                                    style={{ marginLeft: "1px" }}
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="gameStatus"
                                                    id="active"
                                                    value={true}
                                                    defaultChecked="true"
                                                    onChange={onChangeCreate}
                                                />
                                                <label style={{ marginLeft: "20px" }} className="form-check-label" htmlFor="active">
                                                    Active
                                                </label>
                                                <input
                                                    style={{ marginLeft: "30px" }}
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="gameStatus"
                                                    id="inactive"
                                                    value={false}
                                                    onChange={onChangeCreate}
                                                />
                                                <label style={{ marginLeft: "50px" }} className="form-check-label" htmlFor="inactive">
                                                    Inactive
                                                </label>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <input
                                    type="submit"
                                    name="action"
                                    defaultValue="Create"
                                    className="btn btn-outline-info m-2"
                                    onClick={handleCreate}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/*End*/}

            {/*Delete Game Model*/}
            <div
                className="modal fade"
                id="deleteModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div style={{ backgroundColor: "#191C24" }} className="modal-content">
                        <form action="" method="post">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete Category</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body" >
                                <p style={{ color: "#6C7293" }}>Are you sure want to delete this category?</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <input
                                    type="submit"
                                    name="action"
                                    defaultValue="Delete"
                                    className="btn btn-outline-danger m-2"
                                />
                                <input type="hidden" name="catDeleteId" id="catDeleteId" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/*End*/}


            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
                <i className="bi bi-arrow-up" />
            </a>
        </div>
    )
}
