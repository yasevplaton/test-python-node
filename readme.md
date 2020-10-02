# Test python-node task for citorus
by Platon Yasev

First of all you have to install [the last stable version of Node.js & NPM](https://nodejs.org/en/download/current/) and [Anaconda](https://www.anaconda.com/products/individual). I've used Node 12.16.0, npm 6.13.4, conda 4.8.3, python 3.8.3.

Then copy the project and go to the folder
```sh
$ git clone https://github.com/yasevplaton/citorus-test-python.git
$ cd citorus-test-python
```

Install all depenencies for Node.js
```sh
$ npm i
```

Create **citorus-test-env** conda environment and install all dependencies for python
```sh
$ conda create --name citorus-test-env --file requirements.txt
```

Start up the server on http://localhost:3000/
```sh
$ node server.js
```

Use simple web-server for frontend testing. I've used ["Live Server" VSCode extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). You can use it also or install simple http-server and start it in another bash console.
```sh
$ npm install http-server -g
$ http-server
```

> Your web-server will start on some port (you can find the port number in the console). Go to the address in your browser (I've tested this only in Google Chrome). You will see a simple map with initial layers and button 'Clip data'. Click the button and the output intersection layer will appear in a few seconds. You can click on each polygon and find out its area in square meters calculated in Web-Mercator (EPSG 3857) projection.