import { UserService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const CURRENT_USER_QUERY_KEY = 'currentUser';
export default function useUserLogged(token: string) {
  const userQuery = useQuery({
    queryKey: [CURRENT_USER_QUERY_KEY, token],
    queryFn: () => UserService.GetTokenInfo(token),
    enabled: !!token,
    retry: 1,
  });

  return userQuery;
}
