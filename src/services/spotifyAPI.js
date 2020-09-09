import base64 from 'react-native-base64'

const url = "https://accounts.spotify.com/api"
const client_id = ""
const client_secret = ""
const base6Credentails = base64.encode(client_id + ':' + client_secret)

export const getSpotifyToken = async () => {
    
    const request = await fetch(`${url}/token`, { 
        method: 'POST', 
        headers: {
            Authorization: `Basic ${base6Credentails}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
        
    });

    const json = await request.json()
    const token = json
    console.log(token)
    return token
}   