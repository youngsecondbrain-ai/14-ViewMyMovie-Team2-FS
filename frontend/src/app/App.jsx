import { BrowserRouter, Route, Routes } from 'react-router'
import MainLayout from '../shared/components/layout/MainLayout.jsx'
import HomePage from '../pages/HomePage.jsx'
import RankingsPage from '../pages/RankingsPage.jsx'
import MovieComparisonPage from '../pages/MovieComparisonPage.jsx'
import FundingPage from '../pages/FundingPage.jsx'
import MovieDetailPage from '../pages/MovieDetailPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="rankings" element={<RankingsPage />} />
          <Route path="compare" element={<MovieComparisonPage />} />
          <Route path="funding" element={<FundingPage />} />
          <Route path="movies/:movieId" element={<MovieDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
