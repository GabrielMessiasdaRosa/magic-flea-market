interface ProfileType {
  id: string;
  profileImage: string | null;
  nickname: string;
  reputationPoints: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
export default ProfileType;
