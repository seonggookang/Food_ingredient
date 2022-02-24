import React, { useEffect, useState } from "react";
import axios from "axios";
import Recipe from "./Recipe";

function App() {
  const APP_ID = "c864dcc2";
  const APP_KEY = "95406cccd0f1dfef0af8f69c86297d1c";

  const [search, setSearch] = useState("");
  const [recipes, setrecipes] = useState([]);
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  //localstorage 이용해서 새로고침해도 그대로 남아있게 하기.
  const inputHandler = (e) => {
    setSearch(e.target.value);
  };

  const clickHandler = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const getRecipes = async () => {
    // const response = await fetch(
    //   `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`
    // );
    // // // await을 써주니 Promise 가 반환안되고 객체가 반환됨.
    // const data = await response.json();
    // setrecipes(data.hits);

    // 값이 들어올지 모르므로 asynce await을 통해 받아주자.
    // async await 쓰는이유 : 비동기코드를 동기적인 것처럼 읽기 쉽게 만들기위하여.

    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    setrecipes(response.data.hits);
    // console.log(response.data.hits);
    // console.log(recipes); // 빈칸...왜..?
  };
  console.log(recipes);
  return (
    <div className="App">
      {/* onClick={clickHandler}과의 차이: input창 클릭만해도 빈화면이 나옴 */}
      <form className="search-form" onSubmit={clickHandler}>
        <input
          className="search-bar"
          type="text"
          onChange={inputHandler}
          value={search}
        />
        <button className="search-button" type="submit">
          Search
        </button>
        {/* <div>
          {query?.map((food) =>  {
            // query.map is not a function
            console.log(food);
          })}
        </div> */}
      </form>
      <div className="recipes">
        {/* 중괄호가 아니라 소괄호로 맵 돌린다. */}
        {recipes.map((recipe, idx) => (
          <Recipe
            key={idx}
            img={recipe.recipe.image}
            calories={recipe.recipe.calories}
            title={recipe.recipe.label}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
