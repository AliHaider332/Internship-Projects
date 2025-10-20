import { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { ChevronDown, ChevronUp, Plus, Trash2, Upload, X, User, Mail, Phone, BookOpen, Briefcase, GitBranch, Link2, Palette } from 'lucide-react';
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
    linksList: [],
    theme: '',
  });

  const [dropdowns, setDropdowns] = useState({
    education: false,
    experience: false,
    projects: false,
    socialLinks: true,
    theme: true,
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
    links: { title: '', url: '' },
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
        { ...temp, institute: selectedInstitute, degree: selectedDegree, id: Date.now() },
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
        profileImage: URL.createObjectURL(file),
        profileImageFile: file,
      });
    }
  };

  const handleAddLink = () => {
    const link = tempData.links;
    if (!link.title || !link.url) return alert('Please fill both title and URL.');
    setFormData({
      ...formData,
      linksList: [...formData.linksList, { ...link, id: Date.now() }],
    });
    setTempData({ ...tempData, links: { title: '', url: '' } });
  };

  const handleDeleteLink = (id) => {
    setFormData({
      ...formData,
      linksList: formData.linksList.filter((l) => l.id !== id),
    });
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
    <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mt-6 border border-gray-200/60">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Portfolio Builder
          </h2>
        </div>
        <p className="text-gray-600 text-lg">
          Create your stunning AI-powered portfolio in minutes
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data">
        {/* Profile Picture */}
        <div className="flex items-center justify-center gap-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200/50">
          <div className="text-center">
            <label
              htmlFor="profileImage"
              className="btn-primary flex items-center gap-3 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
            >
              <Upload size={20} /> Upload Profile Picture
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          {formData.profileImage && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-50"></div>
              <img
                src={formData.profileImage}
                alt="Profile"
                className="relative z-10 w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className="grid gap-6">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-blue-600" />
            <label className="block text-gray-700 font-semibold text-lg">Full Name</label>
          </div>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="e.g. Ali Haider"
            className="input-modern bg-white/80 backdrop-blur-sm border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 transition-all duration-200"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <label className="block text-gray-700 font-semibold">Email</label>
            </div>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="e.g. alihaider@gmail.com"
              className="input-modern bg-white/80 backdrop-blur-sm border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 transition-all duration-200"
              required
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <label className="block text-gray-700 font-semibold">Phone</label>
            </div>
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              value={formData.phone}
              placeholder="+92 300 1234567"
              className="input-modern bg-white/80 backdrop-blur-sm border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 transition-all duration-200"
              required
            />
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <label className="block text-gray-700 font-semibold text-lg">Professional Summary</label>
          </div>
          <textarea
            name="summary"
            onChange={handleChange}
            value={formData.summary}
            rows="3"
            placeholder="Write a short professional summary that highlights your expertise and career goals..."
            className="input-modern bg-white/80 backdrop-blur-sm border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 transition-all duration-200 resize-none"
          ></textarea>
        </div>

        {/* Skills */}
        <div className="space-y-3">
          <label className="block text-gray-700 font-semibold text-lg">Skills & Technologies</label>
          <div className="flex flex-wrap gap-2 p-4 border-2 border-dashed border-gray-300 rounded-2xl bg-white/50 backdrop-blur-sm hover:border-blue-400 transition-all duration-200">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium border border-blue-200 shadow-sm"
              >
                {skill}
                <X size={16} className="cursor-pointer hover:text-blue-900 transition-colors" onClick={() => removeSkill(skill)} />
              </span>
            ))}
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder="Type skill and press Enter..."
              className="flex-grow outline-none bg-transparent p-2 text-gray-700 placeholder-gray-400 min-w-[200px]"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex justify-between items-center cursor-pointer group p-4 bg-white/50 rounded-2xl hover:bg-white/80 transition-all duration-200" onClick={() => toggleDropdown('socialLinks')}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Link2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Social Links</h3>
                <p className="text-sm text-gray-500">Add your professional profiles and websites</p>
              </div>
            </div>
            {dropdowns.socialLinks ? <ChevronUp className="text-gray-400 group-hover:text-gray-600" /> : <ChevronDown className="text-gray-400 group-hover:text-gray-600" />}
          </div>
          {dropdowns.socialLinks && (
            <div className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200/50 shadow-sm">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Link Title (e.g. GitHub, LinkedIn)"
                  value={tempData.links.title}
                  onChange={(e) => setTempData({ ...tempData, links: { ...tempData.links, title: e.target.value } })}
                  className="input-modern bg-white/80 backdrop-blur-sm border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl px-4 py-3"
                />
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={tempData.links.url}
                  onChange={(e) => setTempData({ ...tempData, links: { ...tempData.links, url: e.target.value } })}
                  className="input-modern bg-white/80 backdrop-blur-sm border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl px-4 py-3"
                />
              </div>
              <button
                type="button"
                onClick={handleAddLink}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-lg transition-all duration-300"
              >
                <Plus size={20} /> Add Link
              </button>
              <div className="mt-6 space-y-3">
                {formData.linksList.map((item) => (
                  <div key={item.id} className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 flex justify-between items-center shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-lg">{item.title}</p>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline text-sm">
                        {item.url}
                      </a>
                    </div>
                    <button type="button" onClick={() => handleDeleteLink(item.id)} className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Sections */}
        {[
          { key: 'education', icon: BookOpen, color: 'from-blue-500 to-cyan-500', title: 'Education' },
          { key: 'experience', icon: Briefcase, color: 'from-purple-500 to-pink-500', title: 'Work Experience' },
          { key: 'projects', icon: GitBranch, color: 'from-green-500 to-emerald-500', title: 'Projects' }
        ].map(({ key, icon: Icon, color, title }) => {
          const temp = tempData[key];
          return (
            <div key={key} className="border-t border-gray-200 pt-8">
              <div className="flex justify-between items-center cursor-pointer group p-4 bg-white/50 rounded-2xl hover:bg-white/80 transition-all duration-200" onClick={() => toggleDropdown(key)}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-500">{formData[key].length} items added</p>
                  </div>
                </div>
                {dropdowns[key] ? <ChevronUp className="text-gray-400 group-hover:text-gray-600" /> : <ChevronDown className="text-gray-400 group-hover:text-gray-600" />}
              </div>
              {dropdowns[key] && (
                <div className="mt-4 bg-gradient-to-r from-gray-50 to-blue-50/30 p-6 rounded-2xl border border-gray-200/50 shadow-sm">
                  {key === 'education' ? (
                    <>
                      <Select
                        options={universities.map((u) => ({ label: u, value: u }))}
                        value={temp.institute ? { label: temp.institute, value: temp.institute } : null}
                        onChange={(selected) =>
                          setTempData({ ...tempData, [key]: { ...temp, institute: selected ? selected.value : '' } })
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
                          onChange={(e) => setTempData({ ...tempData, [key]: { ...temp, customUniversity: e.target.value } })}
                          className="input-modern mt-4 bg-white/80 backdrop-blur-sm border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3"
                        />
                      )}
                      {temp.institute && (
                        <select
                          value={temp.degree}
                          onChange={(e) => setTempData({ ...tempData, [key]: { ...temp, degree: e.target.value } })}
                          className="input-modern mt-4 bg-white/80 backdrop-blur-sm border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 text-gray-700"
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
                          onChange={(e) => setTempData({ ...tempData, [key]: { ...temp, customDegree: e.target.value } })}
                          className="input-modern mt-4 bg-white/80 backdrop-blur-sm border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3"
                        />
                      )}
                      {temp.degree && (
                        <input
                          type="text"
                          placeholder="Enter your Field of Study (e.g. Computer Science)"
                          value={temp.title}
                          onChange={(e) => setTempData({ ...tempData, [key]: { ...temp, title: e.target.value } })}
                          className="input-modern mt-4 bg-white/80 backdrop-blur-sm border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3"
                        />
                      )}
                    </>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder={key === 'projects' ? 'Project Title' : 'Job Title / Role'}
                        value={temp.title}
                        onChange={(e) => setTempData({ ...tempData, [key]: { ...temp, title: e.target.value } })}
                        className="input-modern bg-white/80 backdrop-blur-sm border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3"
                      />
                      <input
                        type="text"
                        placeholder={key === 'projects' ? 'Organization / Client' : 'Company / Organization'}
                        value={temp.institute}
                        onChange={(e) => setTempData({ ...tempData, [key]: { ...temp, institute: e.target.value } })}
                        className="input-modern bg-white/80 backdrop-blur-sm border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3"
                      />
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-4 mb-4 mt-4">
                    <DatePicker
                      selected={temp.start ? new Date(temp.start) : null}
                      onChange={(date) => setTempData({ ...tempData, [key]: { ...temp, start: date ? date.toISOString().split('T')[0] : '' } })}
                      placeholderText="Start Date"
                      className="input-modern w-full bg-white/80 backdrop-blur-sm border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3"
                      dateFormat="yyyy-MM-dd"
                    />
                    <DatePicker
                      selected={temp.end ? new Date(temp.end) : null}
                      onChange={(date) => setTempData({ ...tempData, [key]: { ...temp, end: date ? date.toISOString().split('T')[0] : '' } })}
                      placeholderText="End Date"
                      className="input-modern w-full bg-white/80 backdrop-blur-sm border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3"
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>
                  <textarea
                    placeholder="Description or achievements..."
                    value={temp.description}
                    onChange={(e) => setTempData({ ...tempData, [key]: { ...temp, description: e.target.value } })}
                    rows="3"
                    className="input-modern mb-4 bg-white/80 backdrop-blur-sm border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 resize-none"
                  ></textarea>
                  <button type="button" onClick={() => handleAdd(key)} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all duration-300">
                    <Plus size={20} /> Add {key.slice(0, -1)}
                  </button>
                  <div className="mt-6 space-y-4">
                    {formData[key].map((item) => (
                      <div key={item.id} className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 flex justify-between items-start shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="flex-1">
                          {key === 'education' ? (
                            <>
                              <p className="font-semibold text-gray-800 text-lg">{item.degree} in {item.title}</p>
                              <p className="text-blue-600 font-medium">{item.institute}</p>
                            </>
                          ) : (
                            <>
                              <p className="font-semibold text-gray-800 text-lg">{item.title}</p>
                              <p className="text-blue-600 font-medium">{item.institute}</p>
                            </>
                          )}
                          <p className="text-sm text-gray-500 mt-1">{item.start} → {item.end}</p>
                          <p className="text-gray-700 mt-2 leading-relaxed">{item.description}</p>
                        </div>
                        <button type="button" onClick={() => handleDelete(key, item.id)} className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors ml-4">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Theme Explanation */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex justify-between items-center cursor-pointer group p-4 bg-white/50 rounded-2xl hover:bg-white/80 transition-all duration-200" onClick={() => toggleDropdown('theme')}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Portfolio Theme</h3>
                <p className="text-sm text-gray-500">Customize the look and feel of your portfolio</p>
              </div>
            </div>
            {dropdowns.theme ? <ChevronUp className="text-gray-400 group-hover:text-gray-600" /> : <ChevronDown className="text-gray-400 group-hover:text-gray-600" />}
          </div>
          {dropdowns.theme && (
            <div className="mt-4 bg-gradient-to-r from-orange-50 to-red-50/30 p-6 rounded-2xl border border-orange-200/50 shadow-sm">
              <textarea
                placeholder="Describe your preferred theme, colors, layout style, or any specific design ideas you have in mind. For example: 'Modern dark theme with blue accents, minimalist layout, animated sections...'"
                value={formData.theme}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                rows="4"
                className="input-modern w-full bg-white/80 backdrop-blur-sm border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl px-4 py-3 resize-none"
              ></textarea>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
          Generate Portfolio
        </button>
      </form>
    </div>
  );
}