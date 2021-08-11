const clientId = "9016a30478f140a6b0860e083729201b";
const redirectUri = "http://localhost:3000/"
let userToken = "";

let Spotify = {
    getAccessToken() {
        if (userToken) {
            return userToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {

            userToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            window.setTimeout(() => userToken = '', expiresIn * 1000);
            window.history.pushState("Access Token", null, '/');
            return userToken;
        }else{

            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

            window.location = accessUrl;
        }

    },
    search(term) {
        
        
      

        const accessToken = this.getAccessToken();
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        const settings = {
            headers: {Authorization: `Bearer ${accessToken}`}
        }

        return fetch(endpoint, settings)
        .then(response => {

            if (response.ok){
                    
                    return response.json();
            }

            throw new Error("something went wrong");
        })
        .then(jsonResponse => {

            let responseArray = jsonResponse.tracks;
            if (!responseArray){

                return [];
            }

            let searchArray = responseArray.items.map(track => ({

                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
            }))

            return searchArray
        })
            
        
        
    },

    savePlaylist(playlistName, uriArray) {

        const accessToken = this.getAccessToken();
        const settings = {
            headers: {Authorization: `Bearer ${accessToken}`}
        };
        

        const getUserId = async () => {
            const profileEndpoint = "https://api.spotify.com/v1/me";

            return await fetch(profileEndpoint, settings)
            .then(response => response.json())
            .then(jsonResponse => {

                        return jsonResponse.id;
            });

        }
        
        
        const createPlaylist = async (userId) => {


            let jsonObject = JSON.stringify({name: playlistName});
            const createPlaylistEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`
            const createSettings = {
                headers: {Authorization: `Bearer ${accessToken}`},
                method: 'POST',
                body: jsonObject,
            }
            return await fetch(createPlaylistEndpoint, createSettings)
                        .then(response => response.json())
                        .then(jsonResponse => jsonResponse.id);

            
        }


        const addItems = async (playlistId) => {

            const jsonObject = JSON.stringify({uris: uriArray});
            const addPlaylistEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
            const addSettings = {
                headers: {Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"},
                method: "POST",
                body: jsonObject,
                
            }

            return await fetch(addPlaylistEndpoint, addSettings)
                        .then(response => response.json())
                        .then(jsonResponse => jsonResponse["snapshot_id"]);

        }

        getUserId().then(id => createPlaylist(id)).then(id => addItems(id));

        




    }




};



export default Spotify;