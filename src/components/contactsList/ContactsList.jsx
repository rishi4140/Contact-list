import axios from "axios";
import { useState, useEffect } from "react";
import Contact from "../contact/Contact";
import "./contactsList.scss";
import Loader from "../loader/Loader";
import { useToasts } from "react-toast-notifications";

const ContactsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const { addToast } = useToasts();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      res?.data?.forEach((user) => {
        const userDetails = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        };
        setData((prev) => [...prev, userDetails]);
      });
    };
    getData();
    setLoading(false);
    return setData([]);
  }, []);

  const updateDetails = async (updatedData) => {
    setLoading(true);
    const res = await axios.put("https://jsonplaceholder.typicode.com/users/1");
    console.log(res);
    setLoading(false);
    const newArray = data.map((item) => {
      if (item.id === updatedData.id) {
        console.log("INSIDE");
        const t = {
          id: updatedData.id,
          ...updatedData,
        };
        console.log("TTTTTTT", t);
        return t;
      }
      return item;
    });
    console.log("NEWARRAY", newArray);
    setData(newArray);
    addToast("Contact updated successfully!", {
      appearance: "success",
      autoDismiss: true,
    });
  };

  const deleteContact = async (contact) => {
    setLoading(true);
    await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${contact.id}`
    );
    setLoading(false);
    const newArray = data.filter((item) => item.id !== contact.id);
    setData(newArray);
    addToast("Contact deleted successfully!", {
      appearance: "success",
      autoDismiss: true,
    });
  };

  const changeInput = (e) => {
    setNewContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const addedContact = await axios.post(
      "https://jsonplaceholder.typicode.com/users"
    );
    setLoading(false);
    console.log(addedContact);
    setData((prev) => [
      {
        id: addedContact.data.id + data.length,
        ...newContact,
      },
      ...prev,
    ]);
    setNewContact({
      name: "",
      email: "",
      phone: "",
    });
    setShowContactForm(false);
    addToast("Contact created successfully!", {
      appearance: "success",
      autoDismiss: true,
    });
  };

  console.log(data);

  return (
    <div className="contacts-list">
      <div className="header">
        <span>Contact List App</span>
        <button onClick={() => setShowContactForm(true)}>Add contact</button>
      </div>

    
      <div className="content">
        {showContactForm && (
          <div className="contact-form-wrapper">
            <div className="contact-form">
              <p onClick={() => setShowContactForm(false)}>Close</p>
              <form onSubmit={submitForm}>
                <h1>Enter contact details.</h1>
                <div>
                  <input
                    type="text"
                    name="name"
                    value={newContact.name}
                    onChange={changeInput}
                    required
                    placeholder="Contact Name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={newContact.email}
                    onChange={changeInput}
                    required
                    placeholder="Contact Email"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={newContact.phone}
                    onChange={changeInput}
                    required
                    placeholder="Contact Number"
                  />
                </div>
                <input type="submit" value="Add Contact" />
              </form>
            </div>
          </div>
        )}
        {data?.map((x) => (
          <Contact
            key={x.id}
            data={x}
            updateDetails={updateDetails}
            deleteContact={deleteContact}
          />
        ))}
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default ContactsList;
