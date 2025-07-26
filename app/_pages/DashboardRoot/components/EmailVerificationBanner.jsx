import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import useUserStore from "@/store/userStore";
import { AlertTriangle, Mail, X } from "lucide-react";
import { useState } from "react";
import EmailConfirmationModal from "./EmailConfirmationModal";
const EmailVerificationBanner = () => {
  const { user } = useUserStore((state) => state);
  const [isVisible, setIsVisible] = useState(true);
  const [isVerifying, setIsVerifying] = useState(user?.isEmailVerified);

  if (!isVisible) return null;

  return (
    <div className="relative font-primary mb-5">
      <div className="relative overflow-hidden rounded-xl border border-[#008C8B]/20 shadow-lg shadow-[#008C8B]/10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#008C8B]/5 via-[#008C8B]/10 to-[#008C8B]/15 animate-pulse"></div>

        <div className="relative z-10">
          <div className="px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-col sm:flex-row items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-[#008C8B]/10 text-[#008C8B] border-2 border-[#008C8B]/30 animate-pulse">
                  <AlertTriangle className="h-5 w-5" strokeWidth={2} />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold ">
                    Verify Your Email Address
                  </h3>
                  <div className="mt-1">
                    <p className="flex flex-wrap items-center gap-1">
                      <span>Your email</span>
                      <span className="inline-flex items-center gap-1.5 bg-[#008C8B]/5 px-2.5 py-1 rounded-lg border border-[#008C8B]/10">
                        <Mail className="h-3.5 w-3.5 text-[#008C8B]" />
                        <span className="font-medium text-[#008C8B]">
                          {user?.email || ""}
                        </span>
                      </span>
                      <span>
                        isn&rsquo;t verified. Please verify to continue.
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 p-0 md:p-6 sm:space-x-3 mt-4 sm:mt-0">
                {!isVerifying ? (
                  <>
                    <Modal
                      title={"Verify your email address"}
                      description={`We will send a verification code to your email. Confirm your email address by entering the code we sent to your email.`}
                      element={
                        <EmailConfirmationModal
                          onclose={() => setIsVisible(false)}
                        />
                      }
                    >
                      <Button className="w-full sm:w-auto">
                        <span className="relative z-10 flex items-center gap-1.5">
                          <Mail className="h-4 w-4" />
                          Verify Now
                        </span>
                      </Button>
                    </Modal>
                    <button
                      onClick={() => setIsVisible(false)}
                      className="absolute top-1 right-1 text-[#008C8B]/60 hover:text-[#008C8B] transition-colors duration-200 p-1"
                      title="Dismiss"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-2 bg-[#008C8B]/10 text-[#008C8B] font-medium px-6 py-2.5 rounded-lg transition-all duration-200 w-full sm:w-auto"
                  >
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#008C8B] border-t-transparent"></div>
                    Verifying...
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#008C8B]/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#008C8B]/30 via-[#008C8B]/60 to-[#008C8B] animate-[progress_3s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>

      <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#008C8B] rounded-full animate-ping"></div>
      <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#008C8B] rounded-full shadow-sm"></div>
    </div>
  );
};

export default EmailVerificationBanner;
