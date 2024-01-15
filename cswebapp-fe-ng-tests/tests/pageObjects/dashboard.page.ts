import { expect, Locator, Page } from "@playwright/test";
import CommonPage from "./page";

export default class DashBpardPage extends CommonPage {
  page: Page;
  constructor(page: Page) {
      super(page);
    this.page = page;
  }

  get logo(): string {
    return "//img[@class='cursor-pointer']";
  }

  get debugModeBtn(){
    return"//span[contains(text(),'Debug Mode')]//parent::button";
  }

  get adminModeBtn(){
    return"//span[contains(text(),'Admin Mode')]//parent::button";
  }

  get corePhotoBtn(){
    return"//span[contains(text(),'Core Photo')]//parent::a";
  }

  get reportBugBtn(){
    return"//span[contains(text(),'Report Bug')]//parent::button";
  }
  
  get dashboardTitle(): string {
    return "//div[contains(text(),'DashBoard')]";
  }
  get projectLabel(): string {
    return "(//div[@id='db2-project-section']/div[contains(text(), 'Project')] | //p[contains(text(), 'Project')])[1]";
  }

  get nameLabel(): string {
    return "//div[@id='db2-project-section']//th[text()='Name'] | //p[text()='Project']//parent::div//following-sibling::div/p[text()='Name']";
  }

  get regionLabel(): string {
    return "//div[@id='db2-project-section']//th[text()='Region'] | //p[text()='Project']//parent::div//following-sibling::div/p[text()='Region']";
  }

  get logoutBtn(): string {
    return "//a[text() = 'Log Out']";
  }

  //project 
  get searchInput(): string {
    return "//input[@id='db2-project-filter'] | (//input[@placeholder='Input search text'])[1]";
  }

  projectSearchResult(text: string): string {
    return `//table[@id='db2-project-table']//child::td[contains(text(),'${text}')] | ((//p[contains(text(), '${text}')])[1])`
  }

  get nodataMessage(): string {
    return "//td[text()='No matching records found'] | //p[text()='No data']";
  }

  get loadingMessage(){
    return "(//p[contains(text(),'Loading...')]//parent::div)[2]";
  }

  get projectNameField(): string {
    return "//td[contains(text(), 'Project name')] | //p[contains(text(), 'Project name')]";
  }

  dynamicProjectNameList(value:string){
    return `//p[contains(text(),'Project')]//parent::div//following::div//child::p[contains(text(),'${value}')]`
  }

  get collsapProjectDetail(){
    return"(//p[contains(text(),'Details')]//parent::div//following::div[contains(@class,'tree-expand-open')])[1]"
  }
  
  get projectDescriptionField(): string {
    return "//td[contains(text(), 'Project description')] | //p[contains(text(), 'Project description')]";
  }

  get customerIdField(): string {
    return "//td[contains(text(), 'Customer id')] | //p[contains(text(), 'Customer id')]";
  }

  get locationField(): string {
    return "//td[contains(text(), 'Location')] | //p[contains(text(), 'Location')]";
  }

  get regionField(): string {
    return "//p[contains(text(),'Minnesota')]//preceding-sibling::p[contains(text(),'Region')]";
  }
  
  get depositTypeField(): string {
    return "//td[contains(text(), 'Deposit type')] | //p[contains(text(), 'Deposit type')]";
  }

  get recordLastUpdatedField(): string {
    return "//td[contains(text(), 'Record last updated')] | //p[contains(text(), 'Record last updated')]";
  }

  //Drill Hole 

  drillHoleSearchResult(text: string): string {
    return `//table[@id='db2-drillhole-table']//tr/td[contains(text(), '${text}')] | ((//p[contains(text(), '${text}')])[1])`
  }

  get listDrillHole(){
    return "//div[@class='grid h-[20px] cursor-pointer grid-cols-12  border-b-[1px] border-gray px-2 false']"
  }

  get searchDrillHoleInput(): string {
    return "//p[contains(text(),'Drill Hole')]//parent::div//following::div//child::span//child::input[@placeholder='Input search text']";
  }

  get nodataDrillHoleMessage(): string {
    return "//p[contains(text(),'No data')]";
  }
  
  get drillHoleNameLabel(): string {
    return "//div[@id='db2-drillhole-section']//th[text()='Name'] | //p[text()='Drill Hole']//parent::div//following-sibling::div/p[text()='Name']";
  }

  get drillHoleStartLabel(): string {
    return "//div[@id='db2-drillhole-section']//th[text()='Start'] | //p[text()='Drill Hole']//parent::div//following-sibling::div/p[text()='Start']";
  }

  get drillHoleEndLabel(): string {
    return "//div[@id='db2-drillhole-section']//th[text()='End'] | //p[text()='Drill Hole']//parent::div//following-sibling::div/p[text()='End']";
  }

  get drillHoleIdField(): string {
    return "//td[contains(text(), 'Drill hole id')] | //p[contains(text(), 'Drill hole id')]";
  }

  listProjectDetail(value:string){
    return `//span[@class='ant-collapse-header-text']//child::p[contains(text(),'${value}')]`; 
  }
  
  get drillholeDetailExpand(){
    return"(//p[contains(text(),'Details')]//following::div[@class='ant-collapse-expand-icon'])[1]"; 
  }

  get drillHoleNameField(): string {
    return "//td[contains(text(), 'Drill hole name')] | //p[contains(text(), 'Drill hole name')]";
  }

  get drillHoleDescriptionField(): string {
    return "//td[contains(text(), 'Drill hole description')] | //p[contains(text(), 'Drill hole description')]";
  }

  get corescanJobReferenceField(): string {
    return "//td[contains(text(), 'Corescan job reference')] | //p[contains(text(), 'Corescan job reference')]";
  }

  get depthField(): string {
    return "//td[contains(text(), 'Depth')] | //p[contains(text(), 'Depth')]";
  }

  get lengthField(): string {
    return "//td[contains(text(), 'Length')] | //p[contains(text(), 'Length')]";
  }

  get collarLocationField(): string {
    return "(//td[contains(text(), 'Collar location')] | //p[contains(text(), 'Collar location')])[1]";
  }

  get collarRLField(): string {
    return "//td[contains(text(), 'Collar RL (metres)')] | //p[contains(text(), 'Collar RL (metres)')]";
  }

  get collarAzimuthField(): string {
    return "//td[contains(text(), 'Collar azimuth')] | //p[contains(text(), 'Collar azimuth')]";
  }

  get collarInclinationField(): string {
    return "//td[contains(text(), 'Collar inclination')] | //p[contains(text(), 'Collar inclination')]";
  }

  get drillHoleTypeField(): string {
    return "//td[contains(text(), 'Drill hole type')] | //p[contains(text(), 'Drill hole type')]";
  }

  get dateDrilledField(): string {
    return "//td[contains(text(), 'Date drilled')] | //p[contains(text(), 'Date drilled')]";
  }

  get dateScannedField(): string {
    return "//td[contains(text(), 'Date scanned')] | //p[contains(text(), 'Date scanned')]";
  }

  get recordLastUpdated():string{
    return"//td[contains(text(),'Record last updated')] | //p[contains(text(), 'Record last updated')]";
  }

  get drillHoleExpandBtn(): string {
    return "//p[contains(text(),'Details')]//following::div[@class='ant-collapse-expand-icon']//child::div[contains(@class,'tree-item tree-expand-open')]";
  }

  get drillHoleColapseBtn(): string {
    return "//p[contains(text(),'Details')]//following::div[@class='ant-collapse-expand-icon']//child::div[contains(@class,'tree-item tree-expand-closed')]";
  }

  get projectRow(): string {
    return "(//table[@id='db2-project-table']//tr)[2] | //p[text()='Project']//parent::div//following-sibling::div/div[contains(@class, 'grid')]"
  }

  get detailRow(): string {
    return "(//table[@id='db2-drillhole-table']//tr)[2] | (//p[text()='Drill Hole']//parent::div//following-sibling::div/div[contains(@class, 'grid')])[1]"
  }

  get inventoryLabel(): string {
    return "//div[@id='db2-inventory-section']/div[contains(text(), 'Inventory')] | //p[contains(text(), 'Inventory')]"
  }

  get inventoryDropDown(): string {
    return "//span[contains(text(),'Show all')]//parent::div"
  }

  get inventoryFirstItem():string{
    return "//div[contains(text(),'Minnesotta Department of Natural Resources')]//parent::div//preceding-sibling::div//child::div[contains(text(),'Show all')]";
  }

  get inventorySecondItem():string{
    return "//div[contains(text(),'Show all')]//parent::div//following-sibling::div//child::div[contains(text(),'Minnesotta Department of Natural Resources')]";
  }

  get inventoryItems(): string {
    return "//span[@class='ant-collapse-header-text']"
  }

  get clickInventoryDropdown(): string{
    return "//div[@id='db2-company-filter-dropdown'] | (//span[contains(text(), 'Show all')]//parent::div//following-sibling::span)[2]"
  }

  get intDrillHoleLabel(): string {
    return "//span[contains(text(), 'Drill Holes')] | //p[contains(text(), 'Drill Holes')]//parent::span"
  }

  get collapseIntDrillHoles(): string {
    return "//p[contains(text(),'Drill Holes')]//parent::span//preceding-sibling::div//child::div[contains(@class,'tree-expand-closed')]";
  }

  get expandIntDrillHoles(): string{
    return "//p[contains(text(),'Drill Holes')]//parent::span//preceding-sibling::div//child::div[contains(@class,'tree-expand-open')]";
  }

  get intProductLabel(): string {
    return "//span[contains(text(), 'Products')] | //p[contains(text(), 'Product')]//parent::span"
  }

  get collapseIntProducts(): string {
    return "//p[contains(text(),'Product')]//parent::span//preceding-sibling::div//child::div[contains(@class,'tree-expand-closed')]";
  }

  get expandIntProducts(): string{
    return "//p[contains(text(),'Product')]//parent::span//preceding-sibling::div//child::div[contains(@class,'tree-expand-open')]"
  }

  get intArchiveStorageLabel(): string {
    return "//span[contains(text(), 'Archive Storage')] | //p[contains(text(), 'Archive Storage')]//parent::span"
  }

  get collapseArchiveStorage(){
    return"//p[contains(text(),'Archive Storage')]//parent::span//preceding-sibling::div//child::div[contains(@class,'tree-expand-closed')]";
  }

  get expandArchiveStorage(){
    return"//p[contains(text(),'Archive Storage')]//parent::span//preceding-sibling::div//child::div[contains(@class,'tree-expand-open')]";
  }

  get intDHDetail(): string {
    return "//p[contains(text(),'Drill holes')]"
  }

  get intTotalDetail(): string {
    return "//p[contains(text(),'Total length')]"
  }

  get intProductsDetail(): string {
    return "//td[@class='key ' and text()='Products'] | //p[contains(text(), 'Product')]//parent::div"
  }

  get intStorageDetail(): string {
    return "//td[@class='key db2-admin-item' and text()='Storage space used'] | //p[contains(text(), 'Storage')]//parent::div"
  }

  get showingEntries(): string{
    return "//div[contains(@class,'dataTables_info')and @id='db2-project-table_info']"
  }

  get showOnlyInactiveEntriesLabel():string{
    return "//label[text()='Show only inactive'] | //span[text()='Show only inactive']"
  }

  get clickShowOnlyInactiveCheckbox():string{
    return "//label[text()='Show only inactive']//parent::div//following-sibling::input | //span[text()='Show only inactive']//parent::label//input[@type='checkbox']"
  }

  get showTheNumberOfEntriesText(): string{
    return "//div[@class='dataTables_info' and @id='db2-drillhole-table_info']"
  }

  get show1To1of1Entries(){
    return"//div[contains(text(),'Showing 1 to 1  of 1 entries')]" 
  }

  get mapItem():string{
    return "//p[contains(text(),'Map')]//ancestor::div[@class='rounded-lg']"
  }

  get selectedDrillHole(): string {
    return "//p[contains(text(),'Drill Hole')]//ancestor::div[@class='rounded-lg']"
  }

  get shareIcon():string{
    return"//div[@class='share-icon-large-dark']";
  }

  get linkEmailText():string{
    return"//a[contains(text(), 'Email Link')]//parent::span";
  }

  get copyLinkToDashboardText():string{
    return"//a[contains(text(), 'Copy Link to clipboard')]//parent::span";
  }

  get drillHoleValue(){
    return"//p[contains(text(),'v-018')]";
  }

  get viewDetailProject(){
    return"//p[contains(text(),'MDNR - Animikie')]//parent::span";
  }

  get viewDetailDrillHole(){
    return"//p[contains(text(),'LM-13-01')]//parent::span";
  }

  get footerTextStatusBarLeft(){
    return"//div[@id='status-bar-left']"; 
  }

  get footerTextStatusBarRight(){
    return"//div[@id='status-bar-right']"; 
  }

  //Map 
  get mapBtn(){
    return"(//button[contains(text(),'Map')])[1]";
  }

  get satelliteBtn(){
    return"//button[contains(text(),'Satellite')]";
  }

  get terrainCheckBox(){
    return"//label[contains(text(),'Terrain')]"; 
  }

  get labelsCheckBox(){
    return"//label[contains(text(),'Labels')]"; 
  }

  get fullScreenBtn(){
    return"//button[@class='gm-control-active gm-fullscreen-control']";
  }

  get exitFullScreenBtn(){
    return"//button[@class='gm-control-active gm-fullscreen-control']";
  }

  get zoomOutBtn(){
    return"(//button[@class='gm-control-active'])[3]";
  }

  get zoomInBtn(){
    return"(//button[@class='gm-control-active'])[4]"
  }


}