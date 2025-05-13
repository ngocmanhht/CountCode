import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {useCameraDevice, useCameraPermission} from 'react-native-vision-camera';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppFontSize} from '../../const/app-font-size';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {AppScreen} from '../../const/app-screen';
import {Camera} from 'react-native-vision-camera-text-recognition';
import {Result} from '../../types/result';

const SCAN_REGEX = /^\*\d{8}\*$/;

const ScannerScreen = () => {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const [isActive, setIsActive] = useState(true);
  const [scannedValues, setScannedValues] = useState<Set<string>>(new Set());
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const {startValue, endValue} = route.params as {
    startValue: string;
    endValue: string;
  };
  console.log('hasPermission', hasPermission);
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const isValidInRange = (val: string) => {
    const num = parseInt(val, 10);
    const start = parseInt(startValue, 10);
    const end = parseInt(endValue, 10);
    return num >= start && num <= end;
  };

  const handleScanResult = (result: Result) => {
    if (!result?.blocks?.length) {
      return;
    }

    for (const block of result.blocks) {
      const text = block.blockText?.trim();
      if (!text || !SCAN_REGEX.test(text)) {
        continue;
      }

      const rawValue = text.replaceAll('*', '').trim().slice(1);
      console.log('rawValue', rawValue);
      if (scannedValues.has(rawValue)) {
        showAlertOnce('Đã quét', 'Giá trị đã được quét trước đó');
        return;
      }

      // Out of range
      if (!isValidInRange(rawValue)) {
        showAlertOnce(
          'Giá trị không hợp lệ',
          `Giá trị ${rawValue} không nằm trong khoảng ${startValue} - ${endValue}`,
        );
        return;
      }

      // Add valid scanned value
      setScannedValues(prev => new Set(prev).add(rawValue));
      showAlertOnce('Đã quét', rawValue);
      return;
    }
  };

  const showAlertOnce = (title: string, message: string) => {
    setIsActive(false); // temporarily pause camera
    Alert.alert(title, message, [
      {
        text: 'OK',
        onPress: () => setIsActive(true),
      },
    ]);
  };

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
      <View style={styles.cameraContainer}>
        <Camera
          isActive={isActive}
          style={StyleSheet.absoluteFill}
          device={device}
          options={{language: 'latin'}}
          mode="recognize"
          callback={(result: any) => handleScanResult(result)}
        />
        <View style={styles.scanFrame} />
      </View>

      <TouchableOpacity style={styles.endScanButton} onPress={handleEndScan}>
        <Text style={styles.endScanText}>Kết thúc quét</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ScannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
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
