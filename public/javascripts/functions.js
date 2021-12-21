async function teamToPlayerPG(e) {
    
    let playerId;
    let players = [];
    
    const response = await fetch(`${playersURL}`)
    .then(response => response.json())
    .then(function (playerData) {
        let playerFilter = playerData.data.filter(function (playerDatum) {
            return (playerDatum.team.id === e.target.value && playerDatum.position === "PG");
            })
            players = playerFilter;
        })
        return players;  

        `<label>Player:</label>
            <select name="player">
                <% teamToPlayerPG(t.id) %>
                <% players.data.forEach(function(p) { %>
                <option value="<% p.id %>"> <%=p.first_name %> <%=p.last_name %></option>
                <% }); %>
            </select> <br>
    </div>
  </div>
<br></br>`
    }
