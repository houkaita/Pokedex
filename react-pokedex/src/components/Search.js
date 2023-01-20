import React from "react";

function Search(props) {
  return (
    <>
      <form className="form" onSubmit={props.HandleSearch}>
        <input
          type="search"
          className="input_search"
          placeholder="Name or Number"
          value={props.search}
          onChange={(e) => props.setSearch(e.target.value)}
          HandleSearch={props.HandleSearch}
          required
        ></input>
      </form>
    </>
  );
}

export default Search;
