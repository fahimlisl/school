import PublicNavbar from "../../components/navbar/PublicNavbar.jsx";
import PublicFooter from "../../components/footer/PublicFooter.jsx";
import { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaCalendarAlt, FaCamera, FaUsers, FaTrophy, FaGraduationCap, FaMusic, FaPaintBrush, FaFutbol, FaHeart, FaBook, FaStar, FaDownload, FaShareAlt, FaTimes, FaChevronLeft, FaChevronRight, FaPlayCircle } from "react-icons/fa";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [galleryItems, setGalleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  // Initialize gallery data
  useEffect(() => {
    const initialGallery = [
      {
        id: 1,
        title: "Graduation Ceremony 2024",
        description: "Celebrating our graduating class of 2024 with proud families and faculty.",
        category: "events",
        date: "2024-06-05",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        type: "image",
        featured: true,
        likes: 245,
        views: 1200
      },
      {
        id: 2,
        title: "Science Fair Winners",
        description: "Students showcasing innovative projects at the annual science fair.",
        category: "academic",
        date: "2024-05-20",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        type: "image",
        featured: true,
        likes: 189,
        views: 950
      },
      {
        id: 3,
        title: "Championship Basketball Game",
        description: "Varsity team celebrating their state championship victory.",
        category: "sports",
        date: "2024-03-15",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        type: "image",
        featured: false,
        likes: 312,
        views: 1800
      },
      {
        id: 4,
        title: "Spring Musical Performance",
        description: "Students performing in this year's spring musical production.",
        category: "arts",
        date: "2024-04-10",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        type: "image",
        featured: false,
        likes: 178,
        views: 890
      },
      {
        id: 5,
        title: "Community Service Day",
        description: "Students volunteering at local community centers and parks.",
        category: "community",
        date: "2024-02-22",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        type: "image",
        featured: false,
        likes: 156,
        views: 780
      },
      {
        id: 6,
        title: "Robotics Competition",
        description: "Our robotics team competing at the regional championships.",
        category: "academic",
        date: "2024-01-30",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        type: "image",
        featured: true,
        likes: 221,
        views: 1100
      },
      {
        id: 7,
        title: "Art Exhibition Opening",
        description: "Annual student art exhibition showcasing creative talents.",
        category: "arts",
        date: "2024-05-18",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        type: "image",
        featured: false,
        likes: 134,
        views: 670
      },
      {
        id: 8,
        title: "Homecoming Parade",
        description: "Annual homecoming parade through the school campus.",
        category: "events",
        date: "2023-10-15",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        type: "image",
        featured: false,
        likes: 198,
        views: 990
      },
      {
        id: 9,
        title: "Campus Tour Video",
        description: "Virtual tour of our school facilities and campus.",
        category: "campus",
        date: "2024-06-01",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        type: "video",
        featured: true,
        videoUrl: "#",
        likes: 167,
        views: 1200
      },
      {
        id: 10,
        title: "Teacher Appreciation Week",
        description: "Celebrating our dedicated faculty and staff.",
        category: "events",
        date: "2024-05-08",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        type: "image",
        featured: false,
        likes: 189,
        views: 950
      },
      {
        id: 11,
        title: "Debate Team Nationals",
        description: "Our debate team representing at the national competition.",
        category: "academic",
        date: "2024-04-25",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        type: "image",
        featured: false,
        likes: 145,
        views: 725
      },
      {
        id: 12,
        title: "Sports Day 2024",
        description: "Annual sports day with various competitions and activities.",
        category: "sports",
        date: "2024-05-25",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        type: "image",
        featured: false,
        likes: 201,
        views: 1005
      }
    ];
    
    setGalleryItems(initialGallery);
    setFilteredItems(initialGallery);
  }, []);

  // Filter gallery items
  useEffect(() => {
    let filtered = galleryItems;
    
    // Apply category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }
    
    // Sort by featured first, then by date
    filtered.sort((a, b) => {
      if (a.featured !== b.featured) return b.featured - a.featured;
      return new Date(b.date) - new Date(a.date);
    });
    
    setFilteredItems(filtered);
  }, [activeCategory, searchQuery, galleryItems]);

  const categories = [
    { id: "all", name: "All Photos", icon: <FaCamera />, count: galleryItems.length },
    { id: "events", name: "School Events", icon: <FaCalendarAlt />, count: galleryItems.filter(g => g.category === "events").length },
    { id: "academic", name: "Academic", icon: <FaGraduationCap />, count: galleryItems.filter(g => g.category === "academic").length },
    { id: "sports", name: "Sports", icon: <FaFutbol />, count: galleryItems.filter(g => g.category === "sports").length },
    { id: "arts", name: "Arts & Music", icon: <FaMusic />, count: galleryItems.filter(g => g.category === "arts").length },
    { id: "community", name: "Community", icon: <FaHeart />, count: galleryItems.filter(g => g.category === "community").length },
    { id: "campus", name: "Campus Life", icon: <FaBook />, count: galleryItems.filter(g => g.category === "campus").length }
  ];

  const getCategoryColor = (category) => {
    switch(category) {
      case "events": return "bg-blue-100 text-blue-800";
      case "academic": return "bg-purple-100 text-purple-800";
      case "sports": return "bg-green-100 text-green-800";
      case "arts": return "bg-pink-100 text-pink-800";
      case "community": return "bg-red-100 text-red-800";
      case "campus": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleImageClick = (item) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;
    
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
    }
    
    setSelectedImage(filteredItems[newIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') navigateImage('next');
      if (e.key === 'ArrowLeft') navigateImage('prev');
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      <PublicNavbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '60px'
          }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">School Gallery</h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Explore moments of learning, achievement, and community through our photo and video collections.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{galleryItems.length}</div>
                <div className="text-indigo-200">Photos & Videos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{categories.length - 1}</div>
                <div className="text-indigo-200">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{galleryItems.filter(g => g.featured).length}</div>
                <div className="text-indigo-200">Featured</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-8 px-4">
        
        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 sticky top-4 z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search gallery by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>
            </div>
            <div className="flex items-center">
              <FaFilter className="text-gray-500 mr-3" />
              <span className="text-gray-700 font-medium mr-4">Filter by:</span>
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Filters */}
          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-2 min-w-max">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center px-4 py-3 rounded-lg transition whitespace-nowrap ${activeCategory === cat.id 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <span className="mr-2">{cat.icon}</span>
                  <span className="font-medium">{cat.name}</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${activeCategory === cat.id 
                    ? 'bg-white/30' 
                    : 'bg-gray-300'}`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {activeCategory === "all" ? "All Photos & Videos" : categories.find(c => c.id === activeCategory)?.name}
              <span className="text-gray-500 text-lg ml-2">({filteredItems.length})</span>
            </h2>
            <div className="text-sm text-gray-600 flex items-center">
              <FaCamera className="mr-2" />
              Click to view full size
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
              <FaCamera className="text-5xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No photos found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  className="group bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleImageClick(item)}
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                            {categories.find(c => c.id === item.category)?.name}
                          </span>
                          {item.type === "video" && (
                            <FaPlayCircle className="text-2xl" />
                          )}
                        </div>
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      </div>
                    </div>
                    
                    {/* Featured Badge */}
                    {item.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full flex items-center">
                          <FaStar className="mr-1" /> Featured
                        </span>
                      </div>
                    )}
                    
                    {/* Type Badge */}
                    {item.type === "video" && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                          Video
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500 flex items-center">
                        <FaCalendarAlt className="mr-2" />
                        {formatDate(item.date)}
                      </span>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span className="flex items-center">
                          <FaHeart className="mr-1" /> {item.likes}
                        </span>
                        <span className="flex items-center">
                          <FaUsers className="mr-1" /> {item.views}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Featured Albums Section */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Featured Albums</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Graduation 2024", count: 45, category: "events", icon: <FaGraduationCap /> },
              { title: "Sports Championship", count: 32, category: "sports", icon: <FaTrophy /> },
              { title: "Art Exhibition", count: 28, category: "arts", icon: <FaPaintBrush /> },
              { title: "Science Fair", count: 36, category: "academic", icon: <FaBook /> },
              { title: "Community Service", count: 24, category: "community", icon: <FaHeart /> },
              { title: "Music Concert", count: 31, category: "arts", icon: <FaMusic /> }
            ].map((album, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-indigo-100 rounded-lg mr-4">
                      <div className="text-indigo-600 text-2xl">{album.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{album.title}</h3>
                      <div className="text-gray-500 text-sm">{album.count} photos</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
                    ))}
                  </div>
                  <button className="w-full py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-indigo-600 hover:text-white transition">
                    View Album
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo of the Month */}
        <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-2xl p-8 mb-12">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Photo of the Month</h2>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-64 md:h-80">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                      <FaCamera className="text-6xl mx-auto mb-4 opacity-80" />
                      <p className="text-xl font-bold">May 2024 - Science Fair Winners</p>
                      <p className="mt-2">Selected by student vote</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Submit Your Photos</h3>
              <p className="text-gray-600 mb-6">
                Students and staff can submit photos for the gallery. Selected photos may be featured on our website and social media.
              </p>
              <button className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition mb-4">
                Submit Photo
              </button>
              <button className="w-full py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition">
                View Submission Guidelines
              </button>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <FaDownload className="text-4xl text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Download High-Quality Photos</h2>
            <p className="text-gray-600 mb-6">
              Parents and students can download high-resolution photos for personal use. Please respect copyright and usage guidelines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition">
                <FaDownload className="inline mr-2" />
                Download Guidelines
              </button>
              <button className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition">
                Request Photo Permissions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition"
          >
            <FaTimes />
          </button>
          
          <button
            onClick={() => navigateImage('prev')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition"
          >
            <FaChevronLeft />
          </button>
          
          <button
            onClick={() => navigateImage('next')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition"
          >
            <FaChevronRight />
          </button>
          
          <div className="max-w-5xl w-full">
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              <div className="relative h-[60vh]">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="p-6 bg-gray-800 text-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedImage.category)}`}>
                        {categories.find(c => c.id === selectedImage.category)?.name}
                      </span>
                      {selectedImage.type === "video" && (
                        <span className="px-3 py-1 bg-red-500 rounded-full text-sm font-medium">
                          Video
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <button className="p-2 hover:bg-gray-700 rounded-lg transition">
                      <FaShareAlt className="text-xl" />
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded-lg transition">
                      <FaDownload className="text-xl" />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4">{selectedImage.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center">
                    <FaCalendarAlt className="mr-2" /> {formatDate(selectedImage.date)}
                  </span>
                  <span className="flex items-center">
                    <FaHeart className="mr-2" /> {selectedImage.likes} likes
                  </span>
                  <span className="flex items-center">
                    <FaUsers className="mr-2" /> {selectedImage.views} views
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <PublicFooter />
    </>
  );
}