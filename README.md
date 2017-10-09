# New Collar Jobs

## Quick start
**Make sure you have Maven and Java 1.7 or greater**
**Make sure you also have NPM , Node and angular-cli globally installed**
```bash
# clone the repo
git clone https://github.com/syed-imran-ahmed/CMPE295-New-Collar-Jobs.git

# change directory to the repo's frontend folder
cd CMPE295-New-Collar-Jobs/frontend

# install the frontend dependencies with npm
# npm install @angular/cli -g
npm install

# start the frontend app
npm start

# change directory to the repo's backend folder
cd ../server

# install the server dependencies with mvn
mvn install

# start the backend server
mvn spring-boot:run

# the fronend angular app will be running on port 4200
# the spring-boot server will be running on port 8080
```