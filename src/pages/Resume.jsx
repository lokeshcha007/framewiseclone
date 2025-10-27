import React, { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";

// Clean Professional Template
const ProfessionalTemplate = ({ resumeData, themeColor, fontSize }) => (
  <div
    className="bg-white p-8 shadow-lg max-w-4xl mx-auto"
    style={{
      fontSize: `${fontSize}px`,
      fontFamily: "Arial, sans-serif",
    }}
  >
    {/* Header */}
    <div className="text-center mb-8">
      <h1
        className="font-bold mb-2"
        style={{
          color: themeColor,
          fontSize: `${fontSize * 3.5}px`,
        }}
      >
        {resumeData.name || "Your Name"}
      </h1>
      <p
        className="text-gray-600 mb-4"
        style={{ fontSize: `${fontSize * 1.5}px` }}
      >
        {resumeData.jobTitle || "Your Job Title"}
      </p>
      <div
        className="flex justify-center space-x-6 text-gray-600"
        style={{ fontSize: `${fontSize}px` }}
      >
        <span>{resumeData.email || "your.email@example.com"}</span>
        <span>•</span>
        <span>{resumeData.phone || "Your Phone"}</span>
        <span>•</span>
        <span>{resumeData.location || "Your Location"}</span>
      </div>
    </div>

    {/* Summary */}
    {resumeData.summary && (
      <div className="mb-8">
        <h2
          className="font-bold mb-3 pb-1 border-b-2"
          style={{
            color: themeColor,
            borderColor: themeColor,
            fontSize: `${fontSize * 1.3}px`,
          }}
        >
          PROFESSIONAL SUMMARY
        </h2>
        <p
          className="text-gray-700 leading-relaxed"
          style={{ fontSize: `${fontSize}px` }}
        >
          {resumeData.summary}
        </p>
      </div>
    )}

    {/* Work Experience */}
    {resumeData.workExperience && resumeData.workExperience.length > 0 && (
      <div className="mb-8">
        <h2
          className="font-bold mb-4 pb-1 border-b-2"
          style={{
            color: themeColor,
            borderColor: themeColor,
            fontSize: `${fontSize * 1.3}px`,
          }}
        >
          WORK EXPERIENCE
        </h2>
        {resumeData.workExperience.map((job, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3
                  className="font-semibold text-gray-900"
                  style={{ fontSize: `${fontSize * 1.1}px` }}
                >
                  {job.title}
                </h3>
                <p
                  className="text-gray-600 font-medium"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {job.company}
                </p>
              </div>
              <span
                className="text-gray-500"
                style={{ fontSize: `${fontSize * 0.9}px` }}
              >
                {job.duration}
              </span>
            </div>
            <p
              className="text-gray-700 leading-relaxed"
              style={{ fontSize: `${fontSize}px` }}
            >
              {job.description}
            </p>
          </div>
        ))}
      </div>
    )}

    {/* Education */}
    {resumeData.education && resumeData.education.length > 0 && (
      <div className="mb-8">
        <h2
          className="font-bold mb-4 pb-1 border-b-2"
          style={{
            color: themeColor,
            borderColor: themeColor,
            fontSize: `${fontSize * 1.3}px`,
          }}
        >
          EDUCATION
        </h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3
                  className="font-semibold text-gray-900"
                  style={{ fontSize: `${fontSize * 1.1}px` }}
                >
                  {edu.degree}
                </h3>
                <p
                  className="text-gray-600"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {edu.institution}
                </p>
              </div>
              <span
                className="text-gray-500"
                style={{ fontSize: `${fontSize * 0.9}px` }}
              >
                {edu.year}
              </span>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Skills */}
    {resumeData.skills && resumeData.skills.length > 0 && (
      <div className="mb-8">
        <h2
          className="font-bold mb-4 pb-1 border-b-2"
          style={{
            color: themeColor,
            borderColor: themeColor,
            fontSize: `${fontSize * 1.3}px`,
          }}
        >
          SKILLS
        </h2>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full font-medium"
              style={{
                backgroundColor: `${themeColor}20`,
                color: themeColor,
                fontSize: `${fontSize}px`,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

const Resume = () => {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
    summary: "",
    workExperience: [],
    education: [],
    skills: [],
  });

  const [themeColor, setThemeColor] = useState("#3b82f6");
  const [fontSize, setFontSize] = useState(11);
  const [zoom, setZoom] = useState(75);

  // Debug resumeData changes
  useEffect(() => {
    console.log("Resume data state updated:", resumeData);
  }, [resumeData]);

  // Debug font size changes
  useEffect(() => {
    console.log("Font size changed to:", fontSize);
  }, [fontSize]);

  // Add functions
  const addWorkExperience = () => {
    console.log("Adding work experience...");
    setResumeData((prev) => {
      const newData = {
        ...prev,
        workExperience: [
          ...prev.workExperience,
          { title: "", company: "", duration: "", description: "" },
        ],
      };
      console.log("New work experience data:", newData.workExperience);
      return newData;
    });
  };

  const addEducation = () => {
    console.log("Adding education...");
    setResumeData((prev) => {
      const newData = {
        ...prev,
        education: [
          ...prev.education,
          { degree: "", institution: "", year: "" },
        ],
      };
      console.log("New education data:", newData.education);
      return newData;
    });
  };

  const addSkill = () => {
    console.log("Adding skill...");
    setResumeData((prev) => {
      const newData = {
        ...prev,
        skills: [...prev.skills, ""],
      };
      console.log("New skills data:", newData.skills);
      return newData;
    });
  };

  // Update functions
  const updateWorkExperience = (index, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((job, i) =>
        i === index ? { ...job, [field]: value } : job
      ),
    }));
  };

  const updateEducation = (index, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const updateSkill = (index, value) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) => (i === index ? value : skill)),
    }));
  };

  // Remove functions
  const removeWorkExperience = (index) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index),
    }));
  };

  const removeEducation = (index) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const removeSkill = (index) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // PDF Export - Local Generation
  const exportToPDF = async () => {
    try {
      // Show loading state
      const downloadButton = document.querySelector("[data-download-btn]");
      if (downloadButton) {
        downloadButton.disabled = true;
        downloadButton.textContent = "Generating PDF...";
      }

      // Get the template element
      const element = document.getElementById("resume-template");
      if (!element) {
        throw new Error("Resume template not found");
      }

      // Configure PDF options
      const opt = {
        margin: 0.5,
        filename: `${resumeData.name || "resume"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
        },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      // Generate PDF
      await html2pdf().set(opt).from(element).save();

      console.log("PDF generated and downloaded successfully");
    } catch (error) {
      console.error("PDF generation error:", error);
      alert(`Error generating PDF: ${error.message}. Please try again.`);
    } finally {
      // Reset button state
      const downloadButton = document.querySelector("[data-download-btn]");
      if (downloadButton) {
        downloadButton.disabled = false;
        downloadButton.textContent = "Download Resume";
      }
    }
  };

  const themeColors = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#6b7280",
  ];

  const fontSizes = [
    { label: "Compact", value: 10 },
    { label: "Standard", value: 11 },
    { label: "Large", value: 12 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Left Panel - Form */}
        <div className="w-2/5 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Resume Builder
              </h1>
            </div>

            <form className="space-y-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-sm">👤</span>
                  </span>
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={resumeData.name || ""}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={resumeData.jobTitle || ""}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          jobTitle: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Software Developer"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={resumeData.email || ""}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={resumeData.phone || ""}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={resumeData.location || ""}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="City, State, Country"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-sm">📝</span>
                  </span>
                  Professional Summary
                </h2>
                <textarea
                  value={resumeData.summary || ""}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      summary: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write a brief summary of your professional background..."
                />
              </div>

              {/* Work Experience */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 text-sm">💼</span>
                    </span>
                    Work Experience
                  </h2>
                  <button
                    type="button"
                    onClick={addWorkExperience}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 flex items-center"
                  >
                    <span className="mr-1">+</span> Add Job
                  </button>
                </div>
                {resumeData.workExperience?.map((job, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 mb-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-gray-900">
                        Job {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeWorkExperience(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Job Title"
                          value={job.title || ""}
                          onChange={(e) =>
                            updateWorkExperience(index, "title", e.target.value)
                          }
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Company"
                          value={job.company || ""}
                          onChange={(e) =>
                            updateWorkExperience(
                              index,
                              "company",
                              e.target.value
                            )
                          }
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Duration (e.g., 2020-2023)"
                        value={job.duration || ""}
                        onChange={(e) =>
                          updateWorkExperience(
                            index,
                            "duration",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        placeholder="Job Description"
                        value={job.description || ""}
                        onChange={(e) =>
                          updateWorkExperience(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 text-sm">🎓</span>
                    </span>
                    Education
                  </h2>
                  <button
                    type="button"
                    onClick={addEducation}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 flex items-center"
                  >
                    <span className="mr-1">+</span> Add School
                  </button>
                </div>
                {resumeData.education?.map((edu, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 mb-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-gray-900">
                        Education {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree || ""}
                        onChange={(e) =>
                          updateEducation(index, "degree", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Institution"
                          value={edu.institution || ""}
                          onChange={(e) =>
                            updateEducation(
                              index,
                              "institution",
                              e.target.value
                            )
                          }
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Year"
                          value={edu.year || ""}
                          onChange={(e) =>
                            updateEducation(index, "year", e.target.value)
                          }
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 text-sm">⚡</span>
                    </span>
                    Skills
                  </h2>
                  <button
                    type="button"
                    onClick={addSkill}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 flex items-center"
                  >
                    <span className="mr-1">+</span> Add Skill
                  </button>
                </div>
                {resumeData.skills?.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Enter skill"
                      value={skill || ""}
                      onChange={(e) => updateSkill(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-red-600 hover:text-red-800 px-2 py-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>

        {/* Right Panel - Preview & Settings */}
        <div className="w-3/5 bg-gray-50 flex flex-col">
          {/* Settings Bar */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Theme Color */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    Theme Color:
                  </span>
                  <div className="flex space-x-1">
                    {themeColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setThemeColor(color)}
                        className={`w-6 h-6 rounded-full border-2 ${
                          themeColor === color
                            ? "border-gray-400"
                            : "border-gray-200"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    Font Size:
                  </span>
                  <div className="flex space-x-1">
                    {fontSizes.map((size) => (
                      <button
                        key={size.value}
                        onClick={() => setFontSize(size.value)}
                        className={`px-3 py-1 text-sm rounded ${
                          fontSize === size.value
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <button
                data-download-btn
                onClick={exportToPDF}
                className="bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="mr-2">📥</span>
                Download Resume
              </button>
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 overflow-auto p-6">
            <div
              className="mx-auto shadow-lg"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: "top center",
              }}
            >
              <div id="resume-template">
                <ProfessionalTemplate
                  resumeData={resumeData}
                  themeColor={themeColor}
                  fontSize={fontSize}
                />
              </div>
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Zoom:</span>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={zoom}
                  onChange={(e) => setZoom(e.target.value)}
                  className="w-32"
                />
                <span className="text-sm text-gray-600 w-12">{zoom}%</span>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-gray-700">Autoscale</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
