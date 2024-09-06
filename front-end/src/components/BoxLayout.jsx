import { useState } from "react";
import "./BoxLayout.css";

const BoxLayout = ({ state, onUpdateData }) => {
  const [successMessage, setSuccessMessage] = useState(null);

  const submit = async (event) => {
    event.preventDefault();
    try {
      const { contract } = state;
      const address = document.querySelector("#address3").value;
      const companyName = document.querySelector("#companyName").value;
      const IndustryOrGoverning = document.querySelector("#Industry").value;
      const location = document.querySelector("#location").value;
      const weight = document.querySelector("#weight").value;
      const type = document.querySelector("#type").value;
      const status = document.querySelector("#status").value;

      const trx = await contract.addCompanyDetails(address, companyName,IndustryOrGoverning,location, weight, type, status);
      await trx.wait();
      console.log(trx)

      setSuccessMessage("success");
      onUpdateData(); 
    } catch (error) {
      console.error(error);
      setSuccessMessage("error");
    }
  };

  return (
   
        <form onSubmit={submit}>
          <input type="text" id="address3" placeholder="Address" />
          <input type="text" id="companyName" placeholder="Company Name" />
          <input type="text" id="Industry" placeholder="Industry/GoverningBody" />
          <input type="text" id="location" placeholder="Location" />
          <input type="text" id="weight" placeholder="Weight" />
          <input type="text" id="type" placeholder="Type" />
          <input type="text" id="status" placeholder="Status" />
          <button type="submit">Add Data</button>
          {successMessage && <p>{successMessage}</p>}
        </form>
   
  );
};

export default BoxLayout;
