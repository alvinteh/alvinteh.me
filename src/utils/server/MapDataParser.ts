import { writeFile } from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { XMLParser } from 'fast-xml-parser';

interface KmlData {
  name: string;
  value: string | number;
}

interface KmlExtendedData {
  Data: KmlData[];
}

interface KmlPoint {
  coordinates: string;
}

interface KmlPlacemark {
  name: string;
  description: string;
  styleUrl: string;
  ExtendedData: KmlExtendedData;
  Point: KmlPoint;
}

interface Placemark {
  name: string;
  cuisine: string;
  price: number;
  position: google.maps.LatLngLiteral;
}

const main = async (mapKmlUrl: string, destinationFilePath: string): Promise<void> => {
  // Retrieve KML
  let kml = '';
  
  console.log(`Fetching map data from ${mapKmlUrl}...`);

  try {
    const response: Response = await fetch(mapKmlUrl);
    kml = await response.text();
  }
  catch (e) {
    console.error(`There was an issue fetching the URL (${(e as Error).message}).`);
    return;
  }

  // Parse KML
  console.log('Parsing map data...');
  const kmlData = (new XMLParser({ ignoreAttributes : false, attributeNamePrefix: '' })).parse(kml) as
    Record<string, unknown>;
  // We can ignore the linting errors as the elements always exist 
  // @ts-expect-error KML type is not specified
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const kmlPlacemarks: KmlPlacemark[] = kmlData.kml.Document.Placemark; 

  // Transform data
  console.log(`Transforming map data ${kmlPlacemarks.length}...`);
  const placemarks: Placemark[] = kmlPlacemarks.map((kmlPlacemark: KmlPlacemark): Placemark => {
    const [lngString, latString] = kmlPlacemark.Point.coordinates.split(',');
    const placemarkDataPoints: KmlData[] = kmlPlacemark.ExtendedData.Data;
    let cuisine = '';
    let price = 0; 

    for (const placemarkDataPoint of placemarkDataPoints) {
      if (placemarkDataPoint.name === 'cuisine') {
        cuisine = placemarkDataPoint.value as string;
      }
      else if (placemarkDataPoint.name === 'price') {
        price = placemarkDataPoint.value as number;
      }
    }

    return {
      name: kmlPlacemark.name,
      cuisine,
      price,
      position: {
        lat: Number.parseFloat(latString),
        lng: Number.parseFloat(lngString),
      },
    };
  });

  // Save data to file
  try {
    const cwd: string = dirname(fileURLToPath(import.meta.url));
    await writeFile(`${cwd}/${destinationFilePath}`, JSON.stringify(placemarks, null, 2), { flag: 'w+' });
  }
  catch (e) {
    console.error(`There was an issue saving the map data (${(e as Error).message}).`);
  }

  console.log('Done');
};

void main(import.meta.env.VITE_GOOGLE_MAPS_KML_URL as string, '../routes/Culinary/screens/map-data.json');