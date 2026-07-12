import { useParams } from 'react-router'

const MovieDetailPage = () => {
  const { movieId } = useParams()

  return <h1>Movie ID: {movieId}</h1>
}

export default MovieDetailPage
