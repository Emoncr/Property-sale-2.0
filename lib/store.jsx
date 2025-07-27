import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePropertyStore = create()(
  persist(
    (set, get) => ({
      properties: [],
      favoriteProperties: [],
      searchQuery: "",
      filters: {
        priceRange: [0, 10000000],
      },
      setProperties: (properties) => set({ properties }),
      addProperty: (property) =>
        set((state) => ({ properties: [...state.properties, property] })),
      updateProperty: (id, updates) =>
        set((state) => ({
          properties: state.properties.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      deleteProperty: (id) =>
        set((state) => ({
          properties: state.properties.filter((p) => p.id !== id),
        })),
      toggleFavorite: (propertyId) =>
        set((state) => ({
          favoriteProperties: state.favoriteProperties.includes(propertyId)
            ? state.favoriteProperties.filter((id) => id !== propertyId)
            : [...state.favoriteProperties, propertyId],
        })),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setFilters: (filters) =>
        set((state) => ({ filters: { ...state.filters, ...filters } })),
      getFilteredProperties: () => {
        const { properties, searchQuery, filters } = get();
        return properties.filter((property) => {
          const matchesSearch =
            !searchQuery ||
            property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.location.toLowerCase().includes(searchQuery.toLowerCase());

          const matchesType = !filters.type || property.type === filters.type;
          const matchesCategory =
            !filters.category || property.category === filters.category;
          const matchesLocation =
            !filters.location ||
            property.location
              .toLowerCase()
              .includes(filters.location.toLowerCase());
          const matchesPrice =
            property.price >= filters.priceRange[0] &&
            property.price <= filters.priceRange[1];
          const matchesBedrooms =
            !filters.bedrooms || property.bedrooms === filters.bedrooms;
          const matchesBathrooms =
            !filters.bathrooms || property.bathrooms === filters.bathrooms;

          return (
            matchesSearch &&
            matchesType &&
            matchesCategory &&
            matchesLocation &&
            matchesPrice &&
            matchesBedrooms &&
            matchesBathrooms
          );
        });
      },
    }),
    {
      name: "property-store",
      partialize: (state) => ({
        favoriteProperties: state.favoriteProperties,
        filters: state.filters,
      }),
    }
  )
);

export const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-store",
    }
  )
);

export const useChatStore = create()((set, get) => ({
  conversations: [],
  activeConversation: null,
  unreadCount: 0,
  setConversations: (conversations) => {
    const unreadCount = conversations.reduce((count, conv) => {
      return count + conv.messages.filter((msg) => !msg.read).length;
    }, 0);
    set({ conversations, unreadCount });
  },
  addMessage: (conversationId, message) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [...conv.messages, message],
              lastMessage: message,
              updatedAt: new Date(),
            }
          : conv
      ),
      unreadCount: state.unreadCount + 1,
    })),
  setActiveConversation: (conversationId) =>
    set({ activeConversation: conversationId }),
  markAsRead: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: conv.messages.map((msg) => ({ ...msg, read: true })),
            }
          : conv
      ),
      unreadCount: Math.max(
        0,
        state.unreadCount -
          state.conversations
            .find((c) => c.id === conversationId)
            ?.messages.filter((m) => !m.read).length || 0
      ),
    })),
}));
