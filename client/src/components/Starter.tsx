import React from "react";
import { useFetch } from "../hooks/useFetch";
import { golfInterface } from "../types/golfType";
import "./stater.scss";

const Starter = () => {
  const { data, loading, error } = useFetch("https://web-shop-ban-game-server.onrender.com/api/sample");

  if (data) {
    console.log(data);
  }

  if (loading) {
    return <div>Loaing...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="stater">
      {data.map((item: golfInterface) => (
        <div key={item._id}>{item.name}</div>
      ))}
    </div>
  );
};

export default Starter;
