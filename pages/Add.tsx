import AddCertificate from '@/components/AddCertificate';
import DragAndDrop from '@/components/DragAndDrop';
import Navbar from '@/components/Navbar';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/Auth",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };
}

const Add: React.FC = () => {
  return (
    <>
    <div>
      <Navbar />
      <AddCertificate/>
      <DragAndDrop/>
    </div>
    </>
  );
};

export default Add;
