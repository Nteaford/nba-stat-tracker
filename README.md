# NBA Stat Tracker
## Welcome to the  NBA Stat Tracker
---

## App Background
This app allows users to create their own five-man NBA team, with the players being pulled from a database of current NBA Players. It makes calls to the [balldontlie API](https://www.balldontlie.io/#introduction) in order to populate the home page with recent games and stats for popular NBA players. Functionality was originally intended to source the data directly from the API and pull in current stats for each player of the created team, but that original scope was too optimistic for the timeframe mandated. Future versions will include the near-live stats data.




 
## Screenshots:
Home Page (Not Logged In)
![Home Page Screenshot](https://i.imgur.com/RMMZ7Rb.png)
Home Page (Logged In)
![Home Page Screenshot](https://i.imgur.com/cIJckhY.png)
My Teams Page
![My Teams Screenshot](https://i.imgur.com/eJQMm3y.png)
Specific Team Page
![Team View Screenshot](https://i.imgur.com/3bNaCTZ.png)
Draft A Team Page 
![New Team Screenshot](https://i.imgur.com/IgXN7HQ.png)
Edit A Team Page 
![Edit Team Screenshot](https://i.imgur.com/LtBX1YD.png)


---

## Technologies Used
- MEN Stack (MongoDB, Express, Node.js)
- Heroku
- balldontlie API
- Chrome Browser (troubleshooting, rendering code changes )
- VS Code (code editor)

## Getting Started
- You can link to the app [here.](https://nicks-nba-stat-tracker.herokuapp.com/)
- You can link to my trello board [here.](https://trello.com/invite/b/pk7EXPyy/843bf6a3d7c7b188bbfbcfe8f0c7fe24/ga-project-2-planning)

Upon visiting the home page, the user has a view of recent NBA games as well as top NBA players' stats from their most recent games. In order to interact with any additional functionality of the app, the user will need to log in using a Google Account. Upon logging in through the google modal, the user will be redirected back to the homepage. From there, they have additional options available to them in the navigation bar, where they can either view their custom teams, or create a new team.

## Next Steps/Icebox Items

- [ ] Set validation on Teams based on Position and disallow duplicates
- [ ] Migrate from stored player information to API response-based information population (player and team model changes)
- [ ] Collect API Statistic data for drafted players
- [ ] Display API Statistic data for drafted players
- [ ] Monetize

---