import React from "react";
import "./Card.css";

function Card({ title, subtitle, url, alt }) {
  return (
    <div className="Card">
      <img className="Card__image" src={url} alt={alt} />
      <p className="Card__title">{title}</p>
      <p className="Card__description">{subtitle}</p>
    </div>
  );
}

export default Card;
