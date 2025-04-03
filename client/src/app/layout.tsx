import { Inter } from 'next/font/google';
import { Header, Footer } from '@/components/layout';
// import CustomCursor from '@/components/ui/CustomCursor';
import ReduxProvider from '@/components/providers/ReduxProvider';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ToolsZone - Premium Tools Directory',
  description: 'A collection of premium tools and libraries for developers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-white text-black`}>
        <ReduxProvider>
          <div className="flex min-h-full flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          {/* <CustomCursor /> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
