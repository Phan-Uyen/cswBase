import { expect, Locator, Page } from "@playwright/test";
  import CommonPage from "./page";

  export default class CoreTrayViewPage extends CommonPage {
    page: Page;
    constructor(page: Page) {
        super(page);
      this.page = page;
    }

    get coreTrayViewTab(){
      return"//div[contains(text(),'Core Tray View')]"; 
    }

    get noTrayForDrillHoleMessage(){
      return "//p[contains(text(),'No tray view available for this drill hole.')]";
    }

    get CTVEmptyMessage(){
      return "//p[contains(text(),'No drill holes selected for viewing. Select a drill hole from dashboard...')]";
    }

    get trayText(){
      return"//label[contains(text(),'Tray:')]";
    }

    dynamicTrayListView(value:string){
      return`//li[contains(text(),'${value}')]`
    }

    get baseText(){
      return"//label[contains(text(),'Base:')]";
    }

    dynamicBaseListView(value:string){
      return`//li[contains(text(),'${value}')]`;
    }

    get overlayText(){
      return"//label[contains(text(),'Overlay:')]";
    }

    dynamicOverlayListView(value:string){
      return`//li[contains(text(),'${value}')]`; 
    }

    get transparencyText(){
      return"//label[contains(text(),'Transparency:')]";
    }

    get drillHoleText(){
      return"//label[contains(text(),'Drill Hole:')]"
    }

    dynamicDrillHoleListView(value:string){
      return`//li[contains(text(),'${value}')]`;
    }

    get trayViewPanel(){
      return"//div[@id='trayviewer2-panel_0']"; 
    }

    get menuIcon(){
      return"//div[@class='config-button2-med']//parent::div";
    }

    get uncheckedFullScreen(){
      return"//span[contains(text(),'Full screen')]//following-sibling::div//child::div[contains(@class,'checkbox-unchecked')]"; 
    }

    get checkedFullScreen(){
      return"//span[contains(text(),'Full screen')]//following-sibling::div//child::div[contains(@class,'checkbox-checked')]"; 
    }
    

    get unZoomAllOption(){
      return"//span[contains(text(),'Unzoom all')]//parent::div";
    }

    get restrictedMovement(){
      return"//span[contains(text(),'Restricted movement')]"
    }

    get fullSreenUnCheckedbox(){
      return "//span[contains(text(),'Full screen')]//parent::div//following-sibling::div//child::div[contains(@class,'checkbox-unchecked')]"
    }

    get fullSreenSheckedbox(){
      return "//span[contains(text(),'Full screen')]//parent::div//following-sibling::div//child::div[contains(@class,'checkbox-checked')]"
    }

    get uncheckedRestrictedMovement(){
      return "//span[contains(text(),'Restricted movement')]//parent::div//following-sibling::div//child::div[contains(@class, 'checkbox-unchecked')]" ;
    }

    get checkedRestrictedMovement(){
      return "//span[contains(text(),'Restricted movement')]//parent::div//following-sibling::div//child::div[contains(@class, 'checkbox-checked')]" ;
    }

    get footerErrTextStatus(){
      return"//div[contains(text(),'Panel undefined Load error: Tray view information missing for this image')]";
    }

    dynamicItemproducType(value:string){
      return `//div[@id='trayviewer2-panel_${value}_toolbar']//div[@title='Menu']`
    }

    get uncheckedMineralMap(){
      return "//p[contains(text(),'Mineral map')]//parent::span//following-sibling::div//child::div[contains(@class,'checkbox-unchecked')]";
    }

    get imageEnhancementUnchecked(){
      return "(//span[contains(text(),'Image Enhancement')]//parent::div//following-sibling::div//child::div[contains(@class,'checkbox-unchecked')])[1]";
    }

    get hsvViewUnchecked(){
      return "//label[contains(text(),'HSV View')]//parent::td//following-sibling::td//child::div[contains(@class,'checkbox-unchecked')]"; 
    }

    get hsvViewChecked(){
      return "//label[contains(text(),'HSV View')]//parent::td//following-sibling::td//child::div[contains(@class,'checkbox-checked')]"
    }

    get resetBtn(){
      return "//label[contains(text(),'Reset')]//parent::td";
    }

    get switchTo3DMode(){
      return "//span[contains(text(),'Switch to 3D Mode')]";
    }

    get switchTo2DMode(){
      return "//span[contains(text(),'Switch to 2D Mode')]";
    }

    get resetCamera(){
      return "//span[contains(text(),'Reset Camera')]";
    }

    get downloadImage(){
      return "//span[contains(text(),'Download Image')]" ; 
    }

    get turnShaderOn(){
      return "//span[contains(text(),'Turn Shader On')]";
    }

    get turnShaderOff(){
      return "//span[contains(text(),'Turn Shader Off')]";
    }

    get showNullPoints(){
      return "//span[contains(text(),'Show Null Points')]";
    }

    get hideNullPoints(){
      return "//span[contains(text(),'Hide Null Points')]";
    }

    get showTitleOutline(){
      return "//span[contains(text(),'Show Tile Outline')]"; 
    }

    get hideTitleOutline(){
      return "//span[contains(text(),'Hide Tile Outline')]"
    }

    get copyTitleOutline(){
      return "//span[contains(text(),'copy tile info')]";
    }

    get visAlgOff(){
      return "//span[contains(text(),'Vis alg: Off')]"
    }

    get visAlgOn(){
      return "//span[contains(text(),'Vis alg: On')]";
    }

    get unZoom(){
      return"(//span[contains(text(),'Unzoom')]//parent::div)[2]";
    }

    get checkedBoxLinkMovement(){
      return"//span[contains(text(),'Link movement')]//following-sibling::div//child::div[contains(@class,'checkbox-checked')]";
    }

    get unCheckBoxLinkMovement(){
      return"//span[contains(text(),'Link movement')]//following-sibling::div//child::div[contains(@class,'checkbox-unchecked')]";
    }

    get transparency(){
      return"//p[contains(text(),'Transparency')]//parent::div";
    }

    get uncheckedHighDefinition(){
      return"//p[contains(text(),'High definition')]//parent::span//following-sibling::div//child::div[contains(@class,'checkbox-unchecked')]";
    }

    get checkedHighDefinition(){
      return"//p[contains(text(),'High definition')]//parent::span//following-sibling::div//child::div[contains(@class,'checkbox-checked')]";
    }

    get uncheckedScaleBar(){
      return"//p[contains(text(),'Scale Bar')]//parent::span//following-sibling::div//child::div[contains(@class,'checkbox-unchecked')]";
    }

    get checkedScaleBar(){
      return"//p[contains(text(),'Scale Bar')]//parent::span//following-sibling::div//child::div[contains(@class,'checkbox-checked')]";
    }

    get uncheckedRegionTray(){
      return"//p[contains(text(),'Region/Tray')]//parent::span//following-sibling::div//child::div[contains(@class,'checkbox-unchecked')]"; 
    }

    get checkedRegionTray(){
      return"//p[contains(text(),'Region/Tray')]//parent::span//following-sibling::div//child::div[contains(@class,'checkbox-checked')]"; 
    }

    get uncheckTitleDebug(){
      return"//p[contains(text(),'Tile Debug')]//parent::span//following-sibling::div//child::div[contains(@class,'checkbox-unchecked')]";
    }

    get checkedTitleDebug(){
      return"//p[contains(text(),'Tile Debug')]//parent::span//following-sibling::div//child::div[contains(@class,'checkbox-checked')]"; 
    }

    get footerTextStatusInfo(){
      return "//div[@id='status-bar']//parent::div";
    }
  }






