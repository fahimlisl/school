import PublicNavbar from "../../components/navbar/PublicNavbar.jsx";
import PublicFooter from "../../components/footer/PublicFooter.jsx";

export default function About() {
  return (
    <>
      <PublicNavbar />
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-gray-600 leading-7">
          This is where the school information will go.
        </p>
      </div>
      <PublicFooter />
    </>
  );
}
