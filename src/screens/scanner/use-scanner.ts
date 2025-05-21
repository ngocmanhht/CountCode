import {useState, useRef, useCallback} from 'react';
import {Alert, LayoutRectangle} from 'react-native';
import {BlocksData, Result} from '../../types/result';
import {TEN_CHARACTER_SCAN_REGEX} from '../../utils';

export function useScanner(startValue: string, endValue: string) {
  const [scannedValues, setScannedValues] = useState<Set<string>>(new Set());
  const isScanningRef = useRef(true);
  const [isActive, setIsActive] = useState(true);
  const isHandlingRef = useRef(false);
  const [scanBoxLayout, setScanBoxLayout] = useState<LayoutRectangle | null>(
    null,
  );

  const showAlertOnce = useCallback(
    (title: string, message: string, onClose?: () => void) => {
      isScanningRef.current = true;
      setIsActive(false);
      Alert.alert(title, message, [
        {
          text: 'OK',
          onPress: () => {
            isScanningRef.current = false;
            setIsActive(true);
            onClose?.();
          },
        },
      ]);
    },
    [],
  );

  const isValidInRange = useCallback(
    (val: string) => {
      const num = parseInt(val, 10);
      const start = parseInt(startValue, 10);
      const end = parseInt(endValue, 10);
      return num >= start && num <= end;
    },
    [startValue, endValue],
  );

  const filterBlocksInLayout = (
    blocks: BlocksData[],
    layout: LayoutRectangle,
  ): BlocksData[] => {
    return blocks.filter(block =>
      block.blockCornerPoints.some(point => {
        return (
          point.x >= layout.x &&
          point.x <= layout.x + layout.width &&
          point.y >= layout.y &&
          point.y <= layout.y + layout.height
        );
      }),
    );
  };

  const handleScanResult = useCallback(
    (result: Result) => {
      console.log('handleScanResult', result);
      if (isHandlingRef.current || !result?.blocks?.length) return;
      isHandlingRef.current = true;
      isScanningRef.current = false;
      try {
        const matchedBlock = result.blocks.find(block =>
          TEN_CHARACTER_SCAN_REGEX.test(block.blockText),
        );

        if (!matchedBlock?.blockText) return;

        const rawValue = matchedBlock.blockText
          .trim()
          .replaceAll('*', '')
          .slice(1);
        if (!rawValue) return;

        if (!isValidInRange(rawValue)) {
          showAlertOnce(
            'Giá trị không hợp lệ',
            `Giá trị ${rawValue} không nằm trong khoảng ${startValue} - ${endValue}`,
          );
          return;
        }

        if (scannedValues.has(rawValue)) {
          showAlertOnce('Đã quét', 'Giá trị đã được quét trước đó');
          return;
        }

        const currentSet = new Set(scannedValues);
        currentSet.add(rawValue);
        setScannedValues(currentSet);
        showAlertOnce('Đã quét', rawValue);
      } finally {
        // Cho phép xử lý lại sau khi hoàn tất
        isScanningRef.current = false;
      }
    },
    [isValidInRange, scanBoxLayout, scannedValues, showAlertOnce],
  );

  return {
    isActive,
    setIsActive,
    scannedValues,
    handleScanResult,
    setScannedValues,
    setScanBoxLayout,
  };
}
