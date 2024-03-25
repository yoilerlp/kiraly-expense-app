import { UserService } from '@/services';
import { useQuery } from '@tanstack/react-query';

export default function useUserLogged(token: string) {
  const userQuery = useQuery({
    queryKey: ['currentUser', token],
    queryFn: () => UserService.GetTokenInfo(token),
    enabled: !!token,
    retry: 1,
  });

  return userQuery;
}

