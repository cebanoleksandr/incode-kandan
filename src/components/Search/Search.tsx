import React from "react";
import './Search.scss';

export const Search = () => {
  return (
    <div className="search mb20">
      <input
        type="text"
        className="mr10"
        placeholder="Search cards..."
      />

      <button className="btn btn-success search-btn">
        <i className="fas fa-search mr10"></i>
        Search
      </button>
    </div>
  );
}
