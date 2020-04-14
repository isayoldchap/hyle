import { getDevicePlatform } from '../get-device-platform/get-device-platform';
import { DEVICE_PLATFORMS } from '../../constants/device-platforms';

export const getIsMobile = () => {
  return getDevicePlatform() !== DEVICE_PLATFORMS.DESKTOP;
};
