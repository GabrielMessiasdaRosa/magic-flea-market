import { useState } from "react";
import { mountUrlWithQueries } from "../../lib/mount-url-with-queries";

export type ResultType = {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
};

type QueryObject = {
  criteria?: string;
  take?: number;
  skip?: number;
};

export function getUsersByCriteria({
  queryObject = {},
  onSuccess,
  onError,
}: {
  queryObject?: QueryObject;
} & ResultType = {}): {
  users: any[];
  fetchUsers: (req: Request) => Promise<any>;
} {
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async (req: Request) => {
    const requestUrl = mountUrlWithQueries("/api/users", queryObject);
    try {
      const data = await fetch(requestUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const usersData = await data.json();
      setUsers(usersData);
      if (onSuccess) {
        onSuccess(usersData);
      }
      return usersData;
    } catch (error) {
      if (onError) {
        onError(error);
      }
      throw error;
    }
  };

  return { users, fetchUsers };
}
