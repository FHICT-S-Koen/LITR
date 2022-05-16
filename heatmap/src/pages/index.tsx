import Search, { OptionProps } from '../components/search/Search'
import ResetButton from '../components/resetButton/ResetButton'
import StoreProvider from './Store'
import dynamic from "next/dynamic"

const Map = dynamic(() => import("../components/Map"), { ssr:false })
import options from '../components/search/data/options.json'


export async function getStaticProps() {
  return {
    props: { options }
  }
}

const Home: React.FC<{options: OptionProps[]}> = ({options}) => {
  return <StoreProvider>
    <Search options={options} />
    <ResetButton />
    <Map />
  </StoreProvider>
}

export default Home
