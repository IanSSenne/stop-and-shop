import React from "react";
import { Link } from "react-router-dom";
import Item from "../Item";



function Item(item) {
    return (
    <div>
        {item.tags.map(({_id, title, photos, location, ask, datePosted}, index) => (
            <div key={index} >
            <Link to={`/view/${_id}`}>
              <img alt={title} src={photos[0]} />
              <p>{title}</p>
            </Link>
            <div>
              <span>${ask}</span>
            </div>
          </div>
        ))}
    </div>
    );  
};

export default Item;