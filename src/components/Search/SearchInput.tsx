import React from "react";

interface Props {}

const SearchInput = (props: Props) => {
  return (
    <form action="">
      <label htmlFor="search">Search for products</label>
      <input type="text" id="search" />
    </form>
  );
};

export default SearchInput;
