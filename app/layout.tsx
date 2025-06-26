import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AllFixtures, AllLiveStates } from '@/types'
import Script from 'next/script';
import SearchBar from './components/searchBar/SearchBar';
const inter = Inter({ subsets: ['latin'] });
const API_KEY = process.env.API_KEY!;


export const metadata: Metadata = {
  title: 'localhost', // Updated app name
  description: 'hts.',
  icons:{
    icon:['/khdam1.png?v=4'],
    apple:['/apple-touch-icon1.png?v=4'],
    shortcut:['/apple-touch-icon1.png']
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <head>
       

        <meta property="og:title" content=" App" />
        <meta name="twitter:title" content="y App" />
        {/* Optional: other Twitter/OpenGraph tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content="tes." />
      <meta name="google-site-verification" content="puUhOSsCARgxfUFDNfef5wmOccrx4Wc92YxDJw0rzXo" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          
        }) }} />
      <meta property="og:image" content="/khdam1.png?v=4"/>
      <meta property="og:image:width" content="1200"/>
      <meta property="og:image:height" content="630"/>
      <meta name="twitter:image" content="/khdam1.png?v=4"/>
      <meta name="twitter:card" content="summary_large_image"/>
      
      </head>
      <body>
    

<script async src="https://widgets.api-sports.io/2.0.3/widgets.js"></script>

     
        {/* Simple Background */}
        <div className="min-h-screen bg-gray-900"> {/* Changed to solid dark background */}
          {/* Content */}
          <div className="relative z-10">
            {/* SearchBar */}
            <div className="sticky top-0 z-20">
            </div>

            {/* Main Content (Children) */}
            <main className="px-4 py-8 sm:px-6 lg:px-8">
             {children}
            </main>
          </div>
        </div>
           <script type="module" src="/main.js"></script>
       </body>
    </html>
  );
}