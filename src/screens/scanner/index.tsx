import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useCameraPermission} from 'react-native-vision-camera';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/native';
import {AppFontSize} from '../../const/app-font-size';
import {TextRecognitionCamera} from '../../components/text-recognition-camera';

const ScannerScreen = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const {startValue, endValue} = route.params as {
    startValue: string;
    endValue: string;
  };

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  return (
    <SafeAreaView style={styles.container}>
      <TextRecognitionCamera
        containerStyle={StyleSheet.absoluteFill}
        startValue={startValue}
        endValue={endValue}
      />
    </SafeAreaView>
  );
};

export default ScannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
  },
  title: {
    marginTop: 64,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  cameraContainer: {
    width: '90%',
    height: 100,
    marginTop: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  scanFrame: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 4,
    borderColor: 'orange',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
  },
  endScanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 32,
  },
  endScanText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: AppFontSize.s16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
