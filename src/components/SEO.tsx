'use client';

export default function SEO() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sun",
    "jobTitle": "Full Stack Software Engineer",
    "url": "https://sunthecoder.com",
    "sameAs": [
      "https://github.com/sunthecoder",
      "https://linkedin.com/in/sunthecoder"
    ],
    "knowsAbout": [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Python",
      "Flask",
      "Cloud Architecture",
      "AWS",
      "Accessibility"
    ],
    "workLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Richmond",
        "addressRegion": "VA",
        "addressCountry": "US"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
} 