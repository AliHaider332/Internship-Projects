import { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { ChevronDown, ChevronUp, Plus, Trash2, Upload, X } from 'lucide-react';
import '../App.css';

export default function ResumeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    skills: [],
    education: [],
    experience: [],
    projects: [],
    profileImage: null,
  });

  const [dropdowns, setDropdowns] = useState({
    education: false,
    experience: false,
    projects: false,
  });

  const [tempData, setTempData] = useState({
    education: {
      start: '',
      end: '',
      title: '',
      institute: '',
      degree: '',
      description: '',
      customUniversity: '',
      customDegree: '',
    },
    experience: {
      start: '',
      end: '',
      title: '',
      institute: '',
      description: '',
    },
    projects: {
      start: '',
      end: '',
      title: '',
      institute: '',
      description: '',
    },
  });

  const universities = [
    'LUMS (Lahore University of Management Sciences)',
    'NUST (National University of Sciences and Technology)',
    'FAST (National University of Computer & Emerging Sciences)',
    'COMSATS University Islamabad',
    'UET Lahore (University of Engineering and Technology)',
    'UAF (University of Agriculture Faisalabad)',
    'IBA Karachi (Institute of Business Administration)',
    'PU (University of the Punjab)',
    'GIKI (Ghulam Ishaq Khan Institute)',
    'Air University Islamabad',
    'Other',
  ];

  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim() !== '') {
      e.preventDefault();
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleDropdown = (key) => {
    setDropdowns({ ...dropdowns, [key]: !dropdowns[key] });
  };

  const handleAdd = (key) => {
    const temp = tempData[key];

    if (!temp.title || !temp.institute)
      return alert('Please fill all fields before adding.');

    const selectedInstitute =
      temp.institute === 'Other' ? temp.customUniversity : temp.institute;

    const selectedDegree =
      temp.degree === 'Other' ? temp.customDegree : temp.degree;

    setFormData({
      ...formData,
      [key]: [
        ...formData[key],
        {
          ...temp,
          institute: selectedInstitute,
          degree: selectedDegree,
          id: Date.now(),
        },
      ],
    });

    setTempData({
      ...tempData,
      [key]: {
        start: '',
        end: '',
        title: '',
        institute: '',
        degree: '',
        description: '',
        customUniversity: '',
        customDegree: '',
      },
    });
  };

  const handleDelete = (key, id) => {
    setFormData({
      ...formData,
      [key]: formData[key].filter((item) => item.id !== id),
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profileImage: URL.createObjectURL(file), // preview
        profileImageFile: file, // actual file for upload
      });
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      borderRadius: '0.75rem',
      padding: '2px',
      borderColor: '#e5e7eb',
      boxShadow: 'none',
      backgroundColor: '#f9fafb',
      '&:hover': { borderColor: '#6366f1' },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '0.75rem',
      zIndex: 9999,
    }),
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10 border border-gray-100">
      <h2 className="text-4xl font-bold text-center text-indigo-600 mb-8">
        Modern Portfolio Builder 🇵🇰
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {/* Profile Picture */}
        <div className="flex items-center justify-center gap-4">
          <label
            htmlFor="profileImage"
            className="btn-primary flex items-center gap-2 cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            <Upload size={18} /> Upload Picture
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          {formData.profileImage && (
            <img
              src={formData.profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border border-gray-300 shadow"
            />
          )}
        </div>

        {/* Basic Info */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="e.g. Ali Haider"
            className="input-modern"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="e.g. alihaider@gmail.com"
              className="input-modern"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              value={formData.phone}
              placeholder="+92 300 1234567"
              className="input-modern"
              required
            />
          </div>
        </div>

        {/* Summary */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Professional Summary
          </label>
          <textarea
            name="summary"
            onChange={handleChange}
            value={formData.summary}
            rows="3"
            placeholder="Write a short professional summary..."
            className="input-modern"
          ></textarea>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Skills</label>
          <div className="flex flex-wrap gap-2 p-2 border rounded-xl bg-gray-50">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full flex items-center gap-1 text-sm"
              >
                {skill}
                <X
                  size={14}
                  className="cursor-pointer hover:text-indigo-900"
                  onClick={() => removeSkill(skill)}
                />
              </span>
            ))}
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder="Type and press Enter..."
              className="flex-grow outline-none bg-transparent p-1"
            />
          </div>
        </div>

        {/* Dynamic Sections */}
        {['education', 'experience', 'projects'].map((key) => {
          const temp = tempData[key];

          return (
            <div key={key} className="border-t pt-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleDropdown(key)}
              >
                <h3 className="text-xl font-semibold text-gray-800 capitalize">
                  {key}
                </h3>
                {dropdowns[key] ? <ChevronUp /> : <ChevronDown />}
              </div>

              {dropdowns[key] && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow-sm">
                  {/* Education Section */}
                  {key === 'education' ? (
                    <>
                      {/* University Selection */}
                      <Select
                        options={universities.map((u) => ({
                          label: u,
                          value: u,
                        }))}
                        value={
                          temp.institute
                            ? { label: temp.institute, value: temp.institute }
                            : null
                        }
                        onChange={(selected) =>
                          setTempData({
                            ...tempData,
                            [key]: {
                              ...temp,
                              institute: selected ? selected.value : '',
                            },
                          })
                        }
                        placeholder="Select or search university..."
                        styles={selectStyles}
                        isSearchable
                      />

                      {temp.institute === 'Other' && (
                        <input
                          type="text"
                          placeholder="Enter your university name"
                          value={temp.customUniversity}
                          onChange={(e) =>
                            setTempData({
                              ...tempData,
                              [key]: {
                                ...temp,
                                customUniversity: e.target.value,
                              },
                            })
                          }
                          className="input-modern mt-3"
                        />
                      )}

                      {/* Degree Type */}
                      {temp.institute && (
                        <select
                          value={temp.degree}
                          onChange={(e) =>
                            setTempData({
                              ...tempData,
                              [key]: { ...temp, degree: e.target.value },
                            })
                          }
                          className="input-modern mt-3"
                        >
                          <option value="">Select Degree Type</option>
                          <option value="Bachelor's">Bachelor's</option>
                          <option value="Master's">Master's</option>
                          <option value="PhD">PhD</option>
                          <option value="Diploma">Diploma</option>
                          <option value="Other">Other</option>
                        </select>
                      )}

                      {temp.degree === 'Other' && (
                        <input
                          type="text"
                          placeholder="Enter your custom degree name"
                          value={temp.customDegree || ''}
                          onChange={(e) =>
                            setTempData({
                              ...tempData,
                              [key]: { ...temp, customDegree: e.target.value },
                            })
                          }
                          className="input-modern mt-3"
                        />
                      )}

                      {/* Field of Study */}
                      {temp.degree && (
                        <input
                          type="text"
                          placeholder="Enter your Field of Study (e.g. Computer Science)"
                          value={temp.title}
                          onChange={(e) =>
                            setTempData({
                              ...tempData,
                              [key]: { ...temp, title: e.target.value },
                            })
                          }
                          className="input-modern mt-3"
                        />
                      )}
                    </>
                  ) : (
                    // Experience & Projects
                    <>
                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <input
                          type="text"
                          placeholder={
                            key === 'projects'
                              ? 'Project Title'
                              : 'Job Title / Role'
                          }
                          value={temp.title}
                          onChange={(e) =>
                            setTempData({
                              ...tempData,
                              [key]: { ...temp, title: e.target.value },
                            })
                          }
                          className="input-modern"
                        />
                        <input
                          type="text"
                          placeholder={
                            key === 'projects'
                              ? 'Organization / Client'
                              : 'Company / Organization'
                          }
                          value={temp.institute}
                          onChange={(e) =>
                            setTempData({
                              ...tempData,
                              [key]: { ...temp, institute: e.target.value },
                            })
                          }
                          className="input-modern"
                        />
                      </div>
                    </>
                  )}

                  {/* Shared Date & Description */}
                  <div className="grid md:grid-cols-2 gap-4 mb-3 mt-3">
                    <DatePicker
                      selected={temp.start ? new Date(temp.start) : null}
                      onChange={(date) =>
                        setTempData({
                          ...tempData,
                          [key]: {
                            ...temp,
                            start: date ? date.toISOString().split('T')[0] : '',
                          },
                        })
                      }
                      placeholderText="Start Date"
                      className="input-modern w-full"
                      dateFormat="yyyy-MM-dd"
                    />
                    <DatePicker
                      selected={temp.end ? new Date(temp.end) : null}
                      onChange={(date) =>
                        setTempData({
                          ...tempData,
                          [key]: {
                            ...temp,
                            end: date ? date.toISOString().split('T')[0] : '',
                          },
                        })
                      }
                      placeholderText="End Date"
                      className="input-modern w-full"
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>

                  <textarea
                    placeholder="Description or achievements..."
                    value={temp.description}
                    onChange={(e) =>
                      setTempData({
                        ...tempData,
                        [key]: { ...temp, description: e.target.value },
                      })
                    }
                    rows="2"
                    className="input-modern mb-3"
                  ></textarea>

                  <button
                    type="button"
                    onClick={() => handleAdd(key)}
                    className="btn-green flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                  >
                    <Plus size={18} /> Add {key.slice(0, -1)}
                  </button>

                  {/* Added Items */}
                  <ul className="mt-4 space-y-3">
                    {formData[key].map((item) => (
                      <li
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-lg p-3 flex justify-between items-start shadow-sm"
                      >
                        <div>
                          {key === 'education' ? (
                            <>
                              <p className="font-semibold text-gray-800">
                                {item.degree} in {item.title}
                              </p>
                              <p className="text-sm text-gray-600">
                                {item.institute}
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="font-semibold text-gray-800">
                                {item.title}
                              </p>
                              <p className="text-sm text-gray-600">
                                {item.institute}
                              </p>
                            </>
                          )}
                          <p className="text-sm text-gray-500">
                            {item.start} → {item.end}
                          </p>
                          <p className="text-gray-700 mt-1">
                            {item.description}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDelete(key, item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}

        <button
          type="submit"
          className="w-full mt-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition"
        >
          Generate Portfolio
        </button>
      </form>
    </div>
  );
}
