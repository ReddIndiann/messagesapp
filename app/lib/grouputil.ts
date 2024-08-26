// groupService.ts
import axios from 'axios';

export interface Group {
  id: number;
  groupName: string;
  memberCount: number;
}

export const createGroup = async (groupData: { groupName: string; userId: number | null }) => {
  if (groupData.userId === null) {
    throw new Error('User ID is not available.');
  }

  try {
    await axios.post('http://localhost:5000/groups', groupData);
    console.log('Group registered successfully');
  } catch (error) {
    console.error('Error registering group:', error);
    throw error;
  }
};

export const fetchGroups = async (userId: number): Promise<Group[]> => {
  try {
    const response = await axios.get<Group[]>(`http://localhost:5000/groups/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching groups:', error);
    throw error;
  }
};

export const fetchAllGroups = async (): Promise<Group[]> => {
  try {
    const response = await axios.get<Group[]>(`http://localhost:5000/groups`);
    return response.data;
  } catch (error) {
    console.error('Error fetching groups:', error);
    throw error;
  }
};