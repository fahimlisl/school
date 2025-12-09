import { useState } from "react";
import { Upload, Send, Loader, CheckCircle } from "lucide-react";
import axios from "axios";

export default function OnlineRegistration() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    previousClass: "",
    desiredClass: "",
    motherSName: "",
    fatherSName: "",
    familyIncome: "",
    address: "",
  });

  const [passportPhoto, setPassportPhoto] = useState(null);
  const [marksheetPhoto, setMarksheetPhoto] = useState(null);

  const [passportPreview, setPassportPreview] = useState("");
  const [marksheetPreview, setMarksheetPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleFile = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "passportPhoto") {
      setPassportPhoto(file);
      setPassportPreview(URL.createObjectURL(file));
    }

    if (type === "marksheetPhoto") {
      setMarksheetPhoto(file);
      setMarksheetPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      const fd = new FormData();

      Object.keys(form).forEach((key) => {
        fd.append(key, form[key]);
      });

      fd.append("passportPhoto", passportPhoto);
      fd.append("marksheetPhoto", marksheetPhoto);

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admissionStudent/registration`,
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 200) {
        setSuccessMsg("Registration submitted successfully!");
        setForm({
          fullName: "",
          email: "",
          phoneNumber: "",
          previousClass: "",
          desiredClass: "",
          motherSName: "",
          fatherSName: "",
          familyIncome: "",
          address: "",
        });
        setPassportPhoto(null);
        setMarksheetPhoto(null);
        setPassportPreview("");
        setMarksheetPreview("");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit registration. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Student Online Registration Form
        </h1>

        {successMsg && (
          <div className="bg-green-100 border border-green-300 text-green-700 rounded-lg p-4 mb-6 flex items-center gap-2">
            <CheckCircle /> {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TEXT INPUTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="border p-3 rounded-lg w-full"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="border p-3 rounded-lg w-full"
              required
            />
            <input
              type="number"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border p-3 rounded-lg w-full"
              required
            />
            <input
              type="number"
              name="previousClass"
              value={form.previousClass}
              onChange={handleChange}
              placeholder="Previous Class"
              className="border p-3 rounded-lg w-full"
              required
            />
            <input
              type="number"
              name="desiredClass"
              value={form.desiredClass}
              onChange={handleChange}
              placeholder="Class Applying For"
              className="border p-3 rounded-lg w-full"
              required
            />
            <input
              type="text"
              name="motherSName"
              value={form.motherSName}
              onChange={handleChange}
              placeholder="Mother's Name"
              className="border p-3 rounded-lg w-full"
              required
            />
            <input
              type="text"
              name="fatherSName"
              value={form.fatherSName}
              onChange={handleChange}
              placeholder="Father's Name"
              className="border p-3 rounded-lg w-full"
              required
            />
            <input
              type="text"
              name="familyIncome"
              value={form.familyIncome}
              onChange={handleChange}
              placeholder="Family Income (per month)"
              className="border p-3 rounded-lg w-full"
              required
            />
          </div>

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Full Address"
            className="border p-3 rounded-lg w-full h-24"
            required
          ></textarea>

          {/* FILE UPLOADS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Passport Photo */}
            <div>
              <label className="font-semibold mb-2 block">Passport Photo</label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-4 rounded-lg cursor-pointer hover:bg-gray-50">
                <Upload className="w-6 h-6 text-gray-500 mb-2" />
                <span>Upload Passport Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFile(e, "passportPhoto")}
                  required
                />
              </label>

              {passportPreview && (
                <img
                  src={passportPreview}
                  className="w-32 h-32 object-cover rounded-lg mt-3 border"
                />
              )}
            </div>

            {/* Marksheet Photo */}
            <div>
              <label className="font-semibold mb-2 block">Marksheets</label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-4 rounded-lg cursor-pointer hover:bg-gray-50">
                <Upload className="w-6 h-6 text-gray-500 mb-2" />
                <span>Upload Marksheet</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFile(e, "marksheetPhoto")}
                  required
                />
              </label>

              {marksheetPreview && (
                <img
                  src={marksheetPreview}
                  className="w-32 h-32 object-cover rounded-lg mt-3 border"
                />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-3 text-lg"
          >
            {loading ? (
              <>
                <Loader className="animate-spin w-5 h-5" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Registration
              </>
            )}
          </button>
        </form> 
        <div className="mt-6 flex justify-center">
          <a
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
