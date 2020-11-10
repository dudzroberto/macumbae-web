import L from 'leaflet';

import marker from '../../assets/marker.svg';
import initial from '../../assets/initial.svg';
import disabled from '../../assets/disabled.svg';
import shadow from '../../assets/shadow.png';

const iconMarker = L.icon({
  iconUrl: marker,
  iconSize: [30, 54],
  iconAnchor: [15, 49],
  shadowUrl: shadow,
  shadowSize: [50, 54],
  shadowAnchor: [14, 45],
});

const iconLocal = L.icon({
  iconUrl: initial,
  iconSize: [30, 54],
  iconAnchor: [15, 49],
  popupAnchor: [-0, -55],
  shadowUrl: shadow,
  shadowSize: [50, 54],
  shadowAnchor: [14, 45],
});

const iconDisabled = L.icon({
  iconUrl: disabled,
  iconSize: [30, 54],
  iconAnchor: [15, 49],
  popupAnchor: [-0, -55],
  shadowUrl: shadow,
  shadowSize: [50, 54],
  shadowAnchor: [14, 45],
});

export { iconMarker, iconLocal, iconDisabled };
