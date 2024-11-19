import * as LocalAuthentication from 'expo-local-authentication';
import { useQuery } from '@tanstack/react-query';

const getBiometricsDetails = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();

  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  const sopported =
    await LocalAuthentication.supportedAuthenticationTypesAsync();

  const supportFingerPrint = sopported.includes(
    LocalAuthentication.AuthenticationType.FINGERPRINT
  );

  const supportFaceId = sopported.includes(
    LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
  );

  return {
    hasHardware,
    isEnrolled,
    supportFingerPrint,
    supportFaceId,
  };
};

export default function useBiometricsDetails() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['biometrics'],
    queryFn: getBiometricsDetails,
  });

  return {
    biometrics: data,
    isLoading,
    error,
    authenticateAsync: LocalAuthentication.authenticateAsync,
  };
}

