import useFetch from "../public/useFetch.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react"; // Importer useState

export default function App() {
  const {
    data: showData,
    isLoading: isLoadingShow,
    error: showError,
  } = useFetch("https://api.tvmaze.com/shows/1?embed[]=episodes&embed[]=cast&embed[]=seasons");

  const [selectedInfo, setSelectedInfo] = useState(null); // État pour suivre la sélection, initialisé à null

  const handleSelectChange = (value) => {
    setSelectedInfo(value); // Mettre à jour l'état lorsque l'utilisateur sélectionne une option
  };

  console.log(showData);
  return (
    <div className="">
      <div className="flex items-center p-4 place-content-between bg-background rounded-md shadow-sm shadow-accent">
                <div>
          <img src="/Logo.svg" alt="" />
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="" className="size-10 stroke-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </div>
      </div>
      <div className="flex items-center justify-center py-4">
        <div className="flex flex-col w-full justify-center items-center text-left gap-4 bg-background rounded py-4 px-16">
          <h1 className="bg-gradient bg-clip-text text text-transparent uppercase text-2xl font-bold text-left">Vos films et séries, en UTRA HD !</h1>
          <img className="w-full" src="/Vector.png" alt="" />
          <Button variant="outline" className="bg-primary text-white">Log in</Button>
        </div>
      </div>
      <section className="">
        <div className="bg-background rounded-md">
          <h2 className="bg-gradient bg-clip-text text-transparent uppercase text-xl font-bold text-center p-4 bg-background">{showData?.name}</h2>
        </div>

        <div className="py-4">
          {isLoadingShow ? (
            <div>Loading...</div>
          ) : showError ? (
            <div>Error: {showError}</div>
          ) : (
            <div className="relative">
              {showData && (
                <>
                  <img
                    className="bg-btmgradient rounded-md"
                    src={showData.image.original}
                    alt={showData.name}
                  />
                  {/* Conteneur du texte et du dégradé avec hover */}
                  <div className="absolute z-20 bottom-0 h-full w-full bg-transparent hover:bg-btmgradient transition-opacity duration-300">
                    <p className="absolute bottom-0 z-30 opacity-0 text-white p-4 hover:opacity-100 transition-opacity duration-300" dangerouslySetInnerHTML={{ __html: showData.summary }}></p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <Select onValueChange={handleSelectChange} className="">
          <SelectTrigger className="w-full bg-primary pb-4">
            <SelectValue placeholder="More infos" />
          </SelectTrigger>
          <SelectContent className="">
          <SelectItem value="hide">Hide</SelectItem>
            <SelectItem value="episodes">Episodes</SelectItem>
            <SelectItem value="seasons">Seasons</SelectItem>
            <SelectItem value="cast">Cast</SelectItem>
          </SelectContent>
        </Select>

        {/* Affichage des informations sélectionnées */}
        <div className="flex flex-col gap-4 pt-4">
          {isLoadingShow && <div>Loading...</div>}
          {showError && <div>Error: {showError}</div>}
          {showData && selectedInfo === "episodes" && (
            showData?._embedded.episodes.map((film) => (
              <div key={film.id} className="flex flex-col gap-4 md:flex-row border-b border-gray-200 bg-background rounded-md">
                <img
                  className="h-28 w-full object-cover overflow-hidden"
                  src={film.image.original}
                  alt="Photo episode"
                />
                <div className="flex flex-col justify-between p-4">
                  <div className="flex flex-row gap-1 md:flex-col md:gap-0">
                    <p className="text-sm text-card-foreground ">
                      Season: {film.season}
                    </p>
                    <p className="text-sm text-card-foreground ">
                      Episode: {film.number}
                    </p>
                  </div>
                  <h3 className="font-semibold text-lg">{film.name}</h3>
                  <p className="text-card-foreground text-sm ">
                    {film.summary.replace(/(<([^>]+)>)/gi, "")}
                  </p>
                  <p className="text-sm text-secondary mt-2">
                    {film.rating.average}/10
                  </p>
                  <button className="mt-4 flex items-center justify-center bg-primary text-white px-4 py-2 rounded-md">
                    <svg
                      width="14"
                      height="16"
                      viewBox="0 0 14 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2"
                    >
                      <path
                        d="M12.875 8.64952C13.375 8.36084 13.375 7.63916 12.875 7.35048L1.625 0.855291C1.125 0.566615 0.5 0.92746 0.5 1.50481L0.5 14.4952C0.5 15.0725 1.125 15.4334 1.625 15.1447L12.875 8.64952Z"
                        stroke="white"
                      />
                    </svg>
                    Play
                  </button>
                </div>
              </div>
            ))
          )}
          {showData && selectedInfo === "cast" && (
            showData?._embedded.cast.map((castMember) => (  
              <div key={castMember.person.id} className="flex gap-4 md:flex-row border-b border-gray-200 bg-background rounded-md h-40">
                <img
                  className="h-auto w-40 object-cover overflow-hidden"
                  src={castMember.person.image.original || "/default-image.png"}
                  alt={`Photo of ${castMember.person.name}`}
                />
                <div className="flex flex-col justify-center rounded-md">
                  <h3 className="font-semibold text-lg">{castMember.person.name}</h3>
                  <p className="text-sm text-secondary">{castMember.character.name}</p>
                </div>
              </div>
            ))
          )}
          {showData && selectedInfo === "seasons" && (
            showData._embedded.seasons.map((season) => (
              <div key={season.id} className="flex gap-4 md:flex-row border-b border-gray-200 bg-background rounded-md h-40">
                <img
                  className="h-auto w-40 object-cover overflow-hidden"
                  src={season.image.original || "/default-image.png"}
                  alt={`Photo of ${season.name}`}
                />
              <div key={season.id} className="flex flex-col gap-4 md:flex-row border-b border-gray-200 bg-background rounded-md justify-center">
                <h3 className="font-semibold text-lg">Season {season.number}</h3>
                <p className="text-sm text-card-foreground">{season.premiere}  {season.end ? season.end : "Ongoing"}</p>
                <p className="text-sm text-secondary mt-2">Episodes: {season.episodeOrder}</p>
              </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
