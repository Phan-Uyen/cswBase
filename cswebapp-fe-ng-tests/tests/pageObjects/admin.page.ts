import { expect, Locator, Page } from "@playwright/test";
import CommonPage from "./page";


export default class AdminModePage extends CommonPage{
    page: Page;
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    get adminBtn(){
        return"//span[contains(text(),'Admin Mode')]//parent::button";
    }

    get databaseBtn():string{
        return "//a[contains(text(), 'Database')]//parent::li  | //div[contains(text(), 'DataBase')]"
    }

    get csWebAppVersionText():string{
        return "//td[contains(text(), 'CSWebApp Version:')]  | //span[contains(text(), 'CSWebApp Version')]"
    }

    get customerDatabaseText():string{
        return "//td[contains(text(), 'Customer Database:')] | //span[contains(text(), 'Customer Database')]"
    }

    get customerDatabaseRescanBtn():string{
        return "//td[contains(text(), 'Customer Database:')]//following-sibling::td/input[@value = 'Rescan']  | (//span[contains(text(), 'Rescan')]//parent::button)[1]"
    }

    get drillHoleDatabaseText():string{
        return "//td[contains(text(), 'Drill Hole Database:')] | //span[contains(text(), 'Drill Hole')]"
    }

    get drillHoleDatabaseRescanBtn():string{
        return "//td[contains(text(), 'Drill Hole Database:')]//following-sibling::td/input[@value = 'Rescan'] | (//span[contains(text(), 'Rescan')]//parent::button)[2]"
    }

    get jobDatabaseText():string {
        return "(//td[contains(text(), 'Job Database:')] | //span[contains(text(), 'Job')])[1]"
    }

    get jobDatabaseRescanBtn():string {
        return "//td[contains(text(), 'Job Database:')]//following-sibling::td/input[@value = 'Rescan'] | (//span[contains(text(), 'Rescan')]//parent::button)[3]"
    }

    get productDatabaseText():string{
        return "//td[contains(text(), 'Product Database:')] | //span[contains(text(), 'Product Database')]"
    }

    get productDatabaseRescanBtn():string{
        return "//td[contains(text(), 'Product Database:')]//following-sibling::td/input[@value = 'Rescan'] | (//span[contains(text(), 'Rescan')]//parent::button)[4]"
    }

    get confirmRescanMessage(){
        return"//span[contains(text(),'Confirm Rescan')]//parent::div";
    }

    get projectDatabaseText():string{
        return "//td[contains(text(), 'Project Database:')] | //span[contains(text(), 'Project Database')]"
    }

    get projectDatabaseRescanBtn():string{
        return "//td[contains(text(), 'Project Database:')]//following-sibling::td/input[@value = 'Rescan'] | (//span[contains(text(), 'Rescan')]//parent::button)[5]"
    }

    get transferAppDatabaseText():string{
        return "//td[contains(text(), 'TransferApp Databases:')] | //span[contains(text(), 'TransferApp Databases')]"
    }

    get transferAppDatabaseRescanBtn():string{
        return "//td[contains(text(), 'TransferApp Databases:')]//following-sibling::td/input[@value = 'Rescan'] | (//span[contains(text(), 'Rescan')]//parent::button)[6]"
    }

    get advancedProductUpdateText():string{
        return "//td[contains(text(), 'Advanced product update')] | //span[contains(text(), 'Advanced product update')]" 
    }

    get advancedProductUpdateBtn():string{
        return "(//span[contains(text(),'Rescan')]//parent::button)[7]"
    }

    //Transfer
    get transfersBtn():string{
        return "//a[contains(text(), 'Transfers')]//parent::li | //div[contains(text(), 'Transfers')]"
    }

    get outgoingTransferText():string{
        return "//div[contains(text(), 'Outgoing Transfers')] | //p[contains(text(), 'Outgoing Transfers')]//parent::div"
    }

    get priorityColumn():string{
        return "//th[contains(text(), 'Priority')]  "
    }

    get transferTypeColumn():string{
        return "//th[contains(text(), 'Type')]"
    }

    get idColumn():string{
        return "//th[contains(text(), 'ID')]"
    }

    get addedColumn():string{
        return "//th[contains(text(), 'Added')]"
    }

    get transferredColumn():string{
        return "//th[contains(text(), 'Transferred')]"
    }

    get sizeColumn():string{
        return "//th[contains(text(), 'Size')]"
    }

    get processColumn():string{
        return "//th[contains(text(), 'Progress')]"
    }

    get recipient():string{
        return "//th[contains(text(), 'Recipient')]"
    }

    get statusColumn():string{
        return "//th[contains(text(), 'Status')]"
    }

    get messageColumn():string{
        return "//th[contains(text(), 'Message')]"
    }

    get requeueAllBtn():string{
        return "//button[contains(text(), 'Requeue All')] | //span[contains(text(), 'ReQueue All')]//parent::button"
    }

    get removeBtn():string{
        return "//button[contains(text(), 'Remove')] | //span[contains(text(), 'Remove')]//parent::button"
    }

    // get clickOnQueued():string{
    // return "//label[contains(text(), 'Queued:')]"
    // }

    get increasePriority():string{
        return "//button[contains(text(), 'Increase priority')] | //span[contains(text(), 'Increase priority')]//parent::button"
    }

    get decreasePriority():string{
        return "//button[contains(text(), 'Decrease priority')] | //span[contains(text(), 'Decrease priority')]//parent::button"
    }

    get noDataTransfer(){
        return"//div[contains(text(),'No data')]";
    }

    // get clickOnSuccess():string{
    //     return "//label[contains(text(), 'Success:')]"
    // }

    // get clearAllBtn():string{
    //     return "//button[contains(text(), 'Clear all')] | //span[contains(text(), 'Clear all')]//parent::button"
    // }

    get clickOnFailed():string{
        return "//label[contains(text(), 'Failed:')] | //span[contains(text(), 'Failed:')]"
    }

    get reQueueBtn():string{
        return "//span[contains(text(),'ReQueue All')]//parent::button"
    }

    get autoRefreshBtn():string{
        return "//label[contains(text(), 'Auto Refresh')] | //span[contains(text(), 'Auto Refresh')]//preceding::span[contains(@class,'ant-checkbox-checked')]"
    }

    get unTickAutoRefreshCheckboxTransfers(){
        return"//span[contains(text(),'Auto Refresh')]//preceding::span[@class='ant-checkbox']//child::input";
    }
    

    //Users
    get usersBtn():string{
        return "//a[contains(text(), 'Users')]//parent::li | //div[contains(text(), 'Users')]"
    }

    get usersText():string{
        return "//div[contains(text(), 'Users')]  | //p[contains(text(), 'Users')]//parent::div"
    }

    get searchBar():string{
        return "(//input[contains(@id, 'userfilter')])[1] | //input[contains(@placeholder, 'Input search text')]//parent::span"
    }

    get searchPlaceHolderText():string{
        return "//input[contains(@placeholder, 'Input search text')]"
    }

    get firstNameColumn():string{
        return "//th[contains(text(), 'Firstname')] | //th[contains(text(), 'First name')]"
    }

    dynamicFirstNameColumn(value:string){
        return`//td[@class='ant-table-cell']//child::span[contains(text(),'${value}')]`;
    }

    get lastnameColumn():string{
        return "//th[contains(text(), 'Lastname')] | //th[contains(text(), 'Last name')]"
    }

    get usernameColumn():string{
        return "//th[contains(text(), 'Username')]"
    }

    get emailColumn():string{
        return "//th[contains(text(), 'Email')]"
    }

    get customerColumn():string{
        return "//th[contains(text(), 'Customer')]"
    }

    get loggedInColumn():string{
        return "//th[contains(text(), 'Logged in')]"
    }

    get commentsColumn():string{
        return "//th[contains(text(), 'Comments')]"
    }

    get actionColumn():string{
        return "//th[contains(text(), 'Actions')]"
    }

    get impersonateBtn():string{
        return "(//button[contains(text(), 'impersonate')] | //span[contains(text(), 'Impersonate')]//parent::button)[1]"
    }

    get backPageIcon(){
        return"//span[@class='anticon anticon-left']";
    }

    get nextPageIcon(){
        return"//span[@class='anticon anticon-right']"
    }

    get noDataMessage(){
        return"//div[contains(text(),'No data')]";
    }

    get errorMessage(){
        return"//div[@class='ant-notification-notice-message']";
    }

    //Reports
    get reportsBtn():string{
        return "//a[contains(text(), 'Reports')]//parent::li | //div[contains(text(), 'Reports')]"
    }

    get reportsText():string{
        return "//div[contains(text(), 'Reports')] | //p[contains(text(), 'Reports')]//parent::div"
    }

    get reportsTypeText():string{
        return "//label[contains(text(), 'Type')] | //p[contains(text(), 'Type')]"
    }

    get reportsTypeForm():string{
        return "(//label[contains(text(), 'Type')]//following-sibling::select)[1] | //p[contains(text(), 'Type')]//following-sibling::div"
    }

    get reportsTypeDropdown():string{
        return " (//label[contains(text(), 'Type')]//following-sibling::select)[1] | //p[contains(text(), 'Type')]//following-sibling::div//span[contains(@class, 'ant-select-arrow')]"
    }

    dynamicReportTypeProduct(value:string){
        return`(//div[contains(text(),'${value}')])[1]`;
    }

    get statusText():string{    
        return "//label[contains(text(), 'Status')] | //p[contains(text(), 'Status')]"
    }

    get statusForm():string{
        return "//select[contains(@id, 'status-filter')] | //p[contains(text(), 'Status')]//following-sibling::div"
    }

    get statusDropdown():string{
        return "//select[contains(@id, 'status-filter')] | (//p[contains(text(), 'Status')]//parent::div//span)[3]"
    }

    dynamicStatusListItem(value:string){
        return`//div[contains(text(),'${value}')]`;
    }

    get searchReportBar(){
        return"//input[@class='ant-input ant-input-sm']";
    }

    dynamicTypeListReport(value:string){
        return`(//td[@class='ant-table-cell']//child::span[contains(text(),'${value}')])[1]`;
    }

    get noDataReportMessage(){
        return"//div[contains(text(),'No data')]";
    }

    get reportsSearchForm():string{
        return "//input[contains(@id, 'admin-reports-search')] | //span[contains(@class, 'input-search')]/span/input"
    }

    get reportsSearchIcon():string{
        return "//input[contains(@id, 'reports-search')]//following-sibling::div | //button[contains(@class, 'input-search-button')]"
    }

    get createReportBtn():string{
        return "//button[contains(text(), 'Create Report')] | //span[contains(text(), 'Create Report')]//parent::button"
    }

    get reportCreatorText(){
        return"//div[contains(text(),'Report Creator')]";
    }

    get reportTypeText(){
        return"//label[contains(text(),'Report Type')]";
    }

    get reportTypeForm(){
        return"(//label[contains(text(),'Report Type')]//parent::div//following::div//child::span[@class='ant-select-selection-item'])[1]";
    }

    get jobText(){
        return"//label[contains(text(),'Job')]";
    }

    get jobFrom(){
        return"(//label[contains(text(),'Job')]//parent::div//following::div//child::span[@class='ant-select-selection-item'])[1]";
    }

    dynamicJob(value:string){
        return`//div[@class='rc-virtual-list-holder-inner']//child::div[contains(text(),'${value}')]`;
    }
    
    get drillHoleText(){
        return"//label[contains(text(),'Drill Hole')]";
    }

    get drillHoleForm(){
        return"(//label[contains(text(),'Drill Hole')]//parent::div//following::div//child::span[@class='ant-select-selection-item'])[1]";
    }

    dynamicDrillHoleList(value:string){
        return`//label[contains(text(),'Drill Hole')]//parent::div//following::div//child::span[contains(text(),'${value}')]`;
    }

    get createReportBtnPopUp(){
        return"(//button[contains(text(), 'Create Report')] | //span[contains(text(), 'Create Report')]//parent::button)[2]";
    }

    get cancelCreateReportBtnPopUp(){
        return"//span[contains(text(),'Cancel')]//parent::button";
    }

    get closeModalIcon(){
        return"//span[@class='ant-modal-close-x']"
    }

    get reportsTypeColumn():string{
        return "//th[contains(text(), 'Type') and @class = 'sorting'] | //span[contains(text(), 'Type')]"
    }

    get reportsStatusColumn():string{
        return "//th[contains(text(), 'Status') and @class = 'sorting'] | //span[contains(text(), 'Status')]"
    }

    get reportsIssuedDateColumn():string{
        return "//th[contains(text(), 'Issued Date') and @class = 'sorting_desc'] | //span[contains(text(), 'Issued Date')]"
    }

    get reportsDrillHoleIdColumn():string{
        return "//th[contains(text(), 'Drill Hole') and @class = 'sorting'] | //span[contains(text(), 'DrillHoleId')]"
    }

    get jobIdColumn():string{
        return "//th[contains(text(), 'Job') and @class = 'sorting'] | //span[contains(text(), 'JobId')]"
    }

    get finishDateColumn():string{
        return "//th[contains(text(), 'Generated') and @class = 'sorting'] | //span[contains(text(), 'FinishDate')]"
    }

    get creatorColumn():string{
        return "//th[contains(text(), 'Creator') and @class = 'sorting'] | //span[contains(text(), 'Creator')]"
    }

    get reportsAutoRefreshBtn():string{
        return "//label[contains(text(), ' Auto Refresh')] | //span[contains(text(), 'Auto Refresh')]//preceding::span[contains(@class,'ant-checkbox-checked')]"
    }

    get unTickAutoRefreshCheckbox(){
        return"//span[contains(text(),'Auto Refresh')]//preceding::span[@class='ant-checkbox']//child::input";
    }







}