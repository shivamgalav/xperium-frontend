import React, { useState } from "react";

function Card(props) {

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(props.tempData.name);
  const [email, setEmail] = useState(props.tempData.email);
  const [phone, setPhone] = useState(props.tempData.phone);
  const [note, setNote] = useState(props.tempData.note);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleDelete = () => {
    if (window.confirm("Are u sure to Delete!!")) {
      props.data.splice(
        props.data.findIndex((a) => a.id === props.id),
        1
      );
      let obj = {
        contact_id: props.id,
      };

      // Calling Delete on API

      fetch(`http://127.0.0.1:8000/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((response) => response.json())
        .catch((error) => console.log(error));
      props.forceUpdate();
    }
  };

  const confirmEdit = () => {
    const objIndex = props.data.findIndex((obj) => obj.id === props.id);
    props.data[objIndex].name = name;
    props.data[objIndex].email = email;
    props.data[objIndex].phone = phone;
    props.data[objIndex].note = note;
    let obj = {
      contact_id: props.id,
      update: {
        name: name,
        email: email,
        phone: phone,
        note: note,
      },
    };
    
    setEdit(false);
    props.forceUpdate();

    // Calling Update on API

    fetch(`http://127.0.0.1:8000/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };
  return (
    <>
      {
        <div>
          <div className="card">
            <div className="card-body">
              <div className="card-body-upper mx-2">
                {props.tempData.name} | {props.tempData.email} |{" "}
                {props.tempData.phone}
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary mx-3"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger mx-3"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          {edit && (
            <div className="edit-panel">
              <h3>Edit</h3>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingName"
                  placeholder="Password"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label for="floatingName">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label for="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="floatingNum"
                  placeholder="00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <label for="floatingNum">Phone Number</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingNote"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
                <label for="floatingNote">Note</label>
              </div>
              <button
                type="submit"
                className="btn btn-primary mx-3"
                onClick={confirmEdit}
              >
                Confirm Edit
              </button>
              <button
                type="submit"
                className="btn btn-danger mx-3"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      }
    </>
  );
}

export default Card;
