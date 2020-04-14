import { DEVICE_PLATFORMS } from '../../constants/device-platforms';

const navigator = global && global.window && global.window.navigator ? global.window.navigator : {};

export const getDevicePlatform = () => {
  if (!navigator || !navigator.platform) return null;

  const { platform, maxTouchPoints = 0 } = navigator;

  if (platform.includes(DEVICE_PLATFORMS.IPHONE)) return DEVICE_PLATFORMS.IPHONE;
  // Since iOS 13 on iPads, the default iOS Safari setting "Request Desktop Website" is set to
  // "All Websites".  This setting makes the iOS Safari browser on iPads emulate a desktop browser.
  // To combat this, we check to see if the "maxTouchPoints" field is greater than one.  A desktop
  // machine will not have more than one touch points, so we assume anything with more than one
  // is an iPad.
  if (platform.includes(DEVICE_PLATFORMS.IPAD) || maxTouchPoints > 1) return DEVICE_PLATFORMS.IPAD;

  return DEVICE_PLATFORMS.DESKTOP;
};
