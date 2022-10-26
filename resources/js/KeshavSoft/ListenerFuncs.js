import { StartFunc as DalCompletedForPKFunsStartFunc } from "../../Dal/Completed/PullFuncs/CheckFuncs/ForPKFuns";
import { StartFunc as CheckFunsStartFunc } from "./CheckFuns";
import { ShowWithInputValue } from "../../Laundry/Completed/Scan/Js/ShowInDomBody";
import { ToDOMBodyAsParts as ToDOMBodyAsParts } from "../../Laundry/Booking/Today/FindBooking/Js/FindBooking";

let AddlistenersFunc = () => {
    let jVarLocalMainHeaderSearchId = document.getElementById("MainHeaderSearchId");

    jVarLocalMainHeaderSearchId.addEventListener('keypress', LocaljFHeaderSearchInputKeyPress);
};

let LocaljFHeaderSearchInputKeyPress = async (event) => {
    if (event.key === 'Enter') { // key code of the keybord key
        event.preventDefault();
        let jVarLocalCurrentTarget = event.currentTarget;
        let LocalScanAsArray = jVarLocalCurrentTarget.value.split("/");
        let jVarLocalBookingPK = LocalScanAsArray[LocalScanAsArray.length - 1];
        let jVarLocalQrCode = LocalScanAsArray[0];

        let jVarLocalFromCheckFunsStartFunc = await CheckFunsStartFunc({
            inBookingPK: jVarLocalBookingPK,
            inQrCode: jVarLocalQrCode
        });

        if (jVarLocalFromCheckFunsStartFunc.KTF === false) {
            console.log("jVarLoalFromDalForPKFunsStartFunc : ", jVarLocalFromCheckFunsStartFunc.KReason);
            return;
        };

        let jVarLoalFromDalCompletedForPKFunsStartFunc = await DalCompletedForPKFunsStartFunc({ inQrCode: jVarLocalQrCode });

        if (jVarLoalFromDalCompletedForPKFunsStartFunc.KTF === false) {
            await ShowWithInputValue({ inToShowValue: jVarLocalCurrentTarget.value });
        };

        //        console.log("jVarLoalFromDalBillingForPKFunsStartFunc --------: ", jVarLoalFromDalBillingForPKFunsStartFunc);

        await ToDOMBodyAsParts({
            inBookingPK: jVarLocalBookingPK,
            inQrCode: jVarLocalQrCode
        });

        // jVarLocalCurrentTarget.value = "";

        // console.log("1111111111 : ", jVarLocalCurrentTarget.value, jVarLoalFromDalBillingStartFunc);
    };
};


export { AddlistenersFunc }
