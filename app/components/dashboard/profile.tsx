import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  return (
    <div className="flex items-center space-x-3">
      <div className="font-bold">Welcome, Admin</div>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/150?img=44" />
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>
    </div>
  );
}
