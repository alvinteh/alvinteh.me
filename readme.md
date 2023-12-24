# alvinteh.me

v2 of my personal website, hosted at [https://alvinteh.me](https://alvinteh.me).

## Prerequisites

* [node](https://nodejs.org/en/) 20.10.0+
* [Google Maps](https://developers.google.com/maps) API Key (see [guide](https://developers.google.com/maps/get-started) on obtaining it)
* (If deploying outside localhost) Paid [GSAP](https://gsap.com) plugin. The Plus version suffices.

## Get Started

1. Clone this repository.
2. Install the node dependencies by running `npm install`.
3. Create a `.env` file in the project root folder, and add the following configuration line:
  
  ```
  VITE_GOOGLE_MAPS_API_KEY = XXX
  ```

  Replace XXX with your Google Maps API key.

4. This project uses [paid version of GSAP](https://gsap.com/pricing/), follow the steps in the GSAP documentation to install configure your npm profile to be able to connect to the private repository. If you are only working on the files locally and prefer not to purchase GSAP, you can use the trial version of the plugin by updating the `gsap` package's reference to the private repository from `npm:@gsap/simply` to `npm:gsap-trial` in `package.json`.
5. Run `npm run dev` to run the website locally for development/testing.
6. Run `npm run build` to build the website for production, followed by `npm run preview` to test the aforementioned build locally.

## Remarks

This package uses [Vite](https://vitejs.dev/). It also provides a `lint` command to ensure code means style and quality guidelines.