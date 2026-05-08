/**
 * LOMI LOGISTICS - GLOBAL TYPE DEFINITIONS
 */

// 1. Define what a Driver looks like
export type Driver = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  rating: number;
  totalJobs: number;
  vehicleType: string;
  licensePlate: string;
};

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export type Task = {
  id: string;
  customer: string;
  location: string;
  price: string;
  status: TaskStatus;
  weight: string;
  loadType: string;
  phone: string;
  latitude: number;
  longitude: number;
  notes?: string;
  completedAt?: string;
};

export type VehicleType = 'small' | 'medium' | 'heavy';

/**
 * 2. Navigation Param List
 */
export type RootStackParamList = {
  Login: undefined;
  VehicleCapability: undefined; 
  Dashboard: { vehicleType: VehicleType };
  Details: { task: Task };
  History: undefined;
  // FIXED: We tell the app that Profile expects a 'driver' object
  Profile: { driver: Driver }; 
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}