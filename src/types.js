/**
 * @typedef {Object} Genre
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Object} TVShowResult
 * @property {string} backdrop_path
 * @property {string} first_air_date
 * @property {number[]} genre_ids
 * @property {number} id
 * @property {string} name
 * @property {string[]} origin_country
 * @property {string} original_language
 * @property {string} original_name
 * @property {string} overview
 * @property {number} popularity
 * @property {string} poster_path
 * @property {number} vote_average
 * @property {number} vote_count
 */

/**
 * @typedef {object} TVShows
 * @property {number} page
 * @property {TVShowResult[]} results
 * @property {number} total_pages
 * @property {number} total_results
 */

/**
 * @typedef {object} TVShowDetail
 * @property {string} backdrop_path
 * @property {object[]} created_by
 * @property {number} created_by.id
 * @property {string} created_by.credit_id
 * @property {string} created_by.name
 * @property {number} created_by.gender
 * @property {string|null} created_by.profile_path
 * @property {number[]} episode_run_time
 * @property {string} first_air_date
 * @property {object[]} genres
 * @property {number} genres.id
 * @property {string} genres.name
 * @property {string} homepage
 * @property {number} id
 * @property {boolean} in_production
 * @property {string[]} languages
 * @property {string} last_air_date
 * @property {object} last_episode_to_air
 * @property {string} last_episode_to_air.air_date
 * @property {number} last_episode_to_air.episode_number
 * @property {number} last_episode_to_air.id
 * @property {string} last_episode_to_air.name
 * @property {string} last_episode_to_air.overview
 * @property {string} last_episode_to_air.production_code
 * @property {number} last_episode_to_air.season_number
 * @property {string} last_episode_to_air.still_path
 * @property {number} last_episode_to_air.vote_average
 * @property {number} last_episode_to_air.vote_count
 * @property {string} name
 * @property {null} next_episode_to_air
 * @property {object[]} networks
 * @property {string} networks.name
 * @property {number} networks.id
 * @property {string} networks.logo_path
 * @property {string} networks.origin_country
 * @property {number} number_of_episodes
 * @property {number} number_of_seasons
 * @property {string[]} origin_country
 * @property {string} original_language
 * @property {string} original_name
 * @property {string} overview
 * @property {number} popularity
 * @property {string} poster_path
 * @property {object[]} production_companies
 * @property {number} production_companies.id
 * @property {null} production_companies.logo_path
 * @property {string} production_companies.name
 * @property {string} production_companies.origin_country
 * @property {object[]} production_countries
 * @property {string} production_countries.iso_3166_1
 * @property {string} production_countries.name
 * @property {object[]} seasons
 * @property {string} seasons.air_date
 * @property {number} seasons.episode_count
 * @property {number} seasons.id
 * @property {string} seasons.name
 * @property {string} seasons.overview
 * @property {string} seasons.poster_path
 * @property {number} seasons.season_number
 * @property {object[]} spoken_languages
 * @property {string} spoken_languages.english_name
 * @property {string} spoken_languages.iso_639_1
 * @property {string} spoken_languages.name
 * @property {string} status
 * @property {string} tagline
 * @property {string} type
 * @property {number} vote_average
 * @property {number} vote_count
 */

/**
 * @typedef {Object} MovieResult
 * @property {boolean} adult
 * @property {string} backdrop_path
 * @property {number[]} genre_ids
 * @property {number} id
 * @property {string} original_language
 * @property {string} original_title
 * @property {string} overview
 * @property {number} popularity
 * @property {string} poster_path
 * @property {string} release_date
 * @property {string} title
 * @property {boolean} video
 * @property {number} vote_average
 * @property {number} vote_count
 */

/**
 * @typedef {object} Movies
 * @property {number} page
 * @property {MovieResult[]} results
 * @property {number} total_pages
 * @property {number|undefined} total_results
 */

/**
 * @typedef {object} MovieDetail
 * @property {boolean} adult
 * @property {string} backdrop_path
 * @property {object} belongs_to_collection
 * @property {number} belongs_to_collection.id
 * @property {string} belongs_to_collection.name
 * @property {string} belongs_to_collection.poster_path
 * @property {string} belongs_to_collection.backdrop_path
 * @property {number} budget
 * @property {object[]} genres
 * @property {number} genres.id
 * @property {string} genres.name
 * @property {string} homepage
 * @property {number} id
 * @property {string} imdb_id
 * @property {string} original_language
 * @property {string} original_title
 * @property {string} overview
 * @property {number} popularity
 * @property {string} poster_path
 * @property {object[]} production_companies
 * @property {number} production_companies.id
 * @property {string|null} production_companies.logo_path
 * @property {string} production_companies.name
 * @property {string} production_companies.origin_country
 * @property {object[]} production_countries
 * @property {string} production_countries.iso_3166_1
 * @property {string} production_countries.name
 * @property {string} release_date
 * @property {number} revenue
 * @property {number} runtime
 * @property {object[]} spoken_languages
 * @property {string} spoken_languages.english_name
 * @property {string} spoken_languages.iso_639_1
 * @property {string} spoken_languages.name
 * @property {string} status
 * @property {string} tagline
 * @property {string} title
 * @property {boolean} video
 * @property {number} vote_average
 * @property {number} vote_count
 */

/**
 * @typedef {Object} VideoResult
 * @property {string} iso_639_1
 * @property {string} iso_3166_1
 * @property {string} name
 * @property {string} key
 * @property {string} site
 * @property {number} size
 * @property {string} type
 * @property {boolean} official
 * @property {string} published_at
 * @property {string} id
 */

/**
 * @typedef {object} Videos
 * @property {number} id
 * @property {VideoResult[]} results

 */

/**
 * @typedef {Object} Content
 * @property {TVShowResult|MovieResult|TVShowDetail|MovieDetail} info
 * @property {HTMLElement|undefined} element
 * @property {string|undefined} transformOrigin
 * @property {boolean|undefined} open
 */
