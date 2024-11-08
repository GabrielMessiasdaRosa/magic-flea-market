import "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session {
    user: {
      /** The user's name. */
      name: string;
      id: string;
      email: string;
      image: string;
      username: string;
      profile: {
        nickname: string;
        id: string;
        reputationPoints: number;
      };
      plan: any | null;
    };
  }
}
