import React from 'react'

export default function SideBarSection() {
    return (
        <div className="col-lg-4 col-md-6 col-sm-8">
            <div className="anime__details__sidebar">
                <div className="section-title">
                    <h5>you might like...</h5>
                </div>
                <div
                    className="product__sidebar__view__item set-bg"
                    style={{ backgroundImage: `url("../user/img/sidebar/tv-1.jpg")` }}
                >
                    <div className="view">
                        <i className="fa fa-eye" /> 9141
                    </div>
                    <h5>
                        <a href="#">Elden Ring</a>
                    </h5>
                </div>
                <div
                    className="product__sidebar__view__item set-bg"
                    style={{ backgroundImage: `url("../user/img/sidebar/tv-2.jpg")` }}
                >
                    <div className="view">
                        <i className="fa fa-eye" /> 9141
                    </div>
                    <h5>
                        <a href="#">Marvel's Spider-Man: Miles Morales</a>
                    </h5>
                </div>
                <div
                    className="product__sidebar__view__item set-bg"
                    style={{ backgroundImage: `url("../user/img/sidebar/tv-3.jpg")` }}
                >
                    <div className="view">
                        <i className="fa fa-eye" /> 9141
                    </div>
                    <h5>
                        <a href="#">Call of Duty: Modern Warfare II</a>
                    </h5>
                </div>
                <div
                    className="product__sidebar__view__item set-bg"
                    style={{ backgroundImage: `url("../user/img/sidebar/tv-4.jpg")` }}
                >
                    <div className="view">
                        <i className="fa fa-eye" /> 9141
                    </div>
                    <h5>
                        <a href="#">Sekiro: Shadows Die Twice</a>
                    </h5>
                </div>
            </div>
        </div>
    )
}
