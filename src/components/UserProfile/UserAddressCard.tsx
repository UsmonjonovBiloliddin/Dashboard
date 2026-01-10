import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

export default function UserAddressCard() {
  const { isOpen, openModal, closeModal } = useModal();
  
  const [addressData, setAddressData] = useState({
    country: "Uzbekistan",
    city: "Fergana",
    state: "Fergana Region",
    street: "Bog'ishamol Street",
    houseNumber: "25",
    apartment: "15",
    postalCode: "150100",
    taxId: "AB3445345",
    addressType: "Home",
    isDefault: true
  });

  const handleSave = () => {
    console.log("Saving address changes...", addressData);
    closeModal();
  };

  const handleInputChange = (field: string, value: string) => {
    setAddressData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setAddressData(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const addressFields = [
    { label: "Country", value: addressData.country, icon: "🌍" },
    { label: "City", value: addressData.city, icon: "🏙️" },
    { label: "State", value: addressData.state, icon: "🏛️" },
    { label: "Street", value: addressData.street, icon: "🛣️" },
    { label: "House Number", value: addressData.houseNumber, icon: "🏠" },
    { label: "Apartment", value: addressData.apartment, icon: "🏢" },
    { label: "Postal Code", value: addressData.postalCode, icon: "📮" },
    { label: "TAX ID", value: addressData.taxId, icon: "📋" },
  ];

  return (
    <>
      {/* Address Card */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Card Header */}
        <div className="px-4 sm:px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-900/10 rounded-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Address Information
                </h3>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1">
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {addressData.addressType} Address
                  </span>
                  {addressData.isDefault && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                      Default
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <button
              onClick={openModal}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Address
            </button>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 sm:p-6">
          {/* Address Preview */}
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white truncate">
                  {addressData.street} {addressData.houseNumber}, Apt {addressData.apartment}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                  {addressData.city}, {addressData.state}, {addressData.country}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Postal Code: {addressData.postalCode} • TAX ID: {addressData.taxId}
                </p>
              </div>
            </div>
          </div>

          {/* Address Details Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {addressFields.map((field, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800/30 p-3 sm:p-4 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <span className="text-base sm:text-lg">{field.icon}</span>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate">
                    {field.label}
                  </p>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {field.value}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col xs:flex-row flex-wrap items-start xs:items-center gap-4 xs:gap-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 flex-shrink-0"></div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Verified Address</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Verified on January 15, 2024</p>
                </div>
              </div>
              
              <div className="xs:h-4 xs:w-px bg-gray-300 dark:bg-gray-700 hidden xs:block"></div>
              <div className="w-full xs:w-auto h-px xs:h-4 bg-gray-300 dark:bg-gray-700 xs:hidden"></div>
              
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Last Updated</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 weeks ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Address Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-2xl mx-4 sm:mx-6 md:mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
          {/* Modal Header */}
          <div className="px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 bg-gradient-to-r from-green-500/5 to-green-600/5 dark:from-green-900/10 dark:to-green-800/10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  Edit Address Information
                </h3>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Update your shipping and billing address details
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-4 sm:p-6 md:p-8 max-h-[70vh] overflow-y-auto">
            <div className="space-y-4 sm:space-y-6">
              {/* Address Type Selection */}
              <div>
                <Label>Address Type</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-2">
                  {['Home', 'Work', 'Billing', 'Other'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleInputChange('addressType', type)}
                      className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg border text-xs sm:text-sm font-medium transition-all ${
                        addressData.addressType === type
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                          : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Address Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label>Country</Label>
                  <Input 
                    type="text" 
                    value={addressData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="mt-1 sm:mt-2"
                  />
                </div>
                
                <div>
                  <Label>City</Label>
                  <Input 
                    type="text" 
                    value={addressData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="mt-1 sm:mt-2"
                  />
                </div>
                
                <div>
                  <Label>State / Region</Label>
                  <Input 
                    type="text" 
                    value={addressData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="mt-1 sm:mt-2"
                  />
                </div>
                
                <div>
                  <Label>Street</Label>
                  <Input 
                    type="text" 
                    value={addressData.street}
                    onChange={(e) => handleInputChange('street', e.target.value)}
                    className="mt-1 sm:mt-2"
                  />
                </div>
                
                <div>
                  <Label>House Number</Label>
                  <Input 
                    type="text" 
                    value={addressData.houseNumber}
                    onChange={(e) => handleInputChange('houseNumber', e.target.value)}
                    className="mt-1 sm:mt-2"
                  />
                </div>
                
                <div>
                  <Label>Apartment / Unit</Label>
                  <Input 
                    type="text" 
                    value={addressData.apartment}
                    onChange={(e) => handleInputChange('apartment', e.target.value)}
                    className="mt-1 sm:mt-2"
                  />
                </div>
                
                <div>
                  <Label>Postal Code</Label>
                  <Input 
                    type="text" 
                    value={addressData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="mt-1 sm:mt-2"
                  />
                </div>
                
                <div>
                  <Label>TAX ID</Label>
                  <Input 
                    type="text" 
                    value={addressData.taxId}
                    onChange={(e) => handleInputChange('taxId', e.target.value)}
                    className="mt-1 sm:mt-2"
                  />
                </div>
              </div>

              {/* Additional Options */}
              <div className="pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <Label className="mb-1">Set as Default Address</Label>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      This address will be used as your primary shipping and billing address
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={addressData.isDefault}
                      onChange={(e) => handleCheckboxChange('isDefault', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>

              {/* Address Preview */}
              <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Address Preview</h4>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    {addressData.street} {addressData.houseNumber}, Apt {addressData.apartment}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {addressData.city}, {addressData.state}, {addressData.country}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Postal Code: {addressData.postalCode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline" 
                  onClick={closeModal}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  variant="outline"
                  className="px-4 sm:px-6 py-2 sm:py-2.5 flex-1"
                  onClick={() => {
                    console.log("Verify address");
                  }}
                >
                  Verify Address
                </Button>
              </div>
              <Button 
                onClick={handleSave}
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 w-full sm:w-auto"
              >
                Save Address
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}