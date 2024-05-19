import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { View, Image, TouchableOpacity, ViewStyle } from 'react-native';
import React from 'react';
import Icon from '../icon';
import { LoadedFile } from '@/interfaces/file';

type FileItemProps = {
  file: LoadedFile;
  onDelete?: () => void;
  containerSyles?: ViewStyle;
};

export default function FileItem({
  file,
  onDelete,
  containerSyles,
}: FileItemProps) {
  const { styles, theme } = useStyles(StylesSheetFileItem);
  return (
    <View style={[styles.container, containerSyles]}>
      {file?.type?.includes('image') ? (
        <Image style={styles.img} source={{ uri: file.uri }} />
      ) : (
        <View style={styles.img}>
          <Icon name='Attachment' color={theme.Colors.violet_100} size={110} />
        </View>
      )}
      {onDelete && (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.iconContainer}
          onPress={onDelete}
        >
          <Icon name='Close' color={theme.Colors.light_100} size={12} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const StylesSheetFileItem = createStyleSheet((theme) => ({
  container: {
    width: 112,
    height: '100%',
    position: 'relative',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 8,
  },
  iconContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.32)',
  },
}));

