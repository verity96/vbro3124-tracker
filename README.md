# vbro3124-tracker - Web App Prototype
### Verity Brown - vbro3124

## Application Configuration and Deployment Procedures
Use npm install to download the following dependencies:
- Express<br/>
The app server will be running on port 8881 for localhost if using __npm run start__ to run the code.<br/>

- Parcel<br/>
Parcel is needed to support SASS. You can also use __npm run dev__ to run the code.<br/>

- SASS<br/>
Download for access to Sass style sheets.<br/>

### Screen Dimensions
The application is viewable and responsive for mobile and desktop screens with a minimum width of 320px and a maximum width of up to 2560px.

## Stage 1 - Backend Setup
The project was started by cloning a Github repository to VS Code. This allowed me to track the history of the development and keep a record of the code through commits. This was helpful later on as I had a habit of breaking my code, so having the repository allowed me to take the code back to the last working version so I could try again.<br/>
Node.js was installed to set up the backend and to get NPM to install dependencies. Express was installed to provide a quick and easy way to build the web application by providing a braod range of features. Parcel was installed to make the development process faster and more efficient and SASS was installed to leverage additional features for CSS to speed up development.

## Stage 2 - Home Page (HTML and SASS)
The HTML file was developed first based off of the mockups from Assessment 2. The design was kept as close to the original mockups as possible with some minor changes to adjust for time constraints. I found it relatively easy to set up the HTML file. By using column classes similar to Bootstrap classes, I was able to quickly set up the structure of the header and split page content into two columns. This method was used to make the page responsive and did not take long to implement. However, my first challenge arose when I tried to set up the 'Category' buttons into a grid. The CSS column classes were not working as I had hoped so I used an online CSS grid generator (Layoutit!) to assist with the code. The grid also worked well when adjusting the buttons to work with the responsive design. The wardrobe content was left blank to later be dynamically populated using JavaScript. I created all the logos and image assests uisng Adobe Illustrator and then saving the .svg files in the Images file in the public folder. <br/>
Styling was implemented using SASS. The SASS pages were split into the categories layout, buttons, typography and main. This was to make the code easier to access when developing keeping common elements together. The external SASS pages are all imported into the main page where the code is run.

## Stage 3 - Modal (HTML, SASS and JS)
For assistance with building the modal, I found a Youtube tutorial to give me some guidance. (REFERENCE!!!) I then altered the code to make it suit the needs of the application by adding buttons and a header, body section, and styling. The modal used a combination of HTML, CSS and JS to show and hide the element using an eventListener that would activate the modal for each of the Category buttons clicked. Initially the modal was only hard coded and connected to one button to progress with JavaScript coding as the categories had not been setup yet. 

## Stage 4 - Setting up Garment Object and Array (JS)
Following along with the Scrimba tutorials from weeks 3 and 4, I was able to set up the function for adding an item/garment to the array by using the eventListener on the submit button from the form and then to display the item back to the user. With this guidance the code ran smoothly and I did not have any problems with functionality. The cards were styled with classes added to the innerHTML. I altered the functions to take in the fields that I had specified in my data model from the previous assessment. I initially added the another version of the displaying fuction to show the items in the wardrobe as well as the modal as I was stuggling to use the same function to show the items in two separate locations. While using two separate functions worked, the code was consolidated later in the process to avoid bad practices in repeating the same code over again as both functions were outputing the same innerHTML. A third display function was also added to dynamically inset the HTML content for a page that shows all the item details once the tiles are clicked on. The delete button was appended to this page instead of the initial list display. A basic button click wear counter function was added to increment the wear count on an item. Initially this only worked on one item as I was unsure of how to pull through and compare the ID for each item.

## Stage 5 - Star Rating and Task Management (HTML and CSS)
Styling for the form elements was implemented to tidy the design. This was when the star ratings were changed from regular inputs to the star symbol with hover effects. This task proved to be quite challenging. I wanted to change the inputs using just HTML and CSS. After looking and testing multiple solutions online, none of them worked and the closest I got was getting the elements to highlight in reverse. After taking a break and coming back to the problem, I was able to easily sort it out with the CSS 'flex-direction: row-reverse;' property.<br/>
At this stage I had a fair amount of code and a lot of tasks left to complete in a short space of time. To help manage my time better, I installed the Todo Tree extension (REFERENCE!!!) for VS Code. This allowed me to easily flag all of the todo comments in my code and track what tasks I still had to complete.

## Stage 6 - Responsive Design and Showing/Hiding Elements (CSS and JS)
TBC...