
//let client_secret :string = "0eb0bdf1345348cbabf5c7a7fbe0973f"

/*
const generateRandomString = (length:number) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }
  
  const codeVerifier  = generateRandomString(64);

  console.log(codeVerifier)

  const sha256 = async (plain :string) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }
  
  const base64encode = (input : any) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }


*/