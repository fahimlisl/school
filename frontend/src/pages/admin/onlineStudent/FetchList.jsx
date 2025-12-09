import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  User,
  MapPin,
  School,
  FileImage,
  X,
  Phone,
  Calendar,
} from "lucide-react";

import { useAuth } from "../../../context/AuthContext.jsx";

export default function FetchList() {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    fetchOnlineStudents();
  }, []);

  const fetchOnlineStudents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/fetchOnlineStudent`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStudents(res.data.data);
      setFiltered(res.data.data);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };


  useEffect(() => {
    let list = students;

    if (search.trim() !== "") {
      list = list.filter((s) =>
        s.fullName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedClass !== "") {
      list = list.filter((s) => s.desiredClass === Number(selectedClass));
    }

    setFiltered(list);
  }, [search, selectedClass, students]);

  return (
    <div className="p-6 max-w-7xl mx-auto">


      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Online Admissions</h1>
        <p className="text-gray-600">Manage students who applied for admission online.</p>
      </div>


      <div className="flex flex-col lg:flex-row gap-4 mb-6">


        <div className="flex items-center bg-white shadow-md rounded-xl px-4 py-3 w-full lg:w-1/2 border">
          <Search className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search student by name..."
            className="w-full outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>


        <select
          className="bg-white shadow-md rounded-xl px-4 py-3 border outline-none"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Filter by Desired Class</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cls) => (
            <option key={cls} value={cls}>
              Class {cls}
            </option>
          ))}
        </select>
      </div>


      {filtered.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">No online students found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((student) => (
            <div
              key={student._id}
              className="bg-white shadow-lg rounded-xl p-5 border hover:shadow-2xl transition"
            >

              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="text-blue-600" size={28} />
                </div>

                <div>
                  <h2 className="text-lg font-bold capitalize">{student.fullName}</h2>
                  <p className="text-gray-600 text-sm">{student.email}</p>
                </div>
              </div>


              <div className="space-y-2 text-sm text-gray-700">

                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-blue-600" />
                  {student.phoneNumber}
                </div>

                <div className="flex items-center gap-2">
                  <School size={16} className="text-green-600" />
                  Previous Class: <b>{student.previousClass}</b>
                </div>

                <div className="flex items-center gap-2">
                  <School size={16} className="text-purple-600" />
                  Desired Class: <b>{student.desiredClass}</b>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-red-500" />
                  <span>{student.address}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-500" />
                  Income: ₹{student.familyIncome}
                </div>
              </div>

              {/* DOCUMENT BUTTONS */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setModalImage(student.passportPhoto)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600"
                >
                  <FileImage size={18} /> Passport
                </button>

                <button
                  onClick={() => setModalImage(student.marksheetPhoto)}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600"
                >
                  <FileImage size={18} /> Marksheet
                </button>
              </div>
            </div>
          ))}
        </div>
      )}


      {modalImage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-4 relative">
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
            >
              <X size={18} />
            </button>

            <img
              src={modalImage}
              alt="Document"
              className="w-full h-auto rounded-lg border"
            />
          </div>
        </div>
      )}
    </div>
  );
}
