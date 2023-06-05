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
<br/>

## Stages of Development
### Stage 1 - Backend Setup
The project was started by cloning a Github repository to VS Code. This allowed me to track the history of the development and keep a record of the code through commits. This was helpful later on as I had a habit of breaking my code, so having the repository allowed me to take the code back to the last working version so I could try again.<br/>
Node.js was installed to set up the backend and to get NPM to install dependencies. Express was installed to provide a quick and easy way to build the web application by providing a broad range of features. Parcel was installed to make the development process faster and more efficient by avoiding constantly rerunning the code, and SASS was installed to leverage additional features for CSS to speed up development.

### Stage 2 - Home Page (HTML and CSS)
The HTML file was first developed based on the mockups from Assessment 2. The design was kept as close to the original mockups as possible with some minor changes to adjust for time constraints. I found it relatively easy to set up the HTML file. Using column classes similar to Bootstrap classes, I quickly set up the structure of the header and split the page content into two columns. This method was used to make the page responsive and did not take long to implement. However, my first challenge arose when I tried to set up the 'Category' buttons into a grid. The CSS column classes were not working as I had hoped so I used an online CSS grid generator (Layoutit!) to assist with the code. The grid also worked well when adjusting the buttons to work with the responsive design. The wardrobe content was left blank to later be dynamically populated using JavaScript. I created all the logos and image assets using Adobe Illustrator and then saved the .svg files in the Images file in the public folder. <br/>
Styling was implemented using SASS. The SASS pages were split into the category's layout, buttons, typography, and main. This was to make the code easier to access when developing keeping common elements together. The external SASS pages are all imported into the main page where the code is run.

### Stage 3 - Modal (HTML, CSS and JS)
For assistance with building the modal, I found a YouTube tutorial to give me some guidance. (REFERENCE!!!) I then altered the code to make it suit the needs of the application by adding buttons and a header, body section, and styling. The modal used a combination of HTML, CSS and JS to show and hide the element using an eventListener that would activate the modal for each of the Category buttons clicked. Initially the modal was only hard coded and connected to one button to progress with JavaScript coding as the categories had not been setup yet. 

### Stage 4 - Setting up Garment Object and Array (JS)
Following along with the Scrimba tutorials from weeks 3 and 4, I was able to set up the function for adding an item/garment to the array by using the eventListener on the submit button from the form and then to display the item back to the user. With this guidance the code ran smoothly and I did not have any problems with functionality. The cards were styled with classes added to the innerHTML. I altered the functions to take in the fields that I had specified in my data model from the previous assessment. I added another version of the display function to show the items in the wardrobe as well as the modal as I was struggling to use the same function to show the items in two separate locations. While using two separate functions worked, the code was consolidated into a single function later in the process to avoid bad practices in repeating the same code over again as both functions were outputting the same innerHTML. A third display function was also added to dynamically insert the HTML content for a page that shows all the item details once the tiles are clicked on. The delete button was appended to this page instead of the initial list display. 

### Stage 5 - Star Rating and Task Management (HTML and CSS)
Styling for the form elements was implemented to tidy the design. This was when the star ratings were changed from regular inputs to the star symbol with hover effects. This task proved to be quite challenging. I wanted to change the inputs using just HTML and CSS. After looking and testing multiple solutions online, none of them worked and the closest I got was getting the elements to highlight in reverse. After taking a break and coming back to the problem, I was able to easily sort it out with the CSS 'flex-direction: row-reverse;' property.<br/>
At this stage, I had a fair amount of code and a lot of tasks left to complete in a short space of time. To help manage my time better, I installed the Todo Tree extension (REFERENCE!!!) for VS Code. This allowed me to easily flag all of the todo comments in my code and track what tasks I still had to complete.

### Stage 6 - Local Storage (JS)
After some initial confusion with my own research on how to implement local storage, I found the Scrimba tutorial and it was easy to implement. I found it was easy to add, delete and retrieve all items from local storage, but I struggled to understand how to pull the individual items by their id's. I eventually figured out that you had to use a comparison statement to compare the current item that was being created or clicked on, with the ids of items in local storage and then display them if they matched. 

### Stage 7 - Showing/Hiding Elements (CSS and JS)
After reviewing the resources from the week 13 module, I was able to proceed with showing and hiding elements, starting with the 'Success' message that shows up above the list of items after submitting the form. I found it easy to follow the code example to get the element showing and hiding with the submit event. I did however find it challenging to figure out how to hide the element when closing the modal. This was eventually solved by adding the hidden class back to the successfulAdd div in the closeBtn event listener. After all the elements were showing and hiding correctly, I was able to adjust all of the CSS for the responsive design to clean up the visual appearance of the app. <br/>
After local storage was implemented, I had some issues with getting all the separate display functions to work. I eventually figured out a way to pull through the ID for a single item of the local storage using a for loop and if statement. However, I soon realised that this solution had a bug where it would pull the id and details for the first item, but every time the screen was exited and clicked on again, it would then pull the ids for all the items in local storage. This issue was solved by creating a separate function (generateGarmentItem) to create the card and setting its data-id to the object id from local storage. This item with its id was then used to compare it against the id pulled from local storage to then display the corresponding values. 

### Stage 8 - Wear Count Incrementing Function (JS)
A basic button click incrementor function was added to increment the wear count on an item. This initial version caused all the 'Add Wear' buttons to only increment the first item as I was unsure of how to pull through and compare the ID for each item. In the process of figuring out how to get elements to show and hide based on click event listeners, I had finally figured out how to make the item cards clickable but lost the ability to click on the 'Add Wear' button. To solve this the code was moved into the generateGarmentItems function to append a newly created button element as the card was being created with innerHTML. The original incrementing function was changed into an event listener in order to compare the ids and increment the wear count to then store it with the object in the local storage array. 

### Stage 9 - Adding Categories (HTML and JS)
The last bit of functionality to be added to the app was for the categories. This involved pulling through the name of each of the category buttons to be stored with the object when created and to display the items with the corresponding category in the modal. I was unsure of the processes I should follow in order to achieve this and tried to research for hints on how to structure this functionality. Unfortunately, the internet did not provide me any reasonable feedback. As a result, I joined the workshops run by the tutors to gain advice. This functionality was achieved by adding data attributes to each of the buttons in the HTML to store the category names. A hidden form input element was also added to the HTML to take in the category when adding the object to the array. The displayGarmentsInCategory function then compares the stored items with the current category being pulled through when each button is clicked. The function will then display the items with the matching category to the button that triggered the event listener. As the data category is pulled through to the modal when the event listener on the category button is triggered, it is also stored against the form for adding new items.

### Stage 10 - Final Debugging
For this last stage, the main elements of the code were all functional but I was still having trouble with certain elements showing and hiding properly when different event listeners were triggered. I also found that performing the actions in different orders also revealed odd behaviour that affected the user experience. For example, when clicking on a category button, then on the 'Add Item' button to open the form, I found that by pressing 'X' on the modal and selecting a different category kept the form active. However, when the new item was added it was added to the previous category clicked. To resolve all these issues, I had to add the appropriate functions and classes to elements on the click event listeners to make sure that the categories being pulled through were correct and to make sure the user experience was seamless and less confusing.
<br/>

## References