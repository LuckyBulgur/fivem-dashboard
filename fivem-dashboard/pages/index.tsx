import Footer from '../components/footer';
import Header from '../components/header';
import HomePage from '../components/home';

import type { NextPage } from 'next'
const Home: NextPage = () => {
  return (
    <div className="bg-myblue bg-gradient-to-t from-slate-900 to-[#b1825c] h-screen">
      <Header title="Dashboard"></Header>
      <HomePage primaryText='Fivem-Dashboard' secondaryText='Verwalte deine Autos und vieles mehr im Browser.'></HomePage>
      <Footer></Footer>
    </div>
  )
}

export default Home
