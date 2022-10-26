import { ChangeClassFunc } from "../../../../CommonFuncs/Header";
import { LastPkData } from "../../../../../Dal/Bookings/PullFuncs/PickFuncs";
import { FromPkWithCompleted as DalFromPkWithCompleted } from "../../../../../Dal/Bookings/PullFuncs/PickFuncs";

import { StartFunc as ShowInDOMStartFunc } from "./ShowInDOM";

let FindBookingFunc = async (inEvent) => {
    if ((inEvent === undefined) === false) {
        let jVarLocalCurrentTarget = inEvent.currentTarget;
        ChangeClassFunc({ inHtmlControl: jVarLocalCurrentTarget });
    };

    await ShowInDOMStartFunc();

    var template = Handlebars.compile(jVarLocalFromHbs);
    let jVarLocalDataToShow = await LastPkData();

    if (jVarLocalDataToShow.KTF) {
        jVarLocalKCont1.innerHTML = template(jVarLocalDataToShow.KResult);
    };

    // LocalFuncAddListeners();
    LocalSetFocusFunc();
};

let ToDOMBodyFromPK = async ({ inBookingPK }) => {
    let jVarLocalFindBookingHeaderId = document.getElementById("FindBookingHeaderId");
    ChangeClassFunc({ inHtmlControl: jVarLocalFindBookingHeaderId });

    await ShowInDOMStartFunc();

    // let jVarLocalFromHbs = await FindBookingShowHtmlFunc();

    // let jVarLocalKCont1 = document.getElementById("KCont1");

    // var template = Handlebars.compile(jVarLocalFromHbs);

    // let jVarLocalDataToShow = await DalFromPkWithQrCodeObject({ inRowPK: inBookingPK });

    // if (jVarLocalDataToShow.KTF) {
    //     jVarLocalKCont1.innerHTML = template(jVarLocalDataToShow.ForQrCode);
    // };

    // LocalFuncAddListeners();
    LocalSetFocusFunc();
};

let ToDOMBodyAsParts = async ({ inBookingPK, inQrCode }) => {
    await ShowInDOMStartFunc();

    // var template = Handlebars.compile(jVarLocalFromHbs);
    let jVarLocalDataToShow = await DalFromPkWithCompleted({ inRowPK: inBookingPK });
    console.log("jVarLocalDataToShow : ", jVarLocalDataToShow);
    // if (jVarLocalDataToShow.KTF) {
    //     jVarLocalKCont1.innerHTML = template(jVarLocalDataToShow.ForQrCode);
    // };

    // LocalFuncAddListeners();
    //LocalSetFocusFunc();
};

let LocalSetFocusFunc = () => {
    let jVarLocalCustomerName = document.getElementById("CustomerName");
    jVarLocalCustomerName.focus();
};

export { FindBookingFunc, ToDOMBodyFromPK, ToDOMBodyAsParts };