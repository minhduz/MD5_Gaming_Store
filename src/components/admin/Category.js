import React from 'react'

export default function Category(props) {

    let {category} = props

    const getDeleteCatID = (id) => {
        props.getDeleteCatID(id)
    }

    const getUpdateCatID = (id) => {
        props.getUpdateCatID(id)
    }

    return (
        <tr>
            <td scope="col">{category.catID}</td>
            <td scope="col">{category.catName}</td>
            <td scope="col">{category.catStatus?"Active":"Inactive"}</td>
            <td scope="col">{category.catParentName}</td>
            <td scope="col">
                <button
                    type="button"
                    className="btn btn-outline-success m-2"
                    data-bs-toggle="modal" data-bs-target="#updateModal"
                    onClick={() =>getUpdateCatID(category.catID)}
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="btn btn-outline-primary m-2"
                    data-bs-toggle="modal" data-bs-target="#deleteModal"
                    onClick={() =>getDeleteCatID(category.catID)}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}
