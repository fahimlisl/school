// src/pages/admin/Students/StudentList.jsx
import { Search, Filter, Download, MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export default function StudentList() {
  const [search, setSearch] = useState("");
  
  const students = [
    { id: 1, name: "John Doe", grade: "10th", email: "john@school.com", phone: "123-456-7890", status: "Active" },
    { id: 2, name: "Jane Smith", grade: "11th", email: "jane@school.com", phone: "123-456-7891", status: "Active" },
    { id: 3, name: "Mike Johnson", grade: "9th", email: "mike@school.com", phone: "123-456-7892", status: "Inactive" },
    { id: 4, name: "Sarah Williams", grade: "12th", email: "sarah@school.com", phone: "123-456-7893", status: "Active" },
    { id: 5, name: "David Brown", grade: "10th", email: "david@school.com", phone: "123-456-7894", status: "Active" },
  ];

  return (
    <div>
      {/* Header with Actions */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Student Management</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage all student records</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg font-medium text-sm sm:text-base w-full sm:w-auto">
            + Add New Student
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search students by name, email, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            />
          </div>
          
          {/* Filter Button - Hidden on mobile */}
          <button className="hidden sm:flex items-center px-4 py-2.5 border rounded-lg text-gray-700 hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          
          {/* Export Button - Hidden on mobile */}
          <button className="hidden sm:flex items-center px-4 py-2.5 border rounded-lg text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          
          {/* Mobile Filter & Export */}
          <div className="flex sm:hidden gap-2">
            <button className="flex-1 flex items-center justify-center px-3 py-2.5 border rounded-lg text-gray-700">
              <Filter className="w-4 h-4" />
            </button>
            <button className="flex-1 flex items-center justify-center px-3 py-2.5 border rounded-lg text-gray-700">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-gray-500 text-xs sm:text-sm">Total Students</p>
          <p className="text-2xl sm:text-3xl font-bold mt-2">1,254</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-gray-500 text-xs sm:text-sm">Active</p>
          <p className="text-2xl sm:text-3xl font-bold mt-2">1,180</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-gray-500 text-xs sm:text-sm">Inactive</p>
          <p className="text-2xl sm:text-3xl font-bold mt-2">74</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-gray-500 text-xs sm:text-sm">New This Month</p>
          <p className="text-2xl sm:text-3xl font-bold mt-2">45</p>
        </div>
      </div>

      {/* Students Table - Responsive */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {/* Table Header - Hidden on mobile */}
        <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b bg-gray-50">
          <div className="col-span-3 font-medium text-gray-700">Name</div>
          <div className="col-span-2 font-medium text-gray-700">Grade</div>
          <div className="col-span-3 font-medium text-gray-700">Contact</div>
          <div className="col-span-2 font-medium text-gray-700">Status</div>
          <div className="col-span-2 font-medium text-gray-700">Actions</div>
        </div>

        {/* Students List */}
        <div className="divide-y">
          {students.map((student) => (
            <div key={student.id} className="p-4 hover:bg-gray-50">
              {/* Mobile View */}
              <div className="sm:hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{student.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{student.grade} • {student.email}</p>
                    <p className="text-sm text-gray-500">{student.phone}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      student.status === "Active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {student.status}
                    </span>
                    <button className="p-1">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3">
                  <p className="font-medium text-gray-800">{student.name}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-600">{student.grade}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-gray-600">{student.email}</p>
                  <p className="text-sm text-gray-500">{student.phone}</p>
                </div>
                <div className="col-span-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    student.status === "Active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {student.status}
                  </span>
                </div>
                <div className="col-span-2">
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-green-50 rounded-lg text-green-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination - Responsive */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium">1-5</span> of <span className="font-medium">1,254</span> students
        </p>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">
            1
          </button>
          <button className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      {/* Mobile Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 sm:hidden">
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium">
          + Add New Student
        </button>
      </div>
    </div>
  );
}