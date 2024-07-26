import { useState } from "react";
import "./contact.scss";

const Contact = ({ data, updateDetails, deleteContact }) => {
  const [edit, setEdit] = useState(false);
  const [inputs, setInputs] = useState({
    name: data.name,
    email: data.email,
    phone: data.phone,
  });

  const handleInputsChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const cancelEdit = () => {
    setInputs({
      name: data.name,
      email: data.email,
      phone: data.phone,
    });
    setEdit(false);
  };

  const updateContact = async (e) => {
    e.preventDefault();
    await updateDetails({ id: data.id, ...inputs });
    setEdit(false);
  };

  return (
    <div className="contact">
      {edit ? (
        <>
          <form className="contact-details" onSubmit={updateContact}>
            <div className="inputs">
              <input
                type="text"
                name="name"
                onChange={handleInputsChange}
                value={inputs.name}
                required
                autoFocus
              />
              <input
                type="email"
                name="email"
                onChange={handleInputsChange}
                value={inputs.email}
                required
              />
              <input
                type="test"
                name="phone"
                onChange={handleInputsChange}
                value={inputs.phone}
                required
              />
            </div>

            <div>
              <button>Update</button>
              <button onClick={cancelEdit}>Cancel</button>
            </div>
          </form>
        </>
      ) : (
        <div className="contact-details">
          <span>{inputs.name}</span>
          <span>{inputs.email}</span>
          <span>{inputs.phone}</span>
        </div>
      )}
      <div className="other-buttons">
        {!edit && (
          <>
            <button onClick={() => setEdit(true)}>Edit</button>
            <button onClick={() => deleteContact({ id: data.id, ...inputs })}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Contact;
