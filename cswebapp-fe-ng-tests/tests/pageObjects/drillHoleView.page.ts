import { expect, Locator, Page } from "@playwright/test";
import CommonPage from "./page";

export default class DrillHoleViewPage extends CommonPage {
  page: Page;
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  get drillHoleViewTab(): string {
    return "//a[text()='Drill Hole View'] | //div[text()='Drill Hole View']";
  }

  get DRVEmptyMessage(): string {
    return "//p[text()='No drill holes selected for viewing. Select a drill hole from dashboard...']";
  }

  get categoryText(): string {
    return "//label[text()= 'Category:']";
  }

  get categoryItem(): string {
    return "//input[contains(@id, 'filter-category') and @class = 'ui-autocomplete-input']";
  }

  get categoryDropdown(): string {
    return '//div[contains(@id, "filter-category") and @class = "comboinput-button"]';
  }

  get categoryDepthScale(): string {
    return '//p[contains(text(), "Depth Scale")]';
  }

  get addPanelBtn(): string {
    return '//div[contains(@id, "add-button")]//div';
  }

  get layoutText(): string {
    return '//label[contains(text(), "Layout")]';
  }

  get layoutItem(): string {
    return "//input[contains(@id, 'filter-layout') and @class = 'ui-autocomplete-input']";
  }

  get layoutDropdown(): string {
    return "//div[contains(@id, 'layout-dropdown') and @class = 'comboinput-button']";
  }

  get layoutStackedByTrayItem(): string {
    return "//a[contains(text(), 'Stacked by tray')]//parent::p";
  }

  get layoutDownHoleItem(): string {
    return '//a[contains(text(), "Down hole")]//parent::p';
  }

  get layoutStackedDownHoleItem(): string {
    return '//a[contains(text(), "Stacked down hole")]//parent::p';
  }

  get drillHoleText(): string {
    return '(//label[contains(text(), "Drill Hole")])[1]';
  }

  dynamicDrillHoleItemView(value:string){
    return`//li[contains(text(),'${value}')]`;
  }


  get drillHoleItem(): string {
    return '//input[contains(@id, "filter-drillhole") and @class = "ui-autocomplete-input"]';
  }

  get drillHoleDropdown(): string {
    return "//label[contains(text(),'Drill Hole:')]//parent::div//following-sibling::div//child::div[@class='comboinput-dropdown']";
  }

  get menuBtn(): string {
    return "(//div[contains(@id, 'menu-button')])[1]";
  }

  get unzoomAllMenu(){
    return"//span[contains(text(),'Unzoom all')]//parent::div";
  }

  get restrictedMovementMenu(){
    return"//span[contains(text(),'Restricted movement')]//parent::div";
  }
  
  get uncheckedFullScreen(){
    return"//span[contains(text(),'Full screen')]//following-sibling::div//child::div[contains(@class,'checkbox-unchecked')]"; 
  }

  get checkedFullScreen(){
    return"//span[contains(text(),'Full screen')]//following-sibling::div//child::div[contains(@class,'checkbox-checked')]"; 
  }

  get uncheckedDisplayPanel(){
    return"//span[contains(text(),'Display panel data below title bar')]//following-sibling::div//child::div[contains(@class,'checkbox-unchecked')]"; 
  }

  get checkedDisplaypanel(){
    return"//span[contains(text(),'Display panel data below title bar')]//following-sibling::div//child::div[contains(@class,'checkbox-checked')]"; 
  }

  //left dropdown
  get leftMenuDropdown(): string {
    return "(//div[contains(@class, 'menu-button')])[1]";
  }

  get leftUnzoomBtn(): string {
    return "//p[contains(text(),'Unzoom')]//parent::span";
  }

  get leftLinkMovementBtn(): string {
    return "//p[contains(text(),'Link movement')]//parent::span";
  }

  get leftTransparencyBtn(): string {
    return "//p[contains(text(),'Transparency')]//parent::div";
  }

  get leftTrayDepthsBtn(): string {
    return "//p[contains(text(), 'Tray depths')]";
  }

  get leftTrayDepthsChecked(){
    return"//p[contains(text(),'Tray depths')]//parent::span//following-sibling::div//child::div[contains(@class,'checkbox-checked')]"; 
  }

  get leftTrayDepthsUnchecked(){
    return "//p[contains(text(),'Tray depths')]//parent::span//following-sibling::div//child::div[contains(@class,'checkbox-unchecked')]"
  }

  get leftTrayIDsBtn(): string {
    return "//span[contains(text(), 'Tray IDs')]";
  }

  get leftTrayIDsChecked(){
    return"//span[text()='Tray IDs']//following-sibling::div//child::div[contains(@class,'checkbox-checked')]";
  }

  get leftTrayIDsUnchecked(){
    return "//span[contains(text(),'Tray IDs')]//following-sibling::div//child::div[contains(@class,'checkbox-unchecked')]";
  }

  get leftCloseBtn(): string {
    return "(//p[contains(text(),'Close')]//parent::span)[1]";
  }

  //page dropdown
  get midleMenuDropdown(): string {
    return "(//div[contains(@class, 'menu-button')])[2]";
  }

  get midleUnzoomBtn(): string {
    return "//p[contains(text(),'Unzoom')]//parent::span";
  }

  get midleLinkMovementBtn(): string {
    return "//p[contains(text(),'Link movement')]//parent::span";
  }

  get midleUncheckedLinkMovement(){
    return"(//p[contains(text(),'Link movement')]//parent::span//following::div//child::div[contains(@class,'checkbox-unchecked')])[1]"; 
  }

  get midleCheckedLinkMovement(){
    return"(//p[contains(text(),'Link movement')]//parent::span//following::div//child::div[contains(@class,'checkbox-checked')])[1]"; 
  }

  get midleTransparencyBtn(): string {
    return "//p[contains(text(),'Transparency')]//parent::div";
  }

  get midleHighDefinitionBtn(): string {
    return "//p[contains(text(),'High definition')]//parent::span";
  }

  get midleUncheckedHighDefinition(){
    return"(//p[contains(text(),'High definition')]//parent::span//following::div//child::div[contains(@class,'checkbox-unchecked')])[1]"; 
  }

  get midleCheckedHighDefinition(){
    return"(//p[contains(text(),'High definition')]//parent::span//following::div//child::div[contains(@class,'checkbox-checked')])[1]"; 
  }

  get midleScaleBarBtn(): string {
    return "//p[contains(text(),'Scale Bar')]//parent::span";
  }

  get midleUncheckedScaleBar(){
    return"(//p[contains(text(),'Scale Bar')]//parent::span//following::div//child::div[contains(@class,'checkbox-unchecked')])[1]"; 
  }

  get midleCheckedScaleBar(){
    return"(//p[contains(text(),'Scale Bar')]//parent::span//following::div//child::div[contains(@class,'checkbox-checked')])[1]"; 
  }

  get midleUncheckedImageEnhancement(){
    return "//span[contains(text(),'Image Enhancement')]//following-sibling::div//child::div[contains(@class,'checkbox-unchecked')]";
  }

  get midleLabelHSVView(){
    return "(//label[contains(text(),'HSV View')]//parent::td//following-sibling::td//child::div[contains(@class,'checkbox-unchecked')])[1]";
  }

  get midleRegionOrTrayBtn(): string {
    return "//p[contains(text(),'Region/Tray')]//parent::span";
  }

  get midleUncheckedRegionTrayCheckBox(){
    return "(//p[contains(text(),'Region/Tray')]//parent::span//following::div//child::div[contains(@class,'checkbox-unchecked')])[1]" ; 
  }
  
  get midleCheckedRegionTrayCheckBox(){
    return "(//p[contains(text(),'Region/Tray')]//parent::span//following::div//child::div[contains(@class,'checkbox-checked')])[1]" ; 
  }
  
  get midleTileDebugBtn(): string {
    return "//p[contains(text(),'Tile Debug')]//parent::span";
  }

  get midleUncheckedTitleDebugCheckBox(){
    return "(//p[contains(text(),'Tile Debug')]//parent::span//following::div//child::div[contains(@class,'checkbox-unchecked')])[1]" ; 
  }
  
  get midleCheckedTitleDebugCheckBox(){
    return "(//p[contains(text(),'Tile Debug')]//parent::span//following::div//child::div[contains(@class,'checkbox-checked')])[1]" ; 
  }

  get midleSwitchTo3DModeBtn(){
    return"//span[contains(text(),'Switch to 3D Mode')]//parent::div"; 
  }

  get midleResetCameraOption(){
    return "//span[contains(text(),'Reset Camera')]//parent::span ";
  }

  get midleDownloadImageOption(){
    return"//span[contains(text(),'Download Image')]//parent::div" ;
  }

  get midleTurnShaderOnOption(){
    return"//span[contains(text(),'Turn Shader On')]//parent::div"; 
  }

  get midleTurnShaderOffOption(){
    return "//span[contains(text(),'Turn Shader Off')]//parent::div ";
  }
  
  get midleShowNullPointsOption(){
    return "//span[contains(text(),'Show Null Points')]//parent::div";
  }

  get midleHideNullPointsOption(){
    return "//span[contains(text(),'Hide Null Points')]//parent::div" ; 
  }

  get midleShowTitleOutline(){
    return "//span[contains(text(),'Show Tile Outline')]//parent::div" ;
  }

  get midleHideTitleOutline(){
    return "//span[contains(text(),'Hide Tile Outline')]//parent::div"; 
  }

  get midleCopyTitleInforOption(){
    return "//span[contains(text(),'copy tile info')]//parent::div" ; 
  }

  get midleVisAlgOffOption(){
    return "//span[contains(text(),'Vis alg: Off')]//parent::div" ; 
  }

  get midleVisAlgOnOption(){
    return "//span[contains(text(),'Vis alg: On')]//parent::div" ;
  }

  get midleSwitchTo2DModeBtn(){
    return"//span[contains(text(),'Switch to 2D Mode')]//parent::div"; 
  }

  get midleUncheckedShowBorder(){
    return "//p[contains(text(),'Show border')]//parent::span//following-sibling::div//child::div[contains(@class,'checkbox-unchecked')]" ; 
  }

  get midleCheckedShowBorder(){
    return "//p[contains(text(),'Show border')]//parent::span//following-sibling::div//child::div[contains(@class,'checkbox-checked')]"; 
  }

  get midleUncheckedMineralMap(){
    return "//p[contains(text(),'Mineral map')]//parent::span//following-sibling::div//child::div[contains(@class,'checkbox-unchecked')]";
  }

  get midleCheckedMineralMap(){
    return "//p[contains(text(),'Mineral map')]//parent::span//following-sibling::div//child::div[contains(@class,'checkbox-checked')]"; 
  }

  get titleMineralClassMap(){
    return "//div[contains(text(),'Colour Legend: _Mineral class map')]";
  }

  get closemineralMap(){
    return "(//span[contains(text(),'Close')]//preceding-sibling::span)[2]";
  }

  get selectAllMineralMapCheckbox(){
    return "//div[contains(text(),'Colour Legend: _Mineral class map')]//following-sibling::input";
  }

  tickInMineralCheckbox(value:string){
    return`//span[contains(text(),'${value}')]//following-sibling::input`
  }
get malachiteCheckbox(){
  return "//span[contains(text(),'Malachite')]//following-sibling::input";
}
  

  get closeMineralMapBtn(){
    return "(//span[contains(text(),'Close')]//parent::button)[2]";
  }
  get midleCloseBtn(): string {
    return "//p[contains(text(),'Close')]//parent::Span";
  }

  get midleEditModeUncheckbox(){
    return"//p[contains(text(),'Edit mode')]//parent::span//following-sibling::div//child::div[contains(@class,'checkbox-unchecked')]";
  }

  get midleEditModeCheckedbox(){
    return"//p[contains(text(),'Edit mode')]//parent::span//following-sibling::div//child::div[contains(@class,'checkbox-checked')]";
  }

  get midleSendToFrontOption(){
    return "//p[contains(text(),'Send to front')]//parent::span" ; 
  }

  get midleSendToBack(){
    return "//p[contains(text(),'Send to back')]//parent::span"; 
  }

  get leftBarEditMode(){
    return"//div[@class='toolbar-body']";
  }

  get undoBtn(){
    return"//button[contains(text(),'Undo')]//parent::div[@class='col']";
  }

  get redoBtn(){
    return"//button[contains(text(),'Redo')]//parent::div[@class='col']"; 
  }

  get selectBtn(){
    return"//button[contains(text(),'Select')]//parent::div[@class='col']";
  }

  get deleteBtn(){
    return"//button[contains(text(),'Delete')]//parent::div[@class='col']";
  }

  get saveBtn(){
    return"//button[contains(text(),'Save')]//parent::div[@class='col']"; 
  }

  get verticeBtn(){
    return"//button[contains(text(),'Vertice')]//parent::div[@class='col']"
  }

  get drawBtn(){
    return"//button[contains(text(),'Draw')]//parent::div[@class='col']";
  }

  get lineBtn(){
    return"//button[contains(text(),'Line')]//parent::div[@class='col']";
  }

  get squareBtn(){
    return"//button[contains(text(),'Square')]//parent::div[@class='col']";
  }

  get circleBtn(){
    return"//button[contains(text(),'Circle')]//parent::div[@class='col']";
  }

  get polygonBtn(){
    return"//button[contains(text(),'Polygon')]//parent::div[@class='col']";
  }

  get textBtn(){
    return"//button[contains(text(),'Text')]//parent::div[@class='col']";
  }

  get drawShape(){
    return"//button[contains(text(),'Draw Shape')]//parent::div[@class='col-100']"; 
  }

  get fillLabel(){
    return"//label[contains(text(),'Fill')]//parent::div";
  }

  get lineLabel(){
    return"(//label[contains(text(),'Line')]//parent::div)[1]";
  }

  get lineStyleLabel(){
    return"//label[contains(text(),'Line Style')]//parent::div";
  }

  get lineWidthLabel(){
    return"//label[contains(text(),'Line Width')]//parent::div";
  }

  get fontLabel(){
    return"(//label[contains(text(),'Font')]//parent::div)[1]";
  }

  get fontSizeLabel(){
    return"(//label[contains(text(),'Font Size')]//parent::div)[1]";
    
  }

  //right dropdown
  get rightMenuDropdown(): string {
    return "(//div[contains(@class, 'menu-button')])[3]";
  }

  get rightUnzoomBtn():string {
    return"(//p[contains(text(), 'Unzoom')])//parent::span"
  }

  get rightLinkMovementBtn(): string {
    return "//p[contains(text(),'Link movement')]//parent::span";
  }

  get rightTransparencyBtn(): string {
    return "//p[contains(text(),'Transparency')]//parent::div";
  }
  
  get rightHighDefinition(){
    return"//p[contains(text(),'High definition')]//parent::span";
  }

  get highDefinitionChecked(){
    return"//p[contains(text(),'High definition')]//parent::span//following-sibling::div//div[contains(@class,'checkbox-checked')]";
  }

  get highDefinitionUnchecked(){
    return"//p[contains(text(),'High definition')]//parent::span//following-sibling::div//div[contains(@class,'checkbox-unchecked')]";
  }

  get rightTrayDepthsBtn(): string {
    return "//p[contains(text(),'Tray depths')]//parent::span";
  }

  get rightUnCheckedTrayDepths(){
    return"(//p[contains(text(),'Tray depths')]//parent::span//following-sibling::div//div[contains(@class,'checkbox-unchecked')])[1]";
  }

  get rightCheckedTrayDepths(){
    return"(//p[contains(text(),'Tray depths')]//parent::span//following-sibling::div//div[contains(@class,'checkbox-checked')])[1]"; 
  }

  get rightTrayIDsBtn(): string {
    return "//span[contains(text(), 'Tray IDs')]";
  }

  get rightUnCheckedTrayIDs(){
    return"(//span[contains(text(),'Tray IDs')]//following-sibling::div//child::div[contains(@class,'checkbox-unchecked')])[1]";
  }

  get rightCheckedTrayIDs(){
    return"(//span[contains(text(),'Tray IDs')]//following-sibling::div//child::div[contains(@class,'checkbox-checked')])[1]"; 
  }

  get rightCloseBtn(): string {
    return "//p[contains(text(),'Close')]//parent::span";
  }

  //drillhole
  get corePhotography(): string {
    return "//div[@class='ol-overlaycontainer-stopevent']";
  }

  //list panel
  get listPanels(): string {
    return "//div[contains(@id,'viewer2-panel_') and contains(@class,'viewer2-panel disable-select ui-droppable ui-draggable')]";
  }
  //left-scale
  get leftScale(): string {
    return "//div[@id='viewer2-panel_0']";
  }

  get rightScale(): string {
    return "//div[@id='viewer2-panel_2']";
  }

  //footer bar
  get statusBarLeft(): string {
    return "//div[@id='status-bar-left']";
  }

  get statusBar(): string {
    return "//div[@id='status-bar']//parent::div";
  }

  get statusBarChild(): string {
    return "//div[@id='status-bar']";
  }

  get statusError(): string {
    return "//div[contains(@class,'status-error')]";
  }

  get hoverDetailPopUp(): string {
    return "//div[contains(@id,'viewer2-hover-info-popup')]";
  }

  get contextMenuList(): string {
    return "//ul[contains(@class,'context-menu-list context-menu-root')]";
  }
  dynamicPanelList(value:number){
    return `//div[@id='viewer2-panel_${value}']`
  }

  get coreImageTextContent(){
    return "//li[@id='show_mineral_name']";
  }

  get mineralLogTextContent(){
    return"//span[contains(text(),'Graph Type')]//parent::li";
  }

  get thresholdMenuSub(){
    return "//span[contains(text(),'Threshold')]//parent::li "; 
  }

  dynamicInputThreshold_min(value:number){
    return `//input[@id='threshold_min@viewer2-panel_${value}'] `; 
  }

  dynamicInputThreshold_max(value:number){
    return `//input[@id='threshold_max@viewer2-panel_${value}']`;
  }

  dynamicItemMenu(number: string): string {
    return `//div[@id='viewer2-panel_${number}_toolbar']//div[@title='Menu']`;
  }

  dynamicItemProductType(number: string): string {
    console.log(`//div[@id='viewer2-panel_${number}_toolbar']`)
    return `//div[@id='viewer2-panel_${number}_toolbar']`;
  }

  dynamicItemProductTypeLabel(number: string): string {
    console.log(`//div[@id='viewer2-panel_${number}_toolbar']//div[@class='csviewpanel-toolbar-product-filter-label']`)
    return `//div[@id='viewer2-panel_${number}_toolbar']//div[@class='csviewpanel-toolbar-product-filter-label']`;
  }
  get dropdownLight(){
    return"(//div[@class='csviewpanel-toolbar-product-filter ui-autocomplete-input'])[2]";
  }

  dynamicItemProductTypeList(value:string){
    return `(//li[contains(text(),'${value}')])[1]`
  }
  
  dynamicValueCommonSection(value: string): string {
    console.log('Element ', `//td[@class='key' and contains(text(), '${value}')]`)
    return `//td[@class='key' and contains(text(), '${value}')]`;
  }

  dynamicValueDepth(value:string){
    return`//td[@class='key' and contains(text(), 'Depth')]//following-sibling::td[@class='val' and contains(text(),'${value}')]`;
  }

  dynamicValuePanel(){
    return"//div[@class='csecwpimage-content csecwpimage-panel']//parent::div[contains(@id,'container-wms')]";
  }

  dynamicValueMineralName(value :string):string{
    return`//div[contains(text(), '${value}')]`;
  }

  dynamicValueLayout(){
    return"//input[@id='viewer2-filter-layout']//following-sibling::input[@value='STACKEDSECTION']";;
  }
  dynamicValueRange(value:string){
    return ` //td[@class='key' and contains(text(), 'Range')]//following-sibling::td[@class='val' and contains(text(),'${value}')]`;
  }

  
  get linkMovementSelectBox(): string {
    return "//p[contains(text(),'Link movement')]";
  }

  get unZoomSelectBox(): string {
    return "//p[contains(text(),'Unzoom')]//parent::span";
  }

  get closeSelectBox(): string {
    return "//p[contains(text(),'Close')]";
  }
  dynamicItemProductList(number: string): string {
    console.log(`(//ul[contains(@class,'csviewpanel-toolbar-product-menu')]//li)[${number}]`)
    return `(//ul[contains(@class,'csviewpanel-toolbar-product-menu')]//li)[${number}]`;
  }

  get categoryTypeDropDown(): string {
    return "//div[@id='viewer2-filter-category-dropdown']"
  }

  dynamicCategoryType(category: string): string {
    return `//p[@class='ui-menu-item']//a[contains(text(),'${category}')]`
  }

  get depthScaleCategory(){
    return "//li[@class='ui-menu-item']//child::a[contains(text(),'Depth Scale')]"
  }

  get viewerOptionMenu(): string {
    return "//div[@title='Viewer Options']"
  }

  get unZoomAllOption(): string {
    return "//span[contains(text(),'Unzoom all')]"
  }
  
  
  get transparencyUISlider(): string {
    return "//div[contains(@class,'ui-slider')]"
  }
  
  get transparencyUISliderControl(): string {
    return "//span[contains(@class,'ui-slider-handle')]"
  }

  get transparencyUISliderOne(): string {
    return "(//div[contains(@class,'ui-slider')])[2]"
  }
  
  get transparencyUISliderControlOne(): string {
    return "(//span[contains(@class,'ui-slider-handle')])"
  }

  get transparencyUISliderTwo(): string {
    return "(//div[contains(@class,'ui-slider')])[1]"
  }
  
  get transparencyUISliderControlTwo(): string {
    return "(//span[contains(@class,'ui-slider-handle')])[1]"
  }

  get switchTo3DMode():string{
    return"(//span[contains(text(), 'Switch to 3D Mode')]//parent::div)" ;
  }

  get switchTo2DMode():string{
    return"(//span[contains(text(), 'Switch to 2D Mode')]//parent::div)" ;
  }

  get footerTextStatusError(){
    return"//div[contains(text(),'Panel undefined Load error:  Unknown error')]";
  }


  dynamicRangeValue(value:string){
    return`//td[@class='key' and contains(text(), '${value}')]`
  }

  get depthScaleBar(){
    return"//canvas[@class='csdepthscale']"; 
  }

  get editModeText(){
    return"//p[contains(text(),'Edit Mode')]//parent::span";
  }

  dynamiclogAuPpmCategory(number: string): string {
    return `//div[@id='viewer2-panel_${number}']//following::div[contains(@class,'ui-autocomplete-input')]//child::div[contains(text(),'Log: Au_ppm')]`;
  }

  get menuItemSmallRightDropdown(){
    return"(//div[@class='csviewpanel-toolbar-menu-button dropdown-menu-button-small-light'])[2]"; 
  }


  get loadingSpinner(){
    return "//div[@id='container-wms1']//preceding-sibling::div[@class='loading']";
  }

  get clearCursorText(){
    return"(//span[contains(text(),'Clear cursor')]//parent::li)[2]";
  }




}
