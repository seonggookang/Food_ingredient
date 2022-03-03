import React, { useEffect, useState } from "react";
import axios from "axios";
import Recipe from "./Recipe";

function App() {
  const APP_ID = "c864dcc2";
  const APP_KEY = "95406cccd0f1dfef0af8f69c86297d1c";

  const [search, setSearch] = useState("");
  const [recipes, setrecipes] = useState(
    localStorage.getItem("watched")
      ? JSON.parse(localStorage.getItem("watched"))
      : []
  );

  const [query, setQuery] = useState(
    localStorage.getItem("watched")
      ? JSON.parse(localStorage.getItem("watched"))
      : "chicken"
  );

  // 최초 아무것도 없을 대 시행하기 위한 useEffect
  useEffect(() => {
    if (localStorage.getItem("watched") == null) {
      console.log("local에 아무것도 없으면 출력되는 줄");
      getRecipes();
    }
  }, []);

  const inputHandler = (e) => {
    setSearch(e.target.value);
  };

  const clickHandler = (e) => {
    e.preventDefault();
    setQuery(search);
    getRecipes(search);
    setSearch("");
  };

  // await을 써주니 Promise 가 반환안되고 객체가 반환됨.
  // const data = await response.json();
  // 값이 들어올지 모르므로 asynce await을 통해 받아주자.
  // async await 쓰는이유 : 비동기코드를 동기적인 것처럼 읽기 쉽게 만들기위하여.

  const getRecipes = async (id) => {
    // setQuery(JSON.parse(localStorage.getItem("watched"))); //watch에 아무것도 없다면, chicken관련정보들을 가져와라.

    const response = await axios.get(
      `https://api.edamam.com/search?q=${
        id ? id : query
      }&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    localStorage.setItem("watched", JSON.stringify(response.data.hits));
    setrecipes(JSON.parse(localStorage.getItem("watched")));
  };

  console.log("query : ", query); //아무것도 업어..? 있게해야지 처음에 비어있으면 chikcken값가져오게!!!
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
      </form>
      <div className="recipes">
        {/* 중괄호 아니고 소괄호로 */}
        {console.log("recipes : ", recipes)}
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
