import { Button } from "@/components/ui/button";
import useFetch from "../public/useFetch.js";





export default function App() {


  const {
    data: showData,
    isLoading: isLoadingShow,
    error: showError,
  } = useFetch("/data.json")
  console.log(showData)
  return (
    <div className="flex items-center place-content-between">
    { isLoadingShow ? showError
      :
      <div>
        { showData && (<h2>{showData[0].show.name} {showData[0].score}</h2>)}
      </div>
      
    }
    </div>
  );
}