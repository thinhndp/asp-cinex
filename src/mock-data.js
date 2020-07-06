export const mockRated = [
  {
    id: "rated_00",
    name: "PG-13",
    minAge: 13
  },
  {
    id: "rated_01",
    name: "R",
    minAge: 17
  },
  {
    id: "rated_02",
    name: "PG",
    minAge: 9
  }
]

export const mockScreenTypes = [
  {
    id: 'screenType_00',
    name: '2D',
  },
  {
    id: 'screenType_01',
    name: '3D',
  },
  {
    id: 'screenType_02',
    name: 'IMAX',
  },
  {
    id: 'screenType_03',
    name: 'CINEMA 4D',
  },
]

const mockGenres = [
  {
    id: 'genre_00',
    name: 'Crime',
  },
  {
    id: 'genre_01',
    name: 'Drama',
  },
  {
    id: 'genre_02',
    name: 'Thriller',
  },
  {
    id: 'genre_03',
    name: 'Action',
  },
  {
    id: 'genre_04',
    name: 'Adventure',
  },
  {
    id: 'genre_05',
    name: 'Sci-fi',
  },
  {
    id: 'genre_06',
    name: 'Animation',
  },
  {
    id: 'genre_07',
    name: 'Comedy',
  },
  {
    id: 'genre_08',
    name: 'Fantasy',
  },
]

// export const mockNowOnMovies = [
//   {
//     id: 'movie_00',
//     poster: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
//     title: 'Gã hề dí dỏm',
//     runtime: 122,
//     genres: [ mockGenres[0], mockGenres[1], mockGenres[2] ],
//   },
//   {
//     id: 'movie_01',
//     poster: 'https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
//     title: 'Batman v Superman: Dawn of Justice',
//     runtime: 151,
//     genres: [ mockGenres[3], mockGenres[4], mockGenres[5] ],
//   },
//   {
//     id: 'movie_02',
//     poster: 'https://m.media-amazon.com/images/M/MV5BZmUxZmVlNGMtZGMyMy00MmM3LTg5ZjgtNzFhZWU4MTU5MjIwXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_SY1000_CR0,0,666,1000_AL_.jpg',
//     title: 'Code Geass: Lelouch of the Re;Surrection',
//     runtime: 112,
//     genres: [ mockGenres[3], mockGenres[4], mockGenres[6] ],
//   },
//   {
//     id: 'movie_03',
//     poster: 'https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
//     title: 'Spider-Man: Into the Spider-Verse',
//     runtime: 117,
//     genres: [ mockGenres[3], mockGenres[4], mockGenres[6] ],
//   },
// ]

// showtime {
//   -id: string
//   -movieId: string
//   -startAt: yyyy-MM-ddThh:mm:ss.SSS
//   -screenType: string
//   }

const movieBatVSup = {
  id: "5dfde0cff7c51f000463c3d0",
  title: "Batman v Superman: Dawn of Justice",
  genres: [
    mockGenres[3],
    mockGenres[4],
    mockGenres[5],
  ],
  screenTypes: [
    mockScreenTypes[0],
    mockScreenTypes[1],
    mockScreenTypes[2],
  ],
  directors: [
    "Zack Snyder"
  ],
  actors: [
    {
      name: "Henry Cavill",
      avatar: "http://assets.htv.com.vn/Images/TAP%20CHI%20HTV/THE%20GIOI%20NGHE%20SI/DUONG/HENRY%20CAVILL/henry1.jpg"
    },
    {
      name: "Ben Affleck",
      avatar: "https://irp-cdn.multiscreensite.com/ce0ec9f3/dms3rep/multi/mobile/Ben+Affleck+-+Website.jpg"
    }
  ],
  country: "USA",
  released: "2016-03-25",
  endAt: "2020-02-20",
  runtime: 151,
  poster: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  wallpapers: [
    'https://images.wallpapersden.com/image/download/batman-vs-superman-hd-images_39935_3840x2160.jpg',
  ],
  trailer: 'https://www.youtube.com/watch?v=IwfUnkBfdZ4&feature=emb_title',
  rated: mockRated[0],
  storyline: `Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.`,
}

const movieJumanji = {
  id: "5dfd60ab4c0e77252cd94c04",
  title: "Jumanji: The Next Level",
  genres: [
    mockGenres[3],
    mockGenres[4],
    mockGenres[7],
    mockGenres[8],
  ],
  screenTypes: [
    mockScreenTypes[1],
    mockScreenTypes[2],
  ],
  directors: [
    "Jake Kasdan"
  ],
  actors: [
    {
      "name": "Tom Holland",
      "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJD9EvYUTXc5oRQy0FdIgan14l1kcnscVwQ5ln_XmzFUM-rqn9&s"
    },
    {
      "name": "Samuel L. Jackson",
      "avatar": "https://pbs.twimg.com/profile_images/742877069793742848/c0Ec2mTU_400x400.jpg"
    }
  ],
  country: "USA",
  released: "2019-12-13",
  endAt: "2020-01-10",
  runtime: 123,
  poster: "https://m.media-amazon.com/images/M/MV5BOTVjMmFiMDUtOWQ4My00YzhmLWE3MzEtODM1NDFjMWEwZTRkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
  wallpapers: [
    'http://hdqwalls.com/wallpapers/jumanji-the-next-level-2019-poster-e4.jpg',
  ],
  trailer: 'https://www.youtube.com/watch?v=rBxcF-r9Ibs',
  rated: mockRated[0],
  storyline: `In Jumanji: The Next Level, the gang is back but the game has changed. As they return to rescue one of their own, the players will have to brave parts unknown from arid deserts to snowy mountains, to escape the world's most dangerous game.`,
}

const movieJoker = {
  id: "5dfdae425020f2000492211e",
  title: "Joker",
  genres: [
    mockGenres[0],
    mockGenres[1],
    mockGenres[2],
  ],
  screenTypes: [
    mockScreenTypes[0],
    mockScreenTypes[1],
  ],
  directors: [
    "Todd Phillips"
  ],
  actors: [
    {
      "name": "Tom Holland",
      "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJD9EvYUTXc5oRQy0FdIgan14l1kcnscVwQ5ln_XmzFUM-rqn9&s"
    },
    {
      "name": "Samuel L. Jackson",
      "avatar": "https://pbs.twimg.com/profile_images/742877069793742848/c0Ec2mTU_400x400.jpg"
    }
  ],
  country: "USA, Canada",
  released: "2019-10-04",
  endAt: "2020-02-12",
  runtime: 123,
  poster: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
  wallpapers: [
    'https://cdn.onebauer.media/one/media/5d20/5d91/a205/650c/a1d3/d71f/empire-joker-subscriber-cover-crop.jpeg',
  ],
  trailer: 'https://www.youtube.com/watch?v=-_DJEzZk2pc',
  rated: mockRated[1],
  storyline: `In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.`,
}

const movieFrozen2 = {
  id: "5dfdc3e14c0e774040d1cf4b",
  title: "Frozen II",
  genres: [
    mockGenres[0],
    mockGenres[1],
    mockGenres[2],
  ],
  screenTypes: [
    mockScreenTypes[0],
    mockScreenTypes[1],
  ],
  directors: [
    "Todd Phillips"
  ],
  actors: [
    {
      "name": "Tom Holland",
      "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJD9EvYUTXc5oRQy0FdIgan14l1kcnscVwQ5ln_XmzFUM-rqn9&s"
    },
    {
      "name": "Samuel L. Jackson",
      "avatar": "https://pbs.twimg.com/profile_images/742877069793742848/c0Ec2mTU_400x400.jpg"
    }
  ],
  country: "USA, Canada",
  released: "2019-10-04",
  endAt: "2020-02-12",
  runtime: 123,
  poster: "https://m.media-amazon.com/images/M/MV5BMjA0YjYyZGMtN2U0Ni00YmY4LWJkZTItYTMyMjY3NGYyMTJkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SX300.jpg",
  wallpapers: [
    'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5298bac0-b8bf-4c80-af67-725c1272dbb0/ddh9mhe-6f1a09a3-ef19-4d0c-8c0b-86414e57be3f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzUyOThiYWMwLWI4YmYtNGM4MC1hZjY3LTcyNWMxMjcyZGJiMFwvZGRoOW1oZS02ZjFhMDlhMy1lZjE5LTRkMGMtOGMwYi04NjQxNGU1N2JlM2YuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.DlwSAHBxFOvHKtUXu0UhpLG8yApLy5EJzopS1acrf60',
  ],
  trailer: 'https://www.youtube.com/watch?v=Zi4LMpSDccc',
  rated: mockRated[2],
  storyline: `Anna, Elsa, Kristoff, Olaf and Sven leave Arendelle to travel to an ancient, autumn-bound forest of an enchanted land. They set out to find the origin of Elsa's powers in order to save their kingdom.`,
}

const movieManOfSteel = {
  id: "5dfe09f483e8cf00042dc69b",
  title: "Man of Steel",
  genres: [
    mockGenres[3],
    mockGenres[4],
    mockGenres[5],
  ],
  screenTypes: [
    mockScreenTypes[0],
    mockScreenTypes[1],
  ],
  directors: [
    "Zack Snyder"
  ],
  actors: [
    {
      "name": "Tom Holland",
      "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJD9EvYUTXc5oRQy0FdIgan14l1kcnscVwQ5ln_XmzFUM-rqn9&s"
    },
    {
      "name": "Samuel L. Jackson",
      "avatar": "https://pbs.twimg.com/profile_images/742877069793742848/c0Ec2mTU_400x400.jpg"
    }
  ],
  country: "USA",
  released: "2019-10-04",
  endAt: "2020-02-12",
  runtime: 143,
  poster: "https://m.media-amazon.com/images/M/MV5BMTk5ODk1NDkxMF5BMl5BanBnXkFtZTcwNTA5OTY0OQ@@._V1_SX300.jpg",
  wallpapers: [
    'https://ultrahdwall.com/wp-content/uploads/2013/08/Man-of-Steel-Wallpaper.jpg',
  ],
  trailer: 'https://www.youtube.com/watch?v=T6DJcgm3wNY',
  rated: mockRated[0],
  storyline: `Clark Kent is an alien who as a child was evacuated from his dying world and came to Earth, living as a normal human. But when survivors of his alien home invade Earth, he must reveal himself to the world.`,
}

const movieAvengersIW = {
  id: "avengersiw",
  title: "Avengers: Infinity War",
  genres: [
    mockGenres[3],
    mockGenres[4],
    mockGenres[5],
  ],
  screenTypes: [
    mockScreenTypes[0],
    mockScreenTypes[1],
    mockScreenTypes[2],
  ],
  directors: [
    "Anthony Russo",
    "Joe Russo"
  ],
  actors: [
    {
      "name": "Robert Downey Jr.",
      "avatar": "https://m.media-amazon.com/images/M/MV5BNzg1MTUyNDYxOF5BMl5BanBnXkFtZTgwNTQ4MTE2MjE@._V1_SY1000_CR0,0,664,1000_AL_.jpg"
    },
    {
      "name": "Tom Holland",
      "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJD9EvYUTXc5oRQy0FdIgan14l1kcnscVwQ5ln_XmzFUM-rqn9&s"
    },
    {
      "name": "Samuel L. Jackson",
      "avatar": "https://pbs.twimg.com/profile_images/742877069793742848/c0Ec2mTU_400x400.jpg"
    }
  ],
  country: "USA",
  released: "2019-10-04",
  endAt: "2020-02-12",
  runtime: 143,
  poster: "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
  wallpapers: [
    'https://wallpaperaccess.com/full/5920.jpg',
  ],
  trailer: 'https://www.youtube.com/watch?v=TcMBFSGVi1c',
  rated: mockRated[0],
  storyline: `The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.`,
}

const movieSMH = {
  id: "spoodermanh",
  title: "Spider-Man: Homecoming",
  genres: [
    mockGenres[3],
    mockGenres[4],
    mockGenres[5],
  ],
  screenTypes: [
    mockScreenTypes[0],
    mockScreenTypes[1],
    mockScreenTypes[2],
  ],
  directors: [
    "Jon Watts",
  ],
  actors: [
    {
      "name": "Robert Downey Jr.",
      "avatar": "https://m.media-amazon.com/images/M/MV5BNzg1MTUyNDYxOF5BMl5BanBnXkFtZTgwNTQ4MTE2MjE@._V1_SY1000_CR0,0,664,1000_AL_.jpg"
    },
    {
      "name": "Tom Holland",
      "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJD9EvYUTXc5oRQy0FdIgan14l1kcnscVwQ5ln_XmzFUM-rqn9&s"
    },
  ],
  country: "USA",
  released: "2019-10-04",
  endAt: "2020-02-12",
  runtime: 133,
  poster: "https://m.media-amazon.com/images/M/MV5BNTk4ODQ1MzgzNl5BMl5BanBnXkFtZTgwMTMyMzM4MTI@._V1_SY1000_CR0,0,658,1000_AL_.jpg",
  wallpapers: [
    'https://wallpaperaccess.com/full/243562.jpg',
  ],
  trailer: 'https://www.youtube.com/watch?v=TcMBFSGVi1c',
  rated: mockRated[0],
  storyline: `Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City.`,

}
const movieCGLLR = {
  id: "codegeassllres",
  title: "Code Geass: Lelouch of the Re;Surrection",
  genres: [
    mockGenres[3],
    mockGenres[4],
    mockGenres[6],
  ],
  screenTypes: [
    mockScreenTypes[0],
  ],
  directors: [
    "Gorou Taniguchi",
  ],
  actors: [
    {
      "name": "Robert Downey Jr.",
      "avatar": "https://m.media-amazon.com/images/M/MV5BNzg1MTUyNDYxOF5BMl5BanBnXkFtZTgwNTQ4MTE2MjE@._V1_SY1000_CR0,0,664,1000_AL_.jpg"
    },
    {
      "name": "Tom Holland",
      "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJD9EvYUTXc5oRQy0FdIgan14l1kcnscVwQ5ln_XmzFUM-rqn9&s"
    },
  ],
  country: "Japan",
  released: "2019-10-04",
  endAt: "2020-02-12",
  runtime: 112,
  poster: "https://m.media-amazon.com/images/M/MV5BZmUxZmVlNGMtZGMyMy00MmM3LTg5ZjgtNzFhZWU4MTU5MjIwXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
  wallpapers: [
    'https://cdna.artstation.com/p/assets/images/images/005/637/736/large/alex-os-zero.jpg?1492631829&dl=1',
  ],
  trailer: 'https://www.youtube.com/watch?v=fEiX_69tu2I',
  rated: mockRated[0],
  storyline: `The story takes place several years after Lelouch's "Zero Requiem" plan.`,
}
const movieSMITSV = {
  id: "spooderanimation",
  title: "Spider-Man: Into the Spider-Verse",
  genres: [
    mockGenres[3],
    mockGenres[4],
    mockGenres[6],
  ],
  screenTypes: [
    mockScreenTypes[0],
  ],
  directors: [
    "Bob Persichetti",
    "Peter Ramsey"
  ],
  actors: [
    {
      "name": "Robert Downey Jr.",
      "avatar": "https://m.media-amazon.com/images/M/MV5BNzg1MTUyNDYxOF5BMl5BanBnXkFtZTgwNTQ4MTE2MjE@._V1_SY1000_CR0,0,664,1000_AL_.jpg"
    },
    {
      "name": "Tom Holland",
      "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJD9EvYUTXc5oRQy0FdIgan14l1kcnscVwQ5ln_XmzFUM-rqn9&s"
    },
  ],
  country: "Africa",
  released: "2019-10-04",
  endAt: "2020-02-12",
  runtime: 117,
  poster: "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
  wallpapers: [
    'https://i.pinimg.com/originals/a9/e8/60/a9e8603c729f89e6d7c427b48ab74fca.png',
  ],
  trailer: 'https://www.youtube.com/watch?v=fEiX_69tu2I',
  rated: mockRated[0],
  storyline: `Teen Miles Morales becomes Spider-Man of his reality, crossing his path with five counterparts from other dimensions to stop a threat for all realities.`,
}
const movieCapUSCW = {
  id: "captainUScivilquarrel",
  title: "Captain America: Civil War",
  genres: [
    mockGenres[3],
    mockGenres[4],
    mockGenres[7],
  ],
  screenTypes: [
    mockScreenTypes[0],
    mockScreenTypes[1],
  ],
  directors: [
    "Anthony Russo",
    "Joe Russo"
  ],
  actors: [
    {
      "name": "Robert Downey Jr.",
      "avatar": "https://m.media-amazon.com/images/M/MV5BNzg1MTUyNDYxOF5BMl5BanBnXkFtZTgwNTQ4MTE2MjE@._V1_SY1000_CR0,0,664,1000_AL_.jpg"
    },
    {
      "name": "Tom Holland",
      "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJD9EvYUTXc5oRQy0FdIgan14l1kcnscVwQ5ln_XmzFUM-rqn9&s"
    },
  ],
  country: "USA",
  released: "2019-10-04",
  endAt: "2020-02-12",
  runtime: 147,
  poster: "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
  wallpapers: [
    'https://wallpaperplay.com/walls/full/9/6/8/96192.jpg',
  ],
  trailer: 'https://www.youtube.com/watch?v=fEiX_69tu2I',
  rated: mockRated[0],
  storyline: `Political involvement in the Avengers' affairs causes a rift between Captain America and Iron Man.`,
}

export const mockNowOnMovies = [
  movieBatVSup, movieFrozen2, movieJoker, movieJumanji, movieManOfSteel, movieAvengersIW, movieCGLLR, movieSMITSV
]

export const mockMovies = [
  movieBatVSup, movieFrozen2, movieJoker, movieJumanji, movieManOfSteel, movieAvengersIW, movieCGLLR, movieCapUSCW, movieSMH, movieSMITSV
]

export const mockUpcomingMovies = [
  movieAvengersIW, movieCGLLR, movieCapUSCW, movieSMH, movieSMITSV
]


  
export const mockShowtimes = [
  {
    id: 'showtime_00',
    movie: mockNowOnMovies[0],
    startAt: '2019-12-24T11:30:00.000',
    screenType: mockScreenTypes[0],
  },
  {
    id: 'showtime_01',
    movie: mockNowOnMovies[0],
    startAt: '2019-12-24T15:30:00.000',
    screenType: mockScreenTypes[0],
  },
  {
    id: 'showtime_02',
    movie: mockNowOnMovies[0],
    startAt: '2019-12-24T21:00:00.000',
    screenType: mockScreenTypes[0],
  },
  {
    id: 'showtime_03',
    movie: mockNowOnMovies[0],
    startAt: '2019-12-22T9:30:00.000',
    screenType: mockScreenTypes[0],
  },
  {
    id: 'showtime_04',
    movie: mockNowOnMovies[0],
    startAt: '2019-12-22T13:30:00.000',
    screenType: mockScreenTypes[0],
  },
  {
    id: 'showtime_05',
    movie: mockNowOnMovies[0],
    startAt: '2019-12-22T18:00:00.000',
    screenType: mockScreenTypes[0],
  },
  {
    id: 'showtime_06',
    movie: mockNowOnMovies[0],
    startAt: '2019-12-24T9:30:00.000',
    screenType: mockScreenTypes[2],
  },
  {
    id: 'showtime_07',
    movie: mockNowOnMovies[0],
    startAt: '2019-12-24T13:30:00.000',
    screenType: mockScreenTypes[2],
  },
  {
    id: 'showtime_08',
    movie: mockNowOnMovies[0],
    startAt: '2019-12-24T18:00:00.000',
    screenType: mockScreenTypes[2],
  },
  {
    id: 'showtime_09',
    movie: mockNowOnMovies[1],
    startAt: '2019-12-24T18:00:00.000',
    screenType: mockScreenTypes[1],
  },
  {
    id: 'showtime_10',
    movie: 'movie_02',
    startAt: '2019-12-22T13:00:00.000',
    screenType: mockScreenTypes[1],
  },
  {
    id: 'showtime_11',
    movie: mockNowOnMovies[1],
    startAt: '2019-12-22T11:30:00.000',
    screenType: mockScreenTypes[0],
  },
  {
    id: 'showtime_12',
    movie: mockNowOnMovies[1],
    startAt: '2019-12-22T15:30:00.000',
    screenType: mockScreenTypes[0],
  },
  {
    id: 'showtime_13',
    movie: mockNowOnMovies[1],
    startAt: '2019-12-22T21:00:00.000',
    screenType: mockScreenTypes[0],
  },
  {
    id: 'showtime_14',
    movie: mockNowOnMovies[1],
    startAt: '2019-12-23T9:30:00.000',
    screenType: mockScreenTypes[0],
  },
  {
    id: 'showtime_15',
    movie: mockNowOnMovies[1],
    startAt: '2019-12-23T13:30:00.000',
    screenType: mockScreenTypes[0],
  },
  {
    id: 'showtime_16',
    movie: mockNowOnMovies[1],
    startAt: '2019-12-23T18:00:00.000',
    screenType: mockScreenTypes[0],
  },
  {
    id: 'showtime_17',
    movie: mockNowOnMovies[1],
    startAt: '2019-12-22T9:30:00.000',
    screenType: mockScreenTypes[2],
  },
  {
    id: 'showtime_18',
    movie: mockNowOnMovies[1],
    startAt: '2019-12-22T13:30:00.000',
    screenType: mockScreenTypes[2],
  },
  {
    id: 'showtime_19',
    movie: mockNowOnMovies[1],
    startAt: '2019-12-22T18:00:00.000',
    screenType: mockScreenTypes[2],
  },
  {
    id: 'showtime_20',
    movie: mockNowOnMovies[2],
    startAt: '2019-12-22T18:00:00.000',
    screenType: mockScreenTypes[1],
  },
  {
    id: 'showtime_21',
    movie: mockNowOnMovies[3],
    startAt: '2019-12-23T13:00:00.000',
    screenType: mockScreenTypes[1],
  },
  {
    id: 'showtime_22',
    movie: mockNowOnMovies[6],
    startAt: '2019-12-23T13:00:00.000',
    screenType: mockScreenTypes[1],
  },
]