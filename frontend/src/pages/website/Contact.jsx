import PublicNavbar from "../../components/navbar/PublicNavbar.jsx";
import PublicFooter from "../../components/footer/PublicFooter.jsx";

export default function Contact() {
  return (
    <>
      <PublicNavbar />
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      </div>
      <PublicFooter />
    </>
  );
}
