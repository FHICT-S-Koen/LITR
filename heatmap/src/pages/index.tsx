import { prisma } from "../db"
import dynamic from "next/dynamic"
import { DetectionProps } from "../components/detection/Detection"
const Map = dynamic(() => import("../components/Map"), { ssr:false })

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
  return <Map detections={detections} />
}

export default Home
