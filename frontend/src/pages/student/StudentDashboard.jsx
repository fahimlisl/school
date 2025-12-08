import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  User,
  Phone,
  Mail,
  Calendar,
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Award,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

export default function StudentDashboard() {
  const { user, token } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [selectedTerm, setSelectedTerm] = useState(null);

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      setFetchError("Student information not found. Please login again.");
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setFetchError("");

        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/student/getProfile/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data?.success) {
          const data = res.data.data;
          setProfile(data);

          // default term = first term from marksheet if exists
          if (data.marksheet?.terms?.length > 0) {
            setSelectedTerm(data.marksheet.terms[0].term);
          }
        } else {
          setFetchError(res.data?.message || "Failed to fetch profile.");
        }
      } catch (error) {
        console.error("Error fetching student profile:", error);
        setFetchError(
          error.response?.data?.message ||
            "Something went wrong while fetching your data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, token]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ------- Fees helpers -------
  const feeStructure = profile?.feeStructure || null;
  const feesPaid = profile?.feesPaid || {};
  const monthlyFees = feeStructure?.monthlyFees || {};

  const monthOrder = [
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

  const humanMonthName = {
    jan: "January",
    feb: "February",
    march: "March",
    april: "April",
    may: "May",
    jun: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",
  };

  const calcFeeSummary = () => {
    if (!feeStructure) {
      return {
        total: 0,
        paid: 0,
        due: 0,
        paidCount: 0,
        pendingCount: 0,
      };
    }

    let total = 0;
    let paid = 0;
    let paidCount = 0;
    let pendingCount = 0;

    // monthly fees
    monthOrder.forEach((m) => {
      const amount = monthlyFees[m] || 0;
      if (amount > 0) {
        total += amount;
        if (feesPaid[m]) {
          paid += amount;
          paidCount++;
        } else {
          pendingCount++;
        }
      }
    });

    // admission fee
    if (typeof feeStructure.admissionFee === "number") {
      total += feeStructure.admissionFee;
      if (feesPaid.admissionFee) {
        paid += feeStructure.admissionFee;
        paidCount++;
      } else if (feeStructure.admissionFee > 0) {
        pendingCount++;
      }
    }

    // additional fees
    if (typeof feeStructure.adittionalFees === "number") {
      total += feeStructure.adittionalFees;
      if (feesPaid.adittionalFees) {
        paid += feeStructure.adittionalFees;
        paidCount++;
      } else if (feeStructure.adittionalFees > 0) {
        pendingCount++;
      }
    }

    const due = total - paid;

    return { total, paid, due, paidCount, pendingCount };
  };

  const feeSummary = calcFeeSummary();

  // ------- Marksheet helpers -------
  const marksheet = profile?.marksheet;
  const currentTerm =
    marksheet?.terms?.find((t) => t.term === selectedTerm) ||
    marksheet?.terms?.[0];

  const overallTermPercentage = currentTerm?.percentage || null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">
            Loading your dashboard...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Fetching your profile, fees, and marks details.
          </p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Unable to load dashboard
          </h2>
          <p className="text-gray-600 mb-4">{fetchError}</p>
          <p className="text-xs text-gray-400">
            Try logging out and logging in again if the problem continues.
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* HERO / HEADER */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/10 flex items-center justify-center border border-white/20">
                {profile.profilePhoto ? (
                  <img
                    src={profile.profilePhoto}
                    alt={profile.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-blue-100" />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-400 border-2 border-white flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Hi, {profile.fullName.split(" ")[0]}! 👋
              </h1>
              <p className="text-blue-100 mt-1">
                Welcome to your student dashboard. Here’s your current status.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs md:text-sm">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Class {profile.currentClass} · Section {profile.section}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Admitted on {formatDate(profile.admissionDate)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-white/10 rounded-xl px-4 py-3 flex items-center space-x-3 backdrop-blur">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-200" />
              </div>
              <div>
                <p className="text-xs text-blue-100">Fees Status</p>
                <p className="text-lg font-semibold">
                  ₹ {feeSummary.paid.toLocaleString()} /{" "}
                  {feeSummary.total.toLocaleString()} paid
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs text-blue-100">
              <Clock className="w-4 h-4" />
              <span>Last updated just now</span>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK INFO CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Guardian */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 flex items-center">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mr-4">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Guardian</p>
            <p className="text-sm font-semibold text-gray-800">
              {profile.gurdianName || "N/A"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Your primary guardian / parent
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 flex items-center">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mr-4">
            <Phone className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Contact</p>
            <p className="text-sm font-semibold text-gray-800">
              +91 {profile.phoneNumber}
            </p>
            <p className="text-xs text-gray-400 flex items-center mt-1">
              <Mail className="w-3 h-3 mr-1" />
              {profile.email || "No email"}
            </p>
          </div>
        </div>

        {/* DOB */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 flex items-center">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mr-4">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Date of Birth</p>
            <p className="text-sm font-semibold text-gray-800">
              {formatDate(profile.DOB)}
            </p>
            <p className="text-xs text-gray-400 mt-1">Used as your default password format</p>
          </div>
        </div>

        {/* Class Info */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 flex items-center">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mr-4">
            <BookOpen className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Current Class</p>
            <p className="text-sm font-semibold text-gray-800">
              Class {profile.currentClass} · Section {profile.section}
            </p>
            <p className="text-xs text-gray-400 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              Keep up the good work!
            </p>
          </div>
        </div>
      </div>

      {/* FEES + MARKS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FEES CARD */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Fee Overview
              </h2>
              <p className="text-xs text-gray-500">
                Monthly + admission & additional fees
              </p>
            </div>
            <div className="px-3 py-1 rounded-full bg-blue-50 text-xs font-semibold text-blue-600 flex items-center">
              <DollarSign className="w-3 h-3 mr-1" />
              {feeSummary.pendingCount} pending
            </div>
          </div>

          {/* Summary numbers */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-base font-bold text-gray-800">
                ₹ {feeSummary.total.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-xs text-green-700">Paid</p>
              <p className="text-base font-bold text-green-700">
                ₹ {feeSummary.paid.toLocaleString()}
              </p>
            </div>
            <div className="bg-red-50 rounded-xl p-3 text-center">
              <p className="text-xs text-red-700">Due</p>
              <p className="text-base font-bold text-red-700">
                ₹ {feeSummary.due.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Monthly list */}
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {monthOrder.map((m) => {
              const amount = monthlyFees[m];
              if (!amount) return null;

              const paid = feesPaid[m];
              return (
                <div
                  key={m}
                  className="flex items-center justify-between px-3 py-2 rounded-lg border border-gray-100 bg-gray-50"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {humanMonthName[m]}
                    </p>
                    <p className="text-xs text-gray-500">₹ {amount}</p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center ${
                      paid
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {paid ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <AlertCircle className="w-3 h-3 mr-1" />
                    )}
                    {paid ? "Paid" : "Pending"}
                  </span>
                </div>
              );
            })}

            {/* Admission Fee */}
            {typeof feeStructure?.admissionFee === "number" && (
              <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-gray-100 bg-indigo-50">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Admission Fee
                  </p>
                  <p className="text-xs text-gray-500">
                    ₹ {feeStructure.admissionFee}
                  </p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center ${
                    feesPaid.admissionFee
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {feesPaid.admissionFee ? (
                    <CheckCircle className="w-3 h-3 mr-1" />
                  ) : (
                    <AlertCircle className="w-3 h-3 mr-1" />
                  )}
                  {feesPaid.admissionFee ? "Paid" : "Pending"}
                </span>
              </div>
            )}

            {/* Additional Fees */}
            {typeof feeStructure?.adittionalFees === "number" &&
              feeStructure.adittionalFees > 0 && (
                <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-gray-100 bg-amber-50">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Additional Fees
                    </p>
                    <p className="text-xs text-gray-500">
                      ₹ {feeStructure.adittionalFees}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center ${
                      feesPaid.adittionalFees
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {feesPaid.adittionalFees ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <AlertCircle className="w-3 h-3 mr-1" />
                    )}
                    {feesPaid.adittionalFees ? "Paid" : "Pending"}
                  </span>
                </div>
              )}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
            <span>
              For any fee related issues, please contact the school office.
            </span>
          </div>
        </div>

        {/* MARKS / MARKSHEET CARD */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Academic Performance
              </h2>
              <p className="text-xs text-gray-500">
                Marks and status for each term and subject
              </p>
            </div>

            {/* Term selector */}
            {marksheet?.terms?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {marksheet.terms.map((t) => (
                  <button
                    key={t.term}
                    onClick={() => setSelectedTerm(t.term)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                      selectedTerm === t.term
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    Term {t.term}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Term summary */}
          {currentTerm ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center mr-3">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-800">Term</p>
                    <p className="text-sm font-semibold text-blue-900">
                      Term {currentTerm.term}
                    </p>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-xl p-3 flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center mr-3">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-green-800">Overall %</p>
                    <p className="text-sm font-semibold text-green-900">
                      {overallTermPercentage
                        ? `${overallTermPercentage}%`
                        : "Not calculated yet"}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-gray-700 text-white flex items-center justify-center mr-3">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Subjects</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {currentTerm.subjects?.length || 0} subjects
                    </p>
                  </div>
                </div>
              </div>

              {/* Subject table */}
              <div className="overflow-x-auto border border-gray-100 rounded-xl">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Max Marks
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Obtained
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Percentage
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {currentTerm.subjects?.map((subj, idx) => {
                      const percentage =
                        subj.percentage ??
                        (subj.maxMarks
                          ? ((subj.obtainedMarks / subj.maxMarks) * 100).toFixed(
                              2
                            )
                          : null);

                      const isSubmitted = subj.isSubmitted;

                      return (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-blue-600 text-xs font-semibold">
                                {subj.subjectName?.[0]?.toUpperCase() || "S"}
                              </span>
                              <span className="font-medium text-gray-800 capitalize">
                                {subj.subjectName}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center text-gray-700">
                            {subj.maxMarks}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-700">
                            {subj.obtainedMarks}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {percentage !== null ? (
                              <span className="font-semibold text-gray-800">
                                {percentage}%
                              </span>
                            ) : (
                              <span className="text-xs text-gray-400">
                                –
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                isSubmitted
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {isSubmitted ? (
                                <CheckCircle className="w-3 h-3 mr-1" />
                              ) : (
                                <Clock className="w-3 h-3 mr-1" />
                              )}
                              {isSubmitted ? "Submitted" : "Pending"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-xs text-gray-500 flex items-center justify-between">
                <span>
                  Marks are updated by teachers. Contact your class teacher if
                  something looks wrong.
                </span>
                <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  View detailed report
                  <ChevronRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-10">
              <AlertCircle className="w-10 h-10 text-gray-400 mb-3" />
              <p className="text-gray-600 font-medium">
                Marksheet not available yet.
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Once your marks are published, you’ll see them here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
