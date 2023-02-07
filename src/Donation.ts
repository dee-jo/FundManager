import { uuid } from 'uuidv4';

export class Donation {

  private id: string;
  private donationAmount: number;
  private donationDate: Date;
  private matchReservedAmount: number;
  private matchedAmount: number;
  private status: string;


  constructor(donationAmount: number) {
    this.id = uuid();
    this.donationAmount = donationAmount;
    this.donationDate = new Date();
    this.matchReservedAmount = 0;
    this.matchedAmount = 0;
    this.status = 'PENDING';
  }

  getId(): string {
    return this.id;
  }

  getAmount(): number {
    return this.donationAmount;
  }

  getMatchReservedAmount(): number {
    return this.matchReservedAmount;  
  }

  getStatus(): string {
    return this.status;
  }
  
  setMatchReservedAmount(amount: number) {
    this.matchReservedAmount = amount;
  }

  setMatchedAmount(amount: number) {
    this.matchedAmount = amount;
  }

  setStatus(status: string): void {
    this.status = status;
  }
}