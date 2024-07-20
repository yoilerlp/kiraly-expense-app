import { IPageStatusBarStyles } from '@/context/pageContext';
import useSetPageContainerStyles from '@/hooks/useSetPageContainerStyles';

type Props = {
  statusBarBgColor: string;
  bottomBgColor?: string;
  statusBarProps?: IPageStatusBarStyles['statusBarProps'];
};

export default function SafeAreasSetting({
  statusBarBgColor,
  bottomBgColor,
  statusBarProps,
}: Props) {
  useSetPageContainerStyles({
    statusBarContainerStyles: {
      backgroundColor: statusBarBgColor,
    },
    viewBottomContainerStyles: {
      backgroundColor: bottomBgColor!,
    },
    statusBarProps: {
      style: 'light',
      ...statusBarProps,
    },
  });

  return null;
}

