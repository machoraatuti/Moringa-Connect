

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Sample initial posts
export const mockPosts = [
  {
    id: generateId(),
    title: "Getting Started with React",
    content: "React is a powerful library for building user interfaces...",
    category: "Technology",
    author: {
      id: "user1",
      name: "John Doe",
      avatar: "https://via.placeholder.com/40"
    },
    image: "https://via.placeholder.com/600x400",
    createdAt: new Date().toISOString(),
    likes: 15,
    comments: [
      {
        id: generateId(),
        author: {
          id: "user2",
          name: "Jane Smith",
          avatar: "https://via.placeholder.com/40"
        },
        content: "Great introduction to React!",
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: generateId(),
    title: "Career Development Tips",
    content: "Building a successful career requires consistent effort...",
    category: "Career",
    author: {
      id: "user2",
      name: "Jane Smith",
      avatar: "https://via.placeholder.com/40"
    },
    image: "https://via.placeholder.com/600x400",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    likes: 23,
    comments: []
  }
];

// Simulate API delay
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));