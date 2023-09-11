import AddCertificate from '@/components/AddCertificate';
import DragAndDrop from '@/components/DragAndDrop';
import Navbar from '@/components/Navbar';
import React from 'react';

const Add: React.FC = () => {
  return (
    <>
    <div className='bg-[#f5f8ff] h-[100vh]'>
      <Navbar />
      <AddCertificate/>
      <DragAndDrop/>
    </div>
    </>
  );
};

export default Add;
