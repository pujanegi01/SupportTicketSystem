import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./ticketAPI";
import { Ticket } from "../../types/ticket";

interface TicketState {
  tickets: Ticket[];
  selectedTicket?: Ticket;
  loading: boolean;
  error: string | null;
}

const initialState: TicketState = {
  tickets: [],
  loading: false,
  error: null,
};

export const getTickets = createAsyncThunk("tickets/getAll", async () => {
  return await api.fetchTickets();
});

export const getTicket = createAsyncThunk(
  "tickets/getOne",
  async (id: number) => {
    return await api.fetchTicketById(id);
  }
);

export const addTicket = createAsyncThunk(
  "tickets/create",
  async (data: { title: string; description: string }) => {
    return await api.createTicket(data);
  }
);

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch tickets";
      })

      .addCase(getTicket.fulfilled, (state, action) => {
        state.selectedTicket = action.payload;
      })

      .addCase(addTicket.fulfilled, (state, action) => {
        state.tickets.push(action.payload);
      });
  },
});

export default ticketSlice.reducer;