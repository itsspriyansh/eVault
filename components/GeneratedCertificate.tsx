import React, { useState, useEffect, useContext } from 'react';
import { GovContext } from '@/context/AppContext';

interface Certificate {
  name: string;
  description: string;
  imageURL: string;
}

interface Props {}

const AddCertificate: React.FC<Props> = () => {
  //@ts-ignore
  const { ConnectToWallet, connectWallet, currentAccount, fetchCertificates, certificates } =
    useContext(GovContext);

  const showCertificates = async () => {
    try {
      const res = await fetchCertificates(currentAccount);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentAccount.length === 0) {
      ConnectToWallet();
      connectWallet();
    }
  }, [ConnectToWallet, connectWallet, currentAccount]);

  return (
    <>
      {currentAccount}
      <button onClick={showCertificates} className='bg-blue-400 w-20'>
        Get
      </button>
      {certificates.map((item: Certificate, id: number) => (
        <div key={id}>
          {item.name}
          {item.description}
          {item.imageURL}
        </div>
      ))}
    </>
  );
};

export default AddCertificate;
