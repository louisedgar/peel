var urlFetch = 'https://api.football-data.org/v2/';
var headers = { 'X-Auth-Token': '316cebc080fd4596a4ed3c31eed55f82' };

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
};

function json(response) {
  return response.json();
};

function error(error) {
  console.log("Error : " + error);
};

function showData(matches) {
  var premierHTML = '';
  matches.forEach(function (premier) {
    premierHTML += `
    <div class="col s12">
      <div class="center-align">
        <ul class="collection with-header">
          <li class="collection-header grey darken-3 white-text"><h4>${premier.score.fullTime.homeTeam} - ${premier.score.fullTime.awayTeam}</h4></li>
          <li class="collection-item">${premier.homeTeam.name} (Home) - ${premier.score.fullTime.homeTeam}</li>
          <li class="collection-item">${premier.awayTeam.name} (Away) - ${premier.score.fullTime.awayTeam}</li>
          <li class="collection-item">${premier.utcDate}</li>
        </ul>
      </div>
    </div>
    
  `;
  });
  document.getElementById("premier").innerHTML = premierHTML;
};


function showData2(teams) {
  var teamsHTML = "";
  teams.forEach(function (team, index) {
    teamsHTML += `
    <ul class="collection">
    <li class="collection-item avatar">
      <img src="${team.crestUrl}" alt="" class="circle">
      <span class="title">${team.name}</span>
      <p>${team.venue} <br>
         ${team.clubColors}
      </p>
      <a href="#!" class="secondary-content" id="save${index}"><i class="material-icons">grade</i></a>
    </li>
  </ul>
          
        
        `;
  });
  document.getElementById("teams").innerHTML = teamsHTML;
};



function getInfo() {
  if ('caches' in window) {
    caches.match(urlFetch + 'competitions/2021/matches')
      .then(function (response) {
      if (response) {
        response.json()
        .then(function (data) {
          var matches = data.matches
          showData(matches)
        })
      }
    })
  }

  fetch(urlFetch + 'competitions/2021/matches', {
    headers: headers,
    method: 'GET'
  })
    .then(status)
    .then(json)
    .then(function (data) {
      var matches = data.matches
      showData(matches)
    })
    .catch(error);
};


function getInfo2() {
  if ('caches' in window) {
    caches.match(urlFetch + 'competitions/2021/teams')
      .then(function (response) {
        if (response) {
          response.json()
            .then(function (data) {
              var teams = data.teams
              showData2(teams)

              // Menambah team ke indexedDb (offline)

              teams.forEach(function (team, index) {
                var save = document.getElementById(`save${index}`)
                var content = {
                  name: team.name,
                  id: team.id,
                  address: team.address,
                  founded: team.founded,
                  clubColors: team.clubColors,
                  venue: team.venue,
                  crestUrl: team.crestUrl,
                  website: team.website
                }
        
                // Menambah team ke my PeeL (offline)
        
                save.onclick = function() {
                  saveTeam(content)
                  alert("Team berhasil disimpan!")
                  if (save.onclick) {
                    save.style.display = 'none';
                  }
                }
              })
            })
            }
        })
      }


  fetch(urlFetch + 'competitions/2021/teams', {
    headers: headers,
    method: 'GET'
  })
    .then(status)
    .then(json)
    .then(function (data) {
      var teams = data.teams
      showData2(teams)
      
      // Menambah team ke indexedDb
      
      teams.forEach(function (team, index) {
        var save = document.getElementById(`save${index}`)
        var content = {
          name: team.name,
          id: team.id,
          address: team.address,
          founded: team.founded,
          clubColors: team.clubColors,
          venue: team.venue,
          crestUrl: team.crestUrl,
          website: team.website
        }

        // Menambah team ke my PeeL

        save.onclick = function() {
          saveTeam(content)
          alert("Team berhasil disimpan!")
          if (save.onclick) {
            save.style.display = 'none';
          }
        }
      })
    })
  .catch(error);
};


function getSavedTeam() {
  getTeam().then(function(item) {
    console.log(item)
    var myTeamHTML = ""
    item.forEach(function(item, index) {
    myTeamHTML += `
                  <div class="col s12 m3">
                    <div class="card">
                      <div>  
                        <div class="card-image">
                          <img src="${item.crestUrl}" class="responsive-img circle">
                          <a class="btn-floating halfway-fab waves-effect waves-light red" id="delete${index}"><i class="material-icons">delete</i></a>
                        </div>
                      </div>
                        <div class="card-content grey lighten-4">
                          <h5 class="purple-text text-darken-4"></h5>
                          <span class="card-title purple-text darken-4-text center-align">${item.name}</span>
                          <h6>Venue: ${item.venue}</h6>
                          <div>Warna Club: ${item.clubColors}</div>
                          <div>Address: ${item.address}</div>
                          <div>Founded: ${item.founded}</div>
                        </div>
                        <div class="card-action purple darken-4">
                          <a href="${item.website}" class="white-text">${item.website}</a>
                        </div>
                    </div>
                </div>
                  `;
                  })
    document.getElementById('my').innerHTML = myTeamHTML;
    
    // Menghapus team dari my.html

      item.forEach(function (item, index) {
      var deleteKey = document.getElementById(`delete${index}`)
      var key = item.id
      deleteKey.onclick = function () {
        deleteTeam(key);
        alert("Team berhasil dihapus!")
      }
    }) 
  })
};