import React from "react";
import style from "./recipe.module.css";

function Recipe({ img, calories, title, ingredients }) {
  return (
    <div className={style.recipe}>
      <div className={style.title}>{title}</div>
      <ul>
        {ingredients.map((ingredient, idx) => (
          <li key={idx}>{ingredient.text}</li>
        ))}
      </ul>
      <div>{calories}</div>

      <img src={img} alt="s" />
    </div>
  );
}

export default Recipe;
