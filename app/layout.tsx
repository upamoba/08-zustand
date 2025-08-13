import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import {  ReactNode } from 'react';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';



interface RootLayoutProps {
  children: ReactNode
  modal: ReactNode
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
          {modal}
        </TanStackProvider>
      </body>
    </html>
  )
}