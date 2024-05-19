import React from 'react';
import { ImageProps, Image, View, ActivityIndicator } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Typography from '../typography';

type Props = ImageProps;

export default function ImageLoader({ ...props }: Props) {
  const [loading, setLoading] = React.useState<boolean>();
  const [error, setError] = React.useState(false);

  const { source } = props!;
  const propsStyles = props.style;

  console.log({
    loading,
    error,
  });
  if (loading || error) {
    return (
      <View
        style={[
          propsStyles,
          {
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        {error ? (
          <Typography type='Body1'>
            Something went wrong. Please try again.
          </Typography>
        ) : (
          <ActivityIndicator color={Colors.violet_100} size={'small'} />
        )}
      </View>
    );
  }

  return (
    <Image
      {...props}
      onLoadStart={() => setLoading(true)}
      onLoadEnd={() => setLoading(false)}
      onError={() => setError(true)}
    />
  );
}

