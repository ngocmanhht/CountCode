import {Alert, Dimensions, LayoutRectangle, PixelRatio} from 'react-native';
import {FrameBlock} from '../types/item';
import {BlocksData} from '../types/result';

export const POLYBOARD_SCAN_REGEX = /^\*\d{8}\*$/;
export const ABF_SCAN_REGEX = /^\d+$/;

export class AppUtils {
  static window = Dimensions.get('window');

  static delay = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

  get logicalWidth() {
    return AppUtils.window.width;
  }
  get logicalHeight() {
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

  static showAlert(
    title: string,
    message: string,
    {
      onClose,
      onDelete,
    }: {
      onClose?: () => void;
      onDelete?: () => void;
    },
  ) {
    Alert.alert(title, message, [
      {
        text: 'Chấp nhận',
        onPress: () => {
          console.log('Chấp nhận');
          onClose?.();
        },
      },
      {
        text: 'Xóa',
        onPress: () => {
          console.log('Xóa');
          onDelete?.();
        },
      },
    ]);
  }

  /**
   * Determines whether a given block is inside or overlaps with the scan box area on the screen.
   *
   * This function converts the block's bounding box from image coordinates to screen coordinates,
   * taking into account the aspect ratio, scaling, and cropping applied by the camera preview.
   * It then checks if the transformed block overlaps with the scan box region.
   *
   * @param block - The block data containing its frame in image coordinates.
   * @param scanBoxLayout - The layout rectangle of the scan box in screen coordinates.
   * @param cameraLayout - The layout rectangle of the camera preview in screen coordinates.
   * @param frame - The frame information of the image, including width and height.
   * @returns `true` if the block overlaps with the scan box area; otherwise, `false`.
   */

  isBlockInScanBox = (
    block: BlocksData,
    scanBoxLayout: LayoutRectangle | null,
    cameraLayout: LayoutRectangle | null,
    frame: FrameBlock | null,
  ): boolean => {
    if (!scanBoxLayout || !cameraLayout || !frame) return false;

    const pixelRatio = PixelRatio.get();

    const imageWidthDp = frame.width / pixelRatio;
    const imageHeightDp = frame.height / pixelRatio;

    const imageAspectRatio = imageWidthDp / imageHeightDp;
    const screenAspectRatio = cameraLayout.width / cameraLayout.height;

    const scale =
      imageAspectRatio > screenAspectRatio
        ? cameraLayout.height / imageHeightDp
        : cameraLayout.width / imageWidthDp;

    const offsetX =
      imageAspectRatio > screenAspectRatio
        ? (imageWidthDp * scale - cameraLayout.width) / 2
        : 0;

    const offsetY =
      imageAspectRatio <= screenAspectRatio
        ? (imageHeightDp * scale - cameraLayout.height) / 2
        : 0;

    // Convert corner points (pixel) → screen (dp)
    const transformedPoints: Point[] = block.blockCornerPoints.map(
      (p: Point) => {
        const x = (p.x / pixelRatio) * scale - offsetX;
        const y = (p.y / pixelRatio) * scale - offsetY;
        return {x, y};
      },
    );

    // Tính bounding box của các corner points
    const xs = transformedPoints.map(p => p.x);
    const ys = transformedPoints.map(p => p.y);

    const blockRect = {
      left: Math.min(...xs),
      right: Math.max(...xs),
      top: Math.min(...ys),
      bottom: Math.max(...ys),
    };

    const isOverlap =
      blockRect.right > scanBoxLayout.x &&
      blockRect.left < scanBoxLayout.x + scanBoxLayout.width &&
      blockRect.bottom > scanBoxLayout.y &&
      blockRect.top < scanBoxLayout.y + scanBoxLayout.height;

    // Debug
    console.log('=== BLOCK CORNER CHECK ===');
    console.log('Scale:', scale);
    console.log('Offset:', {offsetX, offsetY});
    console.log('Corner points:', transformedPoints);
    console.log('Bounding rect:', blockRect);
    console.log('Scan box:', scanBoxLayout);
    console.log('Is inside:', isOverlap);

    return isOverlap;
  };

  // getSortedBlocksInScanBox(
  //   blocks: BlocksData[],
  //   scanBoxLayout: LayoutRectangle | null,
  //   cameraLayout: LayoutRectangle | null,
  //   frame: FrameBlock | null,
  // ): BlocksData[] {
  //   if (!scanBoxLayout || !cameraLayout || !frame || !blocks) return [];

  //   const pixelRatio = PixelRatio.get();

  //   const imageWidthDp = frame.width / pixelRatio;
  //   const imageHeightDp = frame.height / pixelRatio;

  //   const imageAspectRatio = imageWidthDp / imageHeightDp;
  //   const screenAspectRatio = cameraLayout.width / cameraLayout.height;

  //   const scale =
  //     imageAspectRatio > screenAspectRatio
  //       ? cameraLayout.height / imageHeightDp
  //       : cameraLayout.width / imageWidthDp;

  //   const offsetX =
  //     imageAspectRatio > screenAspectRatio
  //       ? (imageWidthDp * scale - cameraLayout.width) / 2
  //       : 0;

  //   const offsetY =
  //     imageAspectRatio <= screenAspectRatio
  //       ? (imageHeightDp * scale - cameraLayout.height) / 2
  //       : 0;

  //   const blocksInScanBox = blocks
  //     ?.map(block => {
  //       const transformedPoints = block?.blockCornerPoints.map(p => {
  //         const x = (p.x / pixelRatio) * scale - offsetX;
  //         const y = (p.y / pixelRatio) * scale - offsetY;
  //         return {x, y};
  //       });

  //       const xs = transformedPoints?.map(p => p.x);
  //       const ys = transformedPoints?.map(p => p.y);

  //       const blockRect: ScreenRect = {
  //         left: Math.min(...xs),
  //         right: Math.max(...xs),
  //         top: Math.min(...ys),
  //         bottom: Math.max(...ys),
  //       };

  //       const isOverlap =
  //         blockRect.right > scanBoxLayout.x &&
  //         blockRect.left < scanBoxLayout.x + scanBoxLayout.width &&
  //         blockRect.bottom > scanBoxLayout.y &&
  //         blockRect.top < scanBoxLayout.y + scanBoxLayout.height;

  //       return isOverlap ? {block, top: blockRect.top} : null;
  //     })
  //     .filter((item): item is {block: BlocksData; top: number} => item !== null)
  //     .sort((a, b) => a.top - b.top);

  //   return blocksInScanBox.map(item => item.block);
  // }
  getSortedBlocksInScanBox(
    blocks: BlocksData[],
    scanBoxLayout: LayoutRectangle | null,
    cameraLayout: LayoutRectangle | null,
    frame: FrameBlock | null,
  ): BlocksData[] {
    if (!scanBoxLayout || !cameraLayout || !frame || !blocks) return [];

    const pixelRatio = PixelRatio.get();

    const imageWidthDp = frame.width / pixelRatio;
    const imageHeightDp = frame.height / pixelRatio;

    const imageAspectRatio = imageWidthDp / imageHeightDp;
    const screenAspectRatio = cameraLayout.width / cameraLayout.height;

    const scale =
      imageAspectRatio > screenAspectRatio
        ? cameraLayout.height / imageHeightDp
        : cameraLayout.width / imageWidthDp;

    const offsetX =
      imageAspectRatio > screenAspectRatio
        ? (imageWidthDp * scale - cameraLayout.width) / 2
        : 0;

    const offsetY =
      imageAspectRatio <= screenAspectRatio
        ? (imageHeightDp * scale - cameraLayout.height) / 2
        : 0;

    const blocksInScanBox = blocks
      ?.map(block => {
        const transformedPoints = block.blockCornerPoints.map(p => {
          const x = (p.x / pixelRatio) * scale - offsetX;
          const y = (p.y / pixelRatio) * scale - offsetY;
          return {x, y};
        });

        const ys = transformedPoints.map(p => p.y);
        const topY = Math.min(...ys); // Stable & works for top-down scan

        const xs = transformedPoints.map(p => p.x);
        const blockRect: ScreenRect = {
          left: Math.min(...xs),
          right: Math.max(...xs),
          top: Math.min(...ys),
          bottom: Math.max(...ys),
        };

        const isOverlap =
          blockRect.right > scanBoxLayout.x &&
          blockRect.left < scanBoxLayout.x + scanBoxLayout.width &&
          blockRect.bottom > scanBoxLayout.y &&
          blockRect.top < scanBoxLayout.y + scanBoxLayout.height;

        return isOverlap ? {block, top: topY} : null;
      })
      .filter((item): item is {block: BlocksData; top: number} => item !== null)
      .sort((a, b) => a.top - b.top)
      .map(item => item.block);
    return blocksInScanBox;
  }
}

type ScreenRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

interface Point {
  x: number;
  y: number;
}

interface Block {
  blockText: string;
  blockCornerPoints: Point[];
}

export const appUtils = new AppUtils();
