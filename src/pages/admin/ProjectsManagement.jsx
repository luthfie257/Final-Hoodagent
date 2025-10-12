import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

const ProjectsManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    image: "",
  });

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/projects`);
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle image upload (convert to base64)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Open modal for add/edit
  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData(project);
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        price: "",
        location: "",
        image: "",
      });
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setFormData({
      title: "",
      price: "",
      location: "",
      image: "",
    });
  };

  // Handle form submit (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProject) {
        await axios.put(`${API_URL}/projects/${editingProject.id}`, formData);
      } else {
        await axios.post(`${API_URL}/projects`, formData);
      }
      fetchProjects();
      closeModal();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  // Delete project
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus project ini?")) {
      try {
        await axios.delete(`${API_URL}/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Catalog Management</h1>
        <button
          onClick={() => openModal()}
          className="bg-[#CB3B0F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FFAE00] hover:text-gray-900 transition-all duration-300"
        >
          + Add Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-2">
                <span className="inline-block mr-2">📍</span>
                {project.location}
              </p>
              <p className="text-2xl font-bold text-[#CB3B0F] mb-4">
                {project.price}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(project)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price
                </label>
                <input
                  type="text"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="e.g., $2,50,000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mt-4 w-full h-48 object-cover rounded-lg"
                  />
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#CB3B0F] text-white py-3 rounded-lg font-semibold hover:bg-[#FFAE00] hover:text-gray-900 transition-all"
                >
                  {editingProject ? "Update Project" : "Add Project"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManagement;
