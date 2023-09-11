import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import React from "react";
import Link from "next/link";

interface AccountMenuInterface {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuInterface> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  const { data: user } = useCurrentUser();

  return (
    <div className=" bg-slate-100 w-56 absolute top-14 right-0 py-5 flex-col border-2 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img className="w-8 rounded-full" src={user?.image} alt="" />
          <p className="text-slate-500 text-sm">
            {user?.name}
          </p>
        </div>
      </div>
      <hr className="bg-gray-300 border-0 h-px my-4" />
      <Link href="/Add">
        <div className="px-3 text-center text-slate-500 text-sm hover:underline">
          Add Certificate
        </div>
      </Link>
      <hr className="bg-gray-300 border-0 h-px my-4" />
      <div
        onClick={() => signOut()}
        className="px-3 text-center text-red-500 text-sm hover:underline"
      >
        Sign out
      </div>
    </div>
  );
};

export default AccountMenu;
