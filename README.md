# Questioner  [![Build Status](https://travis-ci.org/Inclet/questioner.svg?branch=develop)](https://travis-ci.org/Inclet/questioner)

Crowd-source questions for a meetup. **Questioner** helps the meetup organizer to prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.

## UI
you can find UI of questioner on [github pages](https://inclet.github.io/questioner/)



## API ENDPOINTS
  * **GET /api/v1/meetups**     *Fetch All Meetup Records*
  * **GET /api/v1/meetups/:id**     *Fetch a Specific Meetup Record*
  * **GET /api/v1/meetup/upcoming**    *Fetch All Upcoming Meetups Records*
 
  * **PATCH /api/v1/questions/:id/upvote** *Upvote (Increases Votes by 1) a specific question*
  * **PATCH /api/v1/questions/:id/downvote** *Downvote (Decreases Votes by 1) a specific question*
  
  * **POST /api/v1/meetups/:id/rsvps** *Respond to meetup RSVP*
  * **POST /api/v1/meetups**     *Create a Meetup Record*
  * **POST /api/v1/questions**   *Create a Question For a Specific Meetup*

## Tools Used
  * Server Side Framework: **Node/Express JS**
  * Linting Library: **ESlint**
  * Style Guide: **Airbnb**
  * Testing Framework: **Mocha** with **Chai**


## More Tools
  * Deployment: **Heroku**
  * Language: **Javascript ES6**
  * Continuous integration: **Travis CI**
  * Test Coverage: **nyc**
  * Git Badge: **coveralls**


## APP
  * For accessing the app on heroku use this [link](https://meetup-questioner.herokuapp.com)

## App Routes on Heroku:
  * *Fetch All Meetup Records* [meetup-questioner.herokuapp.com/api/v1/meetups](https://meetup-questioner.herokuapp.com/api/v1/meetups)
  * *Fetch a Specific Meetup Record* [meetup-questioner.herokuapp.com/api/v1/meetups/1](https://meetup-questioner.herokuapp.com/api/v1/meetups/1)
  * *Fetch All Upcoming Meetups Records* [meetup-questioner.herokuapp.com/api/v1/meetups/upcoming](https://meetup-questioner.herokuapp.com/api/v1/meetups/upcoming)
  *Upvote a specific question* [meetup-questioner.herokuapp.com/api/v1/questions/1/upvote](https://meetup-questioner.herokuapp.com/api/v1/questions/1/upvote)
  *Downvote a specific question* [meetup-questioner.herokuapp.com/api/v1/questions/1/downvote](https://meetup-questioner.herokuapp.com/api/v1/questions/1/downvote)
  * *Respond to meetup RSVP* [meetup-questioner.herokuapp.com/api/v1/meetups/1/rsvps](https://meetup-questioner.herokuapp.com/api/v1/meetups/1/rsvps)
  * *Create a Meetup Record* [meetup-questioner.herokuapp.com/api/v1/meetups](https://meetup-questioner.herokuapp.com/api/v1/meetups)
  * *Create a Question For a Specific Meetup* [meetup-questioner.herokuapp.com/api/v1/questions](https://meetup-questioner.herokuapp.com/api/v1/questions)

<img src="https://github.com/Inclet/questioner/blob/develop/build/warning.png" alt="warning" height="30" width="40"/> **For Post Method you need [postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop//%40) to test it...**


# Installation:
  1. Install [git](https://git-scm.com/downloads)
  2. Install [Node Js](https://nodejs.org/en/)
  3. After installing 1 and 2, open your git Bash and copy or type the following line:
  ```
  
  $ git clone https://github.com/Inclet/questioner.git
  
  ```
  4. To navigate to the folder where you cloned, type in:
  ```
  
  $ cd questioner
  
  ```
 
  5. To install all dependencies in package.json file type in:
  ```
 
  $ npm install
  
  ```
  
  6. To run the server:
  ```
  
  $ npm run pin
  
  ```
  
  7. To run the test :
  
  ```
  
  $ npm test
  
  ```
  
  8. to test with Eslint write eslint file_name.extension. ex: eslint index.js  :
  
  ```
  
  $ eslint index.js
  
  ```

  
  
  
  
  
