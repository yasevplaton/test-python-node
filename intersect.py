import sys
import geopandas as gpd

# receive data as system arguments
inputLayerPath = sys.argv[1]
maskPath = sys.argv[2]

def intersectData(inputLayerPath, maskPath):

  # read vector data
  inputLayer = gpd.read_file(inputLayerPath)
  mask = gpd.read_file(maskPath)

  # project data to cartesian CRS (in our case we use Web-Mercator EPSG 3857)
  inputLayer3857 = inputLayer.to_crs(epsg=3857)
  mask3857 = mask.to_crs(epsg=3857)

  # clip data
  output = gpd.clip(inputLayer3857, mask3857, keep_geom_type=True)

  # calculate areas of received polygons
  output["area-3857"] = output["geometry"].area

  # project data to initial projection WGS-84
  output = output.to_crs(epsg=4326)

  # convert data to json
  return output.to_json(ensure_ascii=False)

# send data to the child process of node.js
print(intersectData(inputLayerPath, maskPath))