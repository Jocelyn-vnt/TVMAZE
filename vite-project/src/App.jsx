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

export default function App() {
  const {
    data: showData,
    isLoading: isLoadingShow,
    error: showError,
  } = useFetch("/data.json");

  console.log(showData);
  return (
    <div className="">
      <div className="flex items-center p-4 place-content-between rounded-b-md shadow-sm shadow-accent">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-center items-center cursor-pointer select-none text-primary rounded-sm bg-black text-sm outline-none focus:bg-accent data-[state=open]:bg-accent">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
        <div className="flex flex-col w-64 justify-center items-center text-left gap-4">
          <h1 className="bg-gradient bg-clip-text text text-transparent uppercase text-2xl font-bold text-left">Vos films et séries, en mauvaise qualité !</h1>
          <img className="w-full" src="/Vector.png" alt="" />
          <Button variant="outline" className="bg-primary text-white">Log in</Button>
        </div>
      </div>
      <section>
        <h2 className="bg-gradient bg-clip-text text-transparent uppercase text-xl font-bold text-center pb-4 pt-8">Les films du moments</h2>
        <figure>
          {isLoadingShow ? (
            <div>Loading...</div>
          ) : showError ? (
            <div>Error: {showError}</div>
          ) : (
            <div>
              {showData && (
                <>
                  <figure className="relative h-72 overflow-hidden rounded-b-xl">
                    <div className="z-20 absolute inset-0 bg-btmgradient" />
                    <img className="z-10 absolute w-full h-auto bottom-0" src={showData[2].show.image.medium} alt={showData[0].show.name} />
                    <figcaption>
                      <h2 className="z-30 absolute bottom-0 p-4 bg-gradient bg-clip-text text-transparent font-bold text-xl">
                        {showData[2].show.name} - {(showData[2].score * 10).toFixed(2)}/10
                      </h2>
                    </figcaption>
                  </figure>
                </>
              )}
              <section className="text-foreground">
              <p className="text-foreground text-md">desc</p>
              
              </section>              
            </div>
          )}
        </figure>
      </section>

    </div>
  );
}
