import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AllFixtures, AllLiveStates } from '@/types'
import Script from 'next/script';
import SearchBar from './components/searchBar/SearchBar';
import getFixtures from './util/getFixtures';
import getFixtures_1 from './util/getFixtures copy';
import getFixtures_2 from './util/getFixtures copy 2';
import getFixtures2 from './util/getFixtures2';
import getFixtures2_1 from './util/getFixtures2 copy';
import getFixtures2_2 from './util/getFixtures2 copy 2';
import getFixtures3 from './util/getFixtures3';
import getFixtures3_1 from './util/getFixtures3 copy';
import getFixtures3_2 from './util/getFixtures3 copy 2';
import getFixtures4 from './util/getFixtures4';
import getFixtures4_1 from './util/getFixtures4 copy';
import getFixtures4_2 from './util/getFixtures4 copy 2';
import getFixtures5 from './util/getFixtures5';
import getFixtures5_1 from './util/getFixtures5 copy';
import getFixtures5_2 from './util/getFixtures5 copy 2';
import getFixtures6 from './util/getFixtures6';
import getFixtures6_1 from './util/getFixtures6 copy';
import getFixtures6_2 from './util/getFixtures6 copy 2';
import getFixtures7 from './util/getFixtures7';
import getFixtures7_1 from './util/getFixtures7 copy';
import getFixtures7_2 from './util/getFixtures7 copy 2';
import getFixtures8 from './util/getFixtures8';
import getFixtures8_1 from './util/getFixtures8 copy';
import getFixtures8_2 from './util/getFixtures8 copy 2';
import getFixtures9 from './util/getFixtures9';
import getFixtures9_1 from './util/getFixtures9 copy';
import getFixtures9_2 from './util/getFixtures9 copy 2';
import getFixtures10 from './util/getFixtures10';
import getFixtures10_1 from './util/getFixtures10 copy';
import getFixtures10_2 from './util/getFixtures10 copy 2';
import getFixtures11 from './util/getFixtures11';
import getFixtures11_1 from './util/getFixtures11 copy';
import getFixtures11_2 from './util/getFixtures11 copy 2';
import StandingsAndFixtures from './components/home2/StandingsAndFixtures';
const inter = Inter({ subsets: ['latin'] });
const API_KEY = process.env.API_KEY!;


export const metadata: Metadata = {
  description: 'Your go-to app for football stats, live matches, and team insights.', // Updated description
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
  const filteredFixtures: AllFixtures[] = await getFixtures();
  const filteredFixtures_1: AllFixtures[] = await getFixtures_1();
  const filteredFixtures_2: AllFixtures[] = await getFixtures_2();
  const filteredFixtures1: AllFixtures[] = await getFixtures2();
  const filteredFixtures1_1: AllFixtures[] = await getFixtures2_1();
  const filteredFixtures1_2: AllFixtures[] = await getFixtures2_2();
  const filteredFixtures2: AllFixtures[] = await getFixtures3();
  const filteredFixtures2_1: AllFixtures[] = await getFixtures3_1();
  const filteredFixtures2_2: AllFixtures[] = await getFixtures3_2();
  const filteredFixtures3: AllFixtures[] = await getFixtures4();
  const filteredFixtures3_1: AllFixtures[] = await getFixtures4_1();
  const filteredFixtures3_2: AllFixtures[] = await getFixtures4_2();
  const filteredFixtures4: AllFixtures[] = await getFixtures5();
  const filteredFixtures4_1: AllFixtures[] = await getFixtures5_1();
  const filteredFixtures4_2: AllFixtures[] = await getFixtures5_2();
  const filteredFixtures5: AllFixtures[] = await getFixtures6();
  const filteredFixtures5_1: AllFixtures[] = await getFixtures6_1();
  const filteredFixtures5_2: AllFixtures[] = await getFixtures6_2();
  const filteredFixtures6: AllFixtures[] = await getFixtures7();
  const filteredFixtures6_1: AllFixtures[] = await getFixtures7_1();
  const filteredFixtures6_2: AllFixtures[] = await getFixtures7_2();
  const filteredFixtures7: AllFixtures[] = await getFixtures8();
  const filteredFixtures7_1: AllFixtures[] = await getFixtures8_1();
  const filteredFixtures7_2: AllFixtures[] = await getFixtures8_2();
  const filteredFixtures8: AllFixtures[] = await getFixtures9();
  const filteredFixtures8_1: AllFixtures[] = await getFixtures9_1();
  const filteredFixtures8_2: AllFixtures[] = await getFixtures9_2();
  const filteredFixtures9: AllFixtures[] = await getFixtures10();
  const filteredFixtures9_1: AllFixtures[] = await getFixtures10_1();
  const filteredFixtures9_2: AllFixtures[] = await getFixtures10_2();
  const filteredFixtures10: AllFixtures[] = await getFixtures11();
  const filteredFixtures10_1: AllFixtures[] = await getFixtures11_1();
  const filteredFixtures10_2: AllFixtures[] = await getFixtures11_2();
  return (
    <html lang="en">
      <head>
      <title>Gridiola</title>
      <meta name="google-site-verification" content="puUhOSsCARgxfUFDNfef5wmOccrx4Wc92YxDJw0rzXo" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Gridiola",
          "url": "https://www.gridiola.com/"
        }) }} />
      <meta property="og:image" content="/khdam1.png?v=4"/>
      <meta property="og:image:width" content="1200"/>
      <meta property="og:image:height" content="630"/>
      <meta name="twitter:image" content="/khdam1.png?v=4"/>
      <meta name="twitter:card" content="summary_large_image"/>
       <meta name="google-adsense-account" content="ca-pub-8853506957457177"/>
       <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8853506957457177"
     crossOrigin="anonymous"></Script>
     <Script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></Script>
     
      </head>
      <body>
      <div
  id="api_football_widget"
  data-host="v3.football.api-sports.io"
  data-key= {API_KEY}
  data-theme="dark"
  data-refresh="60"
></div>

<script async src="https://widgets.api-sports.io/2.0.3/widgets.js"></script>

      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8853506957457177"
     crossOrigin="anonymous"></Script>
<ins className="adsbygoogle display:block"
     data-ad-client="ca-pub-8853506957457177"
     data-ad-slot="2490295919"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<Script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</Script>
<Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-LJ4735L424`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LJ4735L424', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
        {/* Simple Background */}
        <div className="min-h-screen bg-gray-900"> {/* Changed to solid dark background */}
          {/* Content */}
          <div className="relative z-10">
            {/* SearchBar */}
            <div className="sticky top-0 z-20">
            </div>

            {/* Main Content (Children) */}
            <main className="px-4 py-8 sm:px-6 lg:px-8">
              <SearchBar/>
<StandingsAndFixtures filteredFixtures={filteredFixtures} filteredFixtures1={filteredFixtures1} filteredFixtures2={filteredFixtures2} filteredFixtures3={filteredFixtures3} filteredFixtures4={filteredFixtures4} filteredFixtures5={filteredFixtures5} filteredFixtures6={filteredFixtures6} filteredFixtures7={filteredFixtures7} filteredFixtures8={filteredFixtures8} filteredFixtures9={filteredFixtures9} filteredFixtures10={filteredFixtures10}
      filteredFixtures_1={filteredFixtures_1} filteredFixtures_2={filteredFixtures_2} 
      filteredFixtures1_1={filteredFixtures1_1} filteredFixtures1_2={filteredFixtures1_2} 
      filteredFixtures2_1={filteredFixtures2_1} filteredFixtures2_2={filteredFixtures2_2} 
      filteredFixtures3_1={filteredFixtures3_1} filteredFixtures3_2={filteredFixtures3_2} 
      filteredFixtures4_1={filteredFixtures4_1} filteredFixtures4_2={filteredFixtures4_2} 
      filteredFixtures5_1={filteredFixtures5_1} filteredFixtures5_2={filteredFixtures5_2} 
      filteredFixtures6_1={filteredFixtures6_1} filteredFixtures6_2={filteredFixtures6_2} 
      filteredFixtures7_1={filteredFixtures7_1} filteredFixtures7_2={filteredFixtures7_2} 
      filteredFixtures8_1={filteredFixtures8_1} filteredFixtures8_2={filteredFixtures8_2}
      filteredFixtures9_1={filteredFixtures9_1} filteredFixtures9_2={filteredFixtures9_2}
      filteredFixtures10_1={filteredFixtures10_1} filteredFixtures10_2={filteredFixtures10_2}/>
            </main>
          </div>
        </div>
        <Script type="module" src="main.js"></Script>
      </body>
    </html>
  );
}