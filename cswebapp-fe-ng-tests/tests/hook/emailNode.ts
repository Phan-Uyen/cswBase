/* eslint-disable no-console */
import * as nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import * as path from "path";
//@ts-ignore
import data from "../../allure-report/widgets/summary.json";
// const AWS = require('aws-sdk')
const fromBase64 = Buffer.from("CoreScan").toString("base64");
// const uploadFile = require('./uploadS3.js')
// const mailList = ['hung.nguyen@enouvo.com', 'nguyen.pham@enouvo.com', 'vikash.bansal@acciona.com', 'trinh.nguyen@enouvo.com', 'norm.sokolic@acciona.com', 'iain.coulthard@acciona.com']
let mailList = [
  "hung.nguyen@enouvo.com",
  "nguyen.pham@enouvo.com",
  "william.lau@corescan.com.au",
  "sen.ho@enouvo.com"
];

const total = data.statistic.total;
const passed = data.statistic.passed;
const failed = data.statistic.failed;
const broken = data.statistic.broken;
const skipped = data.statistic.skipped;
const unknown = data.statistic.unknown;
let result: boolean = false;
if (total === passed) {
  result = true;
}

const generateAndSendReport = async () => {
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const date = today.toLocaleString("default", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "long",
  });

  // const reportLink = await uploadFile.uploadFile()

  // console.log('pathStore', reportLink)
  const workingDir = await process.cwd();

  // const pathToAttachmentAllure = workingDir + '/report/zipFolder/allureReport.zip';
  // const attachmentAllure = fs.readFileSync(pathToAttachmentAllure).toString("base64");

  // const pathToAttachmentCucumber = workingDir + '/report/report/cucumber_report.html';
  // const attachmentCucumber = fs.readFileSync(pathToAttachmentCucumber).toString("base64");

  const transporter = await nodemailer.createTransport({
    // SES: new AWS.SES({
    //   accessKeyId: process.env.AWS_ACCESS_KEY,
    //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    //   apiVersion: '2010-12-01',
    //   region: 'ap-southeast-2'
    // })
    service: "Gmail",
    auth: {
      user: "hung.nguyen.enouvotest@gmail.com",
      pass: "gpxmrcgpnetcnlcy",
    },
  });

  console.log("Check email path", path.resolve(workingDir, "config/views/"));

  const hbsConfig: hbs.NodemailerExpressHandlebarsOptions = {
    viewEngine: {
      extname: ".handlebars",
      partialsDir: path.join(__dirname, "..config/views/"),
      layoutsDir: path.join(__dirname, "..config/views/"),
      defaultLayout: "",
    },
    viewPath: path.join(__dirname, "views"),
    extName: ".handlebars",
  };

  // const handlebarOptions = {
  //   viewEngine: {
  //     extName: ".handlebars",
  //     partialsDir: path.resolve(workingDir, "config/views/"),
  //     defaultLayout: false,
  //   },
  //   viewPath: path.resolve(workingDir, "config/views/"),
  //   extName: ".handlebars",
  // };

  // transporter.use("compile", hbs(handlebarOptions));
  transporter.use("compile", hbs(hbsConfig));
  let status = "Failed";
  if (result){
    status = "Passed"
  }
  let mailOptions = {
    from: `=?utf-8?B?${fromBase64}?=CoreScan>`,
    to: mailList,
    subject: "Automation Tests - CoreScan - " + status, //TODO: need to fix to use env variable
    text: "Report via email",
    template: "index",
    context: {
      name: "Enouvo",
      // linkReport: reportLink,
      linkReportOnline: `https://corescan-automation-repo-b8952.web.app`,
      title: "Automation UI report",
      content: "This is automated report for CoreScan",
      month: month,
      total: total,
      passed: passed,
      failed: failed + broken + skipped + unknown,
      date: date,
      enouvoSite: "https://enouvo.com",
      enouvoIcon: "https://i.ibb.co/yVnfHM0/LOGO-EIS-11.png",
    },
  };

  await transporter.sendMail(mailOptions, function (err) {
    if (err) {
      console.log("Error occur", err);
    } else {
      console.log("Mail sent.");
    }
  });
};

if (result == false) {
  mailList = [
    "hung.nguyen@enouvo.com",
    "nguyen.pham@enouvo.com",
    "william.lau@corescan.com.au",
    "sen.ho@enouvo.com",
    "mark.ye@corescan.com.au",
    "aldo.novelo@corescan.mx"
  ];
  generateAndSendReport();
} else {
  generateAndSendReport();
}
