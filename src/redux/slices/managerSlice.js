import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Async thunks
export const getGroups = createAsyncThunk(
  'manager/getGroups',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/manager/groups`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get groups');
    }
  }
);

export const createGroup = createAsyncThunk(
  'manager/createGroup',
  async (groupData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/manager/groups`, groupData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create group');
    }
  }
);

export const updateGroup = createAsyncThunk(
  'manager/updateGroup',
  async ({ groupId, groupData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/manager/groups/${groupId}`, groupData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update group');
    }
  }
);

export const deleteGroup = createAsyncThunk(
  'manager/deleteGroup',
  async (groupId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/manager/groups/${groupId}`);
      return groupId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete group');
    }
  }
);

export const getSchedules = createAsyncThunk(
  'manager/getSchedules',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/manager/schedules`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get schedules');
    }
  }
);

export const createSchedule = createAsyncThunk(
  'manager/createSchedule',
  async (scheduleData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/manager/schedules`, scheduleData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create schedule');
    }
  }
);

export const getReports = createAsyncThunk(
  'manager/getReports',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/manager/reports`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get reports');
    }
  }
);

export const getGroupMembers = createAsyncThunk(
  'manager/getGroupMembers',
  async (groupId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/manager/groups/${groupId}/members`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get group members');
    }
  }
);

// Initial state
const initialState = {
  groups: [],
  schedules: [],
  reports: null,
  groupMembers: [],
  loading: false,
  error: null,
};

// Manager slice
const managerSlice = createSlice({
  name: 'manager',
  initialState,
  reducers: {
    clearManagerError: (state) => {
      state.error = null;
    },
    clearManagerData: (state) => {
      state.groups = [];
      state.schedules = [];
      state.reports = null;
      state.groupMembers = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Groups
      .addCase(getGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload.groups;
        state.error = null;
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Group
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups.push(action.payload.group);
        state.error = null;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Group
      .addCase(updateGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.groups.findIndex(group => group.id === action.payload.group.id);
        if (index !== -1) {
          state.groups[index] = action.payload.group;
        }
        state.error = null;
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Group
      .addCase(deleteGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = state.groups.filter(group => group.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Schedules
      .addCase(getSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload.schedules;
        state.error = null;
      })
      .addCase(getSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Schedule
      .addCase(createSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules.push(action.payload.schedule);
        state.error = null;
      })
      .addCase(createSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Reports
      .addCase(getReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload.reports;
        state.error = null;
      })
      .addCase(getReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Group Members
      .addCase(getGroupMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGroupMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.groupMembers = action.payload.members;
        state.error = null;
      })
      .addCase(getGroupMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearManagerError, clearManagerData } = managerSlice.actions;
export default managerSlice.reducer;
