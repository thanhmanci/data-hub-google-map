export function iconMarkerStyle(markers, markerIndex) {
  const marker = markers[markerIndex];
  return marker.isNormalMarker ? null : {
    url: require('./../assets/circle-bg.svg'),
    scaledSize: { width: 35, height: 35, f: "px", b: "px" }
  };
}

export function labelMarkerStyle(markers, markerIndex) {
  const marker = markers[markerIndex];
  return marker.isNormalMarker ? null : {
    text: marker.alias,
    color: "white",
    fontWeight: "bold"
  };
}
