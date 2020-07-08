# rockerApp
React Native application with a simple form
React Native application built with npx in order to speed up the process of programing the application.
Simple custom form combined with Redux, AsyncStorage and validation: 
  - Social security number
  - Phone number
  - Email address
  - Country
  - Submit button

Also fetching an API from https://restcountries.eu/ where the countries are displayed in a dropbox

FUNCTIONALITY
These following points are included: 

- The social security number needs to be a valid Swedish SSN (see https://en.wikipedia.org/wiki/Personal_identity_number_(Sweden)​)
- The phone number needs to be a valid Swedish phone number (see https://en.wikipedia.org/wiki/Telephone_numbers_in_Sweden​)
- The email address needs to be valid
- The countries needs to be displayed as a drop down box
- All fields are mandatory
- Validation errors need to be displayed in some way if the input data is wrong.
- The Submit button needs to log "Success" to the console when clicked if, and only if,
  all fields are valid.
- The input fields need to persist their values upon refresh, e.g. by using local storage,
  so that their data is still there if the user refreshes the page.
- Local storage needs to be emptied upon a successful Submit so that if the page is
  refreshed will display empty fields.
  
TODO's: 

- The parent component "User" is really code heavy and needs to be organised in a better way for it to be more readable. Refactoring is needed. 
