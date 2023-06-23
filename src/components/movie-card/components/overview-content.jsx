import React from 'react';

const OverviewContent = (movie) => {
  const content = movie.overview;
  const genres = movie.genre_ids;
  const titleLenght = movie.title.length;
  let chars;
  titleLenght >= 15 || genres.length > 3 ? (chars = 50) : (chars = 200);

  if (content.length > chars) {
    const arrContent = content.split(' ');
    const newArr = [];
    let resultString;

    for (let i = 0; i < arrContent.length; i++) {
      newArr.push(arrContent[i]);
      const resultString = newArr.join(' ');

      if (resultString.length >= chars) {
        return `${resultString} ...`;
      }
    }
    return `${resultString} ...`;
  } else return content;
};

export default OverviewContent;