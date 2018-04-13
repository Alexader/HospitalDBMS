# HospitalDBMS
A database manage system for hospital which is using node and express for constructing interface and backend.
1. first step:clone this repo into your local repo
    ```sh
    git clone git@github.com:Alexader/HospitalDBMS.git
    cd HospitalDBMS
    ```
    then you should install some dependecies for the project
    ```sh
    npm install
    ```
    be sure you have [Node](https://nodejs.org/en/) installed.

2. second step: debug and inspect  your code
  to get to inspect code, you should install node-inspector
    ```sh
    npm install node-inspector -g
    ```
    then you should inspect your app to detect your change in the code
    ```sh
    node --inspect ./bin/www
    ```
    if yo just want to start the project and see the effect, run the code below in your terminal
    ```sh
    npm start
    ```
If everything goes well, you can see the result in your web browser in http://localhost:3000
