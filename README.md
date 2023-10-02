# Project 1: JWKS Server
This is a project for CSCE 3550
## Setup Project
- `Node.js v18.14.0` must be installed
- Run `npm install` to install all dependencies
## Run Project
Run `npm start` to start the server on `http://localhost:8080`
## Run Test
Run `npm test` to start the jest test
## Server running with the test client
![](https://github.com/gAlexander77/jwks-server/blob/main/Screenshots/Server-Running-With-Test-Client.png)
## Test Report Output
![](https://github.com/gAlexander77/jwks-server/blob/main/Screenshots/Test-Report.png)
## Test running in Terminal
![](https://github.com/gAlexander77/jwks-server/blob/main/Screenshots/Test-Terminal-Report.png)
## POST `/auth` in Postman
![](https://github.com/gAlexander77/jwks-server/blob/main/Screenshots/Postman-Post-Auth.png)
## GET `/.well-known/jwks.json` in Postman
![](https://github.com/gAlexander77/jwks-server/blob/main/Screenshots/Postman-Get-Jwks.png)
## AI Usage
In the syllabus it says it’s expected of us to use AI so I used ChatGPT to teach me how to setup Jest and had it recommend npm packages to use for converting the public key to jwks format. Because I have never used a testing framework with javascript, I asked it how to set up jest in package.json, and then it gave me some settings where I then referenced back to the jest docs to verify they were right. I was having trouble setting the public key to jwks format so I asked it for npm package recommendations. It recommended some packages so I then went to their documentations and found and verified the package functions needed for converting it jwks format then implemented it myself.