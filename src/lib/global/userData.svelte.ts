import type { Userdata } from "$lib/types/spotifyTypes1"


export let userData: Userdata = $state({
    country: "",
    display_name: "",
    email: "",
    explicit_content:{},
    external_urls: {
      spotify: "",
    },
    followers: {
      href: "",
      total: 0,
    },
    href: "",
    id: "",
    images: [
      {
        url: "",
        height: 0,
        width: 0,
      },
      {
        url: "",
        height: 0,
        width: 0,
      },
    ],
    product: "",
    type: "",
    uri: "",

})

export const setUserData = (data: Userdata) =>{
    userData.country = data.country
    userData.display_name = data.display_name
    userData.email = data.email
    userData.explicit_content = data.explicit_content
    userData.external_urls = data.external_urls
    userData.followers = data.followers
    userData.href = data.href
    userData.images = data.images
    userData.product = data.product
    userData.type = data.type
    userData.uri = data.uri
}