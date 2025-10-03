export   async function getProfile(accessToken: any) {
    if (accessToken != "undefined") {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (!response.ok) {
        const errorText = await response.json(); // or res.text() if error is text
        throw new Error(`Profile Error [${response.status}]: ${errorText}`);
      }
      return await response.json();
    } else {
      alert("Access token is undefined");
    }
  }