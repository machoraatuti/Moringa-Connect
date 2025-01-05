// services/eventService.js
import { v4 as uuidv4 } from 'uuid';

const mockEvents = [
  {
    id: 1,
    image: require("../../assets/images/graduation.jpg"),
    date: "10 Aug",
    title: "2025 Graduation Ceremony",
    description: "Celebrate the accomplishments of our talented students.",
    location: "Moringa School, Nairobi",
    time: "8:00 am - 1:00 pm",
    dressCode: "Smart Casual",
    category: "Educational",
    status: "upcoming",
    attendance: 0,
    maxCapacity: 200,
    notifications: []
  },
  {
    id: 2,
    image: require("../../assets/images/cybersecurity.jpg"),
    date: "18 Jul",
    title: "Cybersecurity",
    description: "An in-depth webinar on cyber threat intelligence and security.",
    location: "Zoom Webinar",
    time: "5:30 pm - 8:00 pm",
    dressCode: "No dress code (Virtual)",
    category: "Technical",
    status: "upcoming",
    attendance: 0,
    maxCapacity: 100,
    notifications: []
  },
  {
    id: 3,
    image: require("../../assets/images/cocktails.jpg"),
    date: "25 Sep",
    title: "Alumni Cocktail Night",
    description: "Network and celebrate with fellow alumni.",
    location: "Westlands, Nairobi",
    time: "6:00 pm - 9:00 pm",
    dressCode: "Formal/Smart Casual",
    category: "Social",
    status: "upcoming",
    attendance: 0,
    maxCapacity: 150,
    notifications: []
  },
  {
    id: 4,
    image: require("../../assets/images/bootcamp.jpg"),
    date: "15 Nov",
    title: "Data Science Bootcamp",
    description: "Learn Python, Machine Learning, and AI tools in this hands-on bootcamp.",
    location: "Kikao64, Eldoret",
    time: "9:00 am - 5:00 pm",
    dressCode: "Business Casual",
    category: "Educational",
    status: "upcoming",
    attendance: 0,
    maxCapacity: 50,
    notifications: []
  },
  {
    id: 5,
    image: require("../../assets/images/hiking.jpg"),
    date: "05 Dec",
    title: "Alumni Hike to Ngong Hills",
    description: "Reconnect with nature and fellow alumni.",
    location: "Ngong Hills, Nairobi",
    time: "7:00 am - 3:00 pm",
    dressCode: "Comfortable Hiking Attire",
    category: "Social",
    status: "upcoming",
    attendance: 0,
    maxCapacity: 30,
    notifications: []
  },
  {
    id: 6,
    image: require("../../assets/images/frontend.jpg"),
    date: "22 Jan",
    title: "Frontend Developer Workshop",
    description: "Master React and Next.js in this practical session.",
    location: "Kikao64, Eldoret",
    time: "9:00 am - 4:00 pm",
    dressCode: "Smart Casual",
    category: "Technical",
    status: "upcoming",
    attendance: 0,
    maxCapacity: 40,
    notifications: []
  }
];

class EventService {
  constructor() {
    this.events = [...mockEvents];
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async fetchEvents() {
    await this.delay(800);
    return [...this.events];
  }

  async createEvent(eventData) {
    await this.delay(1000);
    const newEvent = {
      id: this.events.length + 1,
      ...eventData,
      status: "upcoming",
      attendance: 0,
      maxCapacity: eventData.maxCapacity || 100,
      notifications: [],
      createdAt: new Date().toISOString()
    };
    this.events.push(newEvent);
    return newEvent;
  }

  async updateEventStatus(eventId, newStatus, message) {
    await this.delay(500);
    const eventIndex = this.events.findIndex(event => event.id === eventId);
    
    if (eventIndex === -1) {
      throw new Error('Event not found');
    }

    this.events[eventIndex] = {
      ...this.events[eventIndex],
      status: newStatus,
      updatedAt: new Date().toISOString()
    };

    if (message) {
      this.events[eventIndex].notifications.unshift({
        id: uuidv4(),
        message,
        type: newStatus,
        timestamp: new Date().toISOString()
      });
    }

    return this.events[eventIndex];
  }

  async sendNotification(eventId, message) {
    await this.delay(500);
    const eventIndex = this.events.findIndex(event => event.id === eventId);
    
    if (eventIndex === -1) {
      throw new Error('Event not found');
    }

    const notification = {
      id: uuidv4(),
      message,
      timestamp: new Date().toISOString()
    };

    this.events[eventIndex].notifications.unshift(notification);
    return notification;
  }

  async updateEventDetails(eventId, updates) {
    await this.delay(800);
    const eventIndex = this.events.findIndex(event => event.id === eventId);
    
    if (eventIndex === -1) {
      throw new Error('Event not found');
    }

    this.events[eventIndex] = {
      ...this.events[eventIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    return this.events[eventIndex];
  }

  async deleteEvent(eventId) {
    await this.delay(800);
    const eventIndex = this.events.findIndex(event => event.id === eventId);
    
    if (eventIndex === -1) {
      throw new Error('Event not found');
    }

    this.events = this.events.filter(event => event.id !== eventId);
    return { success: true, message: 'Event deleted successfully' };
  }
}

export const eventService = new EventService();