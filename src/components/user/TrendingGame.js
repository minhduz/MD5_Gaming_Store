import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getListHomeGameStart } from '../../actions/UserActions';


export default function TrendingGame() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListHomeGameStart())
  }, [])

  const { games } = useSelector(state => state.gameHomeReducer)
  const [listGame, setListGame] = useState([]);

  useEffect(() => {
    setListGame(games)
  }, [games])

  console.log(listGame);

  return (
    <div className="trending__product">
      <div className="row">
        <div className="col-lg-8 col-md-8 col-sm-8">
          <div className="section-title">
            <h4>Trending Now</h4>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4">
          <div className="btn__all">
            <a href="#" className="primary-btn">
              View All <span className="arrow_right" />
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        {listGame.map((game, index) => {
          return <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="product__item">
              <NavLink to={`/game/${game.gameID}`}>
                <div
                  className="product__item__pic set-bg"
                  style={{ backgroundImage: `url("${game.gameMainImage}")` }}
                >
                  <div className="comment">
                    <i className="fa fa-comments" />
                    11
                  </div>
                  <div className="view">
                    <i className="fa fa-dollar" />
                    {game.gamePrice}
                  </div>
                </div>
              </NavLink>
              <div className="product__item__text">
                <h5>
                  <a href="game-details.html" />
                  <a href="#">{game.gameName}</a>
                </h5>
              </div>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}
