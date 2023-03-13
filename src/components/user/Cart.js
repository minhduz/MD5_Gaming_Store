import React from 'react'
import FooterUserComp from './FooterUserComp'
import HeaderUserComp from './HeaderUserComp'
import LoadingComp from './LoadingComp'

export default function Cart() {
    return (
        <>
            {/* Page Preloder */}
            <LoadingComp />
            {/* Header Section Begin */}
            <HeaderUserComp />
            {/* Header End */}

            <section className="h-100 h-custom" style={{ backgroundColor: "#0b0c2a" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h5 className="mb-3">
                                                <a href="" className="text-body">
                                                    <i className="fas fa-long-arrow-alt-left me-2" />
                                                    Continue shopping
                                                </a>
                                            </h5>
                                            <hr />
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div>
                                                    <p className="mb-1">Shopping cart</p>
                                                    <p className="mb-0">
                                                        You have ... items in your cart
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="mb-0">
                                                        <span className="text-muted">Sort by:</span>
                                                        <a href="#" className="text-body">
                                                            price <i className="bi bi-caret-down-fill" />
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="card mb-3">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div>
                                                                <img
                                                                    src="https://ecdn.game4v.com/g4v-content/uploads/2020/05/Sat-Quy-Doan-Kimetsu-no-Yaiba-1-game4v.png "
                                                                    className="img-fluid rounded-3"
                                                                    alt="Shopping item"
                                                                    width={"150px"}
                                                                    height={"90px"}
                                                                    style={{ borderRadius: "6px" }}
                                                                />
                                                            </div>
                                                            <div className="ms-3">
                                                                <h5 style={{ marginLeft: "40px" }}>
                                                                    Product Name
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div style={{ width: "50px" }}>
                                                                <h5 className="fw-normal mb-0">
                                                                    2
                                                                </h5>
                                                            </div>
                                                            <div style={{ width: "80px" }}>
                                                                <h5 className="mb-0">
                                                                    1000$
                                                                </h5>
                                                            </div>
                                                            <a
                                                                href="n=Delete&&gameName=${ca.game.gameName}"
                                                                style={{ color: "#cecece" }}
                                                            >
                                                                <i className="fas fa-trash-alt" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-4">
                                                <p className="mb-2">Total(Incl. taxes)</p>
                                                <p className="mb-2" />
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-info btn-block btn-lg"
                                            >
                                                <div className="d-flex justify-content-between">
                                                    <span>
                                                        1000$
                                                    </span>
                                                    <span>
                                                        Checkout{" "}
                                                        <i className="fas fa-long-arrow-alt-right ms-2" />
                                                    </span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Footer Section Begin */}
            <FooterUserComp />
            {/* Footer End */}
        </>
    )
}
