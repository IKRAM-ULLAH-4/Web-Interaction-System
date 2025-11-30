import React, { useState } from "react";

function Workers() {
  const [workerData, setWorkerData] = useState({
    name: "NewOne",
    salary: 12000,
    posting: {
      location: "Peshawar",
    },
  });

  const handleChange = () => {
    // setWorkerData({ ...workerData, salary: 20000 });
    setWorkerData({
      ...workerData,
      salary: 300000,
      posting: { ...workerData.posting, location: "Abbotabad" },
    });
  };

  return (
    <>
      <p>{workerData.salary}</p>
      <p>{workerData.posting.location}</p>

      <button onClick={handleChange}>Increase salary</button>
    </>
  );
}

export default Workers;
