import React, { useState } from "react";

function ContactForm(props) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [note, setNote] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      id: new Date(),
      name: name,
      email: email,
      phone: phone,
      note: note,
    };

    // Calling Add on API

    fetch(`http://127.0.0.1:8000/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));

    props.data.push(obj);
    props.forceUpdate();
  };

  return (
    <>
      <h2>Add new Contact</h2>
      <form id="contact-form" onSubmit={handleSubmit}>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingName"
            placeholder="Password"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label for="floatingName">Name</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            id="floatingNum"
            placeholder="00000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label for="floatingNum">Phone Number</label>
        </div>
        <div class="form-floating mb-3">
          <textarea
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingNote"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
          <label for="floatingNote">Note</label>
        </div>
        <button type="submit" class="btn btn-primary">
          Save Contact
        </button>
      </form>
    </>
  );
}

export default ContactForm;
