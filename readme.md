# alvinteh.me

v2 of my personal website, hosted at [https://alvinteh.me](https://alvinteh.me).

## Prerequisites

* [node](https://nodejs.org/en/) 20.10.0+
* [Google Maps](https://developers.google.com/maps) API Key and Map ID (see [guide](https://developers.google.com/maps/get-started) on obtaining it)
* Paid [Font Awesome](https://fontawesome.com/) plan. The Pro version suffices.
* (If deploying outside localhost) Paid [GSAP](https://gsap.com) plugin. The Plus version suffices.
 
## Get Started

1. Clone this repository.
2. Install the node dependencies by running `npm install`.
3. Create a `.env` file in the project root folder, and add the following configuration line:
  
  ```
  VITE_GOOGLE_MAPS_API_KEY = XXX
  VITE_GOOGLE_MAPS_MAP_ID = YYY
  ```

  Replace XXX and YYY with your Google Maps API key and Map ID respectively.

4. This project uses plugins from the [paid version of GSAP](https://gsap.com/pricing/). Follow the steps in the [GSAP documentation](https://gsap.com/docs/v3/Installation/) to configure your npm profile to connect to the private repository. If you are only working on the files locally and prefer not to purchase GSAP, you can use the trial version of the plugin by updating the `gsap` package's reference to the private repository from `npm:@gsap/simply` to `npm:gsap-trial` in `package.json`.
5. This project uses [Pro icons from Font Awesome](https://fontawesome.com/plans). Follow the steps in the Font Awesome documentation to configure your npm profile to connect to the private repository.
6. Run `npm run dev` to run the website locally for development/testing.
7. Run `npm run build` to build the website for production, followed by `npm run preview` to test the aforementioned build locally.

## Remarks

- This package uses [Vite](https://vitejs.dev/).
- It also provides a `lint` command to ensure code means style and quality guidelines.
- This package also includes a utility script `src/utils/MapDataParse.ts` that can be used to convert KML data from Google My Maps to a JSON file for use by the website. To run that script, configure `VITE_GOOGLE_MAPS_KML_URL` in the `.env` file (obtain the URL by using the "Export to KML/KMZ" feature in Google My Maps while enabling the "Keep data up to date with network link KML (only usable online)." option), and then run `npx vite-node src/utils/MapDataParser.ts`.