import PublicNavbar from "../../components/navbar/PublicNavbar.jsx";
import PublicFooter from "../../components/footer/PublicFooter.jsx";

export default function Courses() {
  return (
    <>
      <PublicNavbar />
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-4">Courses</h1>
      </div>
      <PublicFooter />
    </>
  );
}
