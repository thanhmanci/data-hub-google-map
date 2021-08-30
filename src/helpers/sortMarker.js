const LABELS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export function sortMarker(markers) {
  return sortByDistance(markers).map((m, i) => {
    m.isNormalMarker ? m.alias = '?' : m.alias = LABELS[i];
    return m;
  });
}

function sortByDistance(markers) {
  return markers.sort((a, b) => {
    if (a.distance < b.distance) {
      return -1;
    }
    if (a.distance > b.distance) {
      return 1;
    }
    return 0;
  });
}
