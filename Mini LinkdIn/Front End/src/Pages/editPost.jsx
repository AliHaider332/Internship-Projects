import React, { useState, useContext, useEffect } from 'react';
import { appContext } from '../components/appContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import toast from 'react-hot-toast';
import { updatePost } from '../../serverLayer';

const EditPost = () => {
  const { user, loginStatus, loading, editData } = useContext(appContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pic, setPic] = useState(null);
  const [video, setVideo] = useState(null);
  const [tags, setTags] = useState('');
  const [previewPic, setPreviewPic] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  const navigate = useNavigate();

  // ✅ Initialize form with editData
  useEffect(() => {
    if (editData) {
      setTitle(editData.title || '');
      setDescription(editData.description || '');
      setTags(Array.isArray(editData.tags) ? editData.tags.join('#') : editData.tags || '');

      if (editData.pic) {
        setPreviewPic(`http://localhost:3000/${editData.pic.replace(/\\/g, '/')}`);
      }
      if (editData.video) {
        setPreviewVideo(`http://localhost:3000/${editData.video.replace(/\\/g, '/')}`);
      }
    }
  }, [editData]);

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!loading && (!loginStatus || !user)) {
      navigate('/login');
    }
  }, [loginStatus, loading, user, navigate]);

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    setPic(file);
    setPreviewPic(URL.createObjectURL(file));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    setPreviewVideo(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedTags = tags
      .split('#')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const result = await updatePost(
      editData._id, // ✅ must send post ID
      title,
      description,
      formattedTags,
      pic,
      video
    );

    if (result?.status === 200) {
      toast.success('✅ Post updated successfully!');
      navigate('/my-posts');
    } else {
      toast.error(result?.message || '❌ Failed to update post');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="relative w-20 h-20">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-700 border-t-cyan-500 animate-spin"></div>

          {/* Inner Pulse */}
          <div className="absolute inset-3 rounded-full bg-cyan-500 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4 py-8 Roboto">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h2 className="text-3xl text-center mb-6 Caprasimo text-gray-800">
          ✍️ Edit Your Post
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium Prompt">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 Roboto"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium Prompt">
              Description
            </label>
            <textarea
              placeholder="Write something..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 Roboto"
            ></textarea>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium Prompt">
              Tags
            </label>
            <input
              type="text"
              placeholder="Add tags like: #fun#react#mongodb"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 Roboto"
            />
            <p className="text-xs text-gray-500 mt-1 Prompt">
              Separate tags with <span className="font-semibold">#</span>
            </p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium Prompt">
              Upload Image
            </label>
            <div className="flex items-center gap-3">
              <label
                htmlFor="imageUpload"
                className="cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg shadow-md transition Prompt"
              >
                📷 Choose Image
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handlePicChange}
                className="hidden"
              />
            </div>

            {previewPic && (
              <img
                src={previewPic}
                alt="Preview"
                className="mt-3 w-40 h-40 object-cover rounded-lg border"
              />
            )}
          </div>

          {/* Video Upload */}
          <div className="mt-4">
            <label className="block text-gray-700 mb-1 font-medium Prompt">
              Upload Video
            </label>
            <div className="flex items-center gap-3">
              <label
                htmlFor="videoUpload"
                className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md transition Prompt"
              >
                🎥 Choose Video
              </label>
              <input
                id="videoUpload"
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
              />
              {video && (
                <span className="text-gray-600 text-sm Roboto">{video.name}</span>
              )}
            </div>

            {previewVideo && (
              <video
                controls
                src={previewVideo}
                className="mt-3 w-full max-h-56 rounded-lg border"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white text-lg px-5 py-3 rounded-lg font-semibold transition cursor-pointer Prompt"
          >
            Save Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
