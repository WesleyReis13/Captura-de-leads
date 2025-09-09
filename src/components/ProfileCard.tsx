import React from "react";

interface ProfileCardProps {
  photo: string;
  name: string;
  role: string;
  social1: string;
  social2: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ photo, name, role, social1, social2 }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-xl p-4  rounded-lg shadow-md bg-[#F3EDE2]">
      
      <div className="flex items-center gap-4">
        <img
          src={photo}
          alt={name}
          className="w-16 h-16 rounded-full border object-cover"
        />
        <div>
          <p className="font-bold text-[#49543A]">{name}</p>
          <p className="text-sm text-[#49543A]">{role}</p>
        </div>
      </div>

      
      <div className="flex flex-col gap-2">
        <a
          href={social1}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-md text-center bg-[#49543A] transition"
        >
          Instagram
        </a>
        <a
          href={social2}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2  rounded-md text-center bg-[#49543A] transition"
        >
          Linkedin
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;
