
var nforce = require('nforce');
var truncate = require('truncate');
var dateFormat = require('dateformat');
var username = 'sumanta.nandi@latitudefinancial.com.orignzdev';
var password = 'S1%ummer';

var app = {};
var applicant = {};
var loanPurpose = {};
var expense = {};
var income = {};
var asset = {};
var liability = {};
var salesforceID = '';


var org = nforce.createConnection({
  loginUrl: 'https://test.salesforce.com',
  clientId: '3MVG9e2mBbZnmM6mLrDnSD4j.5b6bnq8K5G23FZd2oInijBAq0BPLqG12TCnY_1Ojy5byC7R.4LF9s4jdcUXv',
  clientSecret: '6026559847746387689',
  redirectUri: 'http://localhost:3000/oauth/_callback',
  apiVersion: 'v35.0',  // optional, defaults to current salesforce API version 
  environment: 'sandbox',  // optional, salesforce 'sandbox' or 'production', production default 
  mode: 'multi' // optional, 'single' or 'multi' user mode, multi default 
});


createApplication = (application) => {
  console.log(' Inside createApplication Object  :');
  app = nforce.createSObject('Application__c');

  app.set('Loan_Term_Months__c', application.term);
  //Loan Term
  var loanTerm = {
    "24": "2 years",
    "36": "3 years",
    "60": "5 years",
  };

  app.set('Loan_Term__c', loanTerm[application.term]);
  app.set('Application_Type__c', 'Single');
  app.set('Higher_Approval_Consent__c', application.optionalDisclaimer2);
  app.set('Product_Id__c', 'Latitude');
  app.set('Mirror__c', application.sourceOfBusiness);
  app.set('Business_Source__c', 'INTERNET APPLICATION');
  //app.set('Branch__c', 'a0A9000000NjWJk');
  app.set('X3rd_Party_Quoted_Risk_Grade__c', application.secondaryCreditRating);
  app.set('X3rd_Party_Quoted_Rate__c', application.interestRate);
  app.set('X3rd_Party_Application_Number__c', 'A0022'); //application.applicationNumber
  app.set('Loan_Term_Months__c', application.term);
  app.set('Payment_Frequency__c', application.paymentFrequency);
  app.set('Loan_Term_Months__c', application.term);
  app.set('Total_Loan_Amount__c', application.originalAmountRequested);
  app.set('Application_Source__c', 'INTERNET');
  app.set('Brand_String__c', 'Latitude');
  app.set('Brand_String__c', 'Latitude');
  app.set('Type_of_Product__c', 'Personal Loan');


  console.log('createApplication Operation :(sourceOfBusiness) ===============', application.sourceOfBusiness);
  console.log('createApplication Operation :(application.secondaryCreditRating) ===============', application.secondaryCreditRating);
  /*  application.arrObj.forEach(function(element) {
        
    }, this);
    app.amortisationSchedule = [];*/
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
  if (application.loanDescription === 'Other') {
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
createApplicant = (application) => {
  console.log(' Inside createApplicant Object  :');
  applicant = nforce.createSObject('Applicant__c');

  applicant.set('Meets_Eligibilty_Criteria__c', 'TRUE');
  applicant.set('Agrees_to_Fees__c', 'TRUE');
  applicant.set('Agrees_to_Privacy_Policy__c', 'TRUE');
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
  var dob = dateFormat(application.customerRelationships[0].dateOfBirth, "DD-MM-YYYY");
  console.log(' application date of birth ||||| Before transform  ', application.customerRelationships[0].dateOfBirth);
  console.log(' application date of birth ||||| After  transform  ', dob);
  applicant.set('Rel_Status__c', application.customerRelationships[0].maritalStatus);
  applicant.set('No_of_Deps__c', application.customerRelationships[0].dependents);
  var driverLicense = truncate(application.customerRelationships[0].driversLicense, 10);
  console.log(' application driverLicense ||||| After  trancute  ', driverLicense);
  var driverLicenseFlag = 'FALSE';
  if (driverLicense) {
    driverLicenseFlag = 'TRUE'
  }
  applicant.set('Drivers_Lic_No__c', driverLicense);
  applicant.set('Drivers_Lic_Flg__c', driverLicenseFlag);
  applicant.set('Pref_Contact_Method__c', application.customerRelationships[0].preferredContactMethod);
  applicant.set('Mobile__c', application.customerRelationships[0].mobileContact);
  applicant.set('Home__c', application.customerRelationships[0].homePhoneContact);
  applicant.set('Work__c', application.customerRelationships[0].workPhoneContact);
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
  var postalAddressFlag = 'FALSE';
  applicant.set('Postal_Addr_Flg__c', postalAddressFlag);

  if (noOfAddress) {
    noOfAddress.forEach(function (address) {
      var addressTypeInfo = address.addressType;
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
        applicant.set('PO_Box__c', 'FALSE');
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

  var employmentStatus = application.customerRelationships[0].employment;
  if (employmentStatus) {
    employmentStatus.forEach(function (employmentStatus) {

    }, this);
  }

  var primaryEmploymentStatus = {
    "Full Time": "Permanent (work over 20 hours per week)",
    "Part Time": "Permanent or Part Time (work less than 20 hours per week)",
    "Casual": "Casual / Temporary / Seasonal",
    "Contract": "Contractor",
    "Self Employed": "Self Employed",
    "Pension/Government benefits": "Other Pension",
    "Unemployed": "Unemployed",
  };


  var employmentType = application.customerRelationships[0].employmentType;
  if (employmentType == 'CurrentEmployment') {
    applicant.set('Primary_Employment_Status__c', primaryEmploymentStatus[application.customerRelationships[0].employmentStatus]);
  }

  applicant.set('Previous_Employment_Status__c', 'Single');
  applicant.set('Time_at_previous_employer_years__c', 'Single');
  applicant.set('Time_at_previous_employer_months__c', 'Single');
  applicant.set('Res_Status__c', 'Single');
  applicant.set('Asset_Exempt__c', 'Single');
  applicant.set('Debts_Exempt__c', 'Single');
  applicant.set('Is_Primary_Applicant__c', 'Single');
  applicant.set('Accept_Terms_and_Conditions__c', 'Single');
  applicant.set('Date_of_Birth_WS__c', 'Single');
  applicant.set('Work_WS__c', 'Single');
  applicant.set('Home_WS__c', 'Single');
  applicant.set('Work_Area_Code__c', 'Single');
  applicant.set('Home_Area_Code__c', 'Single');

  return applicant;

}

createIncome = (application) => {
  //  app.Loan_Term_Months__c = application.field;

  return app;
};

/* Populated Expense field mapping */
createExpense = (application, salesforceID) => {
  var expense = [];
  console.log(' Inside createExpense Object  :', salesforceID);
  expense = nforce.createSObject('Expense__c');
  if (application.expenses) {
    application.expenses.forEach(function (expense) {
      var expenseData = "";
      var homeTotal = application.expenses.homeTotal;
      var largeBillsAndRecurringExpense = application.expenses.largeBillsAndRecurringExpense;
      var totalLiveingExpense = homeTotal + largeBillsAndRecurringExpense;
      expenseData.set('Living_Exp__c', totalLiveingExpense);
      expenseData.set('Living_Exp_Int__c', 'Month');
      expenseData.set('Rent_Board_Pay_Amt__c', application.expenses.homeMortgageOrRent);
      var addressTypeInfo = application.customerRelationships[0].addresses[0].addressType;
      if (addressTypeInfo == 'CurrentAddress') {
        expenseData.set('Agent_Landlord_Name__c', application.customerRelationships[0].addresses[0].agentLandlord);
      }
      expenseData.set('I_Pay_All_Exp__c', application.expenses.isPayAllExpense);
      expenseData.set('Application__c', salesforceID);
      expense.push(expenseData);
    }, this);
  }
  return expense;
};

/* Populated Asset field mapping */
createAsset = (application, salesforceID) => {
  var asset = [];
  var assetExempt = 'TRUE';
  console.log(' Inside createAsset Object  :', salesforceID);
  expense = nforce.createSObject('Asset__c');
  if (application.securities) {
    assetExempt = 'FALSE';
    application.securities.forEach(function (security) {
      if (security.assetCategory) {
        var assetData = "";
        assetData.set('Asset_Exempt__c', assetExempt);
        assetData.set('Asset_Category__c', application.securities.assetCategory);
        assetData.set('Vehicle_Make__c', application.securities.vehicleMake);
        assetData.set('Vehicle_Model__c', application.securities.vehicleModel);
        assetData.set('Vehicle_Year__c', application.securities.vehicleYear);
        assetData.set('Ownership_Status__c', application.securities.assetOwnership);
        assetData.set('Total_Assets__c', '1');
        assetData.set('Application__c', salesforceID);
        asset.push(assetData);
      }
    }, this);
  }
  return asset;
};

/* Populated Debts field mapping */
createLiability = (application) => {
  var liabilities = [];
  console.log(' Inside createLiability Object  :', salesforceID);
  expense = nforce.createSObject('Liability__c');
  if (application.securities) {
    application.securities.forEach(function (security) {
      if (security.debt) {
        security.debt.forEach(function (debt) {
          var liability = "";
          liability.set('Debt_Category__c', debt.debtType);
          liability.set('Financier_Name__c', debt.financialInstitution);
          liability.set('Card_Overdraft_Bal_Amt__c', debt.outstandingBalance);
          liability.set('Mortgage_Bal_Amt__c', debt.outstandingBalance);
          liability.set('Mortgage_Borrowed_Amt__c', debt.amountOriginallyBorrowed);
          liability.set('Mortgage_Repayment_Amt__c', debt.monthlyRepaymentAmoun);
          liability.set('Mortgage_Repayment_Interval__c', debt.debtType);
          liability.set('Car_Personal_Bal_Amt__c', debt.outstandingBalance);
          liability.set('Car_Personal_Borrowed_Amt__c', debt.amountOriginallyBorrowed);
          liability.set('Car_Personal_Repay_Amt__c', debt.monthlyRepaymentAmount);
          liability.set('Other_Borrowed_Amt__c', amountOriginallyBorrowed);
          liability.set('Other_Repay_Amt__c', debt.debtType);
          liability.set('Other_Repay_Int__c', debt.debtType);
          liability.set('Credit_Limit_Amt__c', debt.withALimitOf);
          liability.set('Overdraft_APR__c', debt.overdraftInterest);
          liability.set('Acknowledge_Payout__c', debt.isConsolidateDebt);
          liability.set('Type_of_Credit_Card__c', debt.debtType);
          liability.set('Car_Personal_Borrowed_Amt__c', debt.debtType);
          liability.set('Acknowledge_Payout__c', debt.debtType);
          liability.set('Acknowledge_Payout__c', debt.debtType);
          liabilities.push(liability);
        }, this);
      }
    }, this);
  };
  /*  application.debt.forEach(function(element) {
        app.Loan_Term_Months__c = application.debt;
    }, this);*/
  return liabilities;
};

exports.saveApplication = (application) => {
  //populateData(application);
  var oauth;
  var applicationStatusFlag = true;
  var loanPurposeFlag = true;
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
        console.log('It worked !! Application__c', resp);
        salesforceID = resp.id;
        loanPurpose = createLoanPurpose(application, salesforceID);
        org.insert({ sobject: loanPurpose, oauth: oauth }, function (err, resp) {
          if (!err) console.log('It worked !! Loan_Purpose__c');
          if (err) {
            loanPurposeFlag = false;
            console.log('ERROR MESSAGE :Loan_Purpose__c ', err);
          }

        });
      }

      if (err) {
        applicationStatusFlag = false;
        console.log('ERROR MESSAGE ', err);
      }

    });

    // Insert into Loan Purpose SObject 
    /*loanPurpose = createLoanPurpose(application);
    org.upsert({ sobject: loanPurpose, oauth: oauth }, function (err, resp) {
      if (!err) console.log('It worked !! Loan_Purpose__c');
      if (err) {
        loanPurposeFlag = false;
        console.log('ERROR MESSAGE :Loan_Purpose__c ', err);
      }
 
    });*/


  });


}
