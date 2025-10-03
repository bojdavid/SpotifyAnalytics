  // Function to check network status
  export const updateNetworkStatus = () :boolean => {
    if (!navigator.onLine) {
        console.log('No network connection');
      return  true;
    } else {
      return  false;
    }
  }