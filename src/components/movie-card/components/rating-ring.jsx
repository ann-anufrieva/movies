const colors = {
  '3': '#E90000',
  '5': '#E97E00',
  '7': '#E9D100',
  '10': '#66E900',
};

const RatingRing = ( item ) => {
  const stateRating = item.rating;
  const fixedRating = Number(stateRating.toFixed(1));
  const colorsIdx = Object.keys(colors);

  const idx = colorsIdx.findIndex((key, i) => {
    return fixedRating >= Number(colorsIdx[i - 1]) && fixedRating <= Number(key);
  });
  const color = colors[colorsIdx[idx]];
  let style;
  const styles = {
    ...style,
    borderColor: color,
  };
  return (
    <div style={styles} className={'movie-card__rating-ring'}>
      {stateRating.toFixed(1)}
    </div>
  );
};

export default RatingRing;