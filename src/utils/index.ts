import {Alert, Dimensions, LayoutRectangle, PixelRatio} from 'react-native';
import {FrameBlock} from '../types/item';
import {BlocksData} from '../types/result';

export const TEN_CHARACTER_SCAN_REGEX = /^\*\d{8}\*$/;

export class AppUtils {
  static window = Dimensions.get('window');

  static get logicalWidth() {
    return AppUtils.window.width;
  }
  static get logicalHeight() {
    return AppUtils.window.height;
  }

  /**
   * Show an alert with title, message and OK button.
   * If onClose is provided, the onClose function will be called when the alert is closed.
   * @param title The title of the alert
   * @param message The message of the alert
   * @param onClose The function to be called when the alert is closed
   */
  static showAlertOnce(title: string, message: string, onClose?: () => void) {
    Alert.alert(title, message, [
      {
        text: 'OK',
        onPress: () => {
          onClose?.();
        },
      },
    ]);
  }

  /**
   * Determines whether a given block is inside the scan box area on the camera preview,
   * accounting for scaling, cropping (due to `resizeMode: 'cover'`), and coordinate transformations.
   *
   * This function performs the following steps:
   * 1. Calculates the accurate scale factor between the camera frame and the screen layout.
   * 2. Converts the block's coordinates from image space to screen space, including Y-axis inversion.
   * 3. Computes cropping offsets introduced by the cover mode.
   * 4. Adjusts the block's screen coordinates by the calculated offsets and an optional Y correction.
   * 5. Checks if the adjusted block rectangle overlaps with the scan box rectangle.
   *
   * Debug information is logged at each step for troubleshooting.
   *
   * @param block - The block data containing its frame in image (pixel) coordinates.
   * @param scanBoxLayout - The layout rectangle of the scan box in screen (dp) coordinates.
   * @param cameraLayout - The layout rectangle of the camera preview in screen (dp) coordinates.
   * @param frame - The frame information of the camera image in pixel coordinates.
   * @returns `true` if the block is at least partially inside the scan box area; otherwise, `false`.
   */
  static isBlockInScanBox = (
    block: BlocksData,
    scanBoxLayout: LayoutRectangle | null,
    cameraLayout: LayoutRectangle | null,
    frame: FrameBlock | null,
  ): boolean => {
    if (!scanBoxLayout || !cameraLayout || !frame) return false;
    // console.log('=== DEBUG PARAMETERS ===');
    // console.log('Block frame (px):', block.blockFrame);
    // console.log('Scan box (dp):', scanBoxLayout);
    // console.log('Camera layout (dp):', cameraLayout);
    // console.log('Camera frame (px):', frame);
    // 1. Tính toán scale factor CHUẨN XÁC
    const imageAspect = frame.width / frame.height;
    const screenAspect = cameraLayout.width / cameraLayout.height;

    // Scale factor thực tế (đã tính toán crop do resizeMode 'cover')
    const scale =
      imageAspect > screenAspect
        ? cameraLayout.height / (frame.height / PixelRatio.get())
        : cameraLayout.width / (frame.width / PixelRatio.get());

    // 2. Tính tọa độ block TRÊN MÀN HÌNH (đã bao gồm crop offset)
    const blockLeft = block.blockFrame.x * scale;
    const blockRight = (block.blockFrame.x + block.blockFrame.width) * scale;

    // Đảo chiều Y và tính toán chính xác vị trí
    const blockScreenY =
      frame.height - block.blockFrame.y - block.blockFrame.height;
    const blockTop = blockScreenY * scale;
    const blockBottom = (blockScreenY + block.blockFrame.height) * scale;

    // 3. Tính toán OFFSET do ảnh bị crop (resizeMode cover)
    let offsetX = 0,
      offsetY = 0;
    if (imageAspect > screenAspect) {
      offsetX = (frame.width * scale - cameraLayout.width) / 2;
    } else {
      offsetY = (frame.height * scale - cameraLayout.height) / 2;
    }

    // 4. Tọa độ FINAL sau khi hiệu chỉnh
    const finalLeft = blockLeft - offsetX;
    const finalRight = blockRight - offsetX;
    const finalTop = blockTop - offsetY;
    const finalBottom = blockBottom - offsetY;
    // Thêm hệ số hiệu chỉnh (cần thử nghiệm)
    const Y_CORRECTION = 50; // dp

    const finalTopWithCorrection = finalTop + Y_CORRECTION;
    const finalBottomWithCorrection = finalBottom + Y_CORRECTION;
    // 5. Kiểm tra overlap với scan box
    const isInside =
      finalRight > scanBoxLayout.x &&
      finalLeft < scanBoxLayout.x + scanBoxLayout.width &&
      finalBottom > scanBoxLayout.y &&
      finalTop < scanBoxLayout.y + scanBoxLayout.height;

    // Debug CHI TIẾT
    // console.log('=== FINAL CALCULATION ===');
    // console.log('Scale factor:', scale);
    // console.log('Block screen position:', {
    //   left: finalLeft,
    //   top: finalTopWithCorrection,
    //   right: finalRight,
    //   bottom: finalBottomWithCorrection,
    // });
    // console.log('Scan box position:', scanBoxLayout);
    // console.log('Overlap result:', isInside);

    return isInside;
  };
}
