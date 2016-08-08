<<<<<<< HEAD
var Sequelize = require('sequelize');
var pg = require('pg');
pg.defaults.ssl = true;
var sequelize = new Sequelize('postgres://tlpxvockugymqf:J87lrFHL63Hbjx9RIrc_8p56O-@ec2-107-22-238-96.compute-1.amazonaws.com:5432/d8ca71bptq826m');

/* Define application__c Data Model */
var Application__c = sequelize.define('Application__c', {
    Loan_Term_Months__c: {
        type: Sequelize.STRING,
        field: 'Loan_Term_Months__c',
    },
    Loan_Term__c: {
        type: Sequelize.STRING,
        field: 'Loan_Term__c',
    },
    Payment_Frequency__c: {
        type: Sequelize.STRING,
        field: 'Payment_Frequency__c',
    },
    Total_Loan_Amount__c: {
        type: Sequelize.STRING,
        field: 'Total_Loan_Amount__c',
    },
    Application_Type__c: {
        type: Sequelize.STRING,
        field: 'Application_Type__c',
    },
    Channel__c: {
        type: Sequelize.STRING,
        field: 'Channel__c',
    },
    Application_Source__c: {
        type: Sequelize.STRING,
        field: 'Application_Source__c',
    },
    Higher_Approval_Consent__c: {
        type: Sequelize.STRING,
        field: 'Higher_Approval_Consent__c',
    },
    Mirror__c: {
        type: Sequelize.STRING,
        field: 'Mirror__c',
    },
    Branch__c: {
        type: Sequelize.STRING,
        field: 'Branch__c',
    },
    Business_Source__c: {
        type: Sequelize.STRING,
        field: 'Business_Source__c',
    },
    X3rd_Party_Application_Number__c: {
        type: Sequelize.STRING,
        field: 'X3rd_Party_Application_Number__c',
    },
    X3rd_Party_Quoted_Risk_Grade__c: {
        type: Sequelize.STRING,
        field: 'X3rd_Party_Quoted_Risk_Grade__c',
    },
    X3rd_Party_Quoted_Rate__c: {
        type: Sequelize.STRING,
        field: 'X3rd_Party_Quoted_Rate__c',
    },
    Brand_Lookup__c: {
        type: Sequelize.STRING,
        field: 'Brand_Lookup__c',
    },
    Brand_String__c: {
        type: Sequelize.STRING,
        field: 'Brand_String__c',
    },
    Type_of_Product__c: {
        type: Sequelize.STRING,
        field: 'Type_of_Product__c',
    },
    Product_Id__c: {
        type: Sequelize.STRING,
        field: 'Product_Id__c',
    },
    Response_Code__c: {
        type: Sequelize.STRING,
        field: 'Response_Code__c',
    },
    name: {
        type: Sequelize.STRING,
        field: 'name',
    }
}, {
        freezeTableName: true,
        schema: 'salesforce',
        tableName: 'application__c',
        timestamps: false,
    });

/* Define Applicant__c Data Model */
var Applicant__c = sequelize.define('Applicant__c', {
    Is_Primary_Applicant__c: {
        type: Sequelize.STRING,
        field: 'Is_Primary_Applicant__c',
    },
    Interested_in_other_services__c: {
        type: Sequelize.STRING,
        field: 'Interested_in_other_services__c',
    },
    Meets_Eligibility_Criteria__c: {
        type: Sequelize.STRING,
        field: 'Meets_Eligibility_Criteria__c',
    },
    KB_HL_or_Graduate__c: {
        type: Sequelize.STRING,
        field: 'KB_HL_or_Graduate__c',
    },
    Accept_Terms_and_Conditions__c: {
        type: Sequelize.STRING,
        field: 'Accept_Terms_and_Conditions__c',
    },
    EIDV__c: {
        type: Sequelize.STRING,
        field: 'EIDV__c',
    },
    Date_of_Birth__c: {
        type: Sequelize.STRING,
        field: 'Date_of_Birth__c',
    },
    Date_of_Birth_WS__c: {
        type: Sequelize.STRING,
        field: 'Date_of_Birth_WS__c',
    },
    Work_WS__c: {
        type: Sequelize.STRING,
        field: 'Work_WS__c',
    },
    Home_WS__c: {
        type: Sequelize.STRING,
        field: 'Home_WS__c',
    },
    Work_Area_Code__c: {
        type: Sequelize.STRING,
        field: 'Work_Area_Code__c',
    },
    Home_Area_Code__c: {
        type: Sequelize.STRING,
        field: 'Home_Area_Code__c',
    },
    Title__c: {
        type: Sequelize.STRING,
        field: 'Title__c',
    },
    First_Name__c: {
        type: Sequelize.STRING,
        field: 'First_Name__c',
    },
    Gender__c: {
        type: Sequelize.STRING,
        field: 'Gender__c',
    }, Rel_Status__c: {
        type: Sequelize.STRING,
        field: 'Rel_Status__c',
    }, Drivers_Lic_Flg__c: {
        type: Sequelize.STRING,
        field: 'Drivers_Lic_Flg__c',
    }, Pref_Contact_Method__c: {
        type: Sequelize.STRING,
        field: 'Pref_Contact_Method__c',
    }, Mobile__c: {
        type: Sequelize.STRING,
        field: 'Mobile__c',
    }, Home__c: {
        type: Sequelize.STRING,
        field: 'Home__c',
    }, Work__c: {
        type: Sequelize.STRING,
        field: 'Work__c',
    }, Email_Address__c: {
        type: Sequelize.STRING,
        field: 'Email_Address__c',
    }, Unit_No_Res__c: {
        type: Sequelize.STRING,
        field: 'Unit_No_Res__c',
    }, Street_No_Res__c: {
        type: Sequelize.STRING,
        field: 'Street_No_Res__c',
    }, Street_Res__c: {
        type: Sequelize.STRING,
        field: 'Street_Res__c',
    }, Street_Type_Res__c: {
        type: Sequelize.STRING,
        field: 'Street_Type_Res__c',
    }, Suburb_Res__c: {
        type: Sequelize.STRING,
        field: 'Suburb_Res__c',
    }, City_Res__c: {
        type: Sequelize.STRING,
        field: 'City_Res__c',
    }, Postcode_Res__c: {
        type: Sequelize.STRING,
        field: 'Postcode_Res__c',
    }, Country_Res__c: {
        type: Sequelize.STRING,
        field: 'Country_Res__c',
    }, State_Res__c: {
        type: Sequelize.STRING,
        field: 'State_Res__c',
    }, Years_At_Addr__c: {
        type: Sequelize.STRING,
        field: 'Years_At_Addr__c',
    }, Months_At_Addr__c: {
        type: Sequelize.STRING,
        field: 'Months_At_Addr__c',
    }, No_of_Deps__c: {
        type: Sequelize.STRING,
        field: 'No_of_Deps__c',
    }, X3rd_Party_Application_Number__c: {
        type: Sequelize.STRING,
        field: 'X3rd_Party_Application_Number__c',
    }, Application__c__X3rd_Party_Application_Number__c: {
        type: Sequelize.STRING,
        field: 'Application__c__X3rd_Party_Application_Number__c',
    }, name: {
        type: Sequelize.STRING,
        field: 'name',
    }
}, {
        freezeTableName: true,
        schema: 'salesforce',
        tableName: 'applicant__c',
        timestamps: false,

    });



/* Define Loan_Purpose__c Data Model */
var Loan_Purpose__c = sequelize.define('Loan_Purpose__c', {
    Loan_Amount__c: {
        type: Sequelize.STRING,
        field: 'Loan_Amount__c',
    }, Value__c: {
        type: Sequelize.STRING,
        field: 'Value__c',
    }, Other_Loan_Purpose__c: {
        type: Sequelize.STRING,
        field: 'Other_Loan_Purpose__c',
    }, Application__c__X3rd_Party_Application_Number__c: {
        type: Sequelize.STRING,
        field: 'Application__c__X3rd_Party_Application_Number__c',
    }, name: {
        type: Sequelize.STRING,
        field: 'name',
    }
}, {
        freezeTableName: true,
        schema: 'salesforce',
        tableName: 'Loan_Amount__c',
        timestamps: false,

    });



var app = {};
var applicant = {};
var loanPurpose = {};
var expense = {};
var income = {};
var asset = {};
var liability = {};

populateData = (application) => {
    app = createApplication(application);
    applicant = createApplicant(application);
    loanPurpose = createLoanPurpose(application);
}

exports.saveApplication = (application) => {
    populateData(application);
    sequelize
        .authenticate()
        .then(function (err) {
            //Connection/Authentication Successful
            console.log('Connection has been established successfully.');

            //Start Transaction
            return sequelize.transaction(function (t) {
                console.log('Transaction Craeted .');
                // chain all your queries here. make sure you return them.
                return Application__c.create(app, { transaction: t }).then(function () {
                    return Applicant__c.create(applicant, { transaction: t }).then(function () {
                        /* return Loan_Purpose__c.bulkCreate(loanPurpose, { transaction: t }).then(function () {
                             return Income__c.bulkCreate(income, { transaction: t }).then(function () {
                                 return Expense__c.bulkCreate(expense, { transaction: t }).then(function () {
                                     return Asset__c.bulkCreate(asset, { transaction: t }).then(function () {
                                         return Liability__c.bulkCreate(liability, { transaction: t });
                                     });
                                 });
                             });
                         });*/
                    });
                });

            }).then(function (result) {
                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
                console.log(" Result status ", result.log);
            }).catch(function (err) {
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
                console.log(" Result status ", err);
            });
        })
        .catch(function (err) {
            console.log('Unable to connect to the database:', err);
        });
};


createApplication = (application) => {
    console.log(' Inside createApplication Object  :');
    app.Loan_Term_Months__c = application.term;  
    //Loan Term
    var loanTerm = {
      "24": "2 years", 
      "36": "3 years", 
      "60": "5 years", 
    };
    
    app.Loan_Term__c = loanTerm[application.term];
    app.Payment_Frequency__c = application.paymentFrequency;
    app.Total_Loan_Amount__c = application.originalAmountRequested;
    //app.Loan_Term_Months__c = application.originalAmountRequested;
    app.Application_Type__c = 'Single';
    app.Channel__c = application.Campaign;
    app.Application_Source__c = 'INTERNET';
    app.Higher_Approval_Consent__c = application.optionalDisclaimer2;
    app.Product_Id__c = 'Latitude';
    app.Mirror__c = application.sourceOfBusiness;
    app.Type_of_Product__c = 'Personal Loan';
    app.Branch__c = 'Central';
    app.Business_Source__c = 'INTERNET APPLICATION';
    app.X3rd_Party_Quoted_Risk_Grade__c = application.secondaryCreditRating;
    app.X3rd_Party_Quoted_Rate__c =  application.interestRate;
    app.Loan_Term_Months__c = application.term;
    app.Brand_Lookup__c = 'Latitude';
    app.Brand_String__c = 'Latitude';
    app.X3rd_Party_Application_Number__c = 'A110711'; //app.applicationNumber;
    app.X3rd_Party_Application_Source__c = 'Society One';
    app.Response_Code__c = 'SC001';
    app.name = 'A110711';
    console.log('createApplication Operation :(sourceOfBusiness) ===============', application.sourceOfBusiness);
    console.log('createApplication Operation :(application.secondaryCreditRating) ===============', application.secondaryCreditRating);
    /*  application.arrObj.forEach(function(element) {
          
      }, this);
      app.amortisationSchedule = [];*/
    return app;
};

createApplicant = (application) => {
    console.log('Inside createApplicant :');
    applicant.Is_Primary_Applicant__c = 'true';
    applicant.Interested_in_other_services__c = 'true';
    applicant.Meets_Eligibility_Criteria__c = 'true';
    applicant.Agrees_to_Fees__c = 'true';
    applicant.Agrees_to_Privacy_Policy__c = 'false';
    applicant.KB_HL_or_Graduate__c = 'false';
    applicant.Accept_Terms_and_Conditions__c = 'false';
    applicant.EIDV__c = 'false';
    applicant.Date_of_Birth__c = '1987-01-01';
    applicant.Date_of_Birth_WS__c = '1987-01-01';
    applicant.Work_WS__c = '';
    applicant.Home_WS__c = '';
    applicant.Work_Area_Code__c = '03';
    applicant.Home_Area_Code__c = '03';
    applicant.Title__c = 'Ms.';
    applicant.First_Name__c = application.customerRelationships[0].firstNames;
    applicant.Middle_Name__c = '';
    applicant.Last_Name__c = application.customerRelationships[0].surname;
    applicant.Gender__c = application.customerRelationships[0].gender;
    applicant.Rel_Status__c = 'Single';
    applicant.Drivers_Lic_Flg__c = 'false';
    applicant.Pref_Contact_Method__c = 'Phone';
    applicant.Home__c = '';
    applicant.Work__c = '';
    applicant.Email_Address__c = 'huhua@gmail.com';
    applicant.Unit_No_Res__c = application.customerRelationships[0].currentAddressStreetNumber;
    applicant.Street_No_Res__c = application.customerRelationships[0].currentAddressStreetNumber;
    applicant.Street_Res__c = application.customerRelationships[0].currentAddressStreetName;
    applicant.Suburb_Res__c = application.customerRelationships[0].currentAddressSuburb;
    applicant.City_Res__c = application.customerRelationships[0].currentAddressSuburb;
    applicant.Postcode_Res__c = '3121';
    applicant.Country_Res__c = 'australia';
    applicant.State_Res__c = application.customerRelationships[0].currentAddressSuburb;
    applicant.Years_At_Addr__c = '04';
    applicant.Months_At_Addr__c = '09';
    applicant.No_of_Deps__c = '2';
    applicant.X3rd_Party_Application_Number__c = 'A110711';
    applicant.Application__c__X3rd_Party_Application_Number__c = 'A110711';
    applicant.name = 'A110711';
    console.log('createApplicant Operation :(firstNames) ===============', application.customerRelationships[0].firstNames);
    console.log('createApplicant Operation :(surname) ===============', application.customerRelationships[0].surname);
    console.log('createApplicant Operation :(gender) ===============', application.customerRelationships[0].gender);
    return applicant;
};

createLoanPurpose = (application) => {
    // app.Loan_Term_Months__c = application.field;
    loanPurpose.Loan_Amount__c = application.loanAmountInclGST;

    if (application.loanReason === 'Wedding') {
        loanPurpose.Other_Loan_Purpose__c = application.loanReason;
    } else {
        loanPurpose.Value__c = application.loanReason;
    }
    loanPurpose.Application__c__X3rd_Party_Application_Number__c = 'A110711';
    loanPurpose.name = 'A110711';
    console.log('createLoanPurpose Operation :(loanAmountInclGST) ===============', application.loanAmountInclGST);
    console.log('createLoanPurpose Operation :(loanReason) ===============', application.loanReason);
    return createLoanPurpose;
};

createIncome = (application) => {
    //  app.Loan_Term_Months__c = application.field;

    return app;
};

createExpense = (application) => {
    // app.Loan_Term_Months__c = application.field;

    return app;
};

createAsset = (application) => {
    // app.Loan_Term_Months__c = application.field;

    return app;
};

createLiability = (application) => {
    /*  application.debt.forEach(function(element) {
          app.Loan_Term_Months__c = application.debt;
      }, this);*/


    return app;
=======
var Sequelize = require('sequelize');
var pg = require('pg');
pg.defaults.ssl = true;
var sequelize = new Sequelize('postgres://tlpxvockugymqf:J87lrFHL63Hbjx9RIrc_8p56O-@ec2-107-22-238-96.compute-1.amazonaws.com:5432/d8ca71bptq826m');

/* Define application__c Data Model */
var Application__c = sequelize.define('Application__c', {
    Loan_Term_Months__c: {
        type: Sequelize.STRING,
        field: 'Loan_Term_Months__c',
    },
    Loan_Term__c: {
        type: Sequelize.STRING,
        field: 'Loan_Term__c',
    },
    Payment_Frequency__c: {
        type: Sequelize.STRING,
        field: 'Payment_Frequency__c',
    },
    Total_Loan_Amount__c: {
        type: Sequelize.STRING,
        field: 'Total_Loan_Amount__c',
    },
    Application_Type__c: {
        type: Sequelize.STRING,
        field: 'Application_Type__c',
    },
    Channel__c: {
        type: Sequelize.STRING,
        field: 'Channel__c',
    },
    Application_Source__c: {
        type: Sequelize.STRING,
        field: 'Application_Source__c',
    },
    Higher_Approval_Consent__c: {
        type: Sequelize.STRING,
        field: 'Higher_Approval_Consent__c',
    },
    Mirror__c: {
        type: Sequelize.STRING,
        field: 'Mirror__c',
    },
    Branch__c: {
        type: Sequelize.STRING,
        field: 'Branch__c',
    },
    Business_Source__c: {
        type: Sequelize.STRING,
        field: 'Business_Source__c',
    },
    X3rd_Party_Application_Number__c: {
        type: Sequelize.STRING,
        field: 'X3rd_Party_Application_Number__c',
    },
    X3rd_Party_Quoted_Risk_Grade__c: {
        type: Sequelize.STRING,
        field: 'X3rd_Party_Quoted_Risk_Grade__c',
    },
    X3rd_Party_Quoted_Rate__c: {
        type: Sequelize.STRING,
        field: 'X3rd_Party_Quoted_Rate__c',
    },
    Brand_Lookup__c: {
        type: Sequelize.STRING,
        field: 'Brand_Lookup__c',
    },
    Brand_String__c: {
        type: Sequelize.STRING,
        field: 'Brand_String__c',
    },
    Type_of_Product__c: {
        type: Sequelize.STRING,
        field: 'Type_of_Product__c',
    },
    Product_Id__c: {
        type: Sequelize.STRING,
        field: 'Product_Id__c',
    },
    Response_Code__c: {
        type: Sequelize.STRING,
        field: 'Response_Code__c',
    },
    name: {
        type: Sequelize.STRING,
        field: 'name',
    }
}, {
        freezeTableName: true,
        schema: 'salesforce',
        tableName: 'application__c',
        timestamps: false,
    });

/* Define Applicant__c Data Model */
var Applicant__c = sequelize.define('Applicant__c', {
    Is_Primary_Applicant__c: {
        type: Sequelize.STRING,
        field: 'Is_Primary_Applicant__c',
    },
    Interested_in_other_services__c: {
        type: Sequelize.STRING,
        field: 'Interested_in_other_services__c',
    },
    Meets_Eligibility_Criteria__c: {
        type: Sequelize.STRING,
        field: 'Meets_Eligibility_Criteria__c',
    },
    KB_HL_or_Graduate__c: {
        type: Sequelize.STRING,
        field: 'KB_HL_or_Graduate__c',
    },
    Accept_Terms_and_Conditions__c: {
        type: Sequelize.STRING,
        field: 'Accept_Terms_and_Conditions__c',
    },
    EIDV__c: {
        type: Sequelize.STRING,
        field: 'EIDV__c',
    },
    Date_of_Birth__c: {
        type: Sequelize.STRING,
        field: 'Date_of_Birth__c',
    },
    Date_of_Birth_WS__c: {
        type: Sequelize.STRING,
        field: 'Date_of_Birth_WS__c',
    },
    Work_WS__c: {
        type: Sequelize.STRING,
        field: 'Work_WS__c',
    },
    Home_WS__c: {
        type: Sequelize.STRING,
        field: 'Home_WS__c',
    },
    Work_Area_Code__c: {
        type: Sequelize.STRING,
        field: 'Work_Area_Code__c',
    },
    Home_Area_Code__c: {
        type: Sequelize.STRING,
        field: 'Home_Area_Code__c',
    },
    Title__c: {
        type: Sequelize.STRING,
        field: 'Title__c',
    },
    First_Name__c: {
        type: Sequelize.STRING,
        field: 'First_Name__c',
    },
    Gender__c: {
        type: Sequelize.STRING,
        field: 'Gender__c',
    }, Rel_Status__c: {
        type: Sequelize.STRING,
        field: 'Rel_Status__c',
    }, Drivers_Lic_Flg__c: {
        type: Sequelize.STRING,
        field: 'Drivers_Lic_Flg__c',
    }, Pref_Contact_Method__c: {
        type: Sequelize.STRING,
        field: 'Pref_Contact_Method__c',
    }, Mobile__c: {
        type: Sequelize.STRING,
        field: 'Mobile__c',
    }, Home__c: {
        type: Sequelize.STRING,
        field: 'Home__c',
    }, Work__c: {
        type: Sequelize.STRING,
        field: 'Work__c',
    }, Email_Address__c: {
        type: Sequelize.STRING,
        field: 'Email_Address__c',
    }, Unit_No_Res__c: {
        type: Sequelize.STRING,
        field: 'Unit_No_Res__c',
    }, Street_No_Res__c: {
        type: Sequelize.STRING,
        field: 'Street_No_Res__c',
    }, Street_Res__c: {
        type: Sequelize.STRING,
        field: 'Street_Res__c',
    }, Street_Type_Res__c: {
        type: Sequelize.STRING,
        field: 'Street_Type_Res__c',
    }, Suburb_Res__c: {
        type: Sequelize.STRING,
        field: 'Suburb_Res__c',
    }, City_Res__c: {
        type: Sequelize.STRING,
        field: 'City_Res__c',
    }, Postcode_Res__c: {
        type: Sequelize.STRING,
        field: 'Postcode_Res__c',
    }, Country_Res__c: {
        type: Sequelize.STRING,
        field: 'Country_Res__c',
    }, State_Res__c: {
        type: Sequelize.STRING,
        field: 'State_Res__c',
    }, Years_At_Addr__c: {
        type: Sequelize.STRING,
        field: 'Years_At_Addr__c',
    }, Months_At_Addr__c: {
        type: Sequelize.STRING,
        field: 'Months_At_Addr__c',
    }, No_of_Deps__c: {
        type: Sequelize.STRING,
        field: 'No_of_Deps__c',
    }, X3rd_Party_Application_Number__c: {
        type: Sequelize.STRING,
        field: 'X3rd_Party_Application_Number__c',
    }, Application__c__X3rd_Party_Application_Number__c: {
        type: Sequelize.STRING,
        field: 'Application__c__X3rd_Party_Application_Number__c',
    }, name: {
        type: Sequelize.STRING,
        field: 'name',
    }
}, {
        freezeTableName: true,
        schema: 'salesforce',
        tableName: 'applicant__c',
        timestamps: false,

    });



/* Define Loan_Purpose__c Data Model */
var Loan_Purpose__c = sequelize.define('Loan_Purpose__c', {
    Loan_Amount__c: {
        type: Sequelize.STRING,
        field: 'Loan_Amount__c',
    }, Value__c: {
        type: Sequelize.STRING,
        field: 'Value__c',
    }, Other_Loan_Purpose__c: {
        type: Sequelize.STRING,
        field: 'Other_Loan_Purpose__c',
    }, Application__c__X3rd_Party_Application_Number__c: {
        type: Sequelize.STRING,
        field: 'Application__c__X3rd_Party_Application_Number__c',
    }, name: {
        type: Sequelize.STRING,
        field: 'name',
    }
}, {
        freezeTableName: true,
        schema: 'salesforce',
        tableName: 'Loan_Amount__c',
        timestamps: false,

    });



var app = {};
var applicant = {};
var loanPurpose = {};
var expense = {};
var income = {};
var asset = {};
var liability = {};

populateData = (application) => {
    app = createApplication(application);
    applicant = createApplicant(application);
    loanPurpose = createLoanPurpose(application);
}

exports.saveApplication = (application) => {
    populateData(application);
    sequelize
        .authenticate()
        .then(function (err) {
            //Connection/Authentication Successful
            console.log('Connection has been established successfully.');

            //Start Transaction
            return sequelize.transaction(function (t) {
                console.log('Transaction Craeted .');
                // chain all your queries here. make sure you return them.
                return Application__c.create(app, { transaction: t }).then(function () {
                    return Applicant__c.create(applicant, { transaction: t }).then(function () {
                        /* return Loan_Purpose__c.bulkCreate(loanPurpose, { transaction: t }).then(function () {
                             return Income__c.bulkCreate(income, { transaction: t }).then(function () {
                                 return Expense__c.bulkCreate(expense, { transaction: t }).then(function () {
                                     return Asset__c.bulkCreate(asset, { transaction: t }).then(function () {
                                         return Liability__c.bulkCreate(liability, { transaction: t });
                                     });
                                 });
                             });
                         });*/
                    });
                });

            }).then(function (result) {
                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
                console.log(" Result status ", result.log);
            }).catch(function (err) {
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
                console.log(" Result status ", err);
            });
        })
        .catch(function (err) {
            console.log('Unable to connect to the database:', err);
        });
};


createApplication = (application) => {
    console.log(' Inside createApplication Object  :');
    app.Loan_Term_Months__c = application.term;  
    //Loan Term
    var loanTerm = {
      "24": "2 years", 
      "36": "3 years", 
      "60": "5 years", 
    };
    
    app.Loan_Term__c = loanTerm[application.term];
    app.Payment_Frequency__c = application.paymentFrequency;
    app.Total_Loan_Amount__c = application.originalAmountRequested;
    //app.Loan_Term_Months__c = application.originalAmountRequested;
    app.Application_Type__c = 'Single';
    app.Channel__c = application.Campaign;
    app.Application_Source__c = 'INTERNET';
    app.Higher_Approval_Consent__c = application.optionalDisclaimer2;
    app.Product_Id__c = 'Latitude';
    app.Mirror__c = application.sourceOfBusiness;
    app.Type_of_Product__c = 'Personal Loan';
    app.Branch__c = 'Central';
    app.Business_Source__c = 'INTERNET APPLICATION';
    app.X3rd_Party_Quoted_Risk_Grade__c = application.secondaryCreditRating;
    app.X3rd_Party_Quoted_Rate__c =  application.interestRate;
    app.Loan_Term_Months__c = application.term;
    app.Brand_Lookup__c = 'Latitude';
    app.Brand_String__c = 'Latitude';
    app.X3rd_Party_Application_Number__c = 'A110711'; //app.applicationNumber;
    app.X3rd_Party_Application_Source__c = 'Society One';
    app.Response_Code__c = 'SC001';
    app.name = 'A110711';
    console.log('createApplication Operation :(sourceOfBusiness) ===============', application.sourceOfBusiness);
    console.log('createApplication Operation :(application.secondaryCreditRating) ===============', application.secondaryCreditRating);
    /*  application.arrObj.forEach(function(element) {
          
      }, this);
      app.amortisationSchedule = [];*/
    return app;
};

createApplicant = (application) => {
    console.log('Inside createApplicant :');
    applicant.Is_Primary_Applicant__c = 'true';
    applicant.Interested_in_other_services__c = 'true';
    applicant.Meets_Eligibility_Criteria__c = 'true';
    applicant.Agrees_to_Fees__c = 'true';
    applicant.Agrees_to_Privacy_Policy__c = 'false';
    applicant.KB_HL_or_Graduate__c = 'false';
    applicant.Accept_Terms_and_Conditions__c = 'false';
    applicant.EIDV__c = 'false';
    applicant.Date_of_Birth__c = '1987-01-01';
    applicant.Date_of_Birth_WS__c = '1987-01-01';
    applicant.Work_WS__c = '';
    applicant.Home_WS__c = '';
    applicant.Work_Area_Code__c = '03';
    applicant.Home_Area_Code__c = '03';
    applicant.Title__c = 'Ms.';
    applicant.First_Name__c = application.customerRelationships[0].firstNames;
    applicant.Middle_Name__c = '';
    applicant.Last_Name__c = application.customerRelationships[0].surname;
    applicant.Gender__c = application.customerRelationships[0].gender;
    applicant.Rel_Status__c = 'Single';
    applicant.Drivers_Lic_Flg__c = 'false';
    applicant.Pref_Contact_Method__c = 'Phone';
    applicant.Home__c = '';
    applicant.Work__c = '';
    applicant.Email_Address__c = 'huhua@gmail.com';
    applicant.Unit_No_Res__c = application.customerRelationships[0].currentAddressStreetNumber;
    applicant.Street_No_Res__c = application.customerRelationships[0].currentAddressStreetNumber;
    applicant.Street_Res__c = application.customerRelationships[0].currentAddressStreetName;
    applicant.Suburb_Res__c = application.customerRelationships[0].currentAddressSuburb;
    applicant.City_Res__c = application.customerRelationships[0].currentAddressSuburb;
    applicant.Postcode_Res__c = '3121';
    applicant.Country_Res__c = 'australia';
    applicant.State_Res__c = application.customerRelationships[0].currentAddressSuburb;
    applicant.Years_At_Addr__c = '04';
    applicant.Months_At_Addr__c = '09';
    applicant.No_of_Deps__c = '2';
    applicant.X3rd_Party_Application_Number__c = 'A110711';
    applicant.Application__c__X3rd_Party_Application_Number__c = 'A110711';
    applicant.name = 'A110711';
    console.log('createApplicant Operation :(firstNames) ===============', application.customerRelationships[0].firstNames);
    console.log('createApplicant Operation :(surname) ===============', application.customerRelationships[0].surname);
    console.log('createApplicant Operation :(gender) ===============', application.customerRelationships[0].gender);
    return applicant;
};

createLoanPurpose = (application) => {
    // app.Loan_Term_Months__c = application.field;
    loanPurpose.Loan_Amount__c = application.loanAmountInclGST;

    if (application.loanReason === 'Wedding') {
        loanPurpose.Other_Loan_Purpose__c = application.loanReason;
    } else {
        loanPurpose.Value__c = application.loanReason;
    }
    loanPurpose.Application__c__X3rd_Party_Application_Number__c = 'A110711';
    loanPurpose.name = 'A110711';
    console.log('createLoanPurpose Operation :(loanAmountInclGST) ===============', application.loanAmountInclGST);
    console.log('createLoanPurpose Operation :(loanReason) ===============', application.loanReason);
    return createLoanPurpose;
};

createIncome = (application) => {
    //  app.Loan_Term_Months__c = application.field;

    return app;
};

createExpense = (application) => {
    // app.Loan_Term_Months__c = application.field;

    return app;
};

createAsset = (application) => {
    // app.Loan_Term_Months__c = application.field;

    return app;
};

createLiability = (application) => {
    /*  application.debt.forEach(function(element) {
          app.Loan_Term_Months__c = application.debt;
      }, this);*/


    return app;
>>>>>>> 8ea1998c10acc49b7a8d8e00a09540b922614234
};