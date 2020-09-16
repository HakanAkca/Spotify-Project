import base64 from 'react-native-base64'
import * as AuthSession from 'expo-auth-session'
import AsyncStorage from '@react-native-community/async-storage'
import * as Localization from 'expo-localization'

const url = "https://accounts.spotify.com/api"
const api_url = "https://api.spotify.com/v1"
const url_autorize = "https://accounts.spotify.com"
const client_id = "6ffe7e22c4cd429ea498bc16cddf1421"
const client_secret = "e5253f51776541f88ecbd7ca8f569351"
const base6Credentails = base64.encode(client_id + ':' + client_secret)

export const getAutorization = async () => {

    let redirectUrl = AuthSession.getRedirectUrl('redirect')
    let scopes = 'user-read-email user-library-read user-read-recently-played playlist-read-private user-top-read user-read-private'
    let results = await AuthSession.startAsync({
        authUrl: `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=${encodeURIComponent(scopes)}&response_type=code`});

    return results
}


export const me = async (token) => {
    const userInfo = await fetch(`https://api.spotify.com/v1/me`, {
        method: "GET",
        headers: {
        "Authorization": `Bearer ${token}`
        }
    });
    return await userInfo.json()
}  


export const getSpotifyToken = async (code) => {
    
    let redirectUrl = AuthSession.getRedirectUrl('redirect')
    
    const request = await fetch(`${url}/token`, { 
        method: 'POST', 
        headers: {
            Authorization: `Basic ${base6Credentails}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirectUrl)}`
    });

    return await request.json()

}  

export const refreshToken = async (refresh_token) => {
    
    let redirectUrl = AuthSession.getRedirectUrl('redirect')
    
    const request = await fetch(`${url}/token`, { 
        method: 'POST', 
        headers: {
            Authorization: `Basic ${base6Credentails}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=refresh_token&refresh_token=${refresh_token}`
    });

    return await request.json()

}  

export const getUserTopArtists = async (token) => {   
    const request = await fetch(`${api_url}/me/top/artists`, { 
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return await request.json()
}

export const getArtist = async (token, id) => {   
    const request = await fetch(`${api_url}/artists/${id}`, { 
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return await request.json()
}

export const getArtistAlbums = async (token, id) => {   
    const request = await fetch(`${api_url}/artists/${id}/albums`, { 
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return await request.json()
}

export const getAlbumsTracks = async (token, id) => {   
    const request = await fetch(`${api_url}/albums/${id}/tracks`, { 
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return await request.json()
}

export const getNews = async (token) => {
    const request = await fetch(`${api_url}/browse/new-releases?country=${Localization.locale.substring(0,2)}`, { 
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return await request.json()
}

export const featuredPlaylists = async (token) => {
    const request = await fetch(`${api_url}/browse/categories`, { 
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return await request.json()
}

export const search = async ( offset, limit, q, token) => {
    const request = await fetch(`${api_url}/search?type=artist&limit=${limit}&offset=${offset}&q=${encodeURIComponent(q)}`, { 
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return await request.json()
}