import { uuid } from 'uuidv4';
import { Fund } from './Fund';
import { Donation } from './Donation';

export default class FundManager {

  private fundsArray: Fund[] = [
    new Fund(uuid(), 300, 1, 1),
    new Fund(uuid(), 400, 2, 2),
    new Fund(uuid(), 200, 3, 3)
  ];
  
  private donationsArray: Donation[] = [];

  // reserve fund based on a donation's amount and the state of match funds when it's initiated
  public reserveMatchFund(donationAmount: number): Donation {
    const donation = new Donation(donationAmount);
    const matchReservedAmount = this.matchReservedAmount(donation);
    donation.setMatchReservedAmount(matchReservedAmount);
    this.donationsArray.push(donation);
    return donation;
  }

  // update donation's status, secure reserved match funds permanently
  public collectDonation(donationId: string): void {
    const donation = this.donationsArray.find(donation => donation.getId() == donation.getId());
    if (donation) {
      donation.setStatus('COLLECTED');
      donation.setMatchedAmount(donation.getMatchReservedAmount());
    }
  }

  public expireMatching(fund: Fund | undefined): void {
    const donation = this.donationsArray.find(donation => donation.getId() == fund?.getMatchedDonationId());

    donation?.setMatchReservedAmount(0);
    donation?.setStatus('EXPIRED');
    fund?.resetMatcheDonationId();
  }

  public listMatchFundAllocations(): void {
    
    this.fundsArray.forEach(fund => {
      const donationId = fund.getMatchedDonationId();
      const donation = this.donationsArray.find(donation => donation.getId() == donationId);
      const allocated = donation && donation.getMatchReservedAmount();
      const status = donation && donation.getStatus();
      
      console.log('Donation ID: ', donationId);
      console.log('Match Fund ID: ', fund.getId());
      console.log('Amount allocated: ', allocated);
      console.log('Status: ', status);
    });
  }

  
  //***** HELPER METHODS *****//
  
  private matchReservedAmount(donation: Donation): number {
    // filter out the funds already matched with a donation
    const unreservedFunds = this.fundsArray.filter(fund => fund.getMatchedDonationId() == undefined);
    // find unreserved min order fund 
    const minFund = this.findMinOrderFund(unreservedFunds);
    const reservedAmount = this.reserveAmount(minFund, donation);
    minFund.setMatchedDonationId(donation.getId());
    console.log("Reserved amount: ", reservedAmount);
    return reservedAmount;
  }

  // find unused min order fund
  private findMinOrderFund(fundsArr: Fund[]): Fund {
    const minOrderFund = this.fundsArray.reduce(function(prev, current) {
      return (prev.getMatchOrder() < current.getMatchOrder()) ? prev : current
    });
    return minOrderFund;
  }

  private reserveAmount(minOrderFund: Fund, donation: Donation): number {
    const total = minOrderFund.getTotal();
    const matchRatio = minOrderFund.getMatchRatio();
    let reserveAmount = matchRatio * donation.getAmount();
    const remaining = total - reserveAmount;
    if (remaining > 0) {
      minOrderFund.setTotal(remaining);
      donation.setMatchReservedAmount(reserveAmount);
    } else {
      minOrderFund.setTotal(0);
      donation.setMatchReservedAmount(total);
    }
    return reserveAmount;
  }

  // methods just for testing purposes
  public findReservedFund(): Fund | undefined {
    return this.fundsArray.find(fund => fund.getMatchedDonationId != undefined);
  }

}