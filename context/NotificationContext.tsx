import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';

import { registerForPushNotificationsAsync } from '@/utils/registerForPushNotificationsAsync';
import { SavePushToken } from '@/services/notification';
import useAuth from '@/hooks/useAuth';

interface NotificationContextType {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  error: Error | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const { user } = useAuth();
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  const handleClickNotification = (
    response: Notifications.NotificationResponse
  ) => {
    const { data: notificationData } = response.notification.request.content;

    const isForBudget =
      notificationData?.type === 'budget-alert' && notificationData?.budgetId;

    if (isForBudget) {
      const { budgetId } = notificationData;
      router.push(`/budget/${budgetId}`);
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      async (token) => {
        setExpoPushToken(token);

        if (user && user?.id) {
          const result = await SavePushToken({
            token,
            userId: user.id,
          });
          console.log(result);
        }
      },
      (error) => setError(error)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        handleClickNotification(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [user]);

  // recover last noficiation
  useEffect(() => {
    const handleRedirectToPageByNotification = async () => {
      try {
        const lastResponse =
          await Notifications.getLastNotificationResponseAsync();
        if (lastResponse) {
          handleClickNotification(lastResponse);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleRedirectToPageByNotification();
  }, []);

  return (
    <NotificationContext.Provider
      value={{ expoPushToken, notification, error }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

