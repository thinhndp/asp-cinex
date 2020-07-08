// import moment from 'moment';

export const helper = {
  getFormattedGenresString(genres) {
    var res = '';
    for (var genre of genres) {
      res += genre.name + ', ';
    }
    return res.slice(0, res.length - 2);
  },
  getMonthName(monthNumber) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthNumber];
  },
  getDayOfWeekName(dayOfWeekNumber) {
    const dayOfWeekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
      "Friday", "Saturday"
    ]
    return dayOfWeekNames[dayOfWeekNumber];
  },
  getFormattedTime(date) {
    var res = '';
    const hour = date.getHours();
    const isAM = hour < 12;
    const hourStr = ('0' + (isAM ? hour : hour - 12)).slice(-2); // 2 digits
    const minStr = ('0' + date.getMinutes()).slice(-2);
    res = hourStr + ':' + minStr + ' ' + (isAM ? 'AM' : 'PM');
    // const isoDateString = date.toISOString();
    // console.log(isoDateString);
    // const isoHours = isoDateString.slice(11, 13);
    // const minutes = isoDateString.slice(14, 16);
    // res = isoHours + ':' + minutes;
    return res;
  },
  paginate(array, pageSize, pageNumber) {
    --pageNumber;
    return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
  },
  sortMoviesByReleaseDate(array) {
    if (!array || array.length < 2) {
      return array;
    }
    return array.sort((movie1, movie2) => (new Date(movie1.releasedAt) - new Date(movie2.releasedAt)) )
  },
  sortShowtimesByStartAt(array) {
    // console.log(array);
    if (!array || array.length < 2) {
      return array;
    }
    return array.sort((showtime1, showtime2) => (new Date(showtime1.startAt) - new Date(showtime2.startAt)) )
  },
  getYouTubeID(url){
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    // eslint-disable-next-line no-useless-escape
    return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
  },
  getFormattedDate(date) {
    var res ='';
    res = date.getDate() + ' ' + this.getMonthName(date.getMonth()).slice(0, 3) + ' ' + date.getFullYear();
    return res;
  },
  getOneWallpaper(movies) {
	if (!movies) {
		return 'https://ak2.picdn.net/shutterstock/videos/3776432/thumb/1.jpg';
	}
	for (let movie of movies) {
		if (movie.wallpapers && movie.wallpapers.length > 0) {
			return movie.wallpapers[0];
		}
	}
	return 'https://ak2.picdn.net/shutterstock/videos/3776432/thumb/1.jpg';
  },
  getOneTrailer(movies) {
	if (!movies) {
		return 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
	}
	for (let movie of movies) {
		if (movie.trailer) {
			return movie.trailer;
		}
	}
	return 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  }
}