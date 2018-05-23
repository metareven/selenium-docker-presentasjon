# selenium-docker-presentasjon
Presentation about using docker to make your own private cloud of selenium nodes

How to run:
- Install node
- npm install
- Install docker
- docker-compose up -d
- open monitoring.html and verify that you have multiple vnc-connections, all showing the ubuntu logo (might have to wait a few seconds for it to initialize properly... also ignore the poor styling)
- node selenium.js
- Watch the test run in the different browsers
- ????
- profit

TODOS: 
- Dynamically generate webpage based on number of docker-containers / make web application that calls docker ps and returns the iframes you want
- Learn how to CSS properly when using transforms
- Style the example html-webpage more properly (But I refuse to style the contents of the iframe Erling!)
