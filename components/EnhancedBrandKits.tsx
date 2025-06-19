"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, Check, Plus, Edit3, Trash2, Download, Save, X, Copy, Eye, EyeOff } from "lucide-react"

interface BrandKit {
  id: number
  name: string
  icon: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontFamily: string
  logo?: string
  isVisible: boolean
  createdAt: string
  lastModified: string
}

export default function EnhancedBrandKits() {
  const [selectedBrands, setSelectedBrands] = useState<number[]>([3])
  const [showSettings, setShowSettings] = useState<number | null>(null)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [editingBrand, setEditingBrand] = useState<BrandKit | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const [brandKits, setBrandKits] = useState<BrandKit[]>([
    {
      id: 1,
      name: "ECorp",
      icon: "🟢",
      primaryColor: "#10B981",
      secondaryColor: "#059669",
      accentColor: "#34D399",
      fontFamily: "Inter",
      isVisible: true,
      createdAt: "2024-01-15",
      lastModified: "2024-01-20",
    },
    {
      id: 2,
      name: "ICorp",
      icon: "🟠",
      primaryColor: "#F59E0B",
      secondaryColor: "#D97706",
      accentColor: "#FBBF24",
      fontFamily: "Roboto",
      isVisible: true,
      createdAt: "2024-01-10",
      lastModified: "2024-01-18",
    },
    {
      id: 3,
      name: "The Agency",
      icon: "🔴",
      primaryColor: "#EF4444",
      secondaryColor: "#DC2626",
      accentColor: "#F87171",
      fontFamily: "Poppins",
      isVisible: true,
      createdAt: "2024-01-05",
      lastModified: "2024-01-22",
    },
  ])

  const fontOptions = ["Inter", "Roboto", "Poppins", "Open Sans", "Lato", "Montserrat"]

  const toggleBrandSelection = (brandId: number) => {
    setSelectedBrands((prev) => (prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]))
  }

  const toggleSettings = (brandId: number) => {
    setShowSettings(showSettings === brandId ? null : brandId)
  }

  const toggleBrandVisibility = (brandId: number) => {
    setBrandKits((prev) =>
      prev.map((brand) => (brand.id === brandId ? { ...brand, isVisible: !brand.isVisible } : brand)),
    )
  }

  const deleteBrand = (brandId: number) => {
    setBrandKits((prev) => prev.filter((brand) => brand.id !== brandId))
    setSelectedBrands((prev) => prev.filter((id) => id !== brandId))
  }

  const duplicateBrand = (brandId: number) => {
    const brandToDuplicate = brandKits.find((brand) => brand.id === brandId)
    if (brandToDuplicate) {
      const newBrand: BrandKit = {
        ...brandToDuplicate,
        id: Math.max(...brandKits.map((b) => b.id)) + 1,
        name: `${brandToDuplicate.name} Copy`,
        createdAt: new Date().toISOString().split("T")[0],
        lastModified: new Date().toISOString().split("T")[0],
      }
      setBrandKits((prev) => [...prev, newBrand])
    }
  }

  const saveBrandChanges = (updatedBrand: BrandKit) => {
    setBrandKits((prev) =>
      prev.map((brand) =>
        brand.id === updatedBrand.id
          ? { ...updatedBrand, lastModified: new Date().toISOString().split("T")[0] }
          : brand,
      ),
    )
    setEditingBrand(null)
  }

  const createNewBrand = (newBrand: Omit<BrandKit, "id" | "createdAt" | "lastModified">) => {
    const brand: BrandKit = {
      ...newBrand,
      id: Math.max(...brandKits.map((b) => b.id)) + 1,
      createdAt: new Date().toISOString().split("T")[0],
      lastModified: new Date().toISOString().split("T")[0],
    }
    setBrandKits((prev) => [...prev, brand])
    setShowCreateModal(false)
  }

  const exportBrandKit = (brandId: number, format: "json" | "css") => {
    const brand = brandKits.find((b) => b.id === brandId)
    if (!brand) return

    if (format === "json") {
      const dataStr = JSON.stringify(brand, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${brand.name.toLowerCase().replace(/\s+/g, "-")}-brand-kit.json`
      link.click()
      URL.revokeObjectURL(url)
    } else if (format === "css") {
      const cssContent = `
/* ${brand.name} Brand Kit */
:root {
  --brand-primary: ${brand.primaryColor};
  --brand-secondary: ${brand.secondaryColor};
  --brand-accent: ${brand.accentColor};
  --brand-font: '${brand.fontFamily}', sans-serif;
}

.brand-primary { color: var(--brand-primary); }
.brand-secondary { color: var(--brand-secondary); }
.brand-accent { color: var(--brand-accent); }
.brand-font { font-family: var(--brand-font); }

.bg-brand-primary { background-color: var(--brand-primary); }
.bg-brand-secondary { background-color: var(--brand-secondary); }
.bg-brand-accent { background-color: var(--brand-accent); }
      `
      const dataBlob = new Blob([cssContent], { type: "text/css" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${brand.name.toLowerCase().replace(/\s+/g, "-")}-brand-kit.css`
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <section className="py-20 bg-gray-900 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Enhanced Brand Kits</h2>
          <p className="text-xl text-gray-300">Manage and customize your brand assets</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Header Controls */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Create Brand Kit</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSettingsModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                <Settings className="w-4 h-4" />
                <span>Global Settings</span>
              </motion.button>
            </div>

            <div className="text-sm text-gray-400">
              {selectedBrands.length} of {brandKits.length} selected
            </div>
          </div>

          {/* Brand Kits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandKits.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`relative bg-gray-800 rounded-2xl p-6 border-2 transition-all duration-300 ${
                    selectedBrands.includes(brand.id)
                      ? "border-purple-500 shadow-lg shadow-purple-500/20"
                      : "border-gray-700 hover:border-gray-600"
                  } ${!brand.isVisible ? "opacity-50" : ""}`}
                >
                  {/* Brand Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleBrandSelection(brand.id)}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                          selectedBrands.includes(brand.id)
                            ? "bg-purple-600 border-purple-600"
                            : "border-gray-500 hover:border-gray-400"
                        }`}
                      >
                        <AnimatePresence>
                          {selectedBrands.includes(brand.id) && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Check className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>

                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: brand.primaryColor }}
                      >
                        {brand.icon}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleBrandVisibility(brand.id)}
                        className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {brand.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleSettings(brand.id)}
                        className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        <Settings className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Brand Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: brand.fontFamily }}>
                      {brand.name}
                    </h3>
                    <div className="text-sm text-gray-400 space-y-1">
                      <div>Font: {brand.fontFamily}</div>
                      <div>Modified: {brand.lastModified}</div>
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-2">Colors</div>
                    <div className="flex space-x-2">
                      <div
                        className="w-8 h-8 rounded-full border-2 border-gray-600"
                        style={{ backgroundColor: brand.primaryColor }}
                        title="Primary"
                      />
                      <div
                        className="w-8 h-8 rounded-full border-2 border-gray-600"
                        style={{ backgroundColor: brand.secondaryColor }}
                        title="Secondary"
                      />
                      <div
                        className="w-8 h-8 rounded-full border-2 border-gray-600"
                        style={{ backgroundColor: brand.accentColor }}
                        title="Accent"
                      />
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditingBrand(brand)}
                      className="flex-1 py-2 px-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => duplicateBrand(brand.id)}
                      className="py-2 px-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                    >
                      <Copy className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Settings Dropdown */}
                  <AnimatePresence>
                    {showSettings === brand.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg p-4 z-10 shadow-xl"
                      >
                        <h4 className="text-white font-semibold mb-3">{brand.name} Actions</h4>
                        <div className="space-y-2">
                          <button
                            onClick={() => setEditingBrand(brand)}
                            className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200 flex items-center space-x-2"
                          >
                            <Edit3 className="w-4 h-4" />
                            <span>Edit Brand Kit</span>
                          </button>
                          <button
                            onClick={() => exportBrandKit(brand.id, "json")}
                            className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200 flex items-center space-x-2"
                          >
                            <Download className="w-4 h-4" />
                            <span>Export as JSON</span>
                          </button>
                          <button
                            onClick={() => exportBrandKit(brand.id, "css")}
                            className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200 flex items-center space-x-2"
                          >
                            <Download className="w-4 h-4" />
                            <span>Export as CSS</span>
                          </button>
                          <button
                            onClick={() => duplicateBrand(brand.id)}
                            className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200 flex items-center space-x-2"
                          >
                            <Copy className="w-4 h-4" />
                            <span>Duplicate Kit</span>
                          </button>
                          <button
                            onClick={() => deleteBrand(brand.id)}
                            className="w-full text-left px-3 py-2 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded transition-colors duration-200 flex items-center space-x-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete Kit</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Edit Brand Modal */}
        <AnimatePresence>
          {editingBrand && (
            <BrandEditModal
              brand={editingBrand}
              fontOptions={fontOptions}
              onSave={saveBrandChanges}
              onClose={() => setEditingBrand(null)}
            />
          )}
        </AnimatePresence>

        {/* Create Brand Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <BrandCreateModal
              fontOptions={fontOptions}
              onCreate={createNewBrand}
              onClose={() => setShowCreateModal(false)}
            />
          )}
        </AnimatePresence>

        {/* Global Settings Modal */}
        <AnimatePresence>
          {showSettingsModal && <GlobalSettingsModal onClose={() => setShowSettingsModal(false)} />}
        </AnimatePresence>
      </div>
    </section>
  )
}

// Brand Edit Modal Component
function BrandEditModal({
  brand,
  fontOptions,
  onSave,
  onClose,
}: {
  brand: BrandKit
  fontOptions: string[]
  onSave: (brand: BrandKit) => void
  onClose: () => void
}) {
  const [editedBrand, setEditedBrand] = useState<BrandKit>(brand)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Edit Brand Kit</h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Brand Name</label>
            <input
              type="text"
              value={editedBrand.name}
              onChange={(e) => setEditedBrand((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Icon/Emoji</label>
            <input
              type="text"
              value={editedBrand.icon}
              onChange={(e) => setEditedBrand((prev) => ({ ...prev, icon: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="🎨"
            />
          </div>

          {/* Colors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={editedBrand.primaryColor}
                  onChange={(e) => setEditedBrand((prev) => ({ ...prev, primaryColor: e.target.value }))}
                  className="w-12 h-10 rounded border border-gray-600"
                />
                <input
                  type="text"
                  value={editedBrand.primaryColor}
                  onChange={(e) => setEditedBrand((prev) => ({ ...prev, primaryColor: e.target.value }))}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Color</label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={editedBrand.secondaryColor}
                  onChange={(e) => setEditedBrand((prev) => ({ ...prev, secondaryColor: e.target.value }))}
                  className="w-12 h-10 rounded border border-gray-600"
                />
                <input
                  type="text"
                  value={editedBrand.secondaryColor}
                  onChange={(e) => setEditedBrand((prev) => ({ ...prev, secondaryColor: e.target.value }))}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Accent Color</label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={editedBrand.accentColor}
                  onChange={(e) => setEditedBrand((prev) => ({ ...prev, accentColor: e.target.value }))}
                  className="w-12 h-10 rounded border border-gray-600"
                />
                <input
                  type="text"
                  value={editedBrand.accentColor}
                  onChange={(e) => setEditedBrand((prev) => ({ ...prev, accentColor: e.target.value }))}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Font Family</label>
            <select
              value={editedBrand.fontFamily}
              onChange={(e) => setEditedBrand((prev) => ({ ...prev, fontFamily: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {fontOptions.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          {/* Preview */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Preview</h4>
            <div className="space-y-3">
              <div
                className="text-2xl font-bold text-white"
                style={{
                  fontFamily: editedBrand.fontFamily,
                  color: editedBrand.primaryColor,
                }}
              >
                {editedBrand.name}
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 rounded-full" style={{ backgroundColor: editedBrand.primaryColor }} />
                <div className="w-8 h-8 rounded-full" style={{ backgroundColor: editedBrand.secondaryColor }} />
                <div className="w-8 h-8 rounded-full" style={{ backgroundColor: editedBrand.accentColor }} />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors duration-200"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSave(editedBrand)}
            className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Brand Create Modal Component
function BrandCreateModal({
  fontOptions,
  onCreate,
  onClose,
}: {
  fontOptions: string[]
  onCreate: (brand: Omit<BrandKit, "id" | "createdAt" | "lastModified">) => void
  onClose: () => void
}) {
  const [newBrand, setNewBrand] = useState({
    name: "",
    icon: "🎨",
    primaryColor: "#8B5CF6",
    secondaryColor: "#7C3AED",
    accentColor: "#A78BFA",
    fontFamily: "Inter",
    isVisible: true,
  })

  const handleCreate = () => {
    if (newBrand.name.trim()) {
      onCreate(newBrand)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Create New Brand Kit</h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Brand Name *</label>
            <input
              type="text"
              value={newBrand.name}
              onChange={(e) => setNewBrand((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter brand name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Icon/Emoji</label>
            <input
              type="text"
              value={newBrand.icon}
              onChange={(e) => setNewBrand((prev) => ({ ...prev, icon: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="🎨"
            />
          </div>

          {/* Colors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={newBrand.primaryColor}
                  onChange={(e) => setNewBrand((prev) => ({ ...prev, primaryColor: e.target.value }))}
                  className="w-12 h-10 rounded border border-gray-600"
                />
                <input
                  type="text"
                  value={newBrand.primaryColor}
                  onChange={(e) => setNewBrand((prev) => ({ ...prev, primaryColor: e.target.value }))}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Color</label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={newBrand.secondaryColor}
                  onChange={(e) => setNewBrand((prev) => ({ ...prev, secondaryColor: e.target.value }))}
                  className="w-12 h-10 rounded border border-gray-600"
                />
                <input
                  type="text"
                  value={newBrand.secondaryColor}
                  onChange={(e) => setNewBrand((prev) => ({ ...prev, secondaryColor: e.target.value }))}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Accent Color</label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={newBrand.accentColor}
                  onChange={(e) => setNewBrand((prev) => ({ ...prev, accentColor: e.target.value }))}
                  className="w-12 h-10 rounded border border-gray-600"
                />
                <input
                  type="text"
                  value={newBrand.accentColor}
                  onChange={(e) => setNewBrand((prev) => ({ ...prev, accentColor: e.target.value }))}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Font Family</label>
            <select
              value={newBrand.fontFamily}
              onChange={(e) => setNewBrand((prev) => ({ ...prev, fontFamily: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {fontOptions.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          {/* Preview */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Preview</h4>
            <div className="space-y-3">
              <div
                className="text-2xl font-bold text-white"
                style={{
                  fontFamily: newBrand.fontFamily,
                  color: newBrand.primaryColor,
                }}
              >
                {newBrand.name || "Brand Name"}
              </div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 rounded-full" style={{ backgroundColor: newBrand.primaryColor }} />
                <div className="w-8 h-8 rounded-full" style={{ backgroundColor: newBrand.secondaryColor }} />
                <div className="w-8 h-8 rounded-full" style={{ backgroundColor: newBrand.accentColor }} />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors duration-200"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreate}
            disabled={!newBrand.name.trim()}
            className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            <span>Create Brand Kit</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Global Settings Modal Component
function GlobalSettingsModal({ onClose }: { onClose: () => void }) {
  const [settings, setSettings] = useState({
    autoSave: true,
    showPreview: true,
    defaultFont: "Inter",
    exportFormat: "json",
    theme: "dark",
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 rounded-2xl p-6 w-full max-w-lg"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Global Settings</h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-white font-medium">Auto Save</label>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setSettings((prev) => ({ ...prev, autoSave: !prev.autoSave }))}
              className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                settings.autoSave ? "bg-purple-600" : "bg-gray-600"
              }`}
            >
              <motion.div
                animate={{ x: settings.autoSave ? 24 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-6 bg-white rounded-full shadow-md"
              />
            </motion.button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-white font-medium">Show Preview</label>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setSettings((prev) => ({ ...prev, showPreview: !prev.showPreview }))}
              className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                settings.showPreview ? "bg-purple-600" : "bg-gray-600"
              }`}
            >
              <motion.div
                animate={{ x: settings.showPreview ? 24 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-6 bg-white rounded-full shadow-md"
              />
            </motion.button>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Default Font</label>
            <select
              value={settings.defaultFont}
              onChange={(e) => setSettings((prev) => ({ ...prev, defaultFont: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Poppins">Poppins</option>
              <option value="Open Sans">Open Sans</option>
            </select>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Default Export Format</label>
            <select
              value={settings.exportFormat}
              onChange={(e) => setSettings((prev) => ({ ...prev, exportFormat: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="json">JSON</option>
              <option value="css">CSS</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors duration-200"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
