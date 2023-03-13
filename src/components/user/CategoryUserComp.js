import React, { useEffect, useState } from 'react'
import LoadingComp from './LoadingComp'
import HeaderUserComp from './HeaderUserComp'
import SideBarSection from './SideBarSection'
import FooterUserComp from './FooterUserComp'
import './css/bootstrap.min.css';
import './css/style.css';
import { NavLink, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getGameByCategoryStart } from '../../actions/UserActions'


export default function CategoryUserComp() {
  const { categoryID } = useParams()

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGameByCategoryStart(categoryID));
  }, [categoryID])

  const { gameCategory } = useSelector(state => state.gameHomeReducer)


  return (
    <>
      {/* Page Preloder */}
      <LoadingComp />
      {/* Header Section Begin */}
      <HeaderUserComp />
      {/* Header End */}
      <section className="product-page spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="product__page__content">
                <div className="product__page__title">
                  <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-6">
                      <div className="section-title">
                        <h4>{gameCategory.categoryName}</h4>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6">
                      <div className="product__page__filter">
                        <p>Order by:</p>
                        <select>
                          <option value="">A-Z</option>
                          <option value="">1-10</option>
                          <option value="">10-50</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {gameCategory?.listGameDTO?.map((game, index) => {
                    return <div key={index} className="col-lg-4 col-md-6 col-sm-6">
                      <div className="product__item">
                        <NavLink to={`/game/${game.gameID}`}>
                          <div
                            className="product__item__pic set-bg"
                            style={{ backgroundImage: `url("${game.gameMainImage}")` }}
                          >
                            <div className="comment">
                              <i className="fa fa-comments" /> 11
                            </div>
                            <div className="view">
                              <i className="fa fa-dollar" />{game.gamePrice}
                            </div>
                          </div>
                        </NavLink>
                        <div className="product__item__text">
                          <h5>
                            <a href="#">{game.gameName}</a>
                          </h5>
                        </div>
                      </div>
                    </div>
                  })}
                </div>
              </div>
            </div>
            <SideBarSection />
          </div>
        </div>
      </section>
      <FooterUserComp />
    </>
  )
}
