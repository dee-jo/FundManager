import FundManager from "./FundManager";

const fundManager = new FundManager();

const donation = fundManager.reserveMatchFund(200);
fundManager.collectDonation(donation.getId());

const reservedFund = fundManager.findReservedFund();
fundManager.expireMatching(reservedFund);
fundManager.listMatchFundAllocations();

