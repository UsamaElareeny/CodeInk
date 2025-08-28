import React, { useState } from 'react'

export default function Settings() {
  const [activeSection, setActiveSection] = useState('settings')
  const [openAccordion, setOpenAccordion] = useState(null)

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index)
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <nav className="mt-6">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveSection('settings')}
                  className={`block w-full text-left p-2 text-gray-700 hover:bg-gray-200 rounded ${activeSection === 'settings' ? 'bg-gray-200' : ''}`}
                >
                  Settings
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('help')}
                  className={`block w-full text-left p-2 text-gray-700 hover:bg-gray-200 rounded ${activeSection === 'help' ? 'bg-gray-200' : ''}`}
                >
                  Help
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('contact')}
                  className={`block w-full text-left p-2 text-gray-700 hover:bg-gray-200 rounded ${activeSection === 'contact' ? 'bg-gray-200' : ''}`}
                >
                  Contact Form
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('theme')}
                  className={`block w-full text-left p-2 text-gray-700 hover:bg-gray-200 rounded ${activeSection === 'theme' ? 'bg-gray-200' : ''}`}
                >
                  Theme
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8">
        {activeSection === 'settings' && (
          <section id="settings" className="mb-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Settings</h1>
            <form className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <span className="inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 24H0V0h24v24z" fill="none" />
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </span>
                </div>
                <div>
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Change Profile Picture
                  </button>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-700">Notifications</h2>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <input
                      id="email-notifications"
                      name="email-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-900">
                      Email Notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="sms-notifications"
                      name="sms-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="sms-notifications" className="ml-2 block text-sm text-gray-900">
                      SMS Notifications
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-4">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </section>
        )}
        {activeSection === 'help' && (
          <section id="help" className="mb-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Help</h1>
            <div className="space-y-4">
              <div>
                <button
                  onClick={() => toggleAccordion(1)}
                  className="w-full text-left p-4 bg-gray-200 rounded-md focus:outline-none"
                >
                  <h2 className="text-xl font-semibold text-gray-700">How do I change my password?</h2>
                </button>
                {openAccordion === 1 && (
                  <div className="p-4 bg-gray-100 rounded-md">
                    <p className="text-gray-700">To change your password, go to the Settings section and click on "Change Password". Follow the instructions to update your password.</p>
                  </div>
                )}
              </div>
              <div>
                <button
                  onClick={() => toggleAccordion(2)}
                  className="w-full text-left p-4 bg-gray-200 rounded-md focus:outline-none"
                >
                  <h2 className="text-xl font-semibold text-gray-700">How do I contact support?</h2>
                </button>
                {openAccordion === 2 && (
                  <div className="p-4 bg-gray-100 rounded-md">
                    <p className="text-gray-700">You can contact support by filling out the contact form in the Contact Form section. Provide your name, email, subject, and message, and our support team will get back to you.</p>
                  </div>
                )}
              </div>
              <div>
                <button
                  onClick={() => toggleAccordion(3)}
                  className="w-full text-left p-4 bg-gray-200 rounded-md focus:outline-none"
                >
                  <h2 className="text-xl font-semibold text-gray-700">How do I change the theme?</h2>
                </button>
                {openAccordion === 3 && (
                  <div className="p-4 bg-gray-100 rounded-md">
                    <p className="text-gray-700">To change the theme, go to the Theme section and select your preferred theme from the dropdown menu. The changes will be applied immediately.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
        {activeSection === 'contact' && (
          <section id="contact" className="mb-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact Form</h1>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  rows="4"
                  placeholder="Your message"
                ></textarea>
              </div>
              <div className="flex items-center justify-end space-x-4">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </section>
        )}
        {activeSection === 'theme' && (
          <section id="theme">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Theme</h1>
            <div className="mt-4">
              <select
                className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
          </section>
        )}
      </main>
    </div>
  )
} 