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
- You can link to the app [here.](https://nteaford.github.io/Checknickers/)
- You can link to my trello board [here.](https://trello.com/invite/b/pk7EXPyy/843bf6a3d7c7b188bbfbcfe8f0c7fe24/ga-project-2-planning)

- Black Team will begin -- click on a black token to view movement options (make sure you're not blocked by your own team!).
- Yellow squares will indicate where you can move. If you don't love your movement options, go ahead and select another black token.
- When you've made your movement decision, click on the desired yellow square to move your token to that square. Once you do, it will be the Red Team's turn. 
- Red Team operates in the same way as the Black Team, outlined above.

---

## Next Steps/Icebox Items

- [ ] Set validation on Teams based on Position and disallow duplicates
- [ ] Migrate from stored player information to API response-based information population (player and team model changes)
- [ ] Collect API Statistic data for drafted players
- [ ] Display API Statistic data for drafted players
- [ ] Monetize

---