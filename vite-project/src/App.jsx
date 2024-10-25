import useFetch from "../public/useFetch.js";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function App() {

  const [selectedInfo, setSelectedInfo] = useState(null);
  const [serie, setSerie] = useState("under the dome");

  const handlerSubmit = (e) => {
    e.preventDefault();
    let form = e.currentTarget;
    let urlString = new FormData(form).get("serie");
    setSerie(urlString);
  };

  const {
    data: showData,
    isLoading: isLoadingShow,
    error: showError
  } = useFetch(`https://api.tvmaze.com/singlesearch/shows?q=${serie}&embed[]=episodes&embed[]=cast&embed[]=seasons`);

  const handleSelectChange = (value) => {
    setSelectedInfo(value);
  };

  return (
    <div className="">
      <div className="flex flex-col items-center gap-4">
        <div className="w-full max-w-screen-lg flex justify-between items-center p-4 bg-background rounded-md shadow-sm shadow-accent">
          <img src="/Logo.svg" alt="Logo" className="w-24" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="" className="h-10 stroke-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </div>

        <form onSubmit={handlerSubmit} className="w-full max-w-screen-lg flex gap-2 items-center">
          <input
            type="text"
            name="serie"
            placeholder="Rechercher une série..."
            className="flex-grow border border-gray-300 rounded-md p-2"
          />
          <Button type="submit" className="h-10 px-4">Search</Button>
        </form>

        <div className="text-center bg-background p-4 rounded-md">
          <h1 className="text-2xl font-bold uppercase bg-gradient bg-clip-text text-transparent ">Vos films et séries, en ULTRA HD !</h1>
          <img className="w-32 mx-auto mt-4" src="/Vector.png" alt="Vector" />
        </div>

        {showData && (
          <section className="w-full max-w-screen-lg rounded-md shadow-sm shadow-accent">
            <div className="bg-background rounded-md">
              <h2 className="text-xl font-bold text-center bg-gradient bg-clip-text text-transparent p-4 w-full">{showData.name}</h2>
            </div>

            <div className="mt-4">
              {isLoadingShow ? (
                <div>Loading...</div>
              ) : showError ? (
                <div>Error: {showError}</div>
              ) : (
                <div className="relative">
                  <img
                    className="bg-btmgradient rounded-md w-full"
                    src={showData.image.original}
                    alt={showData.name}
                  />
                  <div className="absolute inset-0 bg-transparent hover:bg-btmgradient transition-opacity duration-300">
                    <p className="absolute bottom-0 text-white p-4 opacity-0 hover:opacity-100 transition-opacity duration-300" dangerouslySetInnerHTML={{ __html: showData.summary }}></p>
                  </div>
                </div>
              )}
            </div>

            <Select onValueChange={handleSelectChange} className="mt-4">
              <SelectTrigger className="w-full bg-primary text-white">
                <SelectValue placeholder="More infos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hide">Hide</SelectItem>
                <SelectItem value="episodes">Episodes</SelectItem>
                <SelectItem value="seasons">Seasons</SelectItem>
                <SelectItem value="cast">Cast</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex flex-col gap-4 mt-4">
              {selectedInfo === "episodes" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {showData._embedded.episodes.map((film) => (
                    <div key={film.id} className="flex flex-col gap-4 md:flex-row border-b border-gray-200 bg-background rounded-md">
                      <img className="h-40 w-40 object-cover md:w-40" src={film.image.original} alt={film.name} />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg">{film.name}</h3>
                        <p className="text-sm">{film.summary.replace(/(<([^>]+)>)/gi, "")}</p>
                        <p className="text-sm text-secondary mt-2">Rating: {film.rating.average}/10</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedInfo === "cast" && showData._embedded.cast.map((castMember) => (
                <div key={castMember.person.id} className="flex gap-4 border-b border-accent bg-background rounded-md">
                  <img className="h-40 w-40 object-cover md:w-40" src={castMember.person.image.original} alt={castMember.person.name} />
                  <div className="p-4 flex flex-col text-left justify-center">
                    <h3 className="font-semibold text-lg">{castMember.person.name}</h3>
                    <p className="text-sm text-secondary">{castMember.character.name}</p>
                  </div>
                </div>
              ))}

              {selectedInfo === "seasons" && showData._embedded.seasons.map((season) => (
                <div key={season.id} className="flex gap-4 border-b border-accent bg-background rounded-md">
                  <img className="h-40 w-40 object-cover md:w-40" src={season.image.original} alt={`Season ${season.number}`} />
                  <div className="p-4 flex flex-col text-left justify-center">
                    <h3 className="font-semibold text-lg">Season {season.number}</h3>
                    <p className="text-sm">{season.premiereDate} - {season.endDate || "Ongoing"}</p>
                    <p className="text-sm text-secondary mt-2">Episodes: {season.episodeOrder}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
