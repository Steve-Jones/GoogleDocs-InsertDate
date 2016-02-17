/*
 * The onOpen function runs automatically when the Google Docs document is
 * opened. Use it to add custom menus to Google Docs that allow the user to run
 * custom scripts. For more information, please consult the following two
 * resources.
 *
 * Extending Google Docs developer guide:
 *     https://developers.google.com/apps-script/guides/docs
 *
 * Document service reference documentation:
 *     https://developers.google.com/apps-script/reference/document/
 */
function onOpen() {
  // Add a menu with some items, some separators, and a sub-menu.
  DocumentApp.getUi().createMenu('Custom Actions')
      .addItem('Insert Date', 'insertAtCursor')
      .addToUi();
}

/**
 * Inserts the date at the current cursor location in boldface.
 */
(function() {
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    Date.prototype.getMonthName = function() {
        return months[ this.getMonth() ];
    };
    Date.prototype.getDayName = function() {
        return days[ this.getDay() ];
    };
})();

var now = new Date();

var day = now.getDayName();
var month = now.getMonthName();
var dayNum = now.getDate();
var monthNum = now.getMonth() +1;

var dateSuffix = getDateSuffix(dayNum);

function getDateSuffix() {
    if (dayNum === 3 || dayNum === 23)
      return "rd";
    else if (dayNum === 1 || dayNum === 21 || dayNum === 31)
      return "st";
    else if (dayNum === 2 || dayNum === 22)
      return "nd";
    else
      return "th";
}

function insertAtCursor() {
  var cursor = DocumentApp.getActiveDocument().getCursor();

  if (cursor) {
    // Attempt to insert text at the cursor position. If insertion returns null,
    // then the cursor's containing element doesn't allow text insertions.
    var date = now; // "yyyy-MM-dd'T'HH:mm:ss'Z'"
    var date2 = day+", "+month+" "+dayNum+dateSuffix;
    var element = cursor.insertText(date2);
    if (element) {
      element.setBold(false);
    } else {
      DocumentApp.getUi().alert('Cannot insert text at this cursor location.');
    }
  } else {
    DocumentApp.getUi().alert('Cannot find a cursor in the document.');
  }
}
