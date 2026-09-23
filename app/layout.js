import './globals.css';
export const metadata = { title: 'RateMyStudy', description: 'Student reviews of SDSU study spots.' };
export default function RootLayout({ children }) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
