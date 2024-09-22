'use client'

import React, { useState, useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { City } from '@/types/City'

const AnimatedPlane = ({ visitedCities }: { visitedCities: City[] }) => {
  const [planePosition, setPlanePosition] = useState(visitedCities[0].coordinates)
  const [currentSegment, setCurrentSegment] = useState(0)
  const [segmentProgress, setSegmentProgress] = useState(0)
//   const map = useMap()

  useEffect(() => {
    const animatePlane = () => {
      const startCity = visitedCities[currentSegment]
      const endCity = visitedCities[(currentSegment + 1) % visitedCities.length]
      
      const startLat = startCity.coordinates[0]
      const startLng = startCity.coordinates[1]
      const endLat = endCity.coordinates[0]
      const endLng = endCity.coordinates[1]

      const newLat = startLat + (endLat - startLat) * segmentProgress
      const newLng = startLng + (endLng - startLng) * segmentProgress

      setPlanePosition([newLat, newLng])

      setSegmentProgress(prevProgress => {
        const newProgress = prevProgress + 0.005
        if (newProgress >= 1) {
          setCurrentSegment(prev => (prev + 1) % visitedCities.length)
          return 0
        }
        return newProgress
      })
    }

    const intervalId = setInterval(animatePlane, 50)
    return () => clearInterval(intervalId)
  }, [currentSegment, segmentProgress, visitedCities])

  const planeIcon = L.divIcon({
    html: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF90B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>',
    className: 'plane-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })

  return (
    <Marker position={planePosition} icon={planeIcon} zIndexOffset={1000}>
      <Popup>Current Position</Popup>
    </Marker>
  )
}

export default AnimatedPlane