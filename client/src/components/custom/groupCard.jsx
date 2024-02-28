import React from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useSelector, useDispatch } from "react-redux";
import { setGroup } from "@/redux/groupSlice";

const GroupCard = ({ group }) => {
  const nameArr = group?.name?.split(" ");
  const initials =
    nameArr?.length >= 2
      ? nameArr[0].charAt(0) + nameArr[1].charAt(0)
      : nameArr[0].charAt(0);

  const { currentGroup } = useSelector((state) => state.group);
  const dispatch = useDispatch(); // Get the dispatch function

  const handleClick = () => {
    // Dispatch the setGroup action with the group object
    dispatch(setGroup(group));
  };

  const isCurrentGroup = currentGroup && currentGroup._id && group._id && currentGroup._id.toString() === group._id.toString() ? "bg-blue-200" : "";

  return (
    <button
      className={`flex items-center w-full rounded-lg px-3 py-2 text-sm font-medium text-black ${isCurrentGroup}`}
      onClick={handleClick}
    >
      <Avatar>
        <AvatarImage alt="MN" src="/placeholder.svg?height=32&width=32" />
        <AvatarFallback
          style={{
            color: "white",
            background: group?.color,
          }}
        >
          {initials}
        </AvatarFallback>
      </Avatar>
      <span className="ml-2">{group?.name}</span>
    </button>
  );
};

export default GroupCard;
