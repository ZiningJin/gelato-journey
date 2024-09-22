'use client'

import React, { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Button } from "./ui/button"
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react'

import { cities } from '@/data/cities'
import { City } from '@/types/City'


// interface AnimatedPlaneProps {
//   visitedCities: City[];
// }

// const AnimatedPlane: React.FC<AnimatedPlaneProps> = ({ visitedCities }) => {
//   const [planePosition, setPlanePosition] = useState(visitedCities[0].coordinates)
//   const [currentSegment, setCurrentSegment] = useState(0)
//   const [segmentProgress, setSegmentProgress] = useState(0)
//   // const map = useMap()

//   useEffect(() => {
//     const animatePlane = () => {
//       const startCity = visitedCities[currentSegment]
//       const endCity = visitedCities[(currentSegment + 1) % visitedCities.length]
      
//       const startLat = startCity.coordinates[0]
//       const startLng = startCity.coordinates[1]
//       const endLat = endCity.coordinates[0]
//       const endLng = endCity.coordinates[1]

//       const newLat = startLat + (endLat - startLat) * segmentProgress
//       const newLng = startLng + (endLng - startLng) * segmentProgress

//       setPlanePosition([newLat, newLng])

//       setSegmentProgress(prevProgress => {
//         const newProgress = prevProgress + 0.005
//         if (newProgress >= 1) {
//           setCurrentSegment(prev => (prev + 1) % visitedCities.length)
//           return 0
//         }
//         return newProgress
//       })
//     }

//     const intervalId = setInterval(animatePlane, 50)
//     return () => clearInterval(intervalId)
//   }, [currentSegment, segmentProgress, visitedCities])

//   const planeIcon = L.divIcon({
//     html: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF90B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>',
//     className: 'plane-icon',
//     iconSize: [24, 24],
//     iconAnchor: [12, 12],
//   })

//   return (
//     <Marker position={planePosition} icon={planeIcon} zIndexOffset={1000}>
//       <Popup>Current Position</Popup>
//     </Marker>
//   )
// }

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)
const Polyline = dynamic(
  () => import('react-leaflet').then((mod) => mod.Polyline),
  { ssr: false }
)

const AnimatedPlane = dynamic(
  () => import('@/components/AnimatedPlane').then((mod) => mod.default),
  { ssr: false }
)

export default function TravelMap() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  // useEffect(() => {
  //   delete L.Icon.Default.prototype._getIconUrl;
  //   L.Icon.Default.mergeOptions({
  //     iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  //     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  //     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  //   });
  // }, []);

  const DefaultIcon = L.icon({
    iconUrl: '/images/marker-icon-blue.png',
    iconRetinaUrl: '/images/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  useEffect(() => {
    // const DefaultIcon = L.icon({
    //   // iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    //   // iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    //   iconUrl: '/images/marker-icon-blue.png',
    //   iconRetinaUrl: '/images/marker-icon-2x-blue.png',
    //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    //   iconSize: [25, 41],
    //   iconAnchor: [12, 41],
    //   popupAnchor: [1, -34],
    //   tooltipAnchor: [16, -28],
    //   shadowSize: [41, 41]
    // });
  
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []); 

  const visitedCities = useMemo(() => {
    return cities.filter(city => city.visited).sort((a, b) => new Date(a.date || '').getTime() - new Date(b.date || '').getTime())
  }, [])

  const flightPath = visitedCities.map(city => city.coordinates)


  const customIcon = L.icon({
    // iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconUrl: '/images/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F0]">
      <header className="bg-[#FF90B3] text-white py-6">
        <h1 className="text-3xl font-bold text-center font-serif">Charlie ~ Amorino Gelato Journey</h1>
      </header>
      <main className="flex-grow p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 relative">
          <div className="w-full relative" style={{ height: '600px' }}>
            <MapContainer 
              center={[20, 0]} 
              zoom={2} 
              style={{ height: '100%', width: '100%' }}
              className="rounded-lg"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {cities.map((city, index) => (
                <Marker 
                  key={index} 
                  position={city.coordinates} 
                  icon={city.visited ? customIcon : DefaultIcon} // new L.Icon.Default()
                  eventHandlers={{
                    click: () => {
                      if (city.visited) {
                        setSelectedCity(city)
                        setCurrentPhotoIndex(0)
                      }
                    },
                  }}
                >
                  <Popup>
                    <div className="font-bold">{city.name}</div>
                    {city.visited ? (
                      <div>
                        <p>Visited on: {city.date}</p>
                        <Button 
                          onClick={() => {
                            setSelectedCity(city)
                            setCurrentPhotoIndex(0)
                          }}
                          className="mt-2 bg-[#FF90B3] hover:bg-[#FF70A3] text-white"
                        >
                          View Photos
                        </Button>
                      </div>
                    ) : (
                      <p>Not visited yet</p>
                    )}
                  </Popup>
                </Marker>
              ))}
              <Polyline 
                positions={flightPath}
                color="#FF90B3"
                dashArray="5, 5"
              />
              <AnimatedPlane visitedCities={visitedCities} />
            </MapContainer>
            {selectedCity && selectedCity.photos && (
              <div className="absolute top-4 left-4 w-64 bg-white rounded-lg shadow-lg p-4 z-[1000]">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-bold text-[#FF90B3]">{selectedCity.name}</h2>
                  <Button
                    onClick={() => setSelectedCity(null)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                    aria-label="Close photo carousel"
                  >
                    <XIcon size={20} />
                  </Button>
                </div>
                <div className="relative">
                  <img 
                    src={selectedCity.photos[currentPhotoIndex]} 
                    alt={`${selectedCity.name} scene ${currentPhotoIndex + 1}`} 
                    className="w-full h-40 object-cover rounded-lg shadow-md"
                  />
                  <Button
                    onClick={() => setCurrentPhotoIndex((prev) => (prev - 1 + selectedCity.photos!.length) % selectedCity.photos!.length)}
                    className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#FF90B3] rounded-full p-1"
                    aria-label="Previous photo"
                  >
                    <ChevronLeftIcon size={20} />
                  </Button>
                  <Button
                    onClick={() => setCurrentPhotoIndex((prev) => (prev + 1) % selectedCity.photos!.length)}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#FF90B3] rounded-full p-1"
                    aria-label="Next photo"
                  >
                    <ChevronRightIcon size={20} />
                  </Button>
                </div>
                <div className="flex justify-center mt-2">
                  {selectedCity.photos.map((_, index) => (
                    <Button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`w-2 h-2 rounded-full mx-1 ${
                        index === currentPhotoIndex ? 'bg-[#FF90B3]' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to photo ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-md z-[1000]">
              <h3 className="font-bold mb-2">Legend</h3>
              <div className="flex items-center mb-1">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                <span>Visited</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                <span>Not visited</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}