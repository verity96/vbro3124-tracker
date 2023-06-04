# vbro3124-tracker - Web App Prototype
## Verity Brown - vbro3124

## Application Configuration and Deployment Procedures
Use npm install to download the following dependencies:
- Express<br/>
The app server will be running on port 8881 for localhost if using __npm run start__ to run the code.<br/>

- Parcel<br/>
Parcel is needed to support SASS. You can also use __npm run dev__ to run the code.<br/>

- SASS<br/>
Download for access to Sass style sheets.<br/>

### Screen Dimensions
The application is viewable and responsive for mobile and desktop screens with a width of 320px up to 2560px.

## Stage 1 - Home Page (HTML and SASS)
The HTML file was developed first based off of the mockups from Assessment 2. The design was kept as close to the original mockups as possible with some minor changes to adjust for time constraints. I found it relatively easy to set up the HTML file. By using column classes similar to Bootstrap classes, I was able to quickly set up the structure of the header and split page content into two columns. This method was used to make the page responsive and did not take long to implement. However, my first challenge arose when I tried to set up the 'Category' buttons into a grid. The CSS column classes were not working as I had hoped so I used an online CSS grid generator (Layoutit!) to assist with the code. The grid also worked well when adjusting the buttons to work with the responsive design.<br/>
Styling was implemented using SASS. The SASS pages were split into the categories layout, buttons, typography and main. This was to make the code easier to access when deveolping keeping common elements together. The external SASS pages are all imported into the main page where the code is run.

## Stage 2 - 