import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

function List() {
  const { key } = useParams();
  let album = useSelector((state) => state.cardItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: `SEARCH_ACTIVE`,
      payload: false,
    });
  }, [dispatch]);

  function handleClick(e, value) {
    e.currentTarget.classList.add("read");

    value.read = true;
    dispatch({
      type: `CARD_ITEM`,
      payload: album,
    });
  }

  if (!album) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="card-list">
      <div className="card-header">userId : {key} </div>
      {album[key]?.map((a, i) => (
        <div
          className={"list-div " + (a.read ? "read" : "")}
          key={i}
          onClick={(e) => {
            handleClick(e, a);
          }}
        >
          <p>ID:{a.id}</p>
          <p>Title: {a.title}</p>
        </div>
      ))}
    </div>
  );
}

export default List;
