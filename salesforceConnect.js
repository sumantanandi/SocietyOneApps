
var nforce = require('nforce');
var truncate = require('truncate');
var dateFormat = require('dateformat');
var username = '502083718@lfs.com.orignzqa';
var password = 'Pa55word';

var app = {};
var applicant = {};
var loanPurpose = {};
var expense = {};
var income = {};
var otherIncome = {};
var asset = {};
var liability = {};

//Status field 
var oauth;
var applicationStatusFlag = true;
var applicantStatusFlag = true;
var loanPurposeFlag = true;
var incomeStatusFlag = true;
var otherIncomeStatusFlag = true;
var assetStatusFlag = true;
var debtStatusFlag = true;
var expenseStatusFlag = true;

var org = nforce.createConnection({
  loginUrl: 'https://test.salesforce.com',
  clientId: '3MVG9e2mBbZnmM6mwtcAxJ5q2Map1ZfMtO_6Ej2VHNXlf2NYogSr3K1S971yEwQ3wp6eTQlAidrok2NnNkx24',
  clientSecret: '6823672229527859214',
  redirectUri: 'http://localhost:3000/oauth/_callback',
  apiVersion: 'v35.0',  // optional, defaults to current salesforce API version 
  environment: 'sandbox',  // optional, salesforce 'sandbox' or 'production', production default 
  mode: 'multi' // optional, 'single' or 'multi' user mode, multi default 
});


createApplication = (application) => {
  console.log(' Inside createApplication Object  :');
  app = nforce.createSObject('Application__c');

  //app.set('Loan_Term_Months__c', application.term);
  //Loan Term
  var loanTerm = {
    "24": "2 years",
    "36": "3 years",
    "60": "5 years",
  };

  if (loanTerm[application.term]) {
    app.set('Loan_Term__c', loanTerm[application.term]);
  } else {
    app.set('Loan_Term__c', '');
  }

  app.set('Application_Type__c', 'Single');
  app.set('Higher_Approval_Consent__c', application.optionalDisclaimer2);
  app.set('Product_Id__c', 'Latitude');
  app.set('Mirror__c', application.sourceOfBusiness);
  app.set('Channel__c', '3rd Party Application');
  app.set('Business_Source__c', 'INTERNET APPLICATION');
  //app.set('Branch__c', 'a0A9000000NjWJk');
  app.set('X3rd_Party_Quoted_Risk_Grade__c', application.secondaryCreditRating);
  app.set('X3rd_Party_Quoted_Rate__c', application.interestRate);
  app.set('X3rd_Party_Application_Source__c', 'INTERNET APPLICATION');
  app.set('X3rd_Party_Application_Number__c', 'A0084'); //application.applicationNumber
  app.set('Loan_Term_Months__c', application.term);
  app.set('Payment_Frequency__c', application.paymentFrequency);
  app.set('Loan_Term_Months__c', application.term);
  app.set('Total_Loan_Amount__c', application.originalAmountRequested);
  app.set('Application_Source__c', 'INTERNET');
  //app.set('Brand_Lookup__c', 'Latitude');

  app.set('Brand_String__c', 'Latitude');
  app.set('Type_of_Product__c', 'Personal Loan');
  console.log('createApplication Operation :(sourceOfBusiness) ===============', application.sourceOfBusiness);
  console.log('createApplication Operation :(application.secondaryCreditRating) ===============', application.secondaryCreditRating);
  return app;
};


createLoanPurpose = (application, salesforceID) => {
  console.log(' Inside createLoanPurpose Object  :', salesforceID);
  loanPurpose = nforce.createSObject('Loan_Purpose__c');

  var loanType = {
    "Buy or refinance a vehicle": "Car Purchase",
    "Pay off credit cards or loans": "Debt consolidation",
    "Education Expenses": "Educational expenses",
    "Holiday": "Travel/Holiday",
    "Wedding": "Other",
    "Retail Finance": "Other",
    "Major Purchase": "Other"
  };

  var loanDesc = {
    "Wedding": "Wedding",
    "Retail Finance": "Retail Finance",
  };

  loanPurpose.set('Loan_Amount__c', application.originalAmountRequested); //application.originalAmountRequested

  if (loanType[application.loanType]) {
    loanPurpose.set('Value__c', loanType[application.loanType]);
  } else {
    loanPurpose.set('Value__c', 'Other');
  }

  loanPurpose.set('Other_Loan_Purpose__c', loanDesc[application.loanDescription]);
  if (application.loanType === 'Other') {
    loanPurpose.set('Other_Loan_Purpose__c', truncate(application.loanDescription, 20));
  }
  console.log(" salesforceID  :::", salesforceID);
  loanPurpose.set('Application__c', salesforceID); //application.applicationNumber
  console.log('createLoanPurpose Operation :(LOAN AMOUNT ) ===============', application.originalAmountRequested);
  console.log('createLoanPurpose Operation :(LOAN TYPE ) ===============', application.loanType);
  console.log('createLoanPurpose Operation :(LOAN DESC ) ===============', application.loanDescription);
  return loanPurpose;
};

/* Transformation for Applicant Data */
createApplicant = (application, salesforceID) => {
  console.log(' Inside createApplicant Object  :');
  applicant = nforce.createSObject('Applicant__c');

  //if there is no security set asset_exempt__c = true // TO DO LATER

  applicant.set('Meets_Eligibility_Criteria__c', true);
  applicant.set('Agrees_to_Fees__c', true);
  applicant.set('Agrees_to_Privacy_Policy__c', true);
  applicant.set('EIDV__c', application.optionalDisclaimer1);
  var titleDesc = {
    "Sir": "Mr",
    "Prof.": "Mr",
  };

  if (titleDesc[application.customerRelationships[0].title]) {
    applicant.set('Title__c', titleDesc[application.customerRelationships[0].title]);
  } else {
    applicant.set('Title__c', application.customerRelationships[0].title);
  }

  applicant.set('first_Name__c', truncate(application.customerRelationships[0].firstNames, 15));
  applicant.set('Middle_Name__c', application.customerRelationships[0].middleNames);
  applicant.set('Last_Name__c', truncate(application.customerRelationships[0].surname, 20));
  applicant.set('Gender__c', application.customerRelationships[0].gender);
  //Salesforce text format ("DD-MM-YYYY")
  var dob = dateFormat(application.customerRelationships[0].dateOfBirth, "dd-mm-yyyy");
  console.log(' application date of birth ||||| Before transform  ', application.customerRelationships[0].dateOfBirth);
  console.log(' application date of birth ||||| After  transform  ', dob);
  applicant.set('Rel_Status__c', application.customerRelationships[0].maritalStatus);
  applicant.set('No_of_Deps__c', application.customerRelationships[0].dependents);
  var driverLicense = truncate(application.customerRelationships[0].driversLicense, 10);
  console.log(' application driverLicense ||||| After  trancute  ', driverLicense);
  var driverLicenseFlag = false;
  if (driverLicense) {
    driverLicenseFlag = true;
  }
  applicant.set('Drivers_Lic_No__c', driverLicense);
  applicant.set('Drivers_Lic_Flg__c', driverLicenseFlag);
  applicant.set('Pref_Contact_Method__c', application.customerRelationships[0].preferredContactMethod);
  applicant.set('Mobile__c', application.customerRelationships[0].mobileContact);
  var homePh = application.customerRelationships[0].homePhoneContact;
  var workPh = application.customerRelationships[0].workPhoneContact;
  //homePh = homePh.replace(/-/g, '');
  //workPh = workPh.replace(/-/g, '');
  if (homePh) {
    homePh = homePh.replace(/-/g, '');
    applicant.set('Home__c', homePh);
    console.log(' application homePhoneContact ||||| After  trancute  ', homePh);
  }
  if (workPh) {
    workPh = workPh.replace(/-/g, '');
    applicant.set('Work__c', workPh);
    console.log(' application workPhoneContact ||||| After  trancute  ', workPh);
  }

  var emailAddress = application.customerRelationships[0].emailContact;
  if (emailAddress > 40) {
    emailAddress = '';
  }
  applicant.set('Email_Address__c', emailAddress);

  var stateDesc = {
    "Australian Capital Territory": "ACT",
    "South Australia": "SA",
    "Northern Territory": "NT",
    "Queensland": "QLD",
    "Tasmania": "TAS",
    "New South Wales": "NSW",
    "Victoria": "VIC",
    "Western Australia": "WA",
  };

  var noOfAddress = application.customerRelationships[0].addresses;
  var postalAddressFlag = false;
  applicant.set('Postal_Addr_Flg__c', postalAddressFlag);

  if (noOfAddress) {
    noOfAddress.forEach(function (address) {
      var addressTypeInfo = address.addressType;
      console.log(" ADDRESS INFO ", addressTypeInfo);
      if (addressTypeInfo == 'CurrentAddress') {
        console.info('Current address type');
        applicant.set('Unit_No_Res__c', address.flatUnitNumber);
        applicant.set('Street_No_Res__c', address.streetNumber);
        applicant.set('Street_Res__c', address.streetName);
        applicant.set('Street_Type_Res__c', address.streetType);
        applicant.set('Suburb_Res__c', address.suburb);
        applicant.set('Postcode_Res__c', address.postCode);
        applicant.set('Country_Res__c', 'Australia');
        applicant.set('State_Res__c', stateDesc[address.state]);
        applicant.set('Years_At_Addr__c', address.years);
        applicant.set('Months_At_Addr__c', address.months);

      } else if (addressTypeInfo == 'MailingAddress') {
        console.info('MailingAddress  type');
        postalAddressFlag = 'TRUE';
        applicant.set('Postal_Addr_Flg__c', postalAddressFlag);
        applicant.set('Unit_No_Pos__c', address.flatUnitNumber);
        applicant.set('Street_No_Pos__c', address.streetNumber);
        applicant.set('Street_Pos__c', address.streetName);
        applicant.set('Street_Type_Pos__c', address.streetType);
        applicant.set('Suburb_Pos__c', address.suburb);
        applicant.set('Postcode_Pos__c', address.postCode);
        applicant.set('Country_Pos__c', 'Australia');
        applicant.set('State_Pos__c', stateDesc[address.state]);
        applicant.set('PO_Box__c', false);
      } else if (addressTypeInfo == 'PreviousAddress') {
        console.info('PreviousAddress  type');
        applicant.set('Unit_No_Pre__c', address.flatUnitNumber);
        applicant.set('Street_No_Pre__c', address.streetNumber);
        applicant.set('Street_Pre__c', address.streetName);
        applicant.set('Street_Type_Pre__c', address.streetType);
        applicant.set('Suburb_Pre__c', address.suburb);
        applicant.set('Postcode_Pre__c', address.postCode);
        applicant.set('Country_Pre__c', 'Australia');
        applicant.set('State_Pre__c', stateDesc[address.state]);
        applicant.set('Years_At_Prev_Addr__c', address.years);
        applicant.set('Months_At_Prev_Addr__c', address.months);
      }
    }, this);

  }
  var primaryEmploymentStatus = {
    "Full Time": "Permanent (work over 20 hours per week)",
    "Part Time": "Permanent or Part Time (work less than 20 hours per week)",
    "Casual": "Casual / Temporary / Seasonal",
    "Seasonal": "Casual / Temporary / Seasonal",
    "Contract": "Contractor",
    "Self Employed": "Self Employed",
    "Pension/Government benefits": "Other Pension",
    "Unemployed": "Unemployed",
  };

  var noOfemployment = application.customerRelationships[0].employment;
  var employmentType = application.customerRelationships[0].employmentType;

  if (noOfemployment) {
    noOfemployment.forEach(function (employment) {
      var employmentTypeInfo = employment.employmentType;
      if (employmentTypeInfo == 'CurrentEmployment') {
        applicant.set('Primary_Employment_Status__c', primaryEmploymentStatus[application.customerRelationships[0].employmentStatus]);
      }
      if (employmentTypeInfo == 'PreviousEmployment') {
        applicant.set('Previous_Employment_Status__c', primaryEmploymentStatus[application.customerRelationships[0].employmentStatus]);
        applicant.set('Time_at_previous_employer_years__c', application.customerRelationships[0].employment.employmentYears);
        applicant.set('Time_at_previous_employer_months__c', application.customerRelationships[0].employment.employmentMonths);
      }

    }, this);
  }

  var residentialStatus = {
    "Renting": "Renting",
    "Living With Parents": "Boarding with Parents",
    "Mortgage": "Own a home with a mortgage",
    "Freehold": "Own a home outright",
    "Boarding": "Boarding Other",
  };

  var addressTypeResidence = application.customerRelationships[0].addresses.typeOfResidence;
  if (application.customerRelationships[0].addresses.addressType == 'CurrentAddress') {
    applicant.set('Res_Status__c', residentialStatus[addressTypeResidence]);
  }
  var securities = application.securities
  var debts = application.debts
  if (securities) {
    applicant.set('Asset_Exempt__c', true);
  } else {
    applicant.set('Asset_Exempt__c', false);
  }
  if (debts) {
    applicant.set('Debts_Exempt__c', true);
  } else {
    applicant.set('Debts_Exempt__c', false);
  }

  applicant.set('Is_Primary_Applicant__c', true);
  applicant.set('Accept_Terms_and_Conditions__c', true);

  var dobWebService = dateFormat(application.customerRelationships[0].dateOfBirth, "yyyy-mm-dd");
  applicant.set('Date_of_Birth_WS__c', dobWebService);
  var homePhoneNo = application.customerRelationships[0].homePhoneContact;
  var homePhoneNoAreaCode = application.customerRelationships[0].homePhoneContact;
  var workPhoneNo = application.customerRelationships[0].workPhoneContact;
  var workPhoneNoAreaCode = application.customerRelationships[0].workPhoneContact;

  if (homePhoneNo) {
    homePhoneNo = homePhoneNo.substring(3, homePhoneNo.length);
    homePhoneNoAreaCode = homePhoneNo.substring(0, 1);
    applicant.set('Home_WS__c', homePhoneNo);
    applicant.set('Home_Area_Code__c', homePhoneNoAreaCode);
  }
  if (workPhoneNo) {
    workPhoneNo = workPhoneNo.substring(3, workPhoneNo.length);
    workPhoneNoAreaCode = workPhoneNo.substring(0, 1);
    applicant.set('Work_WS__c', workPhoneNo);
    applicant.set('Work_Area_Code__c', workPhoneNoAreaCode);
  }

  console.log(' application homePhoneNo |||||  ', homePhoneNo);
  console.log(' application homePhoneNoAreaCode |||||  ', homePhoneNoAreaCode);
  console.log(' application workPhoneNo ||||| After  trancute  ', workPhoneNo);
  console.log(' application workPhoneNoAreaCode ||||| After  trancute  ', workPhoneNoAreaCode);
  console.log(' salesoforce id in applicant block ', salesforceID);
  applicant.set('Application__c', salesforceID);

  return applicant;

}

/* Create Primary Income Object */
createIncome = (application, salesforceApplicantID) => {
  //  app.Loan_Term_Months__c = application.field;
  var income = '';
  console.log('Inside createIncome Object  :', salesforceApplicantID)
  income = nforce.createSObject('Income__c');
  var incomeSourceList = {
    "Full Time": "My permanent - full time job",
    "Part time": "My permanent - part time job",
    "Casual": "My casual/temporary job",
    "Contract": "My contracting job",
    "Seasonal": "My seasonal job",
    "Self-employed": "My self-employed business",
    "Pension/govt": "My pension",
  };

  var incomeFrequency = {
    "Weekly": "Week",
    "Fortnightly": "My permanent - part time job",
    "Monthly": "Month",
    "Yearly": "Year",
  };
  var employmentType = application.customerRelationships[0].employment[0].employmentType;
  var incomeSource = incomeSourceList[application.customerRelationships[0].employment[0].employmentStatus];
  var incomeFrequency = incomeFrequency[application.customerRelationships[0].incomeFrequency];
  var incomeAmount = application.customerRelationships[0].annualIncomeAfterTax;//"10000.00"; 
  if (application.customerRelationships[0].incomeFrequency == 'Monthly') {
    incomeAmount = incomeAmount / 12;
  } else if (application.customerRelationships[0].incomeFrequency == 'Fortnightly') {
    incomeAmount = incomeAmount / 26;
  } else if (application.customerRelationships[0].incomeFrequency == 'Weekly') {
    incomeAmount = incomeAmount / 52;
  }
  console.log(' Employment Type ||||| ', employmentType);
  console.log(' Income Source ||||| ', incomeSource);
  console.log(' Income incomeAmount ||||| ', incomeAmount);
  if (employmentType == 'CurrentEmployment') {
    income.set('Income_Source__c', incomeSource);
    income.set('Income_Interval__c', incomeFrequency);
    income.set('Income_Amount__c', incomeAmount);
    income.set('Emp_Bus_Name__c', application.customerRelationships[0].employment[0].employerName);
    income.set('Emp_Bus_Contact_No__c', application.customerRelationships[0].employment[0].employerPhone);
    income.set('Years_With_Employer__c', application.customerRelationships[0].employment[0].employmentYears);
    income.set('Months_With_Employer__c', application.customerRelationships[0].employment[0].employmentMonths);
    income.set('Occupation__c', application.customerRelationships[0].industry);
    income.set('Employer_Business_Contact_No_Area_Code__c', application.customerRelationships[0].employment[0].employerPhone);
    income.set('Employer_Business_Contact_No_WS__c', application.customerRelationships[0].employment[0].employerPhone);
  }
  income.set('Applicant__c', salesforceApplicantID);
  return income;
};

/* Create Primary Income Object */
createOtherIncome = (application, salesforceID) => {
  var otherIncome = [];
  console.log('Inside Other createIncome Object  :', salesforceID)
  otherIncome = nforce.createSObject('Income__c');
  var incomeSourceList = {
    "Full Time": "My permanent - full time job",
    "Part time": "My permanent - part time job",
    "casual": "My casual/temporary job",
    "contract": "My contracting job",
    "seasonal": "My seasonal job",
    "self-employed": "My self-employed business",
    "pension/govt": "My pension",
  };
  var incomeFrequency = {
    "Weekly": "Week",
    "Fortnightly": "My permanent - part time job",
    "Monthly": "Month",
    "Yearly": "Year",
  };

  if (application.otherIncome) {
    application.otherIncome.forEach(function (otherIncome) {
      var otherIncomeData = "";
      otherIncomeData.set('Emp_Bus_Name__c', application.customerRelationships[0].otherIncome[0].employerName);
      otherIncomeData.set('Emp_Bus_Contact_No__c', application.customerRelationships[0].otherIncome[0].employerPhone);
      otherIncomeData.set('Years_With_Employer__c', application.customerRelationships[0].otherIncome[0].employmentYears);
      otherIncomeData.set('Months_With_Employer__c', application.customerRelationships[0].otherIncome[0].employmentMonths);
      otherIncomeData.set('Occupation__c', application.customerRelationships[0].otherIncome[0].industry);
      otherIncomeData.set('Application__c', salesforceID);
      otherIncome.push(otherIncomeData);
    }, this);
  }
  return otherIncome;
};

/* Populated Expense field mapping */
createExpense = (application, salesforceApplicantID) => {
  var sfExpense = nforce.createSObject('Expense__c');
  console.log(' Inside createExpense Object  :', salesforceApplicantID);
  var expenseDetails = application.expenses;
  if (application.expenses) {
    //application.expenses.forEach(function (expenseObject) {
    var homeTotal = expenseDetails.homeTotal;
    var largeBillsAndRecurringExpense = expenseDetails.largeBillsAndRecurringExpense;
    var totalLiveingExpense = homeTotal + largeBillsAndRecurringExpense;
    sfExpense.set('Living_Exp__c', totalLiveingExpense);
    sfExpense.set('Living_Exp_Int__c', 'Month');
    sfExpense.set('Rent_Board_Pay_Amt__c', expenseDetails.homeMortgageOrRent);
    var addressTypeInfo = application.customerRelationships[0].addresses[0].addressType;
    if (addressTypeInfo == 'CurrentAddress') {
      sfExpense.set('Agent_Landlord_Name__c', application.customerRelationships[0].addresses[0].agentLandlord);
    }
    sfExpense.set('I_Pay_All_Exp__c', expenseDetails.isPayAllExpense);
    sfExpense.set('Applicant__c', salesforceApplicantID);
    //expenses.push(sfExpense);
    // });//, this);
  }
  return sfExpense;
};

/* Populated Asset field mapping */
createAsset = (application, salesforceApplicantID) => {
  var assets = [];
  var assetExempt = true;
  console.log(' Inside createAsset Object | salesforceApplicantID :', salesforceApplicantID);
  var securityArray = application.securities;
  if (application.securities) {
    assetExempt = false;
    application.securities.forEach(function (assetObject) {
      //  if (assetObject.assetCategory) {
      //var assetData = "";
      var sfAsset = nforce.createSObject('Asset__c');
      console.log('ASSET CATEGORY ========================', assetObject.assetCategory);
      console.log('ASSET CATEGORY ========================', assetObject.vehicleMake);
      console.log('ASSET CATEGORY ========================', assetObject.vehicleModel);
      console.log('ASSET CATEGORY ========================', assetObject.vehicleYear);
      sfAsset.set('Asset_Category__c', assetObject.assetCategory);
      sfAsset.set('Vehicle_Make__c', assetObject.vehicleMake);
      sfAsset.set('Vehicle_Model__c', assetObject.vehicleModel);
      sfAsset.set('Vehicle_Year__c', assetObject.vehicleYear);
      sfAsset.set('Ownership_Status__c', assetObject.assetOwnership);
      sfAsset.set('Total_Assets__c', '1');
      sfAsset.set('Applicant__c', salesforceApplicantID);
      assets.push(sfAsset);
      //}
    });
  }
  return assets;
};

/* Populated Debts field mapping */
createLiability = (application, salesforceApplicantID) => {
  var liabilities = [];
  console.log(' Inside createAsset Object | salesforceApplicantID :', salesforceApplicantID);
  var debtArray = application.debt;
  if (application.debt) {
    application.debt.forEach(function (debtObject) {
      var sfDebt = nforce.createSObject('Liability__c');
      //if (security.debt) {
      sfDebt.set('Debt_Category__c', debtObject.debtType);
      sfDebt.set('Financier_Name__c', debtObject.financialInstitution);
      if (debtObject.debtType == 'Store Card' || debtObject.debtType == 'Credit Card' || debtObject.debtType == 'Overdraft') {
        sfDebt.set('Card_Overdraft_Bal_Amt__c', debtObject.outstandingBalance);
        sfDebt.set('Credit_Limit_Amt__c', debtObject.withALimitOf);
      }
      if (debtObject.debtType == 'Overdraft') {
        sfDebt.set('Overdraft_APR__c', debtObject.overdraftInterest);
      }
      if (debtObject.debtType == 'Mortgage') {
        sfDebt.set('Mortgage_Bal_Amt__c', debtObject.outstandingBalance);
        sfDebt.set('Mortgage_Borrowed_Amt__c', debtObject.amountOriginallyBorrowed);
        sfDebt.set('Mortgage_Repayment_Amt__c', debtObject.monthlyRepaymentAmoun);
        sfDebt.set('Mortgage_Repayment_Interval__c', '');
      }
      if (debtObject.debtType == 'Personal Loan' || debtObject.debtType == 'Car Loan' || debtObject.debtType == 'Hire purchase') {
        sfDebt.set('Car_Personal_Bal_Amt__c', debtObject.outstandingBalance);
        sfDebt.set('Car_Personal_Borrowed_Amt__c', debtObject.amountOriginallyBorrowed);
        sfDebt.set('Car_Personal_Repay_Amt__c', debtObject.monthlyRepaymentAmount);
        sfDebt.set('Car_Personal_Repay_Int__c', '');
      }
      if (debtObject.debtType == 'Other') {
        sfDebt.set('Other_Borrowed_Amt__c', debtObject.amountOriginallyBorrowed);
        sfDebt.set('Other_Repay_Amt__c', debtObject.onthlyRepaymentAmount);
        sfDebt.set('Other_Repay_Int__c', '');
      }
      sfDebt.set('Acknowledge_Payout__c', debtObject.isConsolidateDebt);
      sfDebt.set('Applicant__c', salesforceApplicantID);
      //sfDebt.set('Type_of_Credit_Card__c', debt.debtType);
      //sfDebt.set('Car_Personal_Borrowed_Amt__c', debt.debtType);
      //sfDebt.set('Acknowledge_Payout__c', debt.debtType);
      // sfDebt.set('Acknowledge_Payout__c', debt.debtType);
      liabilities.push(sfDebt);
      // }
    });
  };
  return liabilities;
};


function insertDebtData(application, oauth, salesforceApplicantID) {
  //add Debt
  debt = createLiability(application, salesforceApplicantID);
  if (debt) {
    // salesforceID = resp.id;
    debt.forEach(function (debtRecord) {
      org.insert({ sobject: debtRecord, oauth: oauth }, function (err, resp) {
        if (!err) console.log('It worked !! Liability__c');
        if (err) {
          debtStatusFlag = false;
          console.log('ERROR MESSAGE :Liability__c', err);

        }
      });
    });
  }

}

function insertExpensetData(application, oauth, salesforceApplicantID) {
  //add expenses
  expense = createExpense(application, salesforceApplicantID);
  if (expense) {
    org.insert({ sobject: expense, oauth: oauth }, function (err, resp) {
      if (!err) console.log('It worked !! Expense__c');
      if (err) {
        expenseStatusFlag = false;
        console.log('ERROR MESSAGE :Expense__c', err);
      }
    });

  }

}

function insertAssetData(application, oauth, salesforceApplicantID) {
  //add asset
  asset = createAsset(application, salesforceApplicantID);
  if (asset) {
    // salesforceID = resp.id;
    asset.forEach(function (assetRecord) {
      org.insert({ sobject: assetRecord, oauth: oauth }, function (err, resp) {
        if (!err) console.log('It worked !! Asset__c');
        if (err) {
          assetStatusFlag = false;
          console.log('ERROR MESSAGE :Asset__c', err);
        }
      });
    });
  }

}

function insertIncomeData(application, oauth, salesforceApplicantID) {
  //add primary Income 
  income = createIncome(application, salesforceApplicantID);
  org.insert({ sobject: income, oauth: oauth }, function (err, resp) {
    if (!err) console.log('It worked !! Income__c');
    if (err) {
      incomeStatusFlag = false;
      console.log('ERROR MESSAGE :Income__c', err);
    }
  });
}

function populateStatus(application, oauth, salesforceApplicantID) {
  var applicationSubmitStatus = {};
  //otherIncomeStatusFlag incomeStatusFlag
  console.log('applicationStatusFlag', applicationStatusFlag);
  console.log('applicantStatusFlag', applicantStatusFlag);
  console.log('loanPurposeFlag', loanPurposeFlag);
  console.log('incomeStatusFlag', incomeStatusFlag);
  console.log('assetStatusFlag', assetStatusFlag);
  console.log('debtStatusFlag', debtStatusFlag);
  console.log('expenseStatusFlag', expenseStatusFlag);
  applicationSubmitStatus = nforce.createSObject('X3rd_Party_Application_Status_Log__c');
  applicationSubmitStatus.set('X3rd_Party_Application_Number__c', 'A0084');
  if (applicationStatusFlag && applicantStatusFlag && loanPurposeFlag && incomeStatusFlag && assetStatusFlag && debtStatusFlag && expenseStatusFlag) {
    applicationSubmitStatus.set('Status__c', 'IN000');
    applicationSubmitStatus.set('Status_Message__c', 'S1 Application data insertion completed');
  } else {
    applicationSubmitStatus.set('Status__c', 'IN001');
    applicationSubmitStatus.set('Status_Message__c', 'Data Insertion Failed');
  }
  org.insert({ sobject: applicationSubmitStatus, oauth: oauth }, function (err, resp) {
    if (!err) console.log('It worked !! X3rd_Party_Application_Status_Log__c');
    if (err) {
      //incomeStatusFlag = false;
      console.log('ERROR MESSAGE :X3rd_Party_Application_Status_Log__c', err);
    }
  });

}

exports.saveApplication = (application) => {
  //populateData(application);


  var salesforceID = '';
  var salesforceApplicantID = "";
  org.authenticate({ username: username, password: password }, function (err, resp) {
    // store the oauth object for this user 
    if (!err) oauth = resp;
    console.log('OAuth ', oauth);
    console.log('Access Token: ' + oauth.access_token);
    console.log("User ID: " + oauth.id);
    console.log('Instance URL', oauth.instance_url);
    app = createApplication(application);
    org.insert({ sobject: app, oauth: oauth }, function (err, resp) {
      if (!err) {
        //add loan purpose
        console.log('It worked !! Application__c', resp);
        salesforceID = resp.id;
        applicant = createApplicant(application, salesforceID);
        org.insert({ sobject: applicant, oauth: oauth }, function (err, resp) {
          console.log(resp);
          if (!err) {
            console.log('It worked !! Applicant__c');
            salesforceApplicantID = resp.id;
            console.log('It worked !! salesforceApplicantID ', salesforceApplicantID);
            insertAssetData(application, oauth, salesforceApplicantID);
            insertDebtData(application, oauth, salesforceApplicantID);
            insertExpensetData(application, oauth, salesforceApplicantID);
            insertIncomeData(application, oauth, salesforceApplicantID);
            //insertOtherIncomeData(application, oauth, salesforceApplicantID);
            populateStatus(application, oauth, salesforceApplicantID);
          }//
          if (err) {
            applicantStatusFlag = false;
            console.log('ERROR MESSAGE :Applicant__c ', err);
          }

        });


        loanPurpose = createLoanPurpose(application, salesforceID);
        org.insert({ sobject: loanPurpose, oauth: oauth }, function (err, resp) {
          if (!err) {
            console.log('It worked !! Loan_Purpose__c', resp);
          }
          if (err) {
            loanPurposeFlag = false;
            console.log('ERROR MESSAGE :Loan_Purpose__c ', err);
          }

        });

        //insertExpensetData(application, oauth, salesforceApplicantID);



      }
      if (err) {
        applicationStatusFlag = false;
        console.log('ERROR MESSAGE ', err);
      }

    });

  });


}
