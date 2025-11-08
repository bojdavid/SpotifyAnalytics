let currentPlaylist = $state();

const getCurrentPlaylist = () => {
    return currentPlaylist
}

const setCurrentPlaylist = (data: any) =>{
    currentPlaylist = data
}