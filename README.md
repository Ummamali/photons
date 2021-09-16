![PHOTONS](/src/media/logo.jpg)

A modern frontend-driven CRUD application to store data about contributors, for fund-raising and various collection purposes.
## Features
Fully Reactive interface to store data about permanent contributors, as well as temporary (one-time) contributors
The application consists of following screens (interfaces)
### Dashboard
* Informs about the current day, month and total amount that has been collected
* Shows recent contributions from permanent contributors
* Shows a gist of this month donation status from contributors
### Contribute & Register Modals
* Two interactive popup modals with validation (both inplace and from backend)
* Register a permanent contributor by his id and name
* Add contribution for current month, using that contributors id
* Data saved on backend (JSON docs)
### All Permanent Contributors
* Displays data about all the registered contributors
* Name, Id and total amount 
* Search a contributor by his id or name
* Filter contributors 
*   All
*   Who have contributed the minimum amount decided for a month
*   Who have not contributed the decided amount for current month
* A list of all the contributions of a person, with the amount, time and date
