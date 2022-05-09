import { DetectionProps } from '../components/Detection'
import { prisma } from '../db'
import dynamic from "next/dynamic"

const Map = dynamic(() => import("../components/Map"), { ssr:false })

export async function getServerSideProps() {
  const detections = await prisma.detection.findMany({
    include: {
      objects: true
    },
  })

  return {
    props : { detections }
  }
}

type Props = {
  detections: DetectionProps[]
}

const Home: React.FC<Props> = (props) => {
  return <>
    <Map detections={props.detections} />
  </>
}

export default Home
