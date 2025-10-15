import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

const ProjectsManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [imageFileName, setImageFileName] = useState("");
  const [formData, setFormData] = useState({
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

  // Validate and handle image upload (convert to base64)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageError("");

    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setImageError("Please upload a valid image file (JPG, PNG, or WebP)");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setImageError("Image size must be less than 5MB");
      return;
    }

    // Convert to base64
    setImageLoading(true);
    setImageFileName(file.name);
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
      setImageLoading(false);
    };

    reader.onerror = () => {
      setImageError("Failed to read the file. Please try again.");
      setImageLoading(false);
    };

    reader.readAsDataURL(file);
  };

  // Remove uploaded image
  const removeImage = () => {
    setFormData({ ...formData, image: "" });
    setImageFileName("");
    setImageError("");
    // Reset file input
    const fileInput = document.getElementById("project-image-input");
    if (fileInput) fileInput.value = "";
  };

  // Open modal for add/edit
  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData(project);
      setImageFileName(project.image ? "Current image" : "");
    } else {
      setEditingProject(null);
      setFormData({
        image: "",
      });
      setImageFileName("");
    }
    setImageError("");
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setFormData({
      image: "",
    });
    setImageFileName("");
    setImageError("");
    setImageLoading(false);
  };

  // Handle form submit (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate image is uploaded
    if (!formData.image) {
      setImageError("Please upload an image");
      return;
    }

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
              alt="Project"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
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
                  Project Image *
                </label>

                {/* Upload Button */}
                {!formData.image ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#CB3B0F] transition-colors">
                    <input
                      id="project-image-input"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="project-image-input"
                      className="cursor-pointer"
                    >
                      <div className="text-gray-400 mb-2">
                        <svg
                          className="w-12 h-12 mx-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 font-medium mb-1">
                        Click to upload image
                      </p>
                      <p className="text-xs text-gray-500">
                        JPG, PNG or WebP (max 5MB)
                      </p>
                    </label>
                  </div>
                ) : (
                  /* Image Preview */
                  <div className="relative">
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                      {imageLoading ? (
                        <div className="flex items-center justify-center h-64 bg-gray-100">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CB3B0F]"></div>
                        </div>
                      ) : (
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-64 object-cover"
                        />
                      )}
                    </div>
                    {/* Image Info & Actions */}
                    <div className="mt-3 flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm text-gray-600 truncate">
                          {imageFileName}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="ml-2 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {imageError && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span>⚠️</span>
                    {imageError}
                  </p>
                )}

                {/* Loading State */}
                {imageLoading && (
                  <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Processing image...
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={imageLoading}
                  className="flex-1 bg-[#CB3B0F] text-white py-3 rounded-lg font-semibold hover:bg-[#FFAE00] hover:text-gray-900 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
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
