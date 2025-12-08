import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  User,
  BookOpen,
  Users,
  LogOut,
  Loader,
  Pencil,
  GraduationCap,
} from "lucide-react";
import axios from "axios";

export default function TeacherDashboard() {
  const { user, token, logout } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [marksInput, setMarksInput] = useState("");
  const [term, setTerm] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Fetch assigned students
  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/teacher/fetch-students`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudents(res.data.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Submit marks
  const submitMarks = async () => {
    if (!marksInput) return alert("Enter marks");

    setSubmitting(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/teacher/updateMarksheet/${selectedStudent._id}`,
        {
          obtainedMarks: Number(marksInput),
          term: Number(term),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Marks updated!");
      setMarksInput("");
      setSelectedStudent(null);
      fetchStudents();
    } catch (err) {
      console.error("Error updating marks:", err);
      alert("Failed to update marks");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user.fullName || user.name} 👋
          </h1>
          <p className="text-gray-500">
            Subject: {user.subject?.toUpperCase()}
          </p>
          <p className="text-gray-500">
            Classes Assigned: {user.classAssigned?.join(", ")}
          </p>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* STUDENTS LIST */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Users size={20} className="text-blue-600" /> Assigned Students
        </h2>

        {students.length === 0 ? (
          <p className="text-gray-600">No students assigned yet.</p>
        ) : (
          students.map((student) => {
            const teacherSubjects =
              student.marksheet?.terms?.[0]?.subjects || [];

            return (
              <div
                key={student._id}
                className="border rounded-lg p-4 mb-4 flex justify-between items-center hover:bg-gray-50"
              >
                {/* Student Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={student.profilePhoto}
                    alt="profile"
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {student.fullName}
                    </h3>
                    <p className="text-gray-500">
                      Class {student.currentClass} • Section {student.section}
                    </p>

                    {/* Subjects taught to this student */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {teacherSubjects.length === 0 ? (
                        <span className="text-xs text-gray-400">
                          No subjects assigned
                        </span>
                      ) : (
                        teacherSubjects.map((sub, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-lg"
                          >
                            {sub.subjectName.toUpperCase()}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedStudent(student)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                  <Pencil size={16} /> Update Marks
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* UPDATE MARKS MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              Update Marks • {selectedStudent.fullName}
            </h2>

            <label className="block mb-2 text-gray-700 font-medium">
              Select Term
            </label>
            <select
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full border rounded-lg p-2 mb-4"
            >
              <option value="1">Term 1</option>
              <option value="2">Term 2</option>
              <option value="3">Term 3</option>
            </select>

            <label className="block mb-2 text-gray-700 font-medium">
              Enter Marks
            </label>
            <input
              type="number"
              value={marksInput}
              onChange={(e) => setMarksInput(e.target.value)}
              placeholder="e.g. 87"
              className="w-full border rounded-lg p-2 mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                disabled={submitting}
                onClick={submitMarks}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                {submitting && (
                  <Loader size={16} className="animate-spin" />
                )}
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
