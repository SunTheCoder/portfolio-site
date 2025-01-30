'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import type { LeafletMouseEventHandlerFn } from 'leaflet';

interface ImpactPoint {
  id: string;
  position: [number, number]; // [latitude, longitude]
  title: string;
  description: string;
  date: string;
  impact: string;
  technologies?: string[];
}

const impactPoints: ImpactPoint[] = [
  {
    id: 'amerind-nation',
    position: [35.6870, -105.9378], // Santa Fe, NM
    title: 'Amerind Nation',
    description: 'Developed platform connecting Indigenous Nations with clean energy funding opportunities',
    date: '2024 - Present',
    impact: 'Helped facilitate over $10M in clean energy funding for Indigenous communities',
    technologies: ['Next.js', 'Python/Flask', 'PostgreSQL', 'AWS', 'GIS']
  },
  {
    id: 'longwood',
    position: [37.2966, -78.3989], // Farmville, VA
    title: 'Longwood University',
    description: 'AI-powered art recommendation system for university museum',
    date: '2022 - Present',
    impact: 'Enhanced museum experience for 10,000+ annual visitors',
    technologies: ['TensorFlow', 'React Native', 'Python', 'Node.js']
  },
  {
    id: 'mica',
    position: [39.3086, -76.6200], // Baltimore, MD
    title: 'Maryland Institute College of Art',
    description: 'Graphic design and web development education',
    date: '2011 - 2013',
    impact: 'Foundation in design principles and web technologies',
    technologies: ['Adobe Creative Suite', 'HTML', 'CSS']
  },
  {
    id: 'sfmoma',
    position: [37.7749, -122.4194], // San Francisco, CA
    title: 'San Francisco Museum of Modern Art',
    description: 'Web development and design internship',
    date: '2013 - 2014',
    impact: 'Gained practical experience in web design and development',
    technologies: ['WordPress', 'HTML', 'CSS']
  },
  {
    id: 'yerba-buena',
    position: [37.7749, -122.4194], // San Francisco, CA
    title: 'Yerba Buena',
    description: 'Started a family farm to serve the local community',
    date: '2018-Present',
    impact: 'Fed 100+ families in the local community',
    technologies: []
  },
  {
    id: 'liberation-seed-farm',
    position: [37.298901, -78.519696], // San Francisco, CA
    title: 'Liberation Seed Farm',
    description: 'Started a family farm to serve the local community',
    date: '2018-Present',
    impact: 'Fed 100+ families in the local community',
    technologies: []
  },
  {
    id: 'magma-build-studios',
    position: [39.326302, -76.662210],
    title: 'Magma Build Studios',
    description: 'Magma Build Studios is a design and build studio that specializes in creating custom homes and renovations.',
    date: '2018-Present',
    impact: 'Lead the fabrication of a product that saves lives in ocean emergencies and led the design of some of the in-house processes.',
    technologies: []
  },
  {
    id: 'amend',
    position: [46.977729, -119.305985],
    title: 'Amend Project',
    description: 'A video project about prisona bolishment and more humane practices.',
    date: '2022',
    impact: 'The resulting video was seen by the prison industry all over the globe.',
    technologies: []
  },
  {
    id: 'soul-fire',
    position: [40.7128, -74.0060],
    title: 'Soul Fire Farm',
    description: 'A farm that grows food for the local community.',
    date: '2019-2021',
    impact: 'Lead participants in a 100+ acre farm. Educated participants in sustainable farming practices.',
    technologies: []
  }
];

export default function Map() {
  const popupTimeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseOver: LeafletMouseEventHandlerFn = (e) => {
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
    }
    popupTimeoutRef.current = setTimeout(() => {
      e.target.openPopup();
    }, 600);
  };

  const handleMouseOut: LeafletMouseEventHandlerFn = (e) => {
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
    }
    e.target.closePopup();
  };

  return (
    <MapContainer
      center={[37.5407, -77.4360]} // Center on Richmond
      zoom={7}
      scrollWheelZoom={false}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {impactPoints.map((point) => (
        <Marker
          key={point.id}
          position={point.position}
          eventHandlers={{
            mouseover: handleMouseOver,
            mouseout: handleMouseOut,
          }}
        >
          <Popup className="custom-popup">
            <div className="p-2 max-w-xs">
              <h3 className="font-bold text-lg mb-1">{point.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{point.date}</p>
              <p className="text-sm mb-2">{point.description}</p>
              <p className="text-sm text-blue-600 mb-2">{point.impact}</p>
              {point.technologies && (
                <div className="flex flex-wrap gap-1">
                  {point.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 