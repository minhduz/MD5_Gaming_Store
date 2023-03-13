import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Game(props) {
    let { game } = props;


    return (
        <tr>
            <td scope="col">{game.gameID}</td>
            <td scope="col">
                <img src={game.gameMainImage} alt="" />
            </td>
            <td scope="col">{game.gameName}</td>
            <td scope="col">{game.gamePrice}$</td>
            <td scope="col">{game.gameStatus ? "Active" : "Inactive"}</td>
            <td scope="col">
                <NavLink to={`update/${game.gameID}`} className="btn btn-outline-success m-2">
                    Edit
                </NavLink>
                <NavLink to={`${game.gameID}`} className="btn btn-outline-warning m-2">
                    Detail
                </NavLink>
                <button type="button" className="btn btn-outline-primary m-2" data-bs-toggle="modal" data-bs-target="#deleteModal">
                    Delete
                </button>
            </td>
        </tr>
    )
}
