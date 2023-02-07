export class Fund {
  private id: string;
  private total: number;
  private matchOrder: number;
  private matchRatio: number;
  private matchedDonationId: string | undefined;

  constructor(id: string, total: number, matchOrder: number, matchRatio: number) {
    this.id = id;
    this.total = total;
    this.matchOrder = matchOrder;
    this.matchRatio = matchRatio | 1;
    this.matchedDonationId = undefined;
  }

  getId(): string {
    return this.id;
  }

  getMatchOrder(): number {
    return this.matchOrder;
  }

  getMatchRatio(): number {
    return this.matchRatio;
  }

  getMatchedDonationId(): string | undefined {
    return this.matchedDonationId;
  }

  getTotal(): number {
    return this.total;
  }

  setTotal(total: number) {
    this.total = total;
  }

  setMatchedDonationId(donationId: string): void {
    this.matchedDonationId = donationId;
  }

  resetMatcheDonationId(): void {
    this.matchedDonationId = undefined;
  }
}