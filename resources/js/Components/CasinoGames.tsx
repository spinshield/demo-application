// @ts-nocheck
import { useState, useEffect } from 'react';
import { CasinoGamesProps } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { AspectRatio } from "@/Components/ui/aspect-ratio"
import { Button } from "@/Components/ui/button"
import useWindowDimensions from "@/lib/screensize"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"

import Fade from 'react-reveal/Fade';

const ITEMS_ON_LOAD = {
  'xs': 12,
  'sm': 12,
  'md': 24,
  'lg': 30,
  'xl': 36,
};

const ITEMS_PER_PAGE = {
  'xs': 4,
  'sm': 6,
  'md': 8,
  'lg': 10,
  'xl': 12,
};

const CardSkeleton = () => (
  <div className="rounded-md bg-gray-200 animate-pulse">
    <AspectRatio ratio={1 / 1} className="bg-gray-200 overflow-hidden rounded-md"></AspectRatio>
  </div>
);

export default function CasinoGames({ games, showOptions }: CasinoGamesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loadedGames, setLoadedGames] = useState(0);
  const [gridSize, setGridSize] = useState("sm");
  const { height, width } = useWindowDimensions();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(showOptions.defaultFilter);
  const [isLoading, setIsLoading] = useState(false);
  const providers = Array.from(new Set(games.map((game: { p: any; }) => game.p)));
  const [showAuthButtons, setShowAuthButtons] = useState(showOptions.showAuthButtons);
  const filterOptions = [
    { value: "", label: "All" },
    { value: "freeSpins", label: "Free Spins" },
    { value: "featureBuy", label: "Feature Buy" },
    { value: "demoMode", label: "Demo Support" },
  ];

  const recentGames = JSON.parse(localStorage.getItem("recentGames")) || [];

  const filteredGames = games
    .filter((game: { n: string; p: string; fs: boolean; fb: boolean; demo: boolean; }) =>
      game.n.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedProvider === "" || game.p === selectedProvider) &&
      (selectedFilter === "" ||
        (selectedFilter === "freeSpins" && game.fs) ||
        (selectedFilter === "featureBuy" && game.fb) ||
        (selectedFilter === "demoMode" && game.d))
    )
    .sort((a, b) => {
      if (recentGames.includes(a.s) && !recentGames.includes(b.s)) {
        return -1;
      } else if (!recentGames.includes(a.s) && recentGames.includes(b.s)) {
        return 1;
      } else {
        return 0;
      }
    });

  const paginatedGames = filteredGames.slice(0, loadedGames);

  const handleLoadMore = () => {
    setIsLoading(true);
    setLoadedGames(loadedGames + ITEMS_PER_PAGE[gridSize]);
    setIsLoading(false);
  };

  function authLink(event, type) {
    if (type === "register") {
      var url = "/register";
    } else {
      var url = "/login";
    }
    window.open(url, "_blank");
    event.preventDefault();
  }

  function openGame(event, type, slug) {
    if (type === "real") {
      var url = "/launch/" + showOptions.server + "/usd/" + slug;
    } else {
      var url = "/launch/" + showOptions.server + "/demo/" + slug;
    }
    window.open(url, "_blank");
    event.preventDefault();

    // Save the game slug to localStorage
    const recentGames = JSON.parse(localStorage.getItem("recentGames")) || [];
    if (!recentGames.includes(slug)) {
      recentGames.unshift(slug);
      if (recentGames.length > 2) {
        recentGames.pop();
      }
      localStorage.setItem("recentGames", JSON.stringify(recentGames));
    }
  }

  const loadInitGames = () => {
    if (gridSize === "xl") {
      setLoadedGames(ITEMS_ON_LOAD.lg);
    }
    if (gridSize === "lg") {
      setLoadedGames(ITEMS_ON_LOAD.lg);
    }
    if (gridSize === "md") {
      setLoadedGames(ITEMS_ON_LOAD.md);
    }
    if (gridSize === "sm") {
      setLoadedGames(ITEMS_ON_LOAD.sm);
    }
    if (gridSize === "xs") {
      setLoadedGames(ITEMS_ON_LOAD.xs);
    }
  };

  useEffect(() => {
    const handleProviderChange = () => {
      loadInitGames();
    };
    if (selectedProvider !== "") {
      handleProviderChange();
    }
  }, [selectedProvider]);

  useEffect(() => {
    loadInitGames();
  }, [gridSize]);

  useEffect(() => {
    const handleResize = () => {
      if (width > 1280) {
        if (gridSize !== "xl") {
          setGridSize("xl");
        }
      } else if (width > 1024) {
        if (gridSize !== "lg") {
          setGridSize("lg");
        }
      } else if (width > 768) {
        if (gridSize !== "md") {
          setGridSize("md");
        }
      } else if (width > 640) {
        if (gridSize !== "sm") {
          setGridSize("sm");
        }
      } else {
        if (gridSize !== "xs") {
          setGridSize("xs");
        }
      }
      if (!pageLoaded) {
        setPageLoaded(true);
      }
    };
    handleResize();
  }, [width]);

  return (
    <div className="py-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-5">
        <Card className="bg-theme-800/50 bg-gradient-to-bl from-theme-700/50 via-transparent rounded-lg mb-4">
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Search games.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select onValueChange={setSelectedProvider}>
                <SelectTrigger className="w-[160px] rounded-sm">
                  <SelectValue placeholder="Providers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="" key="all">All</SelectItem>
                  {providers.map(provider => (
                    <SelectItem value={provider} key={provider}>{provider}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Select defaultValue={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-[160px] rounded-sm">
                    <SelectValue placeholder="Mode Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.map(option => (
                      <SelectItem value={option.value} key={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 py-6">
              {loadedGames !== 0 ? (
                paginatedGames.map((game: { s: string; n: string; p: string; d: boolean; }) => (
                  <Fade key={game.s} duration={500}>
                    <Card className="group rounded-lg scale-95 bg-transparant transition-all ease-in-out duration-300 hover:cursor-pointer">
                      <AspectRatio ratio={1 / 1} className="bg-transparant overflow-hidden rounded-lg">
                        <img
                          src={"https://cdn2.softswiss.net/i/s3/" + game.s + ".png"}
                          alt={game.n}
                          sizes="auto"
                          className="object-cover bg-theme-950 shadow-xl transition-all rounded-lg opacity-100 group-hover:opacity-60 group-hover:scale-105"
                        />
                                                <img
                          src={"/providers/" + game.p + ".svg"}
                          alt={game.n + "-provider"}
                          sizes="auto"
                          className="w-6 h-6 border rounded-full border-theme-50 shadow absolute right-1 bottom-1 transition-all group-hover:opacity-50 transition-opacity"
                        />
                       {recentGames.includes(game.s) ? (
                            <img
                            src={"/img/recent.svg"}
                            alt={game.n + "-recent-game"}
                            sizes="auto"
                            className="w-6 h-6 p-1 border bg-theme-900 rounded-full border-theme-50 shadow absolute left-1 bottom-1 transition-all group-hover:opacity-50"
                          />
                      ) : null}
                        <div className="absolute inset-0 flex items-center backdrop-blur-sm justify-center bg-theme-900/25 opacity-0 group-hover:opacity-100 transition-opacity">
                          {showAuthButtons ? (
                            <>
                              <p
                                className="tracking-tight drop-shadow-md opacity-0 text-theme-50 font-semibold text-xs absolute bottom-6 transition-all group-hover:opacity-100"
                              >
                                {game.n.length > 25 ? game.n.substring(0, 23) + '...' : game.n}
                              </p>
                              <p
                                className="tracking-tightest drop-shadow-md opacity-0 text-theme-50 font-semibold text-xs absolute bottom-3 transition-all group-hover:opacity-75"
                              >
                                <span className="font-thin">by</span> {game.p.length > 25 ? game.p.substring(0, 23) + '...' : game.p}
                              </p>
                              <Button onClick={(event) => openGame(event, 'real', game.s)} variant="outline" size="sm" className="mr-2">Play</Button>
                              {game.d === true ? (
                                <>
                                  <br />
                                  <Button onClick={(event) => openGame(event, 'demo', game.s)} variant="outline" size="sm">Demo</Button>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          ) : (
                            <>
                              <Button className="mr-2" onClick={(event) => authLink(event, 'login')} size="sm" variant="outline">Login</Button>
                              <Button onClick={(event) => authLink(event, 'register')} size="sm" variant="outline">Register</Button>
                            </>
                          )}
                        </div>
                      </AspectRatio>
                    </Card>
                  </Fade>
                ))
              ) : (
                Array.from({ length: ITEMS_PER_PAGE[gridSize] }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            {loadedGames < filteredGames.length && (
              <div>
                <Button variant="outline" onClick={handleLoadMore} disabled={isLoading}>
                  {isLoading ? "Loading..." : "Load "}
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}