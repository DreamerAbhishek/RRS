import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Cards() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const album = useSelector((state) => state.cardItems);
  const albumFilter = useSelector((state) => state.cardItemFilters);

  useEffect(() => {
    dispatch({
      type: `SEARCH_ACTIVE`,
      payload: true,
    });
    !album &&
      fetch("https://jsonplaceholder.typicode.com/albums")
        .then((response) => response.json())
        .then((jsonData) => {
          const pushData = [];
          jsonData?.forEach((group, i) => {
            return pushData.push({ ...group, read: false });
          });

          const groupedData = pushData?.reduce((groups, item) => {
            const { userId } = item;
            if (!groups[userId]) {
              groups[userId] = [];
            }
            groups[userId].push(item);
            return groups;
          }, {});
          dispatch({
            type: "CARD_ITEM",
            payload: groupedData,
          });
        })
        .catch((error) => console.error(error));
  }, [dispatch, album]);

  const handleClick = (key) => {
    navigate(`/card/${key}`);
  };

  return (
    <>
      <div className="card-section">
        {album !== undefined &&
          Object.keys(
            typeof albumFilter !== "undefined" &&
              Object.keys(albumFilter).length !== 0
              ? albumFilter
              : album
          ).map((key, i) => (
            <div onClick={() => handleClick(key)} className="card" key={i}>
              <div className="card-id">{key}</div>
              <div className="card-title">
                <div className="card-total">
                  {album[key].filter((a, i) => a.read === false).length}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Cards;
