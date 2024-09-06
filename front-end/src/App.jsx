import { ethers } from "ethers";
import { useState } from "react";
import WasteManagment from "./WasteManagment.json";
import Navigationbar from "./components/NavBar";
import AddCompany from "./components/AddCompany";
import BoxLayout from "./components/BoxLayout";
import IndustryDataFetcher from "./components/IndustryDataFetcher";


function App() {
  const [account, setAccount] = useState("");
  const [updateData, setUpdateData] = useState(false);
  

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const connectWallet = async () => {
    const contractAddress = WasteManagment.address;
    const ABI = WasteManagment.abi;
    try {
      const { ethereum } = window;
      if (ethereum) {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      setState({ provider, signer, contract });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navigationbar />
      <div className="connection">
        <button onClick={connectWallet} className="button">Connect Wallet</button>
        <p className="account">account: {account}</p>
        <AddCompany state={state} onUpdateData={() => setUpdateData(prevState => !prevState)} />

      </div>
      <IndustryDataFetcher state={state} updateData={updateData}/>
      <BoxLayout state={state} onUpdateData={() => setUpdateData(prevState => !prevState)}/>
    
    </>
  );
}

export default App;

