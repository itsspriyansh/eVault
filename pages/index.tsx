import { getSession } from "next-auth/react";

export async function getServerSideProps (context : NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect : {
        destination : "/Auth",
        permanent : false
      }
    }
  }

  return {
    props : {}
  }
}

export default function Home() {
  return (
    <div>
      home page
    </div>
  )
}
