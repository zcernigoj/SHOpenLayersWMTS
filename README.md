# Sentinel hub OpenLayers WMTS example

## Usage

To use this example, you need to follow these steps:

1. open this directory in terminal
2. run `npm install`
3. open `main.js` and:
    - change the value of `MY_INSTANCE_ID` with your own Sentinel hub instance id
    - change the value of `MY_LAYER_ID` with the id of one of the layers in that Sentinel hub instance
4. run `npm run start` in the terminal
5. open `http://localhost:1234/` in the browser

If everything went ok, it should look like this:

![Example](example.png)

## Modifications

Extended `WMTS` class, so that the `time` and `evalscript` parameters are set to the url for each tile.

## Resources
Sorted by relevance. Some may be missing.

### OpenLayers
- https://openlayers.org/en/latest/apidoc/module-ol_source_WMTS-WMTS.html
- https://openlayers.org/en/latest/examples/reusable-source.html
- https://openlayers.org/en/latest/examples/wmts.html
- https://gis.stackexchange.com/questions/299554/openlayers-refresh-wmts-tiles-when-underlying-data-changes
- https://openlayers.org/en/latest/examples/wms-time.html
- https://openlayers.org/en/latest/apidoc/module-ol_layer_Tile-TileLayer.html

### Sentinel hub
- https://www.sentinel-hub.com/develop/api/ogc/standard-parameters/wmts/
- https://www.sentinel-hub.com/develop/api/ogc/custom-parameters/
- https://apps.sentinel-hub.com/dashboard/#/configurations/
