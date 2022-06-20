import '../styles/globals.css'
//import '../styles/scss/index.scss'
import Navbar from '../components/navbar'



function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar/>
      <div className="md:p-10">
      <Component {...pageProps} />
      </div>
      
    </div>
  )
}

export default MyApp
