import { ProfileErrorCode } from './index';

export default {
  [ProfileErrorCode.IsAlreadyUnavailable]: "Profile '%code%' is already in the unavailable state",
  [ProfileErrorCode.IsAlreadyAvailable]: "Profile '%code%' is already in the available state",
  [ProfileErrorCode.IsInactive]: "Profile '%code%' is unavailable",
  [ProfileErrorCode.ByCodeAlreadyExist]: "Profile '%code%' already exist",
  [ProfileErrorCode.ByCodeDoesNotExist]: "Profile '%code%' does not exist",
  [ProfileErrorCode.DoesNotExist]: 'Does not exist',
};
