"use client";

import { Button, Empty } from "antd";
import { signOut } from "next-auth/react";

export default function Users() {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <Empty />
      <Button type="primary" danger onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
}
