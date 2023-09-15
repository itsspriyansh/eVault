import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import Navbar from "@/components/Navbar";
import CertificatePreview from "@/components/CertificatePreview";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/Auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="mt-12 w-[80%] lg:w-[60%] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <CertificatePreview />
          <CertificatePreview />
          <CertificatePreview />
          <CertificatePreview />
          <CertificatePreview />
          <CertificatePreview />
          <CertificatePreview />
          <CertificatePreview />
          <CertificatePreview />
          <CertificatePreview />
          <CertificatePreview />
          <CertificatePreview />
          <CertificatePreview />
          <CertificatePreview />
          <CertificatePreview />
        </div>
      </div>
    </>
  );
}
