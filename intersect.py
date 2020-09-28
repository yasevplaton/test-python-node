# Для корректной работы скрипта вне QGIS необходимо добавить следующие переменные окружения
# 
# export PATH="/Applications/QGIS3.10.app/Contents/MacOS/bin:$PATH"
# export PYQGIS_STARTUP=/Applications/QGIS3.10.app/Contents/Resources/python/pyqgis-startup.py
# export PYTHONHOME=/Applications/QGIS3.10.app/Contents/Frameworks/Python.framework/Versions/Current
# export PYTHONPATH=/Applications/QGIS3.10.app/Contents/Resources/python:${PYTHONPATH}
# export QGIS_PREFIX_PATH=/Applications/QGIS3.10.app/Contents/MacOS
# export GDAL_DRIVER_PATH=/Applications/QGIS3.10.app/Contents/Resources/gdal/gdalplugins
# export GDAL_DATA=/Applications/QGIS3.10.app/Contents/Resources/gdal
# export QT_QPA_PLATFORM_PLUGIN_PATH=/Applications/QGIS3.10.app/Contents/PlugIns

import sys
import os
from qgis.core import *
from qgis import processing

# main routine
def main():
  qgs = QgsApplication([], False)
  QgsApplication.setPrefixPath("/Applications/QGIS3.10.app/Contents/MacOS", True)
  qgs.initQgis()
  vydels = QgsVectorLayer('/Users/yasevplaton/work/citorus-test/vydels3857.geojson', 'vydels', 'ogr')
  mask = QgsVectorLayer('/Users/yasevplaton/work/citorus-test/geoCategories3857.geojson', 'mask', 'ogr')

  del vydels, mask

  # в данный момент скрипт отваливается на этом моменте, пишет
  # AttributeError: module 'qgis.processing' has no attribute 'run'
  result = processing.run("native:clip", {'INPUT': vydels, 'OVERLAY': mask, 'OUTPUT': 'memory:'})
  qgs.exitQgis()


# main
if __name__ == '__main__':
  main()