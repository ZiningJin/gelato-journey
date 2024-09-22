// import TravelMap from '@/components/TravelMap'

// export default function Home() {
//   return (
//     <main>
//       <TravelMap />
//     </main>
//   )
// }

import dynamic from 'next/dynamic'

const TravelMap = dynamic(() => import('@/components/TravelMap'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
})

export default function Home() {
  return (
    <main>
      <TravelMap />
    </main>
  )
}