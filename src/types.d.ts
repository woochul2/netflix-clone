declare module TvShows {
  export interface Result {
    backdrop_path: string | null;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
  }

  export interface RootObject {
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
  }
}

declare module TvDetail {
  export interface CreatedBy {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
  }

  export interface Genre {
    id: number;
    name: string;
  }

  export interface LastEpisodeToAir {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
  }

  export interface Network {
    name: string;
    id: number;
    logo_path: string | null;
    origin_country: string;
  }

  export interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }

  export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
  }

  export interface Season {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
  }

  export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
  }

  export interface RootObject {
    backdrop_path: string | null;
    created_by: CreatedBy[];
    episode_run_time: number[];
    first_air_date: string;
    genres: Genre[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: LastEpisodeToAir;
    name: string;
    next_episode_to_air: null;
    networks: Network[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    seasons: Season[];
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
  }
}

declare module TvVideos {
  export interface Result {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
  }

  export interface RootObject {
    id: number;
    results: Result[];
  }
}
