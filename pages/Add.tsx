import AddCertificate from '@/components/AddCertificate';
import DropFileInput from '@/components/drop-file-input/DropFileInput';
import React from 'react';

const Add: React.FC = () => {
  return (
    <div>
    <AddCertificate/>
    <DropFileInput />
    </div>
  );
};

export default Add;
