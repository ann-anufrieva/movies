
import axios from "axios";

const PostRating = async (stars, movie) => {
  const postRatingUrl = `https://api.themoviedb.org/3/movie/${movie.id}/rating?api_key=c5d3833847b4ee2c79d1cb0fa1465e7b&guest_session_id=${localStorage.id}`;
  if (stars) {
    axios({
      method: 'POST',
      url: postRatingUrl,
      data: {
        value: stars,
      },
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    localStorage.setItem(movie.id, stars);
  } else {
    axios({
      method: 'DELETE',
      url: postRatingUrl,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      }
    });
    localStorage.removeItem(movie.id);
  }
};

export default PostRating;

