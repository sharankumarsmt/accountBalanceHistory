
const accountTypeChecker = (accountBalanceHistory) => {
    /***
    Your goal is to write a function that determines from someone's ${accountBalanceHistory}
    🧾 (see the array above for an example)
    whether this array is of type A (variable) or type B (fixed).
  
    Type 🅰 denotes a balance history where the balance amount decreases by varying amounts each month.
  
    Type 🅱 is one where the balance amount changes by the same amount each month.
    ***/

    // Write your logic here  - No pressure 😁 //

    // console.log('\n accountBalanceHistory = ', JSON.stringify(accountBalanceHistory));

    /* <----- Data validations ------> */
    if (!accountBalanceHistory || !(accountBalanceHistory instanceof Array) || accountBalanceHistory.length === 0) {
        // console.log('\n Balance History sheet has invalid data.');
        throw new Error('INVALID_DATA');
    }

    /* <----- Balance History has 1 or 2 entry ------> */
    if (accountBalanceHistory.length <= 2) {
        // console.log('\n Balance History sheet has single entry.');
        // console.log('\n accountBalanceHistory[0].account.balance.amount = ', accountBalanceHistory[0].account.balance.amount)
        if (accountBalanceHistory[0].account && accountBalanceHistory[0].account.balance && !isNaN(accountBalanceHistory[0].account.balance.amount)) {
            if (accountBalanceHistory.length === 2) {
                if (accountBalanceHistory[1].account && accountBalanceHistory[1].account.balance && !isNaN(accountBalanceHistory[1].account.balance.amount)) {
                    return 'B';
                }
            } else {
                return 'B';
            }
        }
        throw new Error('INVALID_DATA');
    }

    /* <----- Balance History has more than 2 entry ------> */
    let diffAmount = 0;

    let result = !(accountBalanceHistory.every((element, index) => {

        // console.log('\n\n ******** \n element = ', element)
        // console.log(' index = ', index);

        if (index < accountBalanceHistory.length - 1) {

            /* Validate if object has the nested property. And check if the value is Number */
            if (!accountBalanceHistory[index + 1].account || !accountBalanceHistory[index + 1].account.balance
                || isNaN(accountBalanceHistory[index + 1].account.balance.amount) || !element.account
                || !element.account.balance || isNaN(element.account.balance.amount)) {
                throw new Error('INVALID_DATA');
            }

            let currDiffAmount = accountBalanceHistory[index + 1].account.balance.amount - element.account.balance.amount;

            // console.log(' ==> currDiffAmount = ', currDiffAmount);

            if (index === 0) {
                diffAmount = currDiffAmount;
                // console.log(' ==> diffAmount = ', diffAmount);
            } else {
                return currDiffAmount === diffAmount;
            }

        }
        return true;
    }));

    return result ? 'A' : 'B';
};

const accBalHistory_1_entry_case_B = [
    {
        monthNumber: 0, // current month
        account: {
            balance: { amount: 50 },
        }
    }
];

const accBalHistory_2_entry_case_B = [
    {
        monthNumber: 0, // current month
        account: {
            balance: { amount: 0 }
        }
    },
    {
        monthNumber: 1, // last month
        account: {
            balance: { amount: 100 }
        }
    }
];

const accBalHistory_3_entry_case_B = [
    {
        monthNumber: 0, // current month
        account: {
            balance: { amount: 100 },
        },
    },
    {
        monthNumber: 1, // last month
        account: {
            balance: { amount: 200 },
        },
    },
    {
        monthNumber: 2, // two months ago
        account: {
            balance: { amount: 300 },
        },
    }
];

const accBalHistory_4_entry_case_B = [
    {
        monthNumber: 0, // current month
        account: {
            balance: { amount: 0 },
        },
    },
    {
        monthNumber: 1, // last month
        account: {
            balance: { amount: 100 },
        },
    },
    {
        monthNumber: 2, // two months ago
        account: {
            balance: { amount: 200 },
        },
    },
    {
        monthNumber: 3, // two months ago
        account: {
            balance: { amount: 300 },
        }
    }
];

/* Case A - Where balance difference varies */
const accBalHistory_3_entry_case_A = [
    {
        monthNumber: 0, // current month
        account: {
            balance: { amount: 0 },
        },
    },
    {
        monthNumber: 1, // last month
        account: {
            balance: { amount: 100 },
        },
    },
    {
        monthNumber: 2, // two months ago
        account: {
            balance: { amount: 300 },
        },
    }
];

const accBalHistory_4_entry_case_A = [
    {
        monthNumber: 0, // current month
        account: {
            balance: { amount: 10 },
        },
    },
    {
        monthNumber: 1, // last month
        account: {
            balance: { amount: 100 },
        },
    },
    {
        monthNumber: 2, // two months ago
        account: {
            balance: { amount: 500 },
        },
    },
    {
        monthNumber: 3, // two months ago
        account: {
            balance: { amount: 50 },
        }
    }
];

const accBalHistory_5_entry_case_B = [
    {
        monthNumber: 0, // current month
        account: {
            balance: { amount: -200 },
        },
    },
    {
        monthNumber: 1, // last month
        account: {
            balance: { amount: -100 },
        },
    },
    {
        monthNumber: 2, // two months ago
        account: {
            balance: { amount: 0 },
        },
    },
    {
        monthNumber: 3, // two months ago
        account: {
            balance: { amount: 100 },
        }
    }
];

const accBalHistory_6_entry_case_A = [
    {
        monthNumber: 0, // current month
        account: {
            balance: { amount: 200 },
        },
    },
    {
        monthNumber: 1, // last month
        account: {
            balance: { amount: 300 },
        },
    },
    {
        monthNumber: 2, // two months ago
        account: {
            balance: { amount: 200 },
        },
    },
    {
        monthNumber: 3, // two months ago
        account: {
            balance: { amount: 100 },
        }
    }
];

/* Invalid data cases */
const accBalHistory_InvalidCase_1 = 'Test string';
const accBalHistory_InvalidCase_2 = [];
const accBalHistory_InvalidCase_3 = undefined;
const accBalHistory_InvalidCase_4 = {
    monthNumber: 0,
    account: {
        balance: { amount: 10 },
    },
};



try {
    let result = accountTypeChecker(accBalHistory_1_entry_case_B);
    console.log('\n Result of accBalHistory_1_entry_case_B = ', result);

    result = accountTypeChecker(accBalHistory_2_entry_case_B);
    console.log('\n Result of accBalHistory_2_entry_case_B = ', result);

    result = accountTypeChecker(accBalHistory_3_entry_case_B);
    console.log('\n Result of accBalHistory_3_entry_case_B = ', result);

    result = accountTypeChecker(accBalHistory_4_entry_case_B);
    console.log('\n Result of accBalHistory_4_entry_case_B = ', result);

    result = accountTypeChecker(accBalHistory_3_entry_case_A);
    console.log('\n Result of accBalHistory_3_entry_case_A = ', result);

    result = accountTypeChecker(accBalHistory_4_entry_case_A);
    console.log('\n Result of accBalHistory_4_entry_case_A = ', result);

    result = accountTypeChecker(accBalHistory_5_entry_case_B);
    console.log('\n Result of accBalHistory_5_entry_case_B = ', result);

    result = accountTypeChecker(accBalHistory_6_entry_case_A);
    console.log('\n Result of accBalHistory_6_entry_case_A = ', result);

    result = accountTypeChecker(accBalHistory_InvalidCase_1);
    console.log('\n Result of accBalHistory_InvalidCase_1 = ', result);

    result = accountTypeChecker(accBalHistory_InvalidCase_2);
    console.log('\n Result of accBalHistory_InvalidCase_2 = ', result);

    result = accountTypeChecker(accBalHistory_InvalidCase_3);
    console.log('\n Result of accBalHistory_InvalidCase_3 = ', result);

    result = accountTypeChecker(accBalHistory_InvalidCase_4);
    console.log('\n Result of accBalHistory_InvalidCase_4 = ', result);

} catch (e) {
    console.log('\n Error thrown. e = ', e);
}
