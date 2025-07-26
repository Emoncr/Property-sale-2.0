import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const userStore = (set) => ({
  user: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    organizationName: "",
    organizationType: "",
    organizationAddress: "",
    city: "",
    postalCode: "",
    defaultCurrency: "USD",
    websiteUrl: "",
    contactPersonEmail: "",
    taxId: "",
    country: "",
    mobile: "",
    role: "",
    isEmailVerified: false,
    stripeAccountId: null,
    stripeCustomerId: null,
    createdAt: "",
    updatedAt: "",
    subscribedPlan: {
      _id: "",
      name: "",
      price: 0,
      stripePriceId: "",
      planType: "",
      features: {
        campaigns: "",
        websites: 0,
        pluginFee: 0,
        customizableWidgetStyles: false,
        tailoredToYourNeeds: false,
        mobileOptimization: false,
        detailedDonationReports: false,
        customBranding: false,
        importCampaigns: false,
        importExportDonations: false,
        zapierIntegration: false,
        mailchimpIntegration: false,
        _id: "",
      },
      oldPlan: false,
    },
  },
  setUser: (user) =>
    set((state) => ({
      user: {
        ...state.user,
        ...user,
        // Handle nested subscribedPlan update
        subscribedPlan: user.subscribedPlan
          ? {
              ...state.user.subscribedPlan,
              ...user.subscribedPlan,
              // Handle nested features update
              features: user.subscribedPlan.features
                ? {
                    ...state.user.subscribedPlan?.features,
                    ...user.subscribedPlan.features,
                  }
                : state.user.subscribedPlan?.features,
            }
          : state.user.subscribedPlan,
      },
    })),
  removeUser: () =>
    set({
      user: {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        organizationName: "",
        organizationType: "",
        organizationAddress: "",
        city: "",
        postalCode: "",
        defaultCurrency: "USD",
        websiteUrl: "",
        contactPersonEmail: "",
        taxId: "",
        country: "",
        mobile: "",
        role: "",
        isEmailVerified: false,
        stripeAccountId: null,
        stripeCustomerId: null,
        hasCampaigns: false,
        createdAt: "",
        updatedAt: "",
        subscribedPlan: null,
      },
    }),
  updateUser: (user) =>
    set((state) => ({
      user: {
        ...state.user,
        ...user,
        // Handle nested subscribedPlan update
        subscribedPlan: user.subscribedPlan
          ? {
              ...state.user.subscribedPlan,
              ...user.subscribedPlan,
              // Handle nested features update
              features: user.subscribedPlan.features
                ? {
                    ...state.user.subscribedPlan?.features,
                    ...user.subscribedPlan.features,
                  }
                : state.user.subscribedPlan?.features,
            }
          : state.user.subscribedPlan,
      },
    })),
});

const useUserStore = create(devtools(persist(userStore, { name: "user" })));
export default useUserStore;
