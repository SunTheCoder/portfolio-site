'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import type { LeafletMouseEventHandlerFn, PopupEventHandlerFn } from 'leaflet';

interface ImpactPoint {
  id: string;
  position: [number, number]; // [latitude, longitude]
  title: string;
  description: string;
  date: string;
  impactLine1?: string;
  impactLine2?: string;
  impactLine3?: string;
  impactLine4?: string;
  technologies?: string[];
}

const impactPoints: ImpactPoint[] = [
  {
    id: 'amerind-nation',
    position: [35.6870, -105.9378], // Santa Fe, NM
    title: 'Amerind Nation',
    description: 'Developed platform connecting Indigenous Nations with clean energy funding opportunities',
    date: '2024 - Present',
    impactLine1: '• Helped facilitate over $10M in clean energy funding for Indigenous communities',
    impactLine2: '• Led development of a platform connecting Indigenous Nations with clean energy funding opportunities',
    impactLine3: '• Implemented scalable, GIS mapping features and grant management system',
    technologies: ['Next.js', 'Python/Flask', 'PostgreSQL', 'AWS', 'GIS', 'React', 'Redux', 'SQL', 'REST', 'NoSQL', 'Redis', 'Authentication', 'Authorization', 'Testing' ]
  },
  {
    id: 'longwood',
    position: [37.2966, -78.3989], // Farmville, VA
    title: 'Longwood University',
    description: 'AI-powered art recommendation system for university museum',
    date: '2022 - Present',
    impactLine1: '• Enhanced museum experience for 10,000+ annual visitors',
    impactLine2: '• Built mobile application for virtual museum tours',
    impactLine3: '• Developed Art Collection Management Tool built on Redis, AI-powered art recommendation system for university art museum.',
    impactLine4: '• Built an AI art recommendation system for the university art collection.',
    technologies: ['Java', 'TensorFlow', 'React Native', 'Python', 'Node.js', 'Redis', 'AI', 'React', 'Redux', 'SQL', 'NoSQL', 'AWS', 'REST', 'Google Cloud Platform', 'Authentication', 'Authorization', 'Testing' ]
  },
  {
    id: 'mica',
    position: [39.3086, -76.6200], // Baltimore, MD
    title: 'Maryland Institute College of Art',
    description: 'Graphic design and web development education',
    date: '2011 - 2013',
    impactLine1: '• Foundation in design principles and web technologies',
    impactLine2: '• Built a portfolio site for myself and fellow artists and their galleries',
    technologies: ['Adobe Creative Suite', 'HTML', 'CSS']
  },
  {
    id: 'sfmoma',
    position: [37.7749, -122.4194], // San Francisco, CA
    title: 'San Francisco Museum of Modern Art',
    description: 'Metal Fabrication and Woodworking Team advisor',
    date: '2013 - 2014',
    impactLine1: '• Reapaired one of a king kinetic sculptues by world famous artist and artisans.',
    impactLine2: '• Crafted one of a kind furniture based on rigorous designs and fine art principles.',
    impactLine3: '• Successfully met tight deadlines and worked with a team to complete projects.',
    technologies: ['Metal Fabrication', 'Woodworking', 'Fine Art']
  },
  {
    id: 'yerba-buena',
    position: [37.785601, -122.402072], // Oakland, CA
    title: 'Yerba Buena',
    description: 'Metal Fabrication and Woodworking Team Leader',
    date: '2018-Present',
    impactLine1: '• Led a team of 10+ artisans and craftsmen to complete projects on time and within budget.',
    impactLine2: '• Successfully met tight deadlines and worked with a team to complete projects.',
    impactLine3: '• Successfully completed buils and installation for mutltiple international exhbitioins.',
    technologies: ['Metal Fabrication', 'Woodworking', 'Fine Art', "Project Management", "Team Leadership"]
  },
  {
    id: 'liberation-seed-farm',
    position: [37.298901, -78.519696], // Prospect, VA
    title: 'Liberation Seed Farm',
    description: 'Started a family farm to serve the local community',
    date: '2018-Present',
    impactLine1: '• Fed 100+ families in the local community',
    impactLine2: '• Created a sustainble family farm and food forest.',
    technologies: ['Sustainable Farming', 'Food Forest', 'Community Service']
  },
  {
    id: 'magma-build-studios',
    position: [39.326302, -76.662210],
    title: 'Magma Build Studios',
    description: 'Magma Build Studios is a design and build studio that specializes in creating custom home and business furniture.',
    date: '2016-2018',
    impactLine1: '• Led the fabrication of a product that saves lives in ocean emergencies',
    impactLine2: '• Led the design of some of the in-house processes.',
    technologies: ['Metal Fabrication', 'Woodworking', 'Fine Art', "Project Management", "Team Leadership"]
  },
  {
    id: 'druid-hill-park',
    position: [39.320159, -76.652621],
    title: 'Natural Dye Initiative',
    description: 'A non-profit organization and farm collective that promotes the use of natural dyes in the textile industry.',
    date: '2016-2018',
    impactLine1: '• Led the formation of a non-profit organization and farm collective that promotes the use of natural dyes in the textile industry.',
    impactLine2: '• Led the farming of land and assisted the production of natural dyes.',
    impactLine3: '• Assisted the production of natural dyes and textiles.',
    impactLine4: '• Collaborated with government stakeholders; most notably Yumi Hogan.',
    technologies: ['Sustainable Farming', 'Community Service', 'Natural Dyes', 'Textile Industry']
  },
  {
    id: 'amend',
    position: [46.977729, -119.305985],
    title: 'Amend Project',
    description: 'A video project about prisona bolishment and more humane practices.',
    date: '2022',
    impactLine1: '• The resulting video was seen by the prison industry all over the globe.',
    technologies: ['Video Production', 'Video Editing']
  },
  {
    id: 'soul-fire',
    position: [40.7128, -74.0060],
    title: 'Soul Fire Farm',
    description: 'A farm that grows food for the local community.',
    date: '2019-2021',
    impactLine1: '• Lead participants in a 100+ acre farm.',
    impactLine2: '• Educated participants in sustainable farming practices.',
    technologies: ['Sustainable Farming', 'Food Forest', 'Community Service']
  }
];

export default function Map() {
  const popupTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick: LeafletMouseEventHandlerFn = (e) => {
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
    }
    e.target.openPopup();
  };

  const handlePopupClose: PopupEventHandlerFn = (e) => {
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
    }
    popupTimeoutRef.current = setTimeout(() => {
      e.target.closePopup();
    }, 300);
  };

  return (
    <MapContainer
      center={[39.8283, -98.5795]} // Center of continental US (near Lebanon, Kansas)
      zoom={4}
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
            click: handleClick,
            popupclose: handlePopupClose,
          }}
        >
          <Popup className="custom-popup">
            <div className="p-2 max-w-xs">
              <h3 className="font-bold text-lg mb-1">{point.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{point.date}</p>
              <p className="text-sm mb-2">{point.description}</p>
              {point.impactLine1 && <p className="text-sm text-blue-600 mb-2">{point.impactLine1}</p>}
              {point.impactLine2 && <p className="text-sm text-blue-600 mb-2">{point.impactLine2}</p>}
              {point.impactLine3 && <p className="text-sm text-blue-600 mb-2">{point.impactLine3}</p>}
              {point.impactLine4 && <p className="text-sm text-blue-600 mb-2">{point.impactLine4}</p>}
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