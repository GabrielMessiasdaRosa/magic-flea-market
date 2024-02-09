import UserType from "./user-type";

interface ProfileType {
  id: string;
  profileImage: string | null;
  nickname: string;
  reputationPoints: number;
  userId: string;
  user: UserType;

  createdAt: Date;
  updatedAt: Date;
}

export default ProfileType;
