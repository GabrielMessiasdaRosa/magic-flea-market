import PlanType from "./plan-type";
import ProfileType from "./profile-type";

interface UserType {
  id: string;
  name: string;
  emailVerified: Date | null;
  image: string | null;
  email: string;
  username: string;
  recoveryAttempts: number;
  planId: string;
  createdAt: Date;
  updatedAt: Date;
  chatId: string | null;
  profile: ProfileType;
  plan: PlanType;
  announcements: any[]; // Defina um tipo mais específico se souber a estrutura real dos anúncios
}
export default UserType;
