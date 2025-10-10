export type TopFilter = "top-tracks" | "top-artists" | "random" | "top-recent"
let current : TopFilter  = $state("top-tracks")

export const getCurrentTop = () =>{
    return current
}

export const setCurrentTop = (data: TopFilter) =>{
    current = data
}

export const getFilterStringFromType = (filterType: TopFilter) => {
    console.log("This is the filterTYpe-----", filterType);
    switch (filterType) {
      case "top-tracks":
        return "Top Tracks";
      case "top-artists":
        return "Top Artists";
      case "random":
        return "Random Song";
      case "top-recent":
        return "Top Recent";
      default:
        return "Unknown";
    }
  };

