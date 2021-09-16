![PHOTONS](/src/media/logo.jpg)

A modern frontend-driven CRUD application to store data about contributors, for fund-raising and various collection purposes.
# Features
Fully Reactive interface to store data about permanent contributors, as well as temporary (one-time) contributors
The application consists of following screens (interfaces)
### Dashboard (/home)
* Informs about the current day, month and total amount that has been collected
* Shows recent contributions from permanent contributors
* Shows a gist of this month donation status from contributors
### Contribute & Register Modals (/home/contribute  &  /home/register)
* Two interactive popup modals with validation (both inplace and from backend)
* Register a permanent contributor by his id and name
* Add contribution for current month, using that contributors id
* Data saved on backend (JSON docs)
### All Permanent Contributors (/contributors)
* Displays data about all the registered contributors
* Name, Id and total amount 
* Search a contributor by his id or name
* Filter contributors as: 
  * All
  * Who have contributed the minimum amount decided for a month
  * Who have not contributed the decided amount for current month
* View a list of all contributions of a person, with the amount, time and date (/contributors/:userId)
### Temporary contributors (/collect)
* A full-featured micro-application that lets admin to store data about one time donors
* Lets you store two kinds of statuses for donors, whether:
  * the person has donated an amount on the spot
  * the person has given future date for collection
* Create the donor with name and specified status
* Filter the donors 
* Enter the edit mode and edit the name and status of the donor
* Delete the donor
* This micro frontend app uses local storage to keep track of the changes of the state
* Can be used fully offline
* Data can be stored on backend upon going online

# Technologies Used
* HTML
* CSS
* JavaScript
* React
* Redux
* React Router
* Browser API


