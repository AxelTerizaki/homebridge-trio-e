import { CharacteristicValue, Service } from 'homebridge';
import { TrioEPlatform } from '../platform';
import API from '../api';

export const register = (service: Service, platform: TrioEPlatform) => {
  const api = new API(
    1,
    platform.config.ip,
    platform.config.secure ? 'https' : 'http',
  );

  service.setCharacteristic(platform.Characteristic.Name, 'Popup');

  service
    .getCharacteristic(platform.Characteristic.On)
    .onGet(async () => {
      const res = await api.getPopup();
      return res.state === 1;
    })
    .onSet((value: CharacteristicValue) => api.postPopup(value as boolean));
};