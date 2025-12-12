import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext.jsx";

import {
  Search,
  Plus,
  Edit,
  X,
  RefreshCw,
  Calendar,
  DollarSign,
} from "lucide-react";

export default function FeeList() {
  const { token } = useAuth();

  const [fees, setFees] = useState([]);
  const [filteredFees, setFilteredFees] = useState([]);
  const [searchClass, setSearchClass] = useState("");

  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editFeeId, setEditFeeId] = useState(null);

  const months = [
    "jan",
    "feb",
    "march",
    "april",
    "may",
    "jun",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const [newFee, setNewFee] = useState({
    classAssign: "",
    admissionFee: "",
    adittionalFees: "",
    monthlyFees: {
      jan: "",
      feb: "",
      march: "",
      april: "",
      may: "",
      jun: "",
      july: "",
      august: "",
      september: "",
      october: "",
      november: "",
      december: "",
    },
  });

  const [editFeeData, setEditFeeData] = useState({
    admissionFee: "",
    adittionalFees: "",
    monthlyFees: {},
  });

  const fetchFees = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/fetchFee`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFees(response.data.data || []);
      setFilteredFees(response.data.data || []);
    } catch (err) {
      console.error("FAILED TO FETCH FEES", err);
      setFees([]);
      setFilteredFees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  useEffect(() => {
    if (!searchClass.trim()) {
      setFilteredFees(fees);
      return;
    }

    const q = searchClass.trim();
    setFilteredFees(fees.filter((fee) => fee.classAssign.toString() === q));
  }, [searchClass, fees]);

  const handleCreateFee = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        classAssign: Number(newFee.classAssign),
        admissionFee: Number(newFee.admissionFee),
        adittionalFees: Number(newFee.adittionalFees),
        monthlyFees: { ...newFee.monthlyFees },
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/registerFee`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("FEE CREATED:", res.data);
      setShowAddModal(false);
      fetchFees();
    } catch (err) {
      console.error("FAILED TO CREATE FEE:", err);
      alert(err?.response?.data?.message || "Unable to create fee");
    }
  };

  const openEditModal = (fee) => {
    setEditFeeId(fee._id);
    setEditFeeData({
      admissionFee: fee.admissionFee,
      adittionalFees: fee.adittionalFees,
      monthlyFees: { ...fee.monthlyFees },
    });
    setShowEditModal(true);
  };

  const handleUpdateFee = async (e) => {
  e.preventDefault();

  try {
    // Flatten monthlyFees into separate root-level fields
    const monthly = editFeeData.monthlyFees;

    const payload = {
      admissionFee: Number(editFeeData.admissionFee),
      adittionalFees: Number(editFeeData.adittionalFees),

      jan: Number(monthly.jan),
      feb: Number(monthly.feb),
      march: Number(monthly.march),
      april: Number(monthly.april),
      may: Number(monthly.may),
      jun: Number(monthly.jun),
      july: Number(monthly.july),
      august: Number(monthly.august),
      september: Number(monthly.september),
      october: Number(monthly.october),
      november: Number(monthly.november),
      december: Number(monthly.december),
    };

    const res = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/admin/updateFee/${editFeeId}`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("UPDATED FEE:", res.data);
    setShowEditModal(false);
    fetchFees();
  } catch (err) {
    console.error("FAILED TO UPDATE FEE:", err);
    alert(err?.response?.data?.message || "Unable to update fee");
  }
};


  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-600">
        Loading Fee Structure...
      </div>
    );
  }

  return (
    <div className="space-y-6">


      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Fee Structure</h1>
          <p className="text-gray-600">Manage class-wise monthly & admission fees</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 flex items-center bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Fee Structure
        </button>
      </div>


      <div className="bg-white p-4 rounded-2xl shadow border flex items-center gap-4">
        <Search className="text-gray-400" />
        <input
          type="number"
          placeholder="Search by Class (1-12)"
          value={searchClass}
          onChange={(e) => setSearchClass(e.target.value)}
          className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg"
        />

        <button
          onClick={fetchFees}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </button>
      </div>


      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs uppercase text-gray-500">Class</th>
              <th className="py-3 px-6 text-left text-xs uppercase text-gray-500">Admission Fee</th>
              <th className="py-3 px-6 text-left text-xs uppercase text-gray-500">Additional Fee</th>
              <th className="py-3 px-6 text-left text-xs uppercase text-gray-500">Monthly Fees</th>
              <th className="py-3 px-6 text-left text-xs uppercase text-gray-500">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredFees.length ? (
              filteredFees.map((fee) => (
                <tr key={fee._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium">Class {fee.classAssign}</td>
                  <td className="py-4 px-6">₹{fee.admissionFee}</td>
                  <td className="py-4 px-6">₹{fee.adittionalFees}</td>

                  <td className="py-4 px-6 text-sm text-gray-700">
                    {months.map((m) => (
                      <p key={m}>
                        <span className="font-semibold capitalize">{m}:</span>{" "}
                        ₹{fee.monthlyFees[m]}
                      </p>
                    ))}
                  </td>

                  <td className="py-4 px-6">
                    <button
                      onClick={() => openEditModal(fee)}
                      className="p-2 bg-yellow-100 text-yellow-600 rounded-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-10 text-center text-gray-500" colSpan="5">
                  No Fee Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Create Fee Structure</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateFee} className="space-y-4 mt-4">
              <div>
                <label className="text-sm">Class</label>
                <input
                  type="number"
                  required
                  value={newFee.classAssign}
                  onChange={(e) =>
                    setNewFee({ ...newFee, classAssign: e.target.value })
                  }
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm">Admission Fee</label>
                <input
                  type="number"
                  required
                  value={newFee.admissionFee}
                  onChange={(e) =>
                    setNewFee({ ...newFee, admissionFee: e.target.value })
                  }
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm">Additional Fee</label>
                <input
                  type="number"
                  required
                  value={newFee.adittionalFees}
                  onChange={(e) =>
                    setNewFee({ ...newFee, adittionalFees: e.target.value })
                  }
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {months.map((m) => (
                  <div key={m}>
                    <label className="text-xs font-medium capitalize">{m}</label>
                    <input
                      type="number"
                      required
                      className="w-full mt-1 p-2 border rounded-lg"
                      value={newFee.monthlyFees[m]}
                      onChange={(e) =>
                        setNewFee({
                          ...newFee,
                          monthlyFees: {
                            ...newFee.monthlyFees,
                            [m]: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg">
                Create Fee Structure
              </button>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Edit Fee Structure</h2>
              <button onClick={() => setShowEditModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateFee} className="space-y-4 mt-4">
              <div>
                <label className="text-sm">Admission Fee</label>
                <input
                  type="number"
                  required
                  value={editFeeData.admissionFee}
                  onChange={(e) =>
                    setEditFeeData({ ...editFeeData, admissionFee: e.target.value })
                  }
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm">Additional Fee</label>
                <input
                  type="number"
                  required
                  value={editFeeData.adittionalFees}
                  onChange={(e) =>
                    setEditFeeData({ ...editFeeData, adittionalFees: e.target.value })
                  }
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {months.map((m) => (
                  <div key={m}>
                    <label className="text-xs font-medium capitalize">{m}</label>
                    <input
                      type="number"
                      className="w-full mt-1 p-2 border rounded-lg"
                      value={editFeeData.monthlyFees[m] || ""}
                      onChange={(e) =>
                        setEditFeeData({
                          ...editFeeData,
                          monthlyFees: {
                            ...editFeeData.monthlyFees,
                            [m]: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
