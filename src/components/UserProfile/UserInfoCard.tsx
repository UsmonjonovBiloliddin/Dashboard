import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Biloliddin",
    lastName: "Usmonjonov",
    email: "usmonjonovbiloliddin40@gmail.com",
    phone: "+998700406478",
    bio: "Team Manager",
    location: "Fergana, Uzbekistan",
    birthDate: "June 6, 1998",
    gender: "Male",
    nationality: "Uzbek",
    telegram: "@Usmonjonov_Biloliddin",
    linkedin: "https://www.linkedin.com/in/biloliddin-usmonjonov",
    instagram: "https://www.instagram.com/biloliddin_usmonjonov06/"
  });

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...", personalInfo);
    closeModal();
  };

  const handleInputChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const infoFields = [
    { label: "First Name", value: personalInfo.firstName, icon: "👤" },
    { label: "Last Name", value: personalInfo.lastName, icon: "👤" },
    { label: "Email address", value: personalInfo.email, icon: "✉️" },
    { label: "Phone", value: personalInfo.phone, icon: "📱" },
    { label: "Bio", value: personalInfo.bio, icon: "📝" },
    { label: "Location", value: personalInfo.location, icon: "📍" },
    { label: "Date of Birth", value: personalInfo.birthDate, icon: "🎂" },
    { label: "Gender", value: personalInfo.gender, icon: "⚧️" },
    { label: "Nationality", value: personalInfo.nationality, icon: "🌍" },
  ];

  const socialFields = [
    { label: "Telegram", value: personalInfo.telegram, icon: "🔗" },
    { label: "LinkedIn", value: personalInfo.linkedin, icon: "💼" },
    { label: "Instagram", value: personalInfo.instagram, icon: "📸" },
  ];

  return (
    <>
      {/* Personal Information Card */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Card Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10 rounded-lg">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Personal Information
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your personal details and contact information
                </p>
              </div>
            </div>
            
            <button
              onClick={openModal}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Info
            </button>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infoFields.map((field, index) => (
              <div key={index} className="group">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg">{field.icon}</span>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {field.label}
                  </p>
                </div>
                <p className="text-base font-semibold text-gray-900 dark:text-white pl-8">
                  {field.value}
                </p>
                <div className="mt-2 h-px bg-gray-200 dark:bg-gray-800 group-hover:bg-gray-300 dark:group-hover:bg-gray-700 transition-colors"></div>
              </div>
            ))}
          </div>

          {/* Social Links Section */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Social Links</h4>
            <div className="flex flex-wrap gap-4">
              {socialFields.map((social) => (
                <a
                  key={social.label}
                  href={social.value.startsWith('http') ? social.value : `https://t.me/${social.value.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    {social.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{social.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                      {social.value}
                    </p>
                  </div>
                  <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
          {/* Modal Header */}
          <div className="px-8 pt-8 pb-6 bg-gradient-to-r from-blue-500/5 to-blue-600/5 dark:from-blue-900/10 dark:to-blue-800/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Edit Personal Information
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Update your personal details and contact information
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-8 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-800">
                  Personal Details
                </h4>
                <div className="space-y-5">
                  <div>
                    <Label>First Name</Label>
                    <Input 
                      type="text" 
                      value={personalInfo.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label>Last Name</Label>
                    <Input 
                      type="text" 
                      value={personalInfo.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label>Email Address</Label>
                    <Input 
                      type="email" 
                      value={personalInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label>Phone Number</Label>
                    <Input 
                      type="tel" 
                      value={personalInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label>Bio</Label>
                    <textarea
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors mt-2"
                      rows={2}
                      value={personalInfo.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-800">
                  Additional Information
                </h4>
                <div className="space-y-5">
                  <div>
                    <Label>Location</Label>
                    <Input 
                      type="text" 
                      value={personalInfo.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label>Date of Birth</Label>
                    <Input 
                      type="text" 
                      value={personalInfo.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      className="mt-2"
                      placeholder="Month Day, Year"
                    />
                  </div>
                  
                  <div>
                    <Label>Gender</Label>
                    <select
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors mt-2"
                      value={personalInfo.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label>Nationality</Label>
                    <Input 
                      type="text" 
                      value={personalInfo.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Social Links Section */}
              <div className="lg:col-span-2">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-800">
                  Social Links
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {socialFields.map((social) => (
                    <div key={social.label}>
                      <Label>{social.label}</Label>
                      <Input 
                        type="text" 
                        value={personalInfo[social.label.toLowerCase() as keyof typeof personalInfo]}
                        onChange={(e) => handleInputChange(social.label.toLowerCase(), e.target.value)}
                        className="mt-2"
                        placeholder={`Enter your ${social.label} link`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-8 py-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                All changes will be saved automatically
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  onClick={closeModal}
                  className="px-6 py-2.5"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}