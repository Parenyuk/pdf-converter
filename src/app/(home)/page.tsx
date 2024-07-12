import { PdfConverter } from "@/app/(home)/components/PDFConverter";

export default async function Home() {
  return (<div className="flex items-center justify-center min-h-screen bg-gray-100">
    <PdfConverter />
  </div>);
}
