import React, { useEffect, useState } from "react";

function Render() {
  const [count, setCount] = useState(0);
  console.log("rerender되나확인"); //1
  const increment = () => {
    setCount(count + 1);
  };
  useEffect(() => {
    getRecipes();
    console.log("useeffect 실행합니다"); //5
    console.log("------------마지막 출력---------"); //6
  }, [count]);

  const getRecipes = async () => {};

  console.log("맨 먼저 출력"); //2

  return (
    <div className="App">
      <form className="search-form">
        <input className="search-bar" type="text" />
        <button className="search-button" type="submit">
          Search
        </button>
        {console.log(`렌더합니다`)}
        {/* 3 */}
      </form>
      <button onClick={increment}>{console.log("버튼클릭합니다")}</button>
      {/* 4 */}
      {count}
    </div>
  );
}

export default Render;
