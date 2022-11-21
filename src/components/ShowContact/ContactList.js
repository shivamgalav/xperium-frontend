import React, { useEffect } from "react";
import Card from "./Card";

function ContactList(props) {

  //Fetching Contacts Present at DataBase

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => console.log(response.json()))
      .catch((error) => console.log(error));
  });

  return (
    <>
      <h2>Contact Listing</h2>
      {props.data.map((dt) => (
        <Card
          key={dt.id}
          id={dt.id}
          data={props.data}
          tempData={dt}
          forceUpdate={props.forceUpdate}
        />
      ))}
    </>
  );
}

export default ContactList;
