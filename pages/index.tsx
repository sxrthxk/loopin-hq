import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [animeList, setAnimeList] = useState<{
    animes: any[];
    fetched: "yes" | "no" | "fetching";
  }>({
    animes: [],
    fetched: "no",
  });

  useEffect(() => {
    setAnimeList((x) => ({
      ...x,
      fetched: "fetching",
    }));
    fetch("https://ghibliapi.herokuapp.com/films")
      .then((res) => res.json())
      .then((data) =>
        setAnimeList((x) => ({
          ...x,
          animes: data.map((d: any) => ({
            description: d.description,
            id: d.id,
            imgUrl: d.image,
            banner: d.movie_banner,
            release: d.release_date,
            director: d.director,
            title: d.title,
            romanizedTitle: d.original_title_romanised,
            originalTitle: d.original_title,
          })),
        }))
      );
  }, []);

  return (
    <div className="max-w-screen min-h-screen bg-blakc flex gap-6 flex-wrap justify-center">
      {animeList.animes.map((anime: Anime) => (
        <div
          key={anime.id}
          className="bg-white flex flex-col rounded-lg hover:scale-110 drop-shadow-md overflow-hidden w-48 transition-all"
        >
          <div className="w-full h-72 relative">
            {
              <Image
                src={anime.imgUrl}
                layout="fill"
                objectFit="cover"
                alt="Cover Image"
              />
            }
          </div>
          <div className="flex flex-col p-3">
            <h1 className="font-semibold">{anime.title}</h1>
            <span className="text-md font-light italic text-gray-500">
              {anime.release}
            </span>
            <span className="text-gray-400 font-light">{anime.description.slice(0, 50)}...</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
