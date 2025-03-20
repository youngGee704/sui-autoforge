"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

interface HumanVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onVerified: () => void
}

export default function HumanVerificationModal({ isOpen, onClose, onVerified }: HumanVerificationModalProps) {
  const [language, setLanguage] = useState("English")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-black">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-[#f5821f] text-center mb-4">Let&apos;s confirm you are human</h2>

          <p className="text-center text-gray-700 mb-8">
            Complete the security check before continuing. This step verifies that you are not a bot, which helps to
            protect your account and prevent spam.
          </p>

          <button
            onClick={onVerified}
            className="bg-[#f5821f] text-white px-6 py-2 rounded flex items-center justify-center mb-8 hover:bg-[#e67812] transition-colors"
          >
            Begin
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>

          <div className="w-full max-w-[150px]">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Chinese">Chinese</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

