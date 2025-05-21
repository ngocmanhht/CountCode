import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutRectangle,
} from 'react-native';
import {useCameraDevice, useCameraPermission} from 'react-native-vision-camera';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/native';
import {useScanner} from './use-scanner';
import {AppScreen} from '../../const/app-screen';
import {Camera} from 'react-native-vision-camera-text-recognition';
import {AppFontSize} from '../../const/app-font-size';

const ScannerScreen = () => {
  const device = useCameraDevice('back', {
    physicalDevices: ['wide-angle-camera'],
  });
  const {hasPermission, requestPermission} = useCameraPermission();
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const {startValue, endValue} = route.params as {
    startValue: string;
    endValue: string;
  };
  const ref = useRef<View>(null);
  const {
    isActive,
    setIsActive,
    scannedValues,
    handleScanResult,
    setScannedValues,
    setScanBoxLayout,
  } = useScanner(startValue, endValue);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
    return () => setIsActive(false);
  }, [hasPermission, requestPermission, setIsActive]);

  const handleEndScan = () => {
    setIsActive(false);
    navigation.navigate(AppScreen.ResultScreen, {
      scannedData: Array.from(scannedValues),
      startValue,
      endValue,
    });
  };

  if (!device || !hasPermission) {
    return (
      <View style={styles.loading}>
        <Text>Đang tải camera...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        ref={ref}
        onLayout={e => {
          console.log('Layout:', e.nativeEvent.layout);
          if (ref.current) {
            ref.current.measureInWindow((x, y, width, height) => {
              const layout: LayoutRectangle = {
                x: x,
                y: y,
                width: width,
                height: height,
              };
              console.log('Layout1:', layout);

              setScanBoxLayout(layout);
            });
          }
        }}
        style={{
          width: 400,
          height: 100,
          borderWidth: 5,
          borderColor: 'red',
          marginTop: 20,
        }}>
        <Camera
          isActive={isActive}
          style={{
            flex: 1,
          }}
          device={device}
          options={{language: 'latin'}}
          mode="recognize"
          callback={(result: any) => {
            handleScanResult(result);
          }}
        />
        {/* <View style={styles.scanFrame} /> */}
      </View>

      <View style={{flexDirection: 'row', gap: 10}}>
        <TouchableOpacity
          style={styles.endScanButton}
          onPress={() => {
            setScannedValues(new Set());
            setIsActive(true);
          }}>
          <Text style={styles.endScanText}>Quét lại</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.endScanButton} onPress={handleEndScan}>
          <Text style={styles.endScanText}>Kết thúc quét</Text>
        </TouchableOpacity>
      </View>
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
