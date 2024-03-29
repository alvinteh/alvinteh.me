interface Place {
  id?: string;
  name: string;
  cuisine: string;
  price: number;
  position: google.maps.LatLngLiteral;
}

export type { Place };