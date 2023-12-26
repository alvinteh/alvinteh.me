interface Place {
  name: string;
  cuisine: string;
  price: number;
  position: google.maps.LatLngLiteral;
}

export type { Place };