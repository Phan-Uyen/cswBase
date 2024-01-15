import { expect, Locator, Page } from "@playwright/test";
import CommonPage from "./page";

export default class CorePhotoPage extends CommonPage {
  page: Page;
  constructor(page: Page) {
      super(page);
    this.page = page;
  }

//Core Photo Dashboard 
get manageModelBtn(){
    return "//button[contains(text(),'Manage Models')]";
}

get manageDataStoresBtn(){
    return "//button[contains(text(),'Manage Data Stores')]";
}

get createNewPipeline(){
    return "//button[contains(text(),'+ Create New Pipeline')]" ; 
}

get searchPipelineID(){
  return "//input[@placeholder='Pipeline ID']";
}

dynamicValuePipelineID(value:string){
  return `(//th[contains(text(),'Pipeline')]//parent::tr//parent::thead//following-sibling::tbody//tr//td[contains(text(),${value})])[1] `; 
}


get sourceTypeField(){
  return "//label[contains(text(),'Source type')]/parent::div//following-sibling::div//child::input[@class='MuiSelect-nativeInput css-1k3x8v3']"; 
}

dynamicSourceTypeList(value:string){
  return `//div[contains(text(),'${value}')] `; 
}

get statusField(){
  return"//label[contains(text(),'Status')]//parent::div//following-sibling::div//child::input"; 
}

dynamicStatusList(value:string){
  return `(//div[contains(text(),'${value}')])[1]`; 
}

get statusColumnCorePhoto(){
  return "//th[contains(text(),'Status')]//parent::tr//parent::thead//following-sibling::tbody//child::tr//child::td//span[contains(text(),'Inprogress')]"
}

get userField(){
  return"//label[contains(text(),'User')]//parent::div//following-sibling::div//child::input"; 
}

dynamicUserList(value:string){
  return `(//div[contains(text(),'${value}')])[2]`; 
}

get createdDateFrom(){
  return"(//input[@placeholder ='Select date'])[1]"; 
}

get createdDateTo(){
  return"(//input[@placeholder ='Select date'])[2]"; 
}

get viewDetailIcon(){
  return "(//div[@class='ant-space-item']//child::a)[1]";
}

get backBtnViewDetail(){
  return "(//button[@class='ant-btn css-k7429z ant-btn-default'])[1]"; 
}
get openPipelineLogBtn(){
  return "//span[contains(text(),'Open Pipeline Log')]//parent::button"; 
}

get triggerHistoryList(){
  return "//div[contains(text(),'Trigger History')]";
}

get reloadIcon(){
  return "(//div[@class='ant-space-item']//child::a)[1]//parent::div//following-sibling::div[1]";
}

get removeIcon(){
  return "(//div[@class='ant-space-item']//child::a)[1]//parent::div//following-sibling::div[2]";
}

get totalItemOfCorePhoto(){
  return "(//li[@class='ant-pagination-total-text'])[1]";
}

get selectPaginationCorePhoto(){
  return "(//span[@class='ant-select-selection-search']//parent::div)[4]"; 
}

dynamicValuePaginationCorePhoto(value:string){
  return `(//div[contains(text(),'${value}')])[1]`; 
}

get dataRowCorePhotoList(){
  return "//tr[@class='ant-table-row ant-table-row-level-0']"; 
}

get nextBtnCorePhoto(){
  return "//span[@class='anticon anticon-right']//parent::button";
}

get backBtnCorePhoto(){
  return "//span[@class='anticon anticon-left']//parent::button"; 
}



//Manage Models Section 
get closeManageModels(){
  return "(//div[contains(text(),'X')]//parent::span)[1]"; 
}

get totalItemOfManageModel(){
  return "(//li[@class='ant-pagination-total-text'])[2]";
}

get selectPaginationManageModel(){
  return "(//span[@class='ant-select-selection-search']//parent::div)[5]"; 
}

dynamicValuePaginationManageModel(value:string){
  return `(//div[contains(text(),'${value}')])[1]`; 
}

get dataRowManageModelList(){
  return "//div[contains(text(),'Manage Models')]//parent::div//following-sibling::div//following::tr[@class='ant-table-row ant-table-row-level-0']"
}

get trainnewModelBtn(){
  return "//button[contains(text(),'Train New Model')]";
}

get inputTrainNewModelName(){
  return "//input[@name='name']";
}

get emptyErrorMessageTranNewModelName(){
  return "//div[@id='name_help']"; 
}

get inputParent(){
  return "//input[@id='parent'] ";
}

dynamicDefaultDataParent(value:string){
  return ` `
}

get emptyErrorMessageParent(){
  return "//div[@id='parent_help']"; 
}

get noDataDefaultParent(){
  return "(//div[contains(text(),'No data')])[1]"
}

get inputAnnotationData(){
  return "//input[@id='annotationData']"; 
}

dynamicDefaultAnnotationData(value:string){
  return ``; 
}

get emptyErrorMessageAnnotationData(){
  return "//div[@id='annotationData_help']"; 
}

get noDataDefaultAnnotation(){
  return "(//div[contains(text(),'No data')])[2]"
}

get cancelBtn(){
  return "(//button[contains(text(),'Cancel')])[1]";
}

get startBtn(){
  return "//button[contains(text(),'Start')]"; 
}

get closeTrainNewModel(){
  return "(//div[contains(text(),'X')]//parent::span)[2]";
}

//Manage Data Stores Section 

get createDataStoresBtn(){
  return "//button[contains(text(),'Create Data Store')]";
}

get closeManageDataStoresModal(){
  return "//div[contains(text(),'X')]//parent::span"
}

get totalItemOfManageDataStores(){
  return "(//li[@class='ant-pagination-total-text'])[2]";
}

get viewActionManageDataStores(){
  return "(//div[@class='ant-space-item']//child::a)[11]"; 
}

get removeActionManageDataStores(){
  return "(//div[@class='ant-space-item']//child::a)[11]//parent::div//following-sibling::div[1]"; 
}

get nextBtManageDataStores(){
  return "(//span[@class='anticon anticon-right'])[2]";
}

get backBtnManageDataStores(){
  return "(//span[@class='anticon anticon-left'])[2]";
}

get selectPaginationManageDataStore(){
  return "(//span[@class='ant-select-selection-search']//parent::div)[5]";
}

dynamicValuePaginatioDataStore(value:string){
  return `(//div[contains(text(),'${value}')])[1]`
}

get dataRowManageManageDataStore(){
  return "//div[contains(text(),'Manage Data Stores')]//parent::div//following-sibling::div//following::tr[@class='ant-table-row ant-table-row-level-0']"
}

get inputEnterStoreName(){
  return"//textarea[@name='name']";
}

get closeCreateNewLocalStoreModal(){
  return"(//div[contains(text(),'X')]//parent::span)[2]";
}

get cancelBtnCreateNewLocalStore(){
  return "(//button[contains(text(),'Cancel')])[1]";
}

get saveBtnCreateNewLocalStore(){
  return "//button[contains(text(),'Save')]";
}

get emptyErrorMessageEnterStoreName(){
  return "//p[contains(text(),'Store name is required')]"
}
//Create New Pipeline Section
get backBtnCreateNewPipeline(){
  return "//div[contains(text(),'Create New Pipeline')]//preceding-sibling::button";
}

get cancelBtnCreateNewPipeline(){
  return "//button[contains(text(),'Cancel')]";
}

get saveBtnCreateNewPipeline(){
  return "//button[contains(text(),'Save')]";
}

get sourceTypeData(){
  return "//div[@id='type']"
}

dynamicDefaultSourceTypeList(value:string){
  return `//li[contains(text(),'${value}')]`; 
}

get inputProjectID(){
  return "//input[@id='projectId']";
}

get invalidErrorMessageProjectID(){
  return "//div[contains(text(),'Project ID is invalid type')]";
}

get mlBackendEngineField(){
  return "//div[@id='coreTray']"; 
}

dynamicMlBackendEngineList(value:string){
  return `//div[contains(text(),'${value}')]`; 
}

get dataSourceField(){
  return "//input[@id='dataSourceId']"
}

dynamicDefaultDataSourceList(value:string){
  return `//div[contains(text(),'${value}')]`; 
}

get inputSMBShareFolder(){
  return "//textarea[@id='sharedFolder']";
}

get inputIPAddress(){
  return "//textarea[@id='ipAddress']";
}

get inputUsername(){
  return "//textarea[@id='username']"; 
}

get inputPassword(){
  return "//input[@id='password']"; 
}

get inputName(){
  return "//input[@id='name']"; 
}

get testConnectionBtn(){
  return "//span[contains(text(),'Test Connection')]//parent::button"
}

get createDataStoreBtn(){
  return "//span[contains(text(),'Create Data Store')]//parent::button"
}

get addNewDataSource(){
  return "//span[contains(text(),'Add New Azure Blob Data Source')]//parent::button"
}
get inputDataSourceName(){
  return "(//div[@class='ant-form-item-control-input-content']//child::input)[5] ";
}

get inputConnectionString(){
  return "//textarea[@id='connectionString']"
}

get emptyErrorMessageProjectID(){
  return "//div[contains(text(),'Project ID is required')]";
}

}