import React, { useState, useEffect, useContext } from "react";
import { GovContext } from "@/context/AppContext";

interface AddCertificateProps {}

const AddCertificate: React.FC<AddCertificateProps> = () => {
  const [name, setName] = useState<string>("");
  const [dept, setDept] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  //@ts-ignore
  const { connectWallet, ConnectToWallet, currentAccount, mintCertificate,imgURL } =
    useContext(GovContext);

  useEffect(() => {
    ConnectToWallet();
    connectWallet();
  }, []);

  const addCertificate = async () => {
    try {
      const res = await mintCertificate(currentAccount, name, dept, desc,imgURL);
      console.log(res);
      setName("");
      setDept("");
      setDesc("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {currentAccount}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          setName(e.target.value)
        }
      />
      <input
        type="text"
        placeholder="Department"
        value={dept}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          setDept(e.target.value)
        }
      />
      <input
        type="text"
        placeholder="Description"
        value={desc}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          setDesc(e.target.value)
        }
      />
      <button onClick={addCertificate}>Add</button>
    </>
  );
};

export default AddCertificate;
