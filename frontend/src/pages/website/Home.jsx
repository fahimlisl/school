import PublicNavbar from "../../components/navbar/PublicNavbar.jsx";
import PublicFooter from "../../components/footer/PublicFooter.jsx";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <PublicNavbar />

      <section className="bg-blue-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Welcome to <span className="text-blue-600">YourSchool</span>
            </h1>

            <p className="mt-4 text-gray-600 text-lg">
              A modern school management system built for students, teachers,
              and administrators.
            </p>

            <Link
              to="/about"
              className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
            >
              Learn More
            </Link>
          </div>

          <div className="flex justify-center">
            <img
              src="https://imgs.search.brave.com/gQz4DMcJRjHjN2xrmmYY78v9F1SWwu9H2Bjv4ZzFSEA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRE83TVUv/TUFFSkg5RE83TVUv/MS90bC9jYW52YS1s/YXJnZS1zY2hvb2wt/c2lnbi1pbi1mcm9u/dC1vZi1zY2hvb2wt/YnVpbGRpbmctTUFF/Skg5RE83TVUuanBn"
              alt="School"
              className="rounded-xl shadow-xl w-full max-w-md"
            />
          </div>
        </div>
      </section>


      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Why Choose Us?</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            We provide quality education, well-trained teachers, and a modern
            digital experience.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">Experienced Teachers</h3>
              <p className="text-gray-600 mt-2">
                Dedicated & skilled faculty for every subject.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">Smart Classrooms</h3>
              <p className="text-gray-600 mt-2">
                Modern digital boards & audio-visual tools.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">Online Management</h3>
              <p className="text-gray-600 mt-2">
                Fees, attendance, results—all online.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Latest Notices
          </h2>

          <div className="bg-white p-6 rounded-xl shadow">
            <ul className="space-y-3 text-gray-700">
              <li className="border-b pb-2">
                📢 School closed on Friday due to maintenance.
              </li>
              <li className="border-b pb-2">
                📢 Admissions open for 2025–26 batch.
              </li>
              <li>📢 Annual sports week starts next month.</li>
            </ul>

            <div className="text-center mt-6">
              <Link to="/notice" className="text-blue-600 hover:underline">
                View All Notices →
              </Link>
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Gallery</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              className="rounded-lg"
              src="https://imgs.search.brave.com/ICQQasWHOF5DiPKC8F2ArkpgLRlMKeEWCoFpSUjD-xM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzE4LzI3Lzcw/LzM2MF9GXzIxODI3/NzA1MV9SUFhDMG9O/amtNcE9aM3hzcktS/emppWklDNlBnVUlp/bS5qcGc"
            />
            <img
              className="rounded-lg"
              src="https://imgs.search.brave.com/yarjhS2ZflGMlMA75y5si5chHSTZtv1EcFwW5V0WH3o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIy/MjY5Mzc1L3Bob3Rv/L2VsZW1lbnRhcnkt/c2Nob29sLWluLXBl/bm5zeWx2YW5pYS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/QWpkYWc4WGtBeU8z/MmtiRDJOVWlGWnMz/SzVIQ04yd1NDU3VX/TVFPZzF4WT0"
            />
            <img
              className="rounded-lg"
              src="https://imgs.search.brave.com/kJOEt0RlKYmM1rmBSJJjXDuQYP4dvAs4BH6aF5XIA2s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTc2/ODMwODkzL3Bob3Rv/L21vZGVybi1oaWdo/LXNjaG9vbC13aXRo/LWZsYWdwb2xlLndl/YnA_YT0xJmI9MSZz/PTYxMng2MTImdz0w/Jms9MjAmYz02dmp1/ZTlYTHFQWU9pNHQ5/UXlzT0FDUmlwT0RV/enBQS1hqYkFpc0JC/UDNrPQ"
            />
            <img
              className="rounded-lg"
              src="https://imgs.search.brave.com/YwPYLWkQ50Ze-o_WPTWtPdOVTq31GK3iSUhtbEIxNnM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTAy/MDIxMTY3OC9waG90/by90eXBpY2FsLWFt/ZXJpY2FuLXNjaG9v/bC1idWlsZGluZy1l/eHRlcmlvci5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9bzIx/RmtoQWR3RjlzUV95/c1owU0JLWnlxdTVV/UHRLc1MtOGJWTS1a/ZzNDST0"
            />
          </div>

          <div className="text-center mt-6">
            <Link to="/gallery" className="text-blue-600 hover:underline">
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>


      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold">Join Us Today!</h2>
        <p className="mt-2">Admission for the new academic year is now open.</p>

        <Link
          to="/contact"
          className="inline-block mt-5 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:opacity-90"
        >
          Contact Us
        </Link>
      </section>

      <PublicFooter />
    </>
  );
}
