import axios from "axios";
import { Ticket } from "../../types/ticket";

const API = process.env.REACT_APP_API_URL

export const fetchTickets = async (): Promise<Ticket[]> => {
  const res = await axios.get(`${API}/tickets`);
  return res.data;
};

export const fetchTicketById = async (id: number): Promise<Ticket> => {
  const res = await axios.get(`${API}/tickets/${id}`);
  return res.data;
};

export const createTicket = async (data: {
  title: string;
  description: string;
}) => {
  const res = await axios.post(`${API}/tickets`, data);
  return res.data;
};