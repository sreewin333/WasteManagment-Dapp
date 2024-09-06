import { useState, useEffect } from "react";

const IndustryDataFetcher = ({ state, updateData }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndustryDetails = async () => {
      try {
        const contract = state.contract;
        if (contract) {
          const length = await contract.UniqueNumber()
          const industryDetails = [];
          console.log(length);
          console.log(industryDetails);

          for (let i = 0; i < length; i++) {

            const entry = await contract.getMapping(i);
            industryDetails.push(entry);
          }

          setEntries(industryDetails);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching industry details:", error);
        setLoading(false);
      }
    };

    fetchIndustryDetails();
  }, [state.contract, updateData]); 

  return (
    <div>
      {loading ? (
        <p>Loading Company details...</p>
      ) : (
        <div>
          <h2>Company Details</h2>
          <table>
            <thead>
              <tr>
                <th>Address</th>
                <th>Company Name</th>
                <th>Industry/GoverningBody</th>
                <th>Location</th>
                <th>Weight(Ton)</th>
                <th>Type</th>
                <th>Status</th> 
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry[0]}</td> 
                  <td>{entry[1]}</td> 
                  <td>{entry[2]}</td>
                  <td>{entry[3]}</td>
                  <td>{entry[4].toString()}</td>
                  <td>{entry[5]}</td> 
                  <td>{entry[6]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IndustryDataFetcher;


