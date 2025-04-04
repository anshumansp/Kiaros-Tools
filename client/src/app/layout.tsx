import { Inter } from 'next/font/google';
import { Header, Footer } from '@/components/layout';
// import CustomCursor from '@/components/ui/CustomCursor';
import Chatbot from '@/components/ui/Chatbot';
import ReduxProvider from '@/components/providers/ReduxProvider';
import ThemeProvider from '@/components/providers/ThemeProvider';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Kiaros - Premium Tools Hub',
  description: 'A suite of professional tools for everyday productivity',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  return (
    <html lang="en" style={{ height: '100%' }} suppressHydrationWarning>
      <body className={inter.className} style={{ height: '100%', backgroundColor: '#FFFFFF', color: '#000000' }} suppressHydrationWarning>
        <ReduxProvider>
          <ThemeProvider>
            <div style={{ display: 'flex', minHeight: '100%', flexDirection: 'column' }}>
              <Header />
              <main style={{ flex: 1 }}>{children}</main>
              <Footer />
            </div>
            <Chatbot />
            {/* <CustomCursor /> */}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
