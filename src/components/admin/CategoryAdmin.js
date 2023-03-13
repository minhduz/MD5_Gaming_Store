import React, { useState, useEffect } from 'react'
import './css/style.css';
import './css/bootstrap.min.css';
import LoadingAdComp from './LoadingAdComp';
import SideBar from './SideBar';
import NavBar from './NavBar';
import FooterSection from './FooterSection';
import { useSelector, useDispatch } from 'react-redux';
import { getListAdminCategoryStart, getAllCategoryStart, createNewCategoryStart, deleteCategoryStart, updateCategoryStart, searchCategoryStart } from '../../actions/AdminActions';
import Category from './Category';
import { NavLink, useNavigate, useParams } from 'react-router-dom';


const initialState = {
    categoryName: "",
    categoryStatus: true,
    parentID: 1
}


export default function () {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [pageNumber, setPageNumber] = useState(0);


    console.log("pageNumber", pageNumber);

    const [listCategory, setListCategory] = useState([]);
    const [catID, setCatID] = useState(0);

    const [formCreate, setFromCreate] = useState(initialState);
    const { categoryName, categoryStatus } = formCreate;

    const [formUpdate, setFormUpdate] = useState({});
    const [search, setSearch] = useState("")



    useEffect(() => {
        dispatch(getListAdminCategoryStart(pageNumber));
    }, [pageNumber])

    useEffect(() => {
        dispatch(getAllCategoryStart());
    }, [])


    const pagingCategory = useSelector(state => state.categoryAdminReducer.categories)
    useEffect(() => {
        if (pagingCategory !== []) {
            setListCategory(pagingCategory);
        }
    }, [pagingCategory])


    const pages = useSelector(state => state.categoryAdminReducer.pages)
    const { categories } = useSelector(state => state.categoryAllReducer)

    let rows = [];
    for (let i = 0; i < pages; i++) {
        rows.push(<a style={{ cursor: "default" }} onClick={()=>setPageNumber(i)} className={i === pageNumber ? "active" : ""}>{i + 1}</a>)
    }

    // Create a new category begin
    const handleCreate = (e) => {
        e.preventDefault();
        if (categoryName) {
            dispatch(createNewCategoryStart(formCreate));
            setPageNumber(0)
        }
    }

    const onChangeCreate = (event) => {
        let { name, value } = event.target;
        setFromCreate({ ...formCreate, [name]: value });
    }
    // End

    // Delete a category
    const getDeleteCategoryID = (id) => {
        setCatID(id)
    }

    const handleDelete = (e) => {
        e.preventDefault();
        if (catID !== 0) {
            dispatch(deleteCategoryStart(catID,pageNumber))
        }
    }
    // End

    // Update a category 
    const getUpdateCategoryID = (id) => {
        const singleCategory = pagingCategory.find(cat => cat.catID === id);
        setFormUpdate({ ...singleCategory })
    }

    const onChangeUpdate = (e) => {
        let { name, value } = e.target
        setFormUpdate({ ...formUpdate, [name]: value })
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const formValue = {
            categoryID: formUpdate.catID,
            categoryName: formUpdate.catName,
            categoryStatus: formUpdate.catStatus,
            parentID: formUpdate.parentID
        }
        dispatch(updateCategoryStart(formValue,pageNumber));
    }
    
    // Search the category
    
    const getSearch = (search) => {
        setSearch(search);
    }

    useEffect(() => {
        if (search !== "") {
            dispatch(searchCategoryStart(search))
        } else {
            setListCategory(pagingCategory)
        }
    }, [search])

    const { listSearch } = useSelector(state => state.categoryAllReducer)

    useEffect(() => {
        if (listSearch !== undefined) {
            setListCategory(listSearch)
        }
    }, [listSearch])

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
                                                <th scope="col">CategoryID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Parent Name</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listCategory.map((category, index) => {
                                                return <Category key={index} category={category} getDeleteCatID={getDeleteCategoryID} getUpdateCatID={getUpdateCategoryID} />
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
                                Create a new Category
                            </button>
                        </div>
                        <div className="col-6">
                            <div className="pagination">
                                {parseInt(pageNumber) !== 0 && (
                                    <a onClick={()=>setPageNumber(pageNumber-1)} style={{ cursor: "default" }}>Previous</a>
                                )}
                                {rows}
                                {parseInt(pageNumber) !== pages - 1 && (
                                    <a onClick={()=>setPageNumber(pageNumber+1)} style={{ cursor: "default" }}>Next</a>
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

            {/*Create New Category Modal*/}
            <div
                className="modal fade"
                id="createModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div style={{ backgroundColor: "#191C24" }} className="modal-content">
                        <form
                            action=""
                            method="post"
                        >
                            <div className="modal-header">
                                <h5 className="modal-title">Create new Category</h5>
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
                                                <label htmlFor="caName" className="form-label">
                                                    Category Name
                                                </label>
                                            </th>
                                            <th scope="col">
                                                <input
                                                    name="categoryName"
                                                    value={categoryName}
                                                    type="text"
                                                    className="form-control"
                                                    id="caName"
                                                    onChange={onChangeCreate}
                                                />
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col">
                                                <label className="form-label">Category Status</label>
                                            </th>
                                            <th>
                                                <input
                                                    style={{ marginLeft: "1px" }}
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="categoryStatus"
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
                                                    name="categoryStatus"
                                                    id="inactive"
                                                    value={false}
                                                    onChange={onChangeCreate}
                                                />
                                                <label style={{ marginLeft: "50px" }} className="form-check-label" htmlFor="inactive">
                                                    Inactive
                                                </label>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col">
                                                <label className="form-label">Category Parent</label>
                                            </th>
                                            <th>
                                                <select
                                                    id="parent"
                                                    className="form-select mb-3"
                                                    aria-label=".form-select-sm example"
                                                    name="parentID"
                                                    onChange={onChangeCreate}
                                                >
                                                    {categories && categories.map((cat, index) => {
                                                        return <option key={index} value={cat.categoryID}>{cat.categoryName}</option>
                                                    })}
                                                </select>
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
                                    data-bs-dismiss="modal"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/*End*/}

            {/*Delete Category Model*/}
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
                                    onClick={handleDelete}
                                    data-bs-dismiss="modal"
                                />
                                <input type="hidden" name="catDeleteId" id="catDeleteId" value={catID} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/*End*/}

            {/*Update Category Model*/}
            <div
                className="modal fade"
                id="updateModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div style={{ backgroundColor: "#191C24" }} className="modal-content">
                        <form
                            action=""
                            method="post"
                        >
                            <div className="modal-header">
                                <h5 className="modal-title">Update Category</h5>
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
                                                <label htmlFor="updateCategoryID" className="form-label">
                                                    CategoryID
                                                </label>
                                            </th>
                                            <th scope="col">
                                                <input
                                                    id="updateCategoryID"
                                                    type="number"
                                                    name="catID"
                                                    value={formUpdate.catID}
                                                    className="form-control"
                                                    readOnly
                                                />
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col">
                                                <label htmlFor="updateCategoryName" className="form-label">
                                                    Category Name
                                                </label>
                                            </th>
                                            <th scope="col">
                                                <input
                                                    id="updateCategoryName"
                                                    type="text"
                                                    name="catName"
                                                    value={formUpdate.catName}
                                                    onChange={onChangeUpdate}
                                                    className="form-control"
                                                />
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col">
                                                <label className="form-label">Category Status</label>
                                            </th>
                                            <th>
                                                <input
                                                    style={{ marginLeft: "1px" }}
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="catStatus"
                                                    id="active"
                                                    value={true}
                                                    checked={formUpdate.catStatus === true}
                                                    onChange={onChangeUpdate}
                                                />
                                                <label style={{ marginLeft: "20px" }} className="form-check-label" htmlFor="active">
                                                    Active
                                                </label>

                                                <input
                                                    style={{ marginLeft: "30px" }}
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="catStatus"
                                                    id="inactive"
                                                    value={false}
                                                    checked={formUpdate.catStatus === false}
                                                    onChange={onChangeUpdate}
                                                />
                                                <label style={{ marginLeft: "50px" }} className="form-check-label" htmlFor="inactive">
                                                    Inactive
                                                </label>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th scope="col">
                                                <label className="form-label">Category Parent</label>
                                            </th>
                                            <th>
                                                <select
                                                    className="form-select mb-3"
                                                    id="updateCategoryParentID"
                                                    aria-label=".form-select-sm example"
                                                    name="parentID"
                                                    onChange={onChangeUpdate}
                                                >
                                                    <option selected={(formUpdate.parentID === 0)} value={0}>None...</option>
                                                    {categories && categories.map((cat, index) => {
                                                        return <option key={index} selected={(formUpdate.parentID === cat.categoryID) ? "true" : ""}
                                                            value={cat.categoryID}>{cat.categoryName}</option>
                                                    })}
                                                </select>
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
                                    defaultValue="Update"
                                    className="btn btn-outline-success m-2"
                                    onClick={handleUpdate}
                                    data-bs-dismiss="modal"
                                />
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
