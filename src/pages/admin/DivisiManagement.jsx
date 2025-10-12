import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

const DivisiManagement = () => {
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDivision, setEditingDivision] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    description: "",
    members: "",
    projects: "",
    skills: "",
  });

  // Fetch divisions
  const fetchDivisions = async () => {
    try {
      const response = await axios.get(`${API_URL}/divisi`);
      setDivisions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching divisions:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  // Open modal for add/edit
  const openModal = (division = null) => {
    if (division) {
      setEditingDivision(division);
      setFormData({
        ...division,
        skills: division.skills.join(", "),
      });
    } else {
      setEditingDivision(null);
      setFormData({
        name: "",
        icon: "",
        description: "",
        members: "",
        projects: "",
        skills: "",
      });
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDivision(null);
    setFormData({
      name: "",
      icon: "",
      description: "",
      members: "",
      projects: "",
      skills: "",
    });
  };

  // Handle form submit (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const divisionData = {
      name: formData.name,
      icon: formData.icon,
      description: formData.description,
      members: Number(formData.members),
      projects: Number(formData.projects),
      skills: formData.skills.split(",").map((s) => s.trim()),
    };

    try {
      if (editingDivision) {
        await axios.put(`${API_URL}/divisi/${editingDivision.id}`, divisionData);
      } else {
        await axios.post(`${API_URL}/divisi`, divisionData);
      }
      fetchDivisions();
      closeModal();
    } catch (error) {
      console.error("Error saving division:", error);
    }
  };

  // Delete division
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus divisi ini?")) {
      try {
        await axios.delete(`${API_URL}/divisi/${id}`);
        fetchDivisions();
      } catch (error) {
        console.error("Error deleting division:", error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Divisi Management</h1>
        <button
          onClick={() => openModal()}
          className="bg-[#CB3B0F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FFAE00] hover:text-gray-900 transition-all duration-300"
        >
          + Add Divisi
        </button>
      </div>

      {/* Divisions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {divisions.map((divisi) => (
          <div
            key={divisi.id}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#CB3B0F]"
          >
            <div className="text-6xl mb-4">{divisi.icon}</div>

            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {divisi.name}
            </h3>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {divisi.description}
            </p>

            <div className="flex gap-6 mb-6 text-sm">
              <div>
                <p className="text-gray-500 font-medium">Members</p>
                <p className="text-2xl font-bold text-[#CB3B0F]">
                  {divisi.members}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Projects</p>
                <p className="text-2xl font-bold text-[#CB3B0F]">
                  {divisi.projects}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <p className="text-sm font-semibold text-gray-700">Key Skills:</p>
              <div className="flex flex-wrap gap-2">
                {divisi.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-orange-50 text-[#CB3B0F] rounded-full text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openModal(divisi)}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(divisi.id)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingDivision ? "Edit Divisi" : "Add New Divisi"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Division Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Icon/Logo (Emoji atau karakter)
                </label>
                <input
                  type="text"
                  required
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="💻"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Members
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.members}
                    onChange={(e) => setFormData({ ...formData, members: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Projects
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.projects}
                    onChange={(e) => setFormData({ ...formData, projects: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Key Skills (pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  required
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="React, Node.js, Python, Cloud"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB3B0F] focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#CB3B0F] text-white py-3 rounded-lg font-semibold hover:bg-[#FFAE00] hover:text-gray-900 transition-all"
                >
                  {editingDivision ? "Update Divisi" : "Add Divisi"}
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

export default DivisiManagement;
