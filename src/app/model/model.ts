export interface IAPIResponse{
    message: string;
    result: boolean;
    data:any;
}

export interface IEvent {
    eventId: number;
    eventName: string
    startDate: string
    startTime: string
    endDate: string
    organizerName: string
    userId: number;
    price: number;
    location: string
    imageUrl: string
    organizerId: number;
  }

export class User {
    UserId: number;
    Name: string;
    Email: string;
    Password: string;
    ContactNo: string;
    Role: string;

    constructor(){
        this.ContactNo = '';
        this.Email = '';
        this.Name='';
        this.Password='';
        this.UserId=0;
        this.Role='Customer';
    }
  }