import eventModel, { IEvent } from "../models/event.model";
import userModel from "../models/user.model";

//import services

export interface ICreateEventInput {
  eventName: string;
  organiserId: string;
  organiserUPI: string;
  venue: string;
  location: string;
  date: Date;
  startTime: string;
  endTime: string;
  totalTickets: number;
  ticketPrice: number;
  eventDescription: string;
  organiserQR: string;
  city: string;
  categories: string[]; // ✅ added for search and filtering
}
interface ISearchEventQuery {
  eventName?: string;
  location?: string;
  categories?: string[];
  page?: number;
  limit?: number;
}
export const createEventService = async (data: ICreateEventInput): Promise<IEvent | { message: string }> => {
  try {
    const {
      eventName,
      organiserId,
      organiserUPI,
      venue,
      location,
      date,
      startTime,
      endTime,
      totalTickets,
      ticketPrice,
      eventDescription,
      organiserQR,
      city,
      categories,
    } = data;

    // ✅ Check if organiser exists
    const fetchOrganiserDetails = await userModel.findOne({ organiserId });
    if (!fetchOrganiserDetails) {
      return { message: "Invalid organiser id. Organiser does not exist (createEventService)" };
    }

    // ✅ Check if user is a registered organiser
    if (!fetchOrganiserDetails.isUserOrganiser) {
      return { message: "Please first register as an organiser" };
    }

    // ✅ Prevent duplicate events by name (optional: can include city or date for stricter check)
    const existingEvent = await eventModel.findOne({ eventName });
    if (existingEvent) {
      return { message: "Event already exists with this name (createEventService)" };
    }

    // ✅ Construct event data
    const eventData: Partial<IEvent> = {
      eventName,
      organiserId,
      organiserUPI,
      venue,
      location,
      date,
      startTime,
      endTime,
      totalTickets,
      ticketPrice,
      isActive: true,
      eventDescription,
      organiserQR,
      city,
      categories,
    };

    // ✅ Create the event
    const createdEvent = await eventModel.create(eventData);

    return createdEvent;
  } catch (error: any) {
    throw new Error(`Error createEventService: ${error.message}`);
  }
};


export const searchEventService = async (query: ISearchEventQuery) => {
  try {
    const { eventName, location, categories, page = 1, limit = 10 } = query;

    const filter: any = {};

    // 🔍 Search by event name (case-insensitive partial match)
    if (eventName) {
      filter.eventName = { $regex: eventName, $options: "i" };
    }

    // 🔍 Search by location or city (partial match)
    if (location) {
      filter.$or = [
        { location: { $regex: location, $options: "i" } },
        { city: { $regex: location, $options: "i" } },
      ];
    }

    // 🔍 Search by one or multiple categories
    if (categories && categories.length > 0) {
      filter.categories = { $in: categories };
    }

    // 🧮 Pagination logic
    const skip = (page - 1) * limit;

    // 📦 Fetch filtered events
    const events = await eventModel
      .find(filter)
      .sort({ date: 1 }) // upcoming events first
      .skip(skip)
      .limit(limit);

    // 🧾 Count total results
    const totalEvents = await eventModel.countDocuments(filter);

    return {
      success: true,
      totalEvents,
      currentPage: page,
      totalPages: Math.ceil(totalEvents / limit),
      events,
    };
  } catch (error: any) {
    throw new Error(`Error searchEventService: ${error.message}`);
  }
};


export const getAllEventService = async (data: any) => {
  try {
    const { page = 1, limit = 10 } = data;

    const skip = (page - 1) * limit;

    // ✨ Fetch paginated + sorted events
    const events = await eventModel
      .find()                    // ❗ missing in your code
      .sort({ date: 1 })         // upcoming events first
      .skip(skip)
      .limit(limit);

    // 🧾 Count total
    const totalEvents = await eventModel.countDocuments();

    return {
      success: true,
      data: events,
      pagination: {
        page,
        limit,
        totalEvents,
        totalPages: Math.ceil(totalEvents / limit),
      },
    };

  } catch (error: any) {
    console.error("Error getAllEventService:", error.message);
    return {
      success: false,
      message: "Failed to fetch events",
      error: error.message,
    };
  }
};
