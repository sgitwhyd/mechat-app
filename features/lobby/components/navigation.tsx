import Image from "next/image";
import { useContext } from "react";

import { AuthContext } from "@/store/context/AuthContext";
import { signOut } from "@/services/auth.service";

export const Navigation = () => {
  const {
    state: { user },
  } = useContext(AuthContext);
  const handleSignOut = () => signOut(user);

  return (
    <div className="flex items-center w-full px-6 py-3">
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center  gap-5">
          <Image
            src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
            alt={`showing ${user?.name} avatar image`}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />
          <p className="text-brand-xl leading-brand-xl">{user?.name}</p>
        </div>
        <button
          className="p-2 rounded-md hover:bg-opacity-25 block hover:bg-brand-blue-500"
          onClick={handleSignOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
