interface Album {
  id: string;
  name: string;
  imageCount: number;
}

interface Image {
  caption: string;
  src: string;
  aspectRatio: number;
  albumName: string;
  isAlbumCover: boolean;
}

export type { Album, Image };