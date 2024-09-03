import { UserService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import useStorageValue from './useStorageValue';
import { StorageKeys } from '@/constants/storageKeys';

export const CURRENT_USER_QUERY_KEY = 'currentUser';
export default function useUserLogged() {
  const { value: token, loading: loadingToken } = useStorageValue(
    StorageKeys.authToken,
    ''
  );

  const userQuery = useQuery({
    queryKey: [CURRENT_USER_QUERY_KEY, token],
    queryFn: () => UserService.GetTokenInfo(token),
    enabled: !!token,
    retry: 1,
  });

  return {
    token,
    data: userQuery.data,
    isError: userQuery.isError,
    isLoading: userQuery.isLoading || loadingToken,
    refetch: userQuery.refetch,
  };
}
