import { useState } from "react";
const AddCompany=({state})=>{
    const[successMessage,setSuccessMessage]=useState(null);
    const addcompany=async(event)=>{
        event.preventDefault();
        try{
            const {contract}=state;
            const address=document.querySelector("#address").value;
            console.log (address);
            const transaction=await contract.addCompany(address);
            await transaction.wait();
            setSuccessMessage("address added successfully");
            console.log("address added successfully");

        }
        catch(error){
            console.log(error);
            setSuccessMessage("Something went wrong");
        }}
        return(
            <>
            <form onSubmit={addcompany}>
            <label>Enter address to add Company:</label>
            <input type="text" id="address" placeholder="Enter the address"/>
            <button type="submit" className="button12">Enter</button>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            </form> </>
        );
 
}
export default AddCompany;