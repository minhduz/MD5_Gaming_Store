import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function SideBar() {

    return (
        <div className="sidebar pe-4 pb-3">
            <nav className="navbar bg-secondary navbar-dark">
                <NavLink to={"/"} className="navbar-brand mx-4 mb-3">
                    <img src="https://firebasestorage.googleapis.com/v0/b/demo01-617c1.appspot.com/o/images%2Flogo.png?alt=media&token=56bbe05b-1e52-4db1-899a-bbba9254aeb7" alt="" />
                </NavLink>
                <div className="navbar-nav w-100">
                    <NavLink to={`/admin/category`} className={(navData)=>navData.isActive?"nav-item nav-link active":"nav-item nav-link"}>
                        <i className="fa fa-table me-2" />
                        Categories
                    </NavLink>
                    <NavLink to={"/admin/game"} className={(navData)=>navData.isActive?"nav-item nav-link active":"nav-item nav-link"}>
                        <i className="fa-solid fa-file me-2" />
                        Products
                    </NavLink>
                    <a href="users.html" className="nav-item nav-link">
                        <i className="fa-solid fa-users me-2" />
                        Users
                    </a>
                    <a href="reviews.html" className="nav-item nav-link">
                        <i className="fa-solid fa-comment me-2" />
                        Reviews
                    </a>
                </div>
            </nav>
        </div>
    )
}
