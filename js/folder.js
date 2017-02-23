function showFolder() {
 if (window.goSamples) goSamples();
 var $$ = go.GraphObject.make;

 myDiagram =
  $$(go.Diagram, "myDiagramDiv", {
    initialContentAlignment: go.Spot.Center,
    "toolManager.hoverDelay": 100,
     allowCopy: false,
     allowDelete: false,
     allowMove: false,
    "undoManager.isEnabled": true,
    "textEditingTool.starting": go.TextEditingTool.SingleClick,
    layout: $$(go.TreeLayout, 
      { angle: 90, 
        nodeSpacing: 40, 
        layerSpacing: 40, 
        layerStyle: go.TreeLayout.LayerUniform 
      })
  });

  var qfonts = '#d44025',
    qCss = '#f99501',
    qJs = '#ef8876',
    qImage = '#d6554c',
    qPdf = '#ff5722',
    qlib = '#5f1b06',
    qSrc = '#75493b';

  myDiagram.add(
    $$(go.Part, "Table", { position: new go.Point(1200, 0), selectable: false },
      $$(go.TextBlock, "Key", {
        row: 0,
        font: "700 14px Droid Serif, sans-serif"
      }),
      $$(go.Panel, "Horizontal", { row: 1, alignment: go.Spot.Left },
        $$(go.Shape, "Rectangle", { desiredSize: new go.Size(20, 20), fill: qfonts, margin: 5 }),
        $$(go.TextBlock, "FONTS", { font: "700 13px Droid Serif, sans-serif" })
      ),
      $$(go.Panel, "Horizontal", { row: 2, alignment: go.Spot.Left },
        $$(go.Shape, "Rectangle", { desiredSize: new go.Size(20, 20), fill: qCss, margin: 5 }),
        $$(go.TextBlock, "CSS", { font: "700 13px Droid Serif, sans-serif" })
      ),
      $$(go.Panel, "Horizontal", { row: 3, alignment: go.Spot.Left },
        $$(go.Shape, "Rectangle", { desiredSize: new go.Size(20, 20), fill: qJs, margin: 5 }),
        $$(go.TextBlock, "JS", { font: "700 13px Droid Serif, sans-serif" })
      ),
      $$(go.Panel, "Horizontal", { row: 4, alignment: go.Spot.Left },
        $$(go.Shape, "Rectangle", { desiredSize: new go.Size(20, 20), fill: qImage, margin: 5 }),
        $$(go.TextBlock, "IMAGE", { font: "700 13px Droid Serif, sans-serif" })
      ),
      $$(go.Panel, "Horizontal", { row: 5, alignment: go.Spot.Left },
        $$(go.Shape, "Rectangle", { desiredSize: new go.Size(20, 20), fill: qPdf, margin: 5 }),
        $$(go.TextBlock, "PDF", { font: "700 13px Droid Serif, sans-serif" })
      ),
      $$(go.Panel, "Horizontal", { row: 6, alignment: go.Spot.Left },
        $$(go.Shape, "Rectangle", { desiredSize: new go.Size(20, 20), fill: qSrc, margin: 5 }),
        $$(go.TextBlock, "SOURCE", { font: "700 13px Droid Serif, sans-serif" })
      ),
      $$(go.Panel, "Horizontal", { row: 7, alignment: go.Spot.Left },
        $$(go.Shape, "Rectangle", { desiredSize: new go.Size(20, 20), fill: qlib, margin: 5 }),
        $$(go.TextBlock, "LIBRARY", { font: "700 13px Droid Serif, sans-serif" })
      )
  ));

  function tooltipTextConverter(folder) {
    var str = "";
    str += folder.description;
    return str;
  }

  var tooltiptemplate =
    $$(go.Adornment, "Auto",
      $$(go.Shape, "Rectangle", { fill: "whitesmoke", stroke: "black" }),
      $$(go.TextBlock, {
        font: "bold 8pt Helvetica, bold Arial, sans-serif",
        wrap: go.TextBlock.WrapFit,
        margin: 5
      },
      new go.Binding("text", "", tooltipTextConverter))
    );

  function findFolder(component) {
    if (component === "F") return qfonts;
    if (component === "C") return qCss;
    if (component === "J") return qJs;
    if (component === "I") return qImage;
    if (component === "P") return qPdf;
    if (component === "L") return qlib;
    if (component === "S") return qSrc;
    return "#ed202a";
  }

  myDiagram.nodeTemplate =
    $$(go.Node, "Auto", {
      isTreeExpanded: false ,
      deletable: false,
      toolTip: tooltiptemplate,
      click: showDetail
    },
    new go.Binding("text", "name"),
    $$(go.Shape, "Rectangle", {
      fill: "lightgray",
      stroke: null,
      strokeWidth: 0,
      stretch: go.GraphObject.Fill,
      alignment: go.Spot.Center
    },
    new go.Binding("fill", "component", findFolder)),
    $$(go.TextBlock, {
      font: "700 12px Droid Serif, sans-serif",
      textAlign: "center",
      margin: 10,
      editable: true
    },
    new go.Binding("text", "name")),
     $$(go.Panel,  { 
        height: 45 
      }, 
      $$("TreeExpanderButton",
          {
            margin: 30,
          }
        )
      )
  );

  myDiagram.linkTemplate =
    $$(go.Link, { routing: go.Link.Orthogonal, corner: 5, selectable: false },
      $$(go.Shape, { strokeWidth: 3, stroke: '#424242' })
    );

  var nodeDataArray = [
     { key: "1", name: "QBurst Portal", component: "H", description: "QBurst is a global IT services company focusing on Big Data Analytics, Cloud and DevOps Consulting, and Mobile App Development" },
     { key: "2", parent: "1", name: "js", component: "J", description: "My JS files" },
     { key: "3", parent: "1", name: "src", component: "S", description: "My source file" },
     { key: "4", parent: "1", name: "styles", component: "C", description: "Styling here" },
     { key: "5", parent: "3", name: "lib", component: "L", description: "This library is big" },
     { key: "6", parent: "3", name: "qburst", component: "L", description: "Folders" },
     { key: "7", parent: "6", name: "fonts", component: "F", description: "My Fonts" },
     { key: "8", parent: "6", name: "media", component: "L", description: "media" },
     { key: "9", parent: "6", name: "views", component: "L", description: "The things you View. Has the HTML files in it" },
     { key: "10", parent: "8", name: "fonts", component: "F", description: "Inner Fonts" },
     { key: "11", parent: "8", name: "images", component: "I", description: "Images used" },
     { key: "12", parent: "8", name: "js", component: "J", description: "Js files" },
     { key: "13", parent: "8", name: "styles", component: "C", description: "Inner Styles" },
     { key: "14", parent: "8", name: "resources", component: "L", description: "Resource Library" },
     { key: "15", parent: "10", name: "Avenir", component: "F", description: "Has the respective fonts" },
     { key: "16", parent: "10", name: "homefonts", component: "F", description: "Has the respective fonts" },
     { key: "17", parent: "10", name: "kelsonfonts", component: "F", description: "Has the respective fonts" },
     { key: "18", parent: "10", name: "OpenSans", component: "F", description: "Has the respective fonts" },
     { key: "19", parent: "10", name: "oxygen", component: "F", description: "Has the respective fonts" },
     { key: "20", parent: "10", name: "ptSans", component: "F", description: "Has the respective fonts" },
     { key: "21", parent: "10", name: "qburstFonts", component: "F", description: "Has the respective fonts" },
     { key: "22", parent: "10", name: "Universe", component: "F", description: "Has the respective fonts" },
     { key: "23", parent: "10", name: "Universe_cons_bold", component: "F", description: "Has the respective fonts" },
     { key: "24", parent: "11", name: "common", component: "I", description: "Contains images for the corresponding section" },
     { key: "25", parent: "11", name: "company", component: "I", description: "Contains images for the corresponding section" },
     { key: "26", parent: "11", name: "emailTemplate", component: "I", description: "Contains images for the corresponding section" },
     { key: "27", parent: "11", name: "Home", component: "I", description: "Contains images for the corresponding section" },
     { key: "28", parent: "11", name: "industries", component: "I", description: "Contains images for the corresponding section" },
     { key: "29", parent: "11", name: "clientTestimonails", component: "I", description: "Contains images for the corresponding section" },
     { key: "30", parent: "11", name: "lyteBox", component: "I", description: "Contains images for the corresponding section" },
     { key: "31", parent: "11", name: "responsive", component: "I", description: "Contains images for the corresponding section" },
     { key: "32", parent: "25", name: "companyLanding", component: "I", description: "Contains images for the corresponding section" },
     { key: "33", parent: "25", name: "careers", component: "I", description: "Contains images for the corresponding section" },
     { key: "34", parent: "25", name: "contact", component: "I", description: "Contains images for the corresponding section" },
     { key: "35", parent: "31", name: "appoach", component: "I", description: "Contains images for the corresponding section" },
     { key: "36", parent: "31", name: "clients", component: "I", description: "Contains images for the corresponding section" },
     { key: "37", parent: "31", name: "clientTestimonails", component: "I", description: "Contains images for the corresponding section" },
     { key: "38", parent: "31", name: "common", component: "I", description: "Contains images for the corresponding section" },
     { key: "39", parent: "31", name: "company", component: "I", description: "Contains images for the corresponding section" },
     { key: "40", parent: "31", name: "industries", component: "I", description: "Contains images for the corresponding section" },
     { key: "41", parent: "31", name: "products", component: "I", description: "Contains images for the corresponding section" },
     { key: "42", parent: "31", name: "services", component: "I", description: "Contains images for the corresponding section" },
     { key: "43", parent: "31", name: "solutions", component: "I", description: "Contains images for the corresponding section" },
     { key: "44", parent: "35", name: "delivery", component: "I", description: "Contains images for the corresponding section" },
     { key: "45", parent: "35", name: "design", component: "I", description: "Contains images for the corresponding section" },
     { key: "46", parent: "35", name: "testing", component: "I", description: "Contains images for the corresponding section" },
     { key: "47", parent: "39", name: "aboutUs", component: "I", description: "Contains images for the corresponding section" },
     { key: "48", parent: "39", name: "contact", component: "I", description: "Contains images for the corresponding section" },
     { key: "49", parent: "39", name: "careers", component: "I", description: "Contains images for the corresponding section" },
     { key: "50", parent: "39", name: "partners", component: "I", description: "Contains images for the corresponding section" },
     { key: "51", parent: "47", name: "clientTele", component: "I", description: "Contains images for the corresponding section" },
     { key: "52", parent: "47", name: "management", component: "I", description: "Contains images for the corresponding section" },
     { key: "53", parent: "47", name: "techno", component: "I", description: "Contains images for the corresponding section" },
     { key: "54", parent: "40", name: "education", component: "I", description: "Contains images for the corresponding section" },
     { key: "55", parent: "40", name: "engineering", component: "I", description: "Contains images for the corresponding section" },
     { key: "56", parent: "40", name: "financial", component: "I", description: "Contains images for the corresponding section" },
     { key: "57", parent: "40", name: "health", component: "I", description: "Contains images for the corresponding section" },
     { key: "58", parent: "40", name: "retail", component: "I", description: "Contains images for the corresponding section" },
     { key: "59", parent: "41", name: "context", component: "I", description: "Contains images for the corresponding section" },
     { key: "60", parent: "41", name: "crickees", component: "I", description: "Contains images for the corresponding section" },
     { key: "61", parent: "41", name: "Iot", component: "I", description: "Contains images for the corresponding section" },
     { key: "62", parent: "41", name: "kever", component: "I", description: "Contains images for the corresponding section" },
     { key: "63", parent: "41", name: "Exsitu", component: "I", description: "Contains images for the corresponding section" },
     { key: "64", parent: "41", name: "openSource", component: "I", description: "Contains images for the corresponding section" },
     { key: "65", parent: "41", name: "inspktr", component: "I", description: "Contains images for the corresponding section" },
     { key: "66", parent: "41", name: "PenQ", component: "I", description: "Contains images for the corresponding section" },
     { key: "67", parent: "41", name: "tezzle", component: "I", description: "Contains images for the corresponding section" },
     { key: "68", parent: "41", name: "webwatch", component: "I", description: "Contains images for the corresponding section" },
     { key: "69", parent: "41", name: "quickpicks", component: "I", description: "Contains images for the corresponding section" },
     { key: "70", parent: "41", name: "qBecon", component: "I", description: "Contains images for the corresponding section" },
     { key: "71", parent: "42", name: "analytics", component: "I", description: "Contains images for the corresponding section" },
     { key: "72", parent: "42", name: "cloud", component: "I", description: "Contains images for the corresponding section" },
     { key: "73", parent: "42", name: "design", component: "I", description: "Contains images for the corresponding section" },
     { key: "74", parent: "42", name: "devops", component: "I", description: "Contains images for the corresponding section" },
     { key: "75", parent: "42", name: "mobile", component: "I", description: "Contains images for the corresponding section" },
     { key: "76", parent: "42", name: "social", component: "I", description: "Contains images for the corresponding section" },
     { key: "78", parent: "42", name: "testing", component: "I", description: "Contains images for the corresponding section" },
     { key: "79", parent: "42", name: "web", component: "I", description: "Contains images for the corresponding section" },
     { key: "80", parent: "71", name: "BDanalytics", component: "I", description: "Contains images for the corresponding section" },
     { key: "81", parent: "71", name: "businessInt", component: "I", description: "Contains images for the corresponding section" },
     { key: "82", parent: "71", name: "dataVisualisation", component: "I", description: "Contains images for the corresponding section" },
     { key: "83", parent: "71", name: "MachineLearning", component: "I", description: "Contains images for the corresponding section" },
     { key: "84", parent: "80", name: "ColumnarDB", component: "I", description: "Contains images for the corresponding section" },
     { key: "85", parent: "80", name: "GraphDB", component: "I", description: "Contains images for the corresponding section" },
     { key: "86", parent: "80", name: "documentDB", component: "I", description: "Contains images for the corresponding section" },
     { key: "87", parent: "80", name: "KeyValue", component: "I", description: "Contains images for the corresponding section" },
     { key: "88", parent: "72", name: "cloudSoln", component: "I", description: "Contains images for the corresponding section" },
     { key: "89", parent: "88", name: "AWS", component: "I", description: "Contains images for the corresponding section" },
     { key: "90", parent: "88", name: "Azure", component: "I", description: "Contains images for the corresponding section" },
     { key: "91", parent: "88", name: "GoogleAppEngine", component: "I", description: "Contains images for the corresponding section" },
     { key: "92", parent: "88", name: "privatecloud", component: "I", description: "Contains images for the corresponding section" },
     { key: "93", parent: "88", name: "salesforce", component: "I", description: "Contains images for the corresponding section" },
     { key: "94", parent: "73", name: "ia", component: "I", description: "Contains images for the corresponding section" },
     { key: "95", parent: "73", name: "portfolio", component: "I", description: "Contains images for the corresponding section" },
     { key: "96", parent: "73", name: "rwd", component: "I", description: "Contains images for the corresponding section" },
     { key: "98", parent: "73", name: "uxd", component: "I", description: "Contains images for the corresponding section" },
     { key: "99", parent: "75", name: "iphone", component: "I", description: "Contains images for the corresponding section" },
     { key: "100", parent: "75", name: "android", component: "I", description: "Contains images for the corresponding section" },
     { key: "101", parent: "75", name: "crossplatform", component: "I", description: "Contains images for the corresponding section" },
     { key: "102", parent: "75", name: "pwa", component: "I", description: "Contains images for the corresponding section" },
     { key: "103", parent: "75", name: "windows", component: "I", description: "Contains images for the corresponding section" },
     { key: "104", parent: "76", name: "competitive", component: "I", description: "Contains images for the corresponding section" },
     { key: "105", parent: "76", name: "socialMedia", component: "I", description: "Contains images for the corresponding section" },
     { key: "106", parent: "78", name: "performance", component: "I", description: "Contains images for the corresponding section" },
     { key: "107", parent: "78", name: "security", component: "I", description: "Contains images for the corresponding section" },
     { key: "108", parent: "72", name: "cloudSoln", component: "I", description: "Contains images for the corresponding section" },
     { key: "109", parent: "79", name: "blockchain", component: "I", description: "Contains images for the corresponding section" },
     { key: "110", parent: "79", name: "cms", component: "I", description: "Contains images for the corresponding section" },
     { key: "111", parent: "79", name: "eCommerce", component: "I", description: "Contains images for the corresponding section" },
     { key: "112", parent: "79", name: "ria", component: "I", description: "Contains images for the corresponding section" },
     { key: "113", parent: "79", name: "Webapps", component: "I", description: "Contains images for the corresponding section" },
     { key: "114", parent: "79", name: "microsoft", component: "I", description: "Contains images for the corresponding section" },
     { key: "115", parent: "43", name: "digitalMarketing", component: "I", description: "Contains images for the corresponding section" },
     { key: "116", parent: "43", name: "ecms", component: "I", description: "Contains images for the corresponding section" },
     { key: "117", parent: "43", name: "Gamification", component: "I", description: "Contains images for the corresponding section" },
     { key: "118", parent: "14", name: "downloads", component: "P", description: "PDF SLICES" },
     { key: "119", parent: "14", name: "viewPdf", component: "P", description: "The PDFs you see" }
  ];

  myDiagram.model = new go.TreeModel(nodeDataArray);

  function showDetail(e, node) {
    $(".description").text(node.data.description);
  }
}