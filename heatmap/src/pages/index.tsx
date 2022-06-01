import { prisma } from "../db"
import dynamic from "next/dynamic"
import { DetectionProps } from "../components/detection/Detection"
import Head from "next/head"
const Map = dynamic(() => import("../components/map/Map"), { ssr:false })

export async function getServerSideProps() {
  const detections = await prisma.detection.findMany({
    select: {
      id: true,
      objects: true,
      detectedAt: true,
      lat: true,
      lon: true,
      picture: false
    }
  })
  return { props: { detections } }// will be passed to the page component as props
}

const Home: React.FC<{detections: DetectionProps[]}> = ({detections}) => {
  return <>
    <Head>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
      integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
      crossOrigin=""/>
    </Head>
    <Map detections={detections} />
  </>
}

export default Home
