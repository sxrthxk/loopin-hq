interface Anime {
    description: string;
    id: string;
    imgUrl: string;
    release: string;
    title: string;
  }

interface AnimeDetails {
  description: string;
    id: string;
    imgUrl: string;
    banner: string;
    release: string;
    director: string;
    title: string;
    romanizedTitle: string;
    originalTitle: string;
}


interface APIAnimeType {
    id: string;
    title: string;
    original_title: string;
    original_title_romanised: string;
    image: string;
    movie_banner: string;
    description: string;
    director: string;
    producer: string;
    release_date: string;
    running_time: string;
    rt_score: string;
    people?: (string)[] | null;
    species?: (string)[] | null;
    locations?: (string)[] | null;
    vehicles?: (string)[] | null;
    url: string;
  }
  