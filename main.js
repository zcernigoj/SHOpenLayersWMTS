import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import {get as getProjection} from 'ol/proj';
import {getTopLeft, getWidth} from 'ol/extent';

const projection = getProjection('EPSG:3857');
const projectionExtent = projection.getExtent();
const size = getWidth(projectionExtent) / 256;
const resolutions = new Array(14);
const matrixIds = new Array(14);
for (let z = 0; z < 14; ++z) {
  // generate resolutions and matrixIds arrays for this WMTS
  resolutions[z] = size / Math.pow(2, z);
  matrixIds[z] = z;
}

class shWMTSClass extends WMTS {
  constructor(options) {
    super(options);
    console.log('shWMTSClass', {options});
    const { evalscript, time } = options;
    this.evalscript = evalscript;
    this.time = time;
  }

  tileLoadFunction = (imageTile, src) => {
    let newSrc = src;
    if(this.evalscript){
      newSrc = newSrc + '&evalscript=' + btoa(this.evalscript);
    }
    if (this.time) {
      newSrc = newSrc + '&time=' + this.time;
    }
    imageTile.getImage().src = newSrc;
  }

  setEvalscript(evalscript){
    this.evalscript = evalscript;
    this.refresh();
  }

  setTime(time) {
    this.evalscript = time;
    this.refresh();
  }
}

const MY_INSTANCE_ID = '<MY-INSTANCE-ID>';
const shWMTSconfig = new shWMTSClass({
  attributions: 'Sentinel hub',
  url: 'https://services.sentinel-hub.com/ogc/wmts/' + MY_INSTANCE_ID,
  layer: 'TRUE-COLOR',
  matrixSet: 'PopularWebMercator256',
  format: 'image/png',
  projection: projection,
  tileGrid: new WMTSTileGrid({
    origin: getTopLeft(projectionExtent),
    resolutions: resolutions,
    matrixIds: matrixIds,
  }),
  style: 'default',
  wrapX: true,
  time: '2020-10-27/2020-10-27',
});

const map = new Map({
  layers: [
    new TileLayer({source: new OSM(),opacity: 0.7,}),
    new TileLayer({source: shWMTSconfig})
  ],
  target: 'map',
  view: new View({
    center: [1391493.63, 5146011.68],
    zoom: 10,
  }),
});


document.getElementById("changeEvalBtn").onclick = function () {
  console.log('changeEvalBtn pressed');
  const newEvalScript = document.getElementById("scriptArea").value;
  shWMTSconfig.setEvalscript(newEvalScript);
}

document.getElementById("changeDatesBtn").onclick = function () {
  console.log('changeDatesBtn pressed');
  const newFromDate = document.getElementById("fromDate").value;
  const newToDate = document.getElementById("toDate").value;

  if (!newFromDate || !newToDate) {
    alert("Please set both dates")
    return;
  }

  if(newFromDate > newToDate){
    alert("'from' date needs to be before 'to' date");
    return;
  }

  shWMTSconfig.setTime(newFromDate + '/' + newToDate);
}