import {Camera} from 'react-native-vision-camera';
import Reanimated from 'react-native-reanimated';
/**
 * An animated version of the `Camera` component, created using Reanimated's `createAnimatedComponent`.
 *
 * This component allows you to animate properties of the `Camera` component using Reanimated's animation system.
 *
 * @see {@link https://docs.swmansion.com/react-native-reanimated/} for more information about Reanimated.
 * @see {@link https://reactnative.dev/docs/camera} for more information about the Camera component.
 *
 * @example
 * ```tsx
 * <ReanimatedCamera
 *   style={animatedStyle}
 *   {...cameraProps}
 * />
 * ```
 */
export const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
