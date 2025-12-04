import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import {
  User, Mail, Phone, Calendar, BookOpen, UserCheck,
  Camera, DollarSign, Upload, ArrowLeft, Save, 
  CheckCircle, AlertCircle, Shield, GraduationCap,
  Home, Users, ChevronRight, CreditCard, FileText,
  X, Eye, EyeOff, RefreshCw, Download, Loader2,
  Lock, Key
} from "lucide-react";

export default function AddStudent() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [feeStructures, setFeeStructures] = useState([]);
  const [generatedPassword, setGeneratedPassword] = useState("");

  // Form state matching your backend requirements
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    fullName: "",
    email: "",
    phoneNumber: "",
    DOB: "",
    
    // Step 2: Academic Information
    currentClass: 1,
    section: "A",
    admissionDate: new Date().toISOString().split('T')[0],
    gurdianName: "",
    
    // Step 3: Fee Information
    feesPaid: false,
    
    // Step 4: Upload Photo
    profilePhoto: null,
  });

  // Form errors
  const [errors, setErrors] = useState({});

  // Fetch fee structures on component mount
  // useEffect(() => {
  //   fetchFeeStructures();
  // }, []);

  // Calculate password from DOB (ddmmyyyy format)
  useEffect(() => {
    if (formData.DOB) {
      const date = new Date(formData.DOB);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const password = `${day}${month}${year}`;
      setGeneratedPassword(password);
    }
  }, [formData.DOB]);

  // Fetch available fee structures
  // const fetchFeeStructures = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_BASE_URL}/admin/fee-structures`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` }
  //       }
  //     );
  //     if (response.data.success) {
  //       setFeeStructures(response.data.data || []);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching fee structures:", error);
  //     // For demo, use sample data
  //     setFeeStructures([
  //       { _id: "1", classAssign: 1, totalFees: 5000, feeName: "Class 1 Basic" },
  //       { _id: "2", classAssign: 2, totalFees: 5500, feeName: "Class 2 Standard" },
  //       { _id: "3", classAssign: 3, totalFees: 6000, feeName: "Class 3 Premium" },
  //       { _id: "4", classAssign: 4, totalFees: 6500, feeName: "Class 4 Advanced" },
  //     ]);
  //   }
  // };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === "file") {
      const file = files[0];
      if (file) {
        // Validate file
        if (!file.type.startsWith('image/')) {
          setErrors(prev => ({ ...prev, profilePhoto: "Please upload an image file" }));
          return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          setErrors(prev => ({ ...prev, profilePhoto: "Image must be less than 5MB" }));
          return;
        }
        
        setFormData(prev => ({ ...prev, profilePhoto: file }));
        setPreviewImage(URL.createObjectURL(file));
        setErrors(prev => ({ ...prev, profilePhoto: "" }));
      }
    } else if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: e.target.checked }));
    } else if (name === "currentClass") {
      const classNum = parseInt(value);
      setFormData(prev => ({ ...prev, [name]: classNum }));
    } else if (name === "phoneNumber") {
      // Only allow numbers
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    setError(""); // Clear general error
  };

  // Validate current step
  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1: // Personal Information
        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Invalid email format";
        }
        if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
        if (formData.phoneNumber && formData.phoneNumber.length < 10) {
          newErrors.phoneNumber = "Phone number must be at least 10 digits";
        }
        if (!formData.DOB) newErrors.DOB = "Date of birth is required";
        break;
        
      case 2: // Academic Information
        if (!formData.gurdianName.trim()) newErrors.gurdianName = "Guardian name is required";
        if (!formData.admissionDate) newErrors.admissionDate = "Admission date is required";
        if (!formData.section) newErrors.section = "Section is required";
        if (formData.currentClass < 1 || formData.currentClass > 12) {
          newErrors.currentClass = "Invalid class (1-12)";
        }
        break;
        
      case 3: // Photo Upload
        if (!formData.profilePhoto) newErrors.profilePhoto = "Profile photo is required";
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigate to next step
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      setError("Please fix all errors before submitting");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const formDataToSend = new FormData();
      
      // Add all form fields
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("DOB", formData.DOB);
      formDataToSend.append("currentClass", formData.currentClass);
      formDataToSend.append("section", formData.section);
      formDataToSend.append("admissionDate", formData.admissionDate);
      formDataToSend.append("gurdianName", formData.gurdianName);
      formDataToSend.append("feesPaid", formData.feesPaid ? "true" : "false");
      
      // Add profile photo
      if (formData.profilePhoto) {
        formDataToSend.append("profilePhoto", formData.profilePhoto);
      }

      console.log("Submitting student data:", {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        currentClass: formData.currentClass,
        section: formData.section,
        admissionDate: formData.admissionDate,
        DOB: formData.DOB,
        gurdianName: formData.gurdianName,
        feesPaid: formData.feesPaid,
        hasPhoto: !!formData.profilePhoto
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/createStudent`,
        formDataToSend,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.data.success) {
        setSuccess(true);
        // Reset form after successful submission
        setTimeout(() => {
          navigate("/admin/students");
        }, 2000);
      } else {
        setError(response.data.message || "Failed to create student");
      }
    } catch (error) {
      console.error("Error creating student:", error);
      
      if (error.response) {
        // Server responded with error
        const serverError = error.response.data;
        setError(serverError.message || `Server error: ${error.response.status}`);
        
        // Handle validation errors from backend
        if (error.response.status === 400 || error.response.status === 401) {
          if (serverError.errors) {
            // Convert backend validation errors to frontend format
            const backendErrors = {};
            Object.keys(serverError.errors).forEach(key => {
              backendErrors[key] = serverError.errors[key].message || serverError.errors[key];
            });
            setErrors(backendErrors);
          }
        }
      } else if (error.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError("An unexpected error occurred: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Get available sections based on class
  const getSectionsForClass = (classNum) => {
    // You can customize this based on your school's sections
    const sectionsByClass = {
      1: ["A", "B"],
      2: ["A", "B"],
      3: ["A", "B", "C"],
      4: ["A", "B", "C"],
      5: ["A", "B", "C", "D"],
      6: ["A", "B", "C", "D"],
      7: ["A", "B", "C", "D"],
      8: ["A", "B", "C", "D"],
      9: ["A", "B", "C", "D"],
      10: ["A", "B", "C", "D"],
      11: ["A", "B", "C", "D"],
      12: ["A", "B", "C", "D"],
    };
    return sectionsByClass[classNum] || ["A", "B", "C", "D"];
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Steps configuration
  const steps = [
    { number: 1, title: "Personal Info", icon: <User size={20} /> },
    { number: 2, title: "Academic Info", icon: <GraduationCap size={20} /> },
    { number: 3, title: "Upload Photo", icon: <Camera size={20} /> },
    { number: 4, title: "Review", icon: <FileText size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/students")}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Students
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Add New Student
              </h1>
              <p className="text-gray-600 mt-2">
                Fill in the student details step by step. All fields are required.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                <Shield className="w-4 h-4 mr-2" />
                Admin Mode
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step.number === currentStep
                    ? "border-blue-600 bg-blue-600 text-white"
                    : step.number < currentStep
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-300 bg-gray-50 text-gray-400"
                }`}>
                  {step.number < currentStep ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.icon
                  )}
                </div>
                
                <div className="ml-3 flex-1">
                  <p className={`text-sm font-medium ${
                    step.number <= currentStep ? "text-gray-800" : "text-gray-400"
                  }`}>
                    Step {step.number}
                  </p>
                  <p className={`text-xs ${
                    step.number <= currentStep ? "text-gray-600" : "text-gray-400"
                  }`}>
                    {step.title}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    step.number < currentStep ? "bg-green-500" : "bg-gray-200"
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
              <div>
                <span className="text-red-700 font-medium block">{error}</span>
                <span className="text-red-600 text-sm block mt-1">
                  Please check the form and try again.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center">
              <CheckCircle className="w-12 h-12 text-green-500 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-green-800">Student Created Successfully!</h3>
                <p className="text-green-700 mt-2">
                  Student <span className="font-bold">{formData.fullName}</span> has been added to Class {formData.currentClass}.
                </p>
                <p className="text-green-600 text-sm mt-3">
                  Password generated: <span className="font-mono bg-green-100 px-2 py-1 rounded">
                    {generatedPassword}
                  </span> (Based on DOB: ddmmyyyy)
                </p>
                <p className="text-green-600 text-sm mt-2">
                  Redirecting to students list...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <User className="w-6 h-6 mr-3 text-blue-600" />
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition ${
                        errors.fullName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter student's full name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="student@school.edu"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        +91
                      </div>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={`w-full pl-14 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition ${
                          errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="1234567890"
                        maxLength="10"
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="date"
                        name="DOB"
                        value={formData.DOB}
                        onChange={handleChange}
                        max={new Date().toISOString().split('T')[0]}
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition ${
                          errors.DOB ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.DOB && (
                      <p className="mt-1 text-sm text-red-600">{errors.DOB}</p>
                    )}
                    {formData.DOB && (
                      <p className="mt-2 text-sm text-gray-600">
                        Password will be: <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                          {generatedPassword}
                        </span> (ddmmyyyy format)
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Academic Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3 text-blue-600" />
                  Academic Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Class */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Class *
                    </label>
                    <select
                      name="currentClass"
                      value={formData.currentClass}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition ${
                        errors.currentClass ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(cls => (
                        <option key={cls} value={cls}>
                          Class {cls}
                        </option>
                      ))}
                    </select>
                    {errors.currentClass && (
                      <p className="mt-1 text-sm text-red-600">{errors.currentClass}</p>
                    )}
                  </div>

                  {/* Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section *
                    </label>
                    <select
                      name="section"
                      value={formData.section}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition ${
                        errors.section ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      {getSectionsForClass(formData.currentClass).map(sec => (
                        <option key={sec} value={sec}>
                          Section {sec}
                        </option>
                      ))}
                    </select>
                    {errors.section && (
                      <p className="mt-1 text-sm text-red-600">{errors.section}</p>
                    )}
                  </div>

                  {/* Admission Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admission Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="date"
                        name="admissionDate"
                        value={formData.admissionDate}
                        onChange={handleChange}
                        max={new Date().toISOString().split('T')[0]}
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition ${
                          errors.admissionDate ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.admissionDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.admissionDate}</p>
                    )}
                  </div>

                  {/* Guardian Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guardian Name *
                    </label>
                    <input
                      type="text"
                      name="gurdianName"
                      value={formData.gurdianName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition ${
                        errors.gurdianName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter guardian's full name"
                    />
                    {errors.gurdianName && (
                      <p className="mt-1 text-sm text-red-600">{errors.gurdianName}</p>
                    )}
                  </div>

                  {/* Fees Paid */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fee Status
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="feesPaid"
                          value={true}
                          checked={formData.feesPaid === true}
                          onChange={() => setFormData(prev => ({ ...prev, feesPaid: true }))}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700">Fees Paid</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="feesPaid"
                          value={false}
                          checked={formData.feesPaid === false}
                          onChange={() => setFormData(prev => ({ ...prev, feesPaid: false }))}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700">Fees Pending</span>
                      </label>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Note: Fee structure will be automatically assigned based on the selected class
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Upload Photo */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Camera className="w-6 h-6 mr-3 text-blue-600" />
                  Upload Profile Photo
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Upload Area */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Photo *
                    </label>
                    <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition ${
                      errors.profilePhoto ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400'
                    }`}>
                      <input
                        type="file"
                        id="profilePhoto"
                        name="profilePhoto"
                        onChange={handleChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <label htmlFor="profilePhoto" className="cursor-pointer">
                        {previewImage ? (
                          <div className="space-y-4">
                            <div className="relative w-32 h-32 mx-auto rounded-xl overflow-hidden">
                              <img 
                                src={previewImage} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setPreviewImage(null);
                                setFormData(prev => ({ ...prev, profilePhoto: null }));
                              }}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove Image
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                              <Camera className="w-10 h-10 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-gray-700 font-medium">Click to upload photo</p>
                              <p className="text-gray-500 text-sm mt-1">
                                PNG, JPG, GIF up to 5MB
                              </p>
                            </div>
                            <button
                              type="button"
                              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                              Browse Files
                            </button>
                          </div>
                        )}
                      </label>
                    </div>
                    {errors.profilePhoto && (
                      <p className="mt-2 text-sm text-red-600">{errors.profilePhoto}</p>
                    )}
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Photo Requirements</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Clear, recent photo of the student</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Face should be clearly visible</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Plain background preferred</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Maximum file size: 5MB</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-blue-600" />
                  Review Student Information
                </h2>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-6">Student Summary</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Info Summary */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-700">Personal Information</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">Full Name:</span>
                          <span className="font-medium">{formData.fullName}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-medium">{formData.email}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-medium">+91 {formData.phoneNumber}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">Date of Birth:</span>
                          <span className="font-medium">{formatDate(formData.DOB)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">Generated Password:</span>
                          <span className="font-mono font-medium">{generatedPassword}</span>
                        </div>
                      </div>
                    </div>

                    {/* Academic Info Summary */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-700">Academic Information</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">Class & Section:</span>
                          <span className="font-medium">Class {formData.currentClass} - {formData.section}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">Admission Date:</span>
                          <span className="font-medium">{formatDate(formData.admissionDate)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">Guardian Name:</span>
                          <span className="font-medium">{formData.gurdianName}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">Fee Status:</span>
                          <span className={`font-medium ${
                            formData.feesPaid ? 'text-green-600' : 'text-amber-600'
                          }`}>
                            {formData.feesPaid ? 'Paid' : 'Pending'}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">Profile Photo:</span>
                          <span className="font-medium">
                            {formData.profilePhoto ? 'Uploaded ✓' : 'Not Uploaded'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      className="w-4 h-4 text-blue-600 mt-1 mr-3"
                    />
                    <span className="text-sm text-gray-700">
                      I confirm that all information provided is accurate and complete. 
                      I understand that the student's login password will be generated 
                      automatically from their date of birth (ddmmyyyy format).
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition flex items-center"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous Step
                    </button>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition flex items-center justify-center"
                    >
                      Continue to {currentStep === 3 ? 'Review' : 'Next Step'}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading || success}
                      className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Creating Student...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          Create Student
                        </>
                      )}
                    </button>
                  )}
                  
                  <button
                    type="button"
                    onClick={() => navigate("/admin/students")}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <Key className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Auto-Generated Password</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Password is automatically generated from the student's date of birth in ddmmyyyy format.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Automatic Marksheet</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              A marksheet with all subjects will be automatically created for the student.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Fee Structure</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Fee structure is automatically assigned based on the selected class.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}