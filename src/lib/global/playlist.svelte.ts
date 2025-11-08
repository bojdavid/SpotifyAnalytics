let currentPlaylist :any = $state(null);

export const getCurrentPlaylist = () => {
    return currentPlaylist
}

export const setCurrentPlaylist = (data: any) =>{
    currentPlaylist = data
    console.log(data.name)
}