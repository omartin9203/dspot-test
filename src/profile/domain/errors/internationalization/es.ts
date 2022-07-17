import { ProfileErrorCode } from './index';

export default {
  [ProfileErrorCode.IsAlreadyUnavailable]: "El Profile '%code%' ya esta en estado no disponible",
  [ProfileErrorCode.IsAlreadyAvailable]: "El Profile '%code%' ya esta en estado disponible",
  [ProfileErrorCode.IsInactive]: "El Profile '%code%' esta inactivo",
  [ProfileErrorCode.ByCodeAlreadyExist]: "El Profile '%code%' ya existe",
  [ProfileErrorCode.ByCodeDoesNotExist]: "El Profile '%code%' no existe",
  [ProfileErrorCode.DoesNotExist]: 'No existe ningun elemento con esos requisitos de busqueda',
  [ProfileErrorCode.FriendRelationshipAlreadyExist]: "El Profile '%id1%' y el '%id2%' ya son amigos",
};
