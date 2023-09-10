import { $Enums } from "@prisma/client";

interface PlanType {
  id: string;
  type: $Enums.PlanType; // Você pode definir um tipo mais preciso para 'type' se houver um conjunto fixo de valores possíveis
  price: number;
  announcementsLimit: number;
  createdAt: Date;
  updatedAt: Date;
}
export default PlanType;
