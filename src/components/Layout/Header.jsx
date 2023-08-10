import React, { useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const [msg, setMsg] = useState("");
  const album = useSelector((state) => state.cardItems);
  const searchActive = useSelector((state) => state.active);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const searchValue = [e.target.value];

    const albumFilter = Object.keys(album)
      .filter((key) => searchValue.includes(key))
      .reduce((obj, key) => {
        obj[key] = album[key];
        return obj;
      }, {});

    if (e.target.value.length !== 0 && Object.keys(albumFilter).length === 0) {
      setMsg("No record found");
    } else {
      setMsg("");
    }

    dispatch({
      type: `CARD_ITEM_FILTER`,
      payload: albumFilter,
    });
  };

  return (
    <div className="nav">
      <Link to={`/`} className="nav-logo">
        Logo
      </Link>
      {searchActive && (
        <div className="nav-search">
          <input placeholder="search" onChange={handleChange}></input>
          <span className="error-msg">{msg}</span>
        </div>
      )}
    </div>
  );
}

export default Header;
