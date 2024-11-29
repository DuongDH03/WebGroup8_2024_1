import {HomeSlider} from "../components/HomeSlider/HomeSlider"
import MovieCarousel from "../components/MovieCarousel/MovieCarousel"
import { NowShowing } from "../components/MoviePagination/NowShowing"

export default function Home() {
  return (
      <main>
        <div className="container-fluid">
          <HomeSlider/>
          <div className="md:px-24">
            <NowShowing/>
            <MovieCarousel/>
          </div>
        </div>
      </main>
  )
}
