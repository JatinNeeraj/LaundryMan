import { FindBookingShowtHtmlFunc } from "./HtmlFuns/FromHbs";
import { ChangeClassFunc } from "../../../../CommonFuncs/Header";
// import { BookingSaveFunc } from "../Js/SaveFuncs";
// import { BookingClear } from "../Js/ClearFunc";
import { LastBooking } from "../../../../../Dal/Bookings/Pick";
import { LastPkData, FromPkWithQrCodeObject as DalFromPkWithQrCodeObject } from "../../../../../Dal/Bookings/PullFuncs/PickFuncs";
//import { LastPkData, FromPkWithQrCodeObject as DalFromPkWithQrCodeObject } from "../../../../../Dal/Bookings/PullFuncs/PickFuncs";
import { FindBookingHtmlFunc } from "./HtmlFuns/FromTemplate";

let FindBookingFunc = async (inEvent) => {
    if ((inEvent === undefined) === false) {
        let jVarLocalCurrentTarget = inEvent.currentTarget;
        ChangeClassFunc({ inHtmlControl: jVarLocalCurrentTarget });
    };

    await FindBookingHtmlFunc();

    let jVarLocalFromHbs = await FindBookingShowtHtmlFunc();

    let jVarLocalKCont1 = document.getElementById("KCont1");

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

    await FindBookingHtmlFunc();

    let jVarLocalFromHbs = await FindBookingShowtHtmlFunc();

    let jVarLocalKCont1 = document.getElementById("KCont1");

    var template = Handlebars.compile(jVarLocalFromHbs);
    let jVarLocalDataToShow = await DalFromPkWithQrCodeObject({ inRowPK: inBookingPK });

    if (jVarLocalDataToShow.KTF) {
        jVarLocalKCont1.innerHTML = template(jVarLocalDataToShow.ForQrCode);
    };

    // LocalFuncAddListeners();
    LocalSetFocusFunc();
};

let ToDOMBodyFromPKAndQrCode = async ({ inBookingPK, inQrCode }) => {
    let jVarLocalFindBookingHeaderId = document.getElementById("FindBookingHeaderId");
    ChangeClassFunc({ inHtmlControl: jVarLocalFindBookingHeaderId });

    let jVarLocalFromHbs = await FindBookingShowtHtmlFunc();

    let jVarLocalKCont1 = document.getElementById("KCont1");

    var template = Handlebars.compile(jVarLocalFromHbs);
    let jVarLocalDataToShow = await DalFromPkWithQrCodeObject({ inRowPK: inBookingPK });

    if (jVarLocalDataToShow.KTF) {
        jVarLocalKCont1.innerHTML = template(jVarLocalDataToShow.ForQrCode);
    };

    // LocalFuncAddListeners();
    LocalSetFocusFunc();
};

let LocalSetFocusFunc = () => {
    let jVarLocalCustomerName = document.getElementById("CustomerName");
    jVarLocalCustomerName.focus();
};

export { FindBookingFunc, ToDOMBodyFromPK, ToDOMBodyFromPKAndQrCode };