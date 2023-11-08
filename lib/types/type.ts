interface Anime {
  id: string;
  image?: string;
  coverImage: {
    large: string;
  };
  title: {
    english?: string;
    userPreferred?: string;
  };
  type: string;
  relationType: string;
  releaseDate: string;
}
interface Episode {
  id: string;
  animeID?: string;
  animeTitle?: string;
  episode: number;
  image: string;
  title?: string;
  number: number;
  description?: string;
  time:number
}
