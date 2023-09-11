import React, { useState, useEffect, useContext } from 'react';
import { GovContext } from '@/context/AppContext';

interface Props {}

const AddCertificate: React.FC<Props> = () => {
  const [name, setName] = useState<string>('');
  const [dept, setDept] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const { connectWallet, ConnectToWallet, currentAccount, mintCertificate   } =  useContext(GovContext);

  useEffect(() => {
    ConnectToWallet();
    connectWallet();
  }, []);

  const addCertificate = async () => {
    try {
      const res = await mintCertificate(currentAccount, name, dept, img);
      console.log(res);
      setName('');
      setDept('');
      setImg('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    {currentAccount}
      <input type='text' placeholder='Name' value={name} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setName(e.target.value)} />
      <input type='text' placeholder='Department' value={dept} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setDept(e.target.value)} />
      <input type='text' placeholder='ImgUrl' value={img} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setImg(e.target.value)} />
      <button onClick={addCertificate}>Add</button>
    </>
  );
};

export default AddCertificate;
