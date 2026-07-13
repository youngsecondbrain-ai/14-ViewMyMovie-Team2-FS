import defaultPoster1 from '../../assets/images/default-poster-1.png'
import defaultPoster2 from '../../assets/images/default-poster-2.png'
import defaultPoster3 from '../../assets/images/default-poster-3.png'
import defaultPoster4 from '../../assets/images/default-poster-4.png'

const defaultPosters = [
  defaultPoster1,
  defaultPoster2,
  defaultPoster3,
  defaultPoster4,
]

// 렌더링될 때마다 디폴트 이미지를 랜덤으로 설정
function getRandomPosterImage() {
  const randomIndex = Math.floor(Math.random() * defaultPosters.length)

  return defaultPosters[randomIndex]
}

function getPosterImage(movie) {
  if (movie.posterImageUrl) {
    return movie.posterImageUrl
  }

  return getRandomPosterImage()
}

export { getRandomPosterImage, getPosterImage }
