import React, { useEffect, useState } from 'react'
import LoadingAdComp from './LoadingAdComp'
import SideBar from './SideBar'
import NavBar from './NavBar'
import FooterSection from './FooterSection'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getGameDetailStart, getAllCategoryStart, getAllPlatformStart, updateGameStart } from '../../actions/AdminActions'
import { storage } from '../../firebase-config/firebase'
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";


export default function UpdateGame() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [formUpdate, setFormUpdate] = useState({});

    useEffect(() => {
        dispatch(getGameDetailStart(id));
    }, [])

    useEffect(() => {
        dispatch(getAllPlatformStart())
    }, [])

    useEffect(() => {
        dispatch(getAllCategoryStart())
    }, [])

    const { game } = useSelector(state => state.gameDetailReducer)

    useEffect(() => {
        setFormUpdate({ ...game })
    }, [game])


    const onChangeUpdate = (e) => {
        let { name, value } = e.target
        setFormUpdate({ ...formUpdate, [name]: value })
    }

    // Show selected platforms and get list of platform's ID
    const { platforms } = useSelector(state => state.platformAllReducer)
    const gamePlatforms = game?.listPlatform?.map(platform => platform.platformName).join(', ')
    const listPlatformID = game?.listPlatform?.map(platform => platform.platformID).join(',')

    const [listPlatformIDUpdated, setlistPlatformIDUpdated] = useState([])

    function onChangePlatform(event) {
        const options = event.target.selectedOptions
        const listObject = []
        for (let index = 0; index < options.length; index++) {
            const id = options[index].value
            const obj = { platformID: id }
            listObject.push(obj)
        }
        setlistPlatformIDUpdated(listObject)
    }

    useEffect(() => {
        setFormUpdate({ ...formUpdate, listPlatform: listPlatformIDUpdated })
    }, [listPlatformIDUpdated])
    // End

    // Show selected categories and get list of category's ID
    const { categories } = useSelector(state => state.categoryAllReducer)
    const gameCategories = game?.listCategory?.map(category => category.categoryName).join(', ')
    const listCategoryID = game?.listCategory?.map(category => category.categoryID).join(',')

    const [listCategoryIDUpdated, setListCategoryIDUpdated] = useState([])
    function onChangeCategory(event) {
        const options = event.target.selectedOptions
        const listObject = []
        for (let index = 0; index < options.length; index++) {
            const id = options[index].value
            const obj = { categoryID: id }
            listObject.push(obj)
        }
        setListCategoryIDUpdated(listObject)
    }

    useEffect(() => {
        setFormUpdate({ ...formUpdate, listCategory: listCategoryIDUpdated })
    }, [listCategoryIDUpdated])
    // End

    // Update main Image
    const [mainImage, setMainImage] = useState('')

    useEffect(() => {
        setMainImage(`${game.gameMainImage}`)
    }, [game])

    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrl, setImageUrl] = useState([]);

    const uploadFile = (e) => {
        e.preventDefault();
        let filePath = mainImage.split("https://firebasestorage.googleapis.com/v0/b/demo01-617c1.appspot.com/o/")[1]
        filePath = filePath.split('?')[0];
        filePath = filePath.split('#')[0];
        filePath = decodeURIComponent(filePath);

        const imageRefDelete = ref(storage, filePath);
        deleteObject(imageRefDelete).then(() => {
            console.log("xóa thành công");
        }).catch((error) => {
            console.log(error);
        });


        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrl(url);
            });
        });
    };

    const [mainImageUpdated, setMainImageUpdated] = useState("")

    useEffect(() => {
        if (imageUrl !== []) {
            setMainImageUpdated(imageUrl);

        }
    }, [imageUrl])

    useEffect(() => {
        if (mainImageUpdated !== undefined) {
            setMainImage(mainImageUpdated)
        }
    }, [mainImageUpdated])

    useEffect(() => {
        if (mainImageUpdated !== undefined) {
            setFormUpdate({ ...formUpdate, gameMainImage: mainImageUpdated })
        }
    }, [mainImageUpdated])
    // End

    // // Update list subImage
    const [listSubImage, setListSubImage] = useState([])

    useEffect(() => {
        const listSub = game?.listImage?.map(image => image.imageUrl)
        if (listSub !== undefined) {
            setListSubImage(listSub)
        }
    }, [game])

    // Add new list Sub Image
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

    useEffect(() => {
        imageUrls.forEach((url) => {
            setListSubImage([...listSubImage, url]);
        })
    }, [imageUrls])
    // End

    // Update sub image 
    const [subImageUpload, setSubImageUpload] = useState(null);
    const [subImageUrl, setSubImageUrl] = useState([]);
    const [oldSubImage, setOldSubImage] = useState("");
    const [imageIndex, setImageIndex] = useState();

    const getSubImageUrl = (url) => {
        setOldSubImage(url)
    }

    useEffect(() => {
        if (oldSubImage !== undefined) {
            const index = listSubImage.indexOf(oldSubImage)
            setImageIndex(index)
        }
    }, [oldSubImage])

    const uploadSubImage = (e) => {
        e.preventDefault();
        let filePath = oldSubImage.split("https://firebasestorage.googleapis.com/v0/b/demo01-617c1.appspot.com/o/")[1]
        filePath = filePath.split('?')[0];
        filePath = filePath.split('#')[0];
        filePath = decodeURIComponent(filePath);

        const imageRefDelete = ref(storage, filePath);
        deleteObject(imageRefDelete).then(() => {
            console.log("xóa thành công");
        }).catch((error) => {
            console.log(error);
        });

        if (subImageUpload == null) return;
        const imageRef = ref(storage, `images/${subImageUpload.name}`);
        uploadBytes(imageRef, subImageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setSubImageUrl(url);
            });
        });
    }

    useEffect(() => {
        if (subImageUrl !== []) {
            let newArray = listSubImage;
            newArray[imageIndex] = subImageUrl;
            setListSubImage([...newArray])
        }
    }, [subImageUrl])

    // End

    // Delete subImage
    const deleteSubImage = (e) => {
        e.preventDefault();
        let filePath = oldSubImage.split("https://firebasestorage.googleapis.com/v0/b/demo01-617c1.appspot.com/o/")[1]
        filePath = filePath.split('?')[0];
        filePath = filePath.split('#')[0];
        filePath = decodeURIComponent(filePath);

        const imageRefDelete = ref(storage, filePath);
        deleteObject(imageRefDelete).then(() => {
            console.log("xóa thành công");
        }).catch((error) => {
            console.log(error);
        });

        let newArray = listSubImage.filter(item => item !== oldSubImage);
        setListSubImage([...newArray])
    }
    // End

    const [listSubImageUpdated, setListSubImageUpdated] = useState([])

    useEffect(() => {
        const listObject = []
        listSubImage.forEach((url) => {
            const obj = { imageUrl: url }
            listObject.push(obj)
        })
        setListSubImageUpdated(listObject)
    }, [listSubImage])


    useEffect(() => {
        setFormUpdate({ ...formUpdate, listImage: listSubImageUpdated })
    }, [listSubImageUpdated])

    const handleUpdateGame = (e) => {
        dispatch(updateGameStart(formUpdate))
        navigate(-1)
    }

    console.log(formUpdate);



    // // End

    const handleBack = (e) => {
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
                        <div className="col-12">
                            <div className="bg-secondary rounded h-100 p-4">
                                <h6 className="mb-4">Update Game</h6>
                                <div className="table-responsive">
                                    <form>
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <th scope="col">
                                                        <label htmlFor="updateGameID" className="form-label">
                                                            GameID
                                                        </label>
                                                    </th>
                                                    <th scope="col">
                                                        <input
                                                            id="updateGameID"
                                                            type="text"
                                                            name="gameID"
                                                            value={formUpdate.gameID}
                                                            className="form-control"
                                                            readOnly
                                                        />
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th scope="col">
                                                        <label htmlFor="updateGameName" className="form-label">
                                                            Game Name
                                                        </label>
                                                    </th>
                                                    <th scope="col">
                                                        <input
                                                            type="text"
                                                            id="updateGameName"
                                                            name="gameName"
                                                            value={formUpdate.gameName}
                                                            className="form-control"
                                                            onChange={onChangeUpdate}
                                                        />
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th scope="col">
                                                        <label htmlFor="updateGamePrice" className="form-label">
                                                            Game Price
                                                        </label>
                                                    </th>
                                                    <th>
                                                        <div className="input-group mb-3">
                                                            <span className="input-group-text">$</span>
                                                            <input
                                                                type="number"
                                                                id="updateGamePrice"
                                                                name="gamePrice"
                                                                value={formUpdate.gamePrice}
                                                                className="form-control"
                                                                aria-label="Amount (to the nearest dollar)"
                                                                onChange={onChangeUpdate}
                                                            />
                                                            <span className="input-group-text">.00</span>
                                                        </div>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th scope="col">
                                                        <label htmlFor="updateGamePlatforms" className="form-label">
                                                            Platforms:
                                                        </label>
                                                        <p style={{ color: "#6C7293" }}>{gamePlatforms}</p>
                                                    </th>
                                                    <th>
                                                        <select
                                                            className="form-select mb-3"
                                                            id="updateGamePlatforms"
                                                            name="gamePlatforms"
                                                            aria-label="Default select example"
                                                            multiple
                                                            onChange={onChangePlatform}
                                                        >
                                                            {platforms?.map((platform, index) => {
                                                                return <option
                                                                    key={index}
                                                                    value={platform.platformID}
                                                                    selected={listPlatformID?.includes(platform.platformID)}
                                                                >{platform.platformName}</option>
                                                            })}

                                                        </select>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th scope="col">
                                                        <label
                                                            htmlFor="updateGameDescriptions"
                                                            className="form-label"
                                                        >
                                                            Description
                                                        </label>
                                                    </th>
                                                    <th>
                                                        <textarea
                                                            className="form-control"
                                                            id="updateGameDescriptions"
                                                            name="gameDescription"
                                                            aria-label="With textarea"
                                                            value={formUpdate.gameDescription}
                                                            onChange={onChangeUpdate}
                                                        />
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th scope="col">
                                                        <label htmlFor="updateGameDeveloper" className="form-label">
                                                            Developer
                                                        </label>
                                                    </th>
                                                    <th scope="col">
                                                        <input
                                                            type="text"
                                                            id="updateGameDeveloper"
                                                            name="gameDeveloper"
                                                            value={formUpdate.gameDeveloper}
                                                            className="form-control"
                                                            onChange={onChangeUpdate}
                                                        />
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th scope="col">
                                                        <label htmlFor="updateGamePublisher" className="form-label">
                                                            Publisher
                                                        </label>
                                                    </th>
                                                    <th scope="col">
                                                        <input
                                                            type="text"
                                                            id="updateGamePublisher"
                                                            name="gamePublisher"
                                                            value={formUpdate.gamePublisher}
                                                            className="form-control"
                                                            onChange={onChangeUpdate}
                                                        />
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th scope="col">
                                                        <label htmlFor="updateMainImage" className="form-label">
                                                            Main Image
                                                        </label>

                                                    </th>
                                                    <th scope="col">
                                                        <img id="oldMainImage" src={mainImage} />
                                                        <input
                                                            className="form-control bg-dark"
                                                            type="file"
                                                            id="updateMainImage"
                                                            name="gameMainImage"
                                                            onChange={(e) => { setImageUpload(e.target.files[0]) }}
                                                        />
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
                                                        <div className="oldSubImages">
                                                            {listSubImage.map(img => {
                                                                return <img data-bs-toggle="modal" data-bs-target="#subImageModal" src={img} onClick={() => getSubImageUrl(img)} />
                                                            })}
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-outline-info m-2"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#createSubImageModal"
                                                            >
                                                                Add
                                                            </button>
                                                        </div>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th scope="col">
                                                        <label htmlFor="gaCategories" className="form-label">
                                                            Choose Categories
                                                        </label>
                                                        <p style={{ color: "#6C7293" }}>{gameCategories}</p>
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
                                                            {categories?.map((category, index) => {
                                                                return <option
                                                                    key={index}
                                                                    value={category.categoryID}
                                                                    selected={listCategoryID?.includes(category.categoryID)}
                                                                >{category.categoryName}</option>
                                                            })}
                                                        </select>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th scope="col">
                                                        <label
                                                            htmlFor="updateGameReleaseDate"
                                                            className="form-label"
                                                        >
                                                            Release Date
                                                        </label>
                                                    </th>
                                                    <th scope="col">
                                                        <input
                                                            className="form-control bg-dark"
                                                            type="date"
                                                            id="updateGameReleaseDate"
                                                            name="gameReleaseDate"
                                                            value={formUpdate.gameReleaseDate}
                                                            onChange={onChangeUpdate}
                                                        />
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th scope="col">
                                                        <label htmlFor="updateGameDiscount" className="form-label">
                                                            Discount
                                                        </label>
                                                    </th>
                                                    <th scope="col">
                                                        <div className="input-group mb-3">
                                                            <input
                                                                className="form-control bg-dark"
                                                                type="number"
                                                                id="updateGameDiscount"
                                                                name="gameDiscount"
                                                                value={formUpdate.gameDiscount}
                                                                onChange={onChangeUpdate}
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
                                                            value={true}
                                                            id="active"
                                                            checked={formUpdate.gameStatus === true}
                                                            onChange={onChangeUpdate}
                                                        />
                                                        <label style={{ marginLeft: "20px" }} className="form-check-label" htmlFor="active">
                                                            Active
                                                        </label>
                                                        <input
                                                            style={{ marginLeft: "30px" }}
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="gameStatus"
                                                            value={false}
                                                            id="inactive"
                                                            checked={formUpdate.gameStatus === false}
                                                            onChange={onChangeUpdate}
                                                        />
                                                        <label style={{ marginLeft: "50px" }} className="form-check-label" htmlFor="inactive">
                                                            Inactive
                                                        </label>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th />
                                                    <th>
                                                        <button className="btn btn-outline-success m-2" onClick={handleUpdateGame}>
                                                            Submit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-warning m-2"
                                                            onClick={handleBack}
                                                        >
                                                            Back
                                                        </button>
                                                    </th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </form>
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


            {/*Create Sub Image Modal*/}
            <div
                className="modal fade"
                id="createSubImageModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div style={{ backgroundColor: "#191C24" }} className="modal-content">
                        <form action="" method="post">
                            <div className="modal-header">
                                <h5 className="modal-title">Create new SubImages</h5>
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
                                                <label htmlFor="subImageLink" className="form-label">
                                                    New SubImages File
                                                </label>
                                            </th>
                                            <th scope="col">

                                                <input
                                                    className="form-control form-control-sm bg-dark"
                                                    id="subImageLink"
                                                    type="file"
                                                    name="subImageLink"
                                                    multiple
                                                    onChange={onChangeMultifile}
                                                />
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
                                <button
                                    className="btn btn-outline-info m-2"
                                    data-bs-dismiss="modal"
                                    onClick={uploadFileMultiple}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/*End*/}


            {/*Sub Images Modal Update & Delete*/}
            <div
                className="modal fade"
                id="subImageModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div style={{ backgroundColor: "#191C24" }} className="modal-content">
                        <form action="<%=request.getContextPath()%>/GameServlet" method="post">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete or Update SubImage</h5>
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
                                                <label htmlFor="subImageLinkUpdate" className="form-label">
                                                    SubImage File
                                                </label>
                                            </th>
                                            <th scope="col">
                                                <img width={"135px"} height={"100px"} style={{ borderRadius: "6px", marginBottom: "6px" }} src={oldSubImage} />
                                                <input
                                                    className="form-control form-control-sm bg-dark"
                                                    id="subImageLinkUpdate"
                                                    type="file"
                                                    name="subImageLinkUpdate"
                                                    onChange={(e) => { setSubImageUpload(e.target.files[0]) }}
                                                />
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <input
                                    type="hidden"
                                    name="gameID"
                                    defaultValue="${gameUpdate.gameID}"
                                />
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button className="btn btn-success m-2" data-bs-dismiss="modal" onClick={uploadSubImage}>
                                    Edit
                                </button>
                                <button className="btn btn-danger m-2" data-bs-dismiss="modal" onClick={deleteSubImage}>
                                    Delete
                                </button>
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
