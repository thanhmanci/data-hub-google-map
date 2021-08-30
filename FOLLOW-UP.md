### Author: Kato Ma 

### Goal Achieved: 
###     -  Implement the single-page design.
###     -  Fetch hub data from the provided `hubs.json` and format them into client readable results in the design.
###     -  Use the returned data to display on the map widget as map markers and in the list of "Hubs Near You".
###     -  Map markers should be labeled with "A", "B", "C", and so forth based on their order within the list.
###     -  Allow user to select and unselect the map marker or hub.
###     -  Use GPS web functionality to identify the user's location, the map widget should automatically centralize based on the position of the detected location.
###     -  Allow user to know the nearest hub (map markers) by ordering them by nearest to furthest in the list.
###     -  Hub data is loaded only once

==========================================================================================================================

### Q&A: 

### Q) What libraries did you add to the frontend? What are they used for?
### A) =>  - I using vue2-google-maps to ember google map on my app and call some api on google flatform.
###         - I using vue to coding vue app, vue-router to configuration component-based router

### Q) What's the command to start the application locally?
### A) =>  To run this app, the first you need add `GOOGLE_API_KEY` in `config/dev.env.js` after that you need run `npm install` and then to start app you need run `npm run dev`

### Q) If you had more time, what further improvements or new features would you add?
### A) If I have more time, I wanna do:
###     - Show the direction of user to nearest hub
###     - Show the street view of the hub when user click on the marker

### Q) Which parts are you most proud of? And why?
### A) Although time is limited however I add more some features: 
###     - Caching data hub to improve performance load marker from hub
###     - With the requirement in the test, i almost finish all features and add more features in the short time
    

### Q) Which parts did you spend the most time with? What did you find most difficult?
### A) =>  I spend time for initialize google flatform service and research it, because i never use google flatform before. Beside I have no credit card, so I must be borrow the credit card from another person.

### Q) How did you find the test overall? Did you have any issues or have difficulties completing? If you have any suggestions on how we can improve the test, we'd love to hear them.
### A) =>  I appreciate the interview test very well.
###        I had some little difficulty on this project, but I got over it. 
###        I think you need provide some service related google, aws ...
           